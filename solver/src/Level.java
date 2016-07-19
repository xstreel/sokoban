
public class Level {

	char[][] immovable;
	Solution init;

	public Level(char[][] immovable, Solution init) {
		this.immovable = new char[immovable.length][immovable[0].length];
		for (int i = 0; i < immovable.length; i++) {
			for (int j = 0; j < immovable[0].length; j++) {
				this.immovable[i][j] = immovable[i][j];
			}
		}
		this.init = init.clone();
	}
}
