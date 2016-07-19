
public class Position {

	int i;
	int j;

	public Position(int i, int j) {
		this.i = i;
		this.j = j;
	}

	public void move(int moveI, int moveJ) {
		this.i += moveI;
		this.j += moveJ;
	}

	@Override
	public String toString() {
		return "Position [i=" + i + ", j=" + j + "]";
	}

	public boolean equals(Position p) {
		return (p.i == this.i && p.j == this.j);
	}

	public Position clone() {
		return new Position(i, j);
	}
}
