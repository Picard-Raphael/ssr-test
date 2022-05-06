// Native
import { join } from 'path';
import { format } from 'url';

// Packages
import { BrowserWindow, app } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      });

  // Allows to activate the devtools
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadURL(url);
});

if (isDev) {
  app.whenReady().then(() => {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  });
}
// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);
