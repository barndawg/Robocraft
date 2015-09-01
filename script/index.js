function closeWindow() {
    console.log("Closing window...");
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status === "success") {
            overwolf.windows.close(result.window.id);
        }
    });
}

function clickHandler(e) {
    var exit = confirm("Are you sure you want to exit?");
    console.log("Exit = ", exit);
    if (exit) {
        closeWindow();
        console.log("Executed closeWindow()");
    }
}
function gameNotRunning() {
    alert("Robocraft isn't running. To use this app, start Robocraft.");
    //closeWindow();
}
function gameInfoHandler(result){
    console.log("gameInfoHandler called.");
    if (result) {
        console.log(result.title);
        var gamesRunning = (result.title);
        if (gamesRunning === "Robocraft") {
            window.location = "ingame/tips/tips.html";
            alert("Robocraft is running!");
        } else {
            gameNotRunning();
        }
    } else {
        gameNotRunning();
    }
}

(function init() {
    // Position window
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
            var xPosStart = screen.width - 55;
            overwolf.windows.changePosition(result.window.id, xPosStart, -10);
        }
    });

    // Set up listeners
    document.getElementById('robocraftLogo').addEventListener('click', clickHandler);

    // Get game info.
    overwolf.games.getRunningGameInfo(gameInfoHandler);
})();
