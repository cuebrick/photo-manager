import { BrowserWindow } from 'electron';

let win;

function createWindow() {
	win = new BrowserWindow({ width: 1600, height: 800 });
	win.loadURL(__dirname + '/../../index.html');
	win.on('close', () => {
		win = null;
	});
	win.webContents.openDevTools();
}

export default createWindow;