const { app, BrowserWindow } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 352,
        height: 452,
        frame: true, // remove title bar for widget
        alwaysOnTop: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");

}

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => { // for Mac
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
}); //Mac = dont quit auto