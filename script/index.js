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
    console.log("Robocraft isn't running.");
    //closeWindow();
}
function gameInfoHandler(result){
    console.log("gameInfoHandler called.");
    if (result) {
        console.log(result.title);
        var gamesRunning = (result.title);
        if (gamesRunning === "Robocraft") {
            overwolf.windows.obtainDeclaredWindow("TipsWindow",
                function(result){
                    if (result.status == "success"){
                        overwolf.windows.restore(result.window.id,
                            function(result){}
                        );
                    }
                }
            );
        } else {
            gameNotRunning();
        }
    } else {
        gameNotRunning();
    }
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
