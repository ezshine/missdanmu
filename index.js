// Modules to control application life and create native browser window
const electron = require('electron')
const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron')

let mainWindow;

//窗口对象
var windowobj;


ipcMain.on("openDevTools",openDevTools);

function createMainWindow(loadpath) {
	//获取屏幕尺寸
	const {
		width,
		height
	} = electron.screen.getPrimaryDisplay().workAreaSize

	windowobj = {
		width: width,
        x:0,
        y:0,
		height: 300,
		maximizable: false,
		minimizable: false,
		resizable: false,
		fullscreenable: false,
		frame: true,
		transparent: true,
		focusable: false,
		hasShadow: false,
		skipTaskbar: true,
		show:false,
		alwaysOnTop: true,
		titleBarStyle: 'xxx',
		webPreferences: {
			devTools: true,
			nodeIntegration: true,
			webSecurity: false,
			enableRemoteModule: true,
      		backgroundThrottling: false
		}
	}

	mainWindow = new BrowserWindow(windowobj);
	mainWindow.loadFile('index.html');
	mainWindow.once("ready-to-show",function(){
		mainWindow.show();
	});
	mainWindow.on('close', function() {
		
	});

	mainWindow.on('closed', function() {
		mainWindow = null;
        app.quit();
	})

	//鼠标可以穿透窗体
	mainWindow.setIgnoreMouseEvents(true)
}

function openDevTools(){
	if(mainWindow)mainWindow.webContents.openDevTools({mode:'detach',activate:true})
}

// 限制只可以打开一个应用, 当运行第二个实例时退出第一个实例
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  //app.quit()
}
app.on('second-instance', (event, commandLine, workingDirectory) => {
    app.quit();
})
// ==========================================================

app.on('ready', function(){
	createMainWindow();
})
app.on('window-all-closed', function() {})
app.on('activate', function() {})
app.on('browser-window-focus', function () {});
app.on('browser-window-blur', function () {});