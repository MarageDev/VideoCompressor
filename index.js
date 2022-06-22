const {app, BrowserWindow } = require('electron')



function createWindow(){
    const win = new BrowserWindow({
        width: 850,
        height: 450,
        resizable: false,
        autoHideMenuBar: true,
        title: "Video Kompressor",
        webPreferences: {
            nodeIntegration: true
   }
    })
    win.loadFile(__dirname + '/html/VideoCompressor.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0 ) {
        createWindow()
    }
})