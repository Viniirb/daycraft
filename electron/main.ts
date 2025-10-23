import electron from 'electron';
import type { BrowserWindow as BrowserWindowType } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { app, BrowserWindow } = electron;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let win: BrowserWindowType | null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Abre o DevTools automaticamente
  win.webContents.once('did-finish-load', () => {
    win?.webContents.openDevTools();
  });

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});