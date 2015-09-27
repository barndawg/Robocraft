function closeWindow() {
    console.log("Closing window...");
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status === "success") {
            overwolf.windows.close(result.window.id);
        }
    });
}

function clickHandler(e) {
    openWindow("ExitWindow");
    console.log("Opened exit prompt.");
}
function gameNotRunning() {
    alert("Please start Robocraft to use this app!");
    console.log("Robocraft isn't running.");
    //closeWindow();
}
function gameInfoHandler(result){
    console.log("gameInfoHandler called.");
    if (result) {
        console.log(result.title);
        var gamesRunning = (result.title);
        if (gamesRunning === "Robocraft") {
            openWindow("TipsWindow");
        } else {
            gameNotRunning();
        }
    } else {
        gameNotRunning();
    }
}
function openWindow(windowName){
    console.log("Attempting to open window with name: " + windowName);
    overwolf.windows.obtainDeclaredWindow(windowName,
        function(result){
            if (result.status == "success"){
                console.log("Window exists. Opening...");
                overwolf.windows.restore(result.window.id,
                    function(result){}
                );
            } else {
                console.log("Window " + windowName + " doesn't seem to exist");
            }
        }
    );
}

(function init() {
    console.log("Welcome to the Robocraft tips app, by barndawg!");

    // Position window
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
            var xPosStart = screen.width - 55;
            console.log("Screen size: " + screen.width + " * " + screen.height);
            console.log("Starting x position: " + xPosStart);
            overwolf.windows.changePosition(result.window.id, xPosStart, -10);
        }
    });

    // Set up listeners
    console.log("Adding an event listener to the logo...");
    document.getElementById('robocraftLogo').addEventListener('click', clickHandler);

    // Get game info.
    overwolf.games.getRunningGameInfo(gameInfoHandler);
})();
