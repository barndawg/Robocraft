function gamemodeHandler(result) {
    console.log("gamemodeHandler called.");
    if (result) {
        console.log(result.gameMode);
        console.log(result.mapKey);
        // Launch Battle Mode tips
    } else {
        console.log("In build mode.");
        // Launch Build Mode tips
    }
}

(function init() {

    // Set up listeners
    document.getElementById('robocraftLogo').addEventListener('click', clickHandler);

    // Get gamemode (build / battle)
    overwolf.games.Robocraft.gameData(gamemodeHandler);
})();
