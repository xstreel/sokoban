import java.awt.AWTException;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class LevelLoader {

	public static Level loadFile(String file) throws IOException {
		Path path = FileSystems.getDefault().getPath("C:/Users/Mengard/workspace/Sokoban/src", file);
		print(path);
		List<String> lines = Files.readAllLines(path);
		char[][] larray = new char[lines.size()][lines.get(0).length()];
		for (int i = 0; i < lines.size(); i++) {
			for (int j = 0; j < lines.get(i).length(); j++) {
				larray[i][j] = lines.get(i).charAt(j);
			}
		}
		char[][] immovable = new char[larray.length][larray[0].length];
		Position player = null;
		List<Position> boxes = new ArrayList<>();
		for (int i = 0; i < larray.length; i++) {
			for (int j = 0; j < larray[0].length; j++) {
				switch (larray[i][j]) {
				/*  #.@+$* */
				case ' ':
					immovable[i][j] = ' ';
					break;
				case '#':
					immovable[i][j] = '#';
					break;
				case '.':
					immovable[i][j] = '.';
					break;
				case '@':
					player = new Position(i, j);
					immovable[i][j] = ' ';
					break;
				case '+':
					player = new Position(i, j);
					immovable[i][j] = '.';
					break;
				case '$':
					boxes.add(new Position(i, j));
					immovable[i][j] = ' ';
					break;
				case '*':
					boxes.add(new Position(i, j));
					immovable[i][j] = '.';
					break;
				}
			}
		}
		Solution init = new Solution(player, boxes);
		Level level = new Level(immovable, init);
		return level;
	}

	public static void print(Object o) {
		System.out.println(o);
	}

	public static void main(String[] args) throws IOException, AWTException, InterruptedException {
		Level level = loadFile("l2.txt");
		Solver.solve(level);
	}
}
