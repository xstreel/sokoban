import java.awt.AWTException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Solver {
	static Set<Solution> visited = new HashSet<>();
	static List<Solution> toVisit = new LinkedList<>();

	public static void solve(Level level) throws AWTException, InterruptedException {
		toVisit.add(level.init);
		List<Solution> childs1 = childs(level.init, level);
		List<Solution> childs2 = childs(level.init, level);
		while (toVisit.size() > 0) {
			if (visited.size() % 100 == 0) {
				System.out.println(visited.size() + "\t" + toVisit.size());
			}
			Solution s = toVisit.remove(0);
			if (!visited.contains(s)) {
				visited.add(s);
				List<Solution> childs = childs(s, level);
				for (Solution child : childs) {
					if (!visited.contains(child)) { // new element
						if (isValid(child, level)) {
							System.out.println("Completed !");
							printLevel(child, level);
							for (Position move : child.moves) {
								System.out.println(move);
							}
							PhysicalSolver.pushTheButton(child.moves);
							return;
						} else {
							toVisit.add(child);
						}
					}
				}
			}
		}
	}

	public static List<Solution> childs(Solution s, Level l) {
		List<Solution> childs = new ArrayList<>();
		Solution left = checkSolution(s.clone(), 0, -1, l);
		Solution right = checkSolution(s.clone(), 0, +1, l);
		Solution up = checkSolution(s.clone(), -1, 0, l);
		Solution down = checkSolution(s.clone(), +1, 0, l);
		if (left != null) {
			childs.add(left);
		}
		if (right != null) {
			childs.add(right);
		}
		if (up != null) {
			childs.add(up);
		}
		if (down != null) {
			childs.add(down);
		}
		return childs;
	}

	public static Solution checkSolution(Solution s, int moveI, int moveJ, Level l) {
		/** check direction = wall */
		s.addMove(moveI, moveJ);
		s.player.move(moveI, moveJ);
		if (!checkAccessible(s.player, l)) { // can't walk on wall
			return null;
		}
		for (Position box : s.boxes) {
			if (s.player.equals(box)) {
				box.move(moveI, moveJ); // move the box in the same direction as player
				if (!checkAccessible(box, l)) { // can't push box on wall
					return null;
				}
				int boxOn = 0;
				for (Position box2 : s.boxes) {
					if (box.equals(box2)) {
						boxOn += 1;
					}
				}
				if (boxOn > 1) { // only 1 box allow on a position
					return null;
				}
			}
		}
		return s;
	}

	public static void printLevel(Solution s, Level l) {
		char[][] tiles = new char[l.immovable.length][l.immovable[0].length];
		for (int i = 0; i < tiles.length; i++) {
			for (int j = 0; j < tiles[0].length; j++) {
				tiles[i][j] = l.immovable[i][j];
			}
		}
		tiles[s.player.i][s.player.j] = (tiles[s.player.i][s.player.j] == '.') ? '+' : '@';
		for (Position box : s.boxes) {
			tiles[box.i][box.j] = (tiles[box.i][box.j] == '.') ? '$' : '*';
		}
		for (int i = 0; i < tiles.length; i++) {
			for (int j = 0; j < tiles[0].length; j++) {
				System.out.print(tiles[i][j]);
			}
			System.out.println();
		}
	}

	public static boolean checkAccessible(Position p, Level l) {
		char c = l.immovable[p.i][p.j];
		return (c == '#') ? false : true;
	}

	public static boolean isValid(Solution s, Level l) {
		for (Position box : s.boxes) {
			if (l.immovable[box.i][box.j] != '.') {
				return false;
			}
		}
		return true;
	}
}
