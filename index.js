const {app, BrowserWindow, ipcMain } = require('electron')
const ipc = ipcMain


function createWindow(){
    const win = new BrowserWindow({
        width: 850,
        height: 450,
        resizable: false,
        autoHideMenuBar: true,
        title: "Video Kompressor",
        frame:false,
        icon: __dirname +'/Images/CompressorIcon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
   }
    })
    win.loadFile(__dirname + '/html/VideoCompressor.html')

    ipc.on('closeApp', ()=> {
        win.close()
    })
    ipc.on('minimizeApp', ()=> {
        win.minimize()
    })
    /*      NOT USED IN THIS APP
    ipc.on('maximizeApp', ()=> {
        win.maximize()
    })*/
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