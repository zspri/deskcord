const {app, BrowserWindow, Tray, process, Menu} = require('electron');
const settings = require('electron-settings');

let mainWindow, tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 335,
        width: 250,
        frame: false,
        resizable: false
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // Hide window in taskbar
    mainWindow.setSkipTaskbar(true);
    mainWindow.webContents.openDevTools({
        mode:"undocked"
    })

    tray = new Tray('assets/tray.png');
    tray.setToolTip('Click to open Discord in a minimal window.');
    const trayContextMenu = Menu.buildFromTemplate([
        {type: "normal", label: `TaskbarCord v${app.getVersion()}`, enabled: false},
        {type: "separator"},
        {type: "normal", label: "Quit Application", role: "quit"}
    ]);
    tray.setContextMenu(trayContextMenu);
    const trayBounds = tray.getBounds();
    const windowSize = mainWindow.getSize();
    // Center window on tray position
    mainWindow.setPosition(trayBounds.x - ((windowSize[0] / 2) - (trayBounds.width / 2)), trayBounds.y - windowSize[1]);

    tray.on('click', () => {
        mainWindow.show();
        // Center window on tray position
        mainWindow.setPosition(trayBounds.x - ((windowSize[0] / 2) - (trayBounds.width / 2)), trayBounds.y - windowSize[1]);
    });

    mainWindow.on('blur', () => {
        mainWindow.hide();
    });

    mainWindow.on('closed', () => {
        app.quit();
    })

    mainWindow.on('resize', () => {
        mainWindow.setPosition(trayBounds.x - ((windowSize[0] / 2) - (trayBounds.width / 2)), trayBounds.y - windowSize[1]);
    })
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
