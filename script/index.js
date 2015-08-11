// TODO: see if you can figure out how to get this onto github. Tortoise is a good, free client

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
            //start Robocraft stuff
            alert("Robocraft is running!");
        } else {
            gameNotRunning();
        }
    } else {
        gameNotRunning();
    }
}

// A nice pattern for you - IIFE (immediately invoked function expression)
// Put all your initialisation code in here so it's all nicely corralled.
(function init() {

    // Set up listeners
    document.getElementById('robocraftLogo').addEventListener('click', clickHandler);

    // Get game info.
    overwolf.games.getRunningGameInfo(gameInfoHandler);
})();
