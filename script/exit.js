function exitYes() {
    closeWindow("MainWindow");
}

function exitNo() {
    closeWindow("ExitWindow")
}

function closeWindow(windowName) {
    overwolf.windows.obtainDeclaredWindow(windowName,
        function(result){
            if (result.status == "success"){
                console.log("Closing window...")
                overwolf.windows.close(result.window.id);
            } else {
                console.log("Window " + windowName + " doesn't seem to exist");
            }
        }
    );
    console.log("Closing window...");
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status === "success") {
            overwolf.windows.close(result.window.id);
        }
    });
}

(function init() {
    console.log("Exit window opened...");

    // Position window
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
            var xPosStart = screen.width / 2;
            var yPosStart = screen.height / 2;
            console.log("Screen size: " + screen.width + " * " + screen.height);
            console.log("Starting x + y position: " + xPosStart + ", " + yPosStart);
            overwolf.windows.changePosition(result.window.id, xPosStart, yPosStart);
        }
    });

})();
