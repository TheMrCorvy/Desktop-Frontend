const { app, BrowserWindow } = require("electron")

const isDev = require("electron-is-dev")

require("@electron/remote/main").initialize()

function createWindow() {
	// Create the browser window.
	let mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			/* devTools: true, */
		},
	})

	mainWindow.loadURL(isDev ? "http://localhost:3000" : "https://desktop.pasunashi.xyz")

	/* mainWindow.webContents.openDevTools() */

	// Automatically open the DevTools on start.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on("closed", function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null

		app.quit()
	})
}

app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	// if (process.platform !== "darwin") {
	// 	app.quit()
	// }
	app.quit()
})

app.on("activate", function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
