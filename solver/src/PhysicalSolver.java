import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.util.List;

public class PhysicalSolver {

	public static void pushTheButton(List<Position> moves) throws AWTException, InterruptedException {
		Robot nono = new Robot();
		Thread.sleep(5000);
		nono.setAutoDelay(1000);
		for (Position move : moves) {
			if (move.i == -1 && move.j == 0) {
				nono.keyPress(KeyEvent.VK_UP);
			}
			if (move.i == 1 && move.j == 0) {
				nono.keyPress(KeyEvent.VK_DOWN);
			}
			if (move.i == 0 && move.j == -1) {
				nono.keyPress(KeyEvent.VK_LEFT);
			}
			if (move.i == 0 && move.j == 1) {
				nono.keyPress(KeyEvent.VK_RIGHT);
			}
		}
	}
}
