import java.util.ArrayList;
import java.util.List;

public class Solution {
	Position player;
	List<Position> boxes;
	List<Position> moves;

	public Solution(Position player, List<Position> boxes) {
		this.player = player.clone();
		this.boxes = new ArrayList();
		for (Position box : boxes) {
			this.boxes.add(box.clone());
		}
		moves = new ArrayList<>();
	}

	public Solution(Position player, List<Position> boxes, List<Position> moves) {
		this.player = player.clone();
		this.boxes = new ArrayList();
		this.moves = new ArrayList();
		for (Position box : boxes) {
			this.boxes.add(box.clone());
		}
		for (Position move : moves) {
			this.moves.add(move.clone());
		}
		moves = new ArrayList<>();
	}

	public Solution clone() {
		return new Solution(player, boxes, moves);
	}

	@Override
	public int hashCode() {
		int hash = 1;
		hash *= player.i * player.j;
		for (Position box : boxes) {
			hash = hash << 1;
			hash *= box.i * box.j;
		}
		return hash;
	}

	@Override
	public boolean equals(Object obj) {
		Solution s2 = (Solution) obj;
		if (!s2.player.equals(this.player)) {
			return false;
		}
		for (int i = 0; i < boxes.size(); i++) {
			Position b1 = this.boxes.get(i);
			Position b2 = s2.boxes.get(i);
			if (!b1.equals(b2)) {
				return false;
			}
		}
		return true;
	}

	public void addMove(int moveI, int moveJ) {
		this.moves.add(new Position(moveI, moveJ));
	}
}
