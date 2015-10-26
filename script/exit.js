function exitYes() {
    console.log("exitYes called.");
    closeWindow("MainWindow");
}

function exitNo() {
    console.log("exitNo called.");
    closeWindow("ExitWindow");
}

function closeWindow(windowName) {
    overwolf.windows.obtainDeclaredWindow(windowName,
        function(result){
            if (result.status == "success"){
                console.log("Closing window...");
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
            var winWidth = window.innerWidth / 2;
            var winHeight = window.innerHeight / 2;
            var xPosStart = screen.width / 2 - winWidth;
            var yPosStart = screen.height / 2 - winHeight;
            console.log("Screen size: " + screen.width + " * " + screen.height);
            console.log("Starting x + y position: " + xPosStart + ", " + yPosStart);
            overwolf.windows.changePosition(result.window.id, xPosStart, yPosStart);
        }
    });
    // Add event listeners to buttons
    console.log("Adding event listeners....");
    document.getElementById("exitYes").addEventListener("click", exitYes);
    document.getElementById("exitNo").addEventListener("click", exitNo); }) ();
