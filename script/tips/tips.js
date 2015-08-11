function gamemodeHandler(result) {
    console.log("gamemodeHandler called.");
    if (result) {
        console.log("In a battle: ", result.gameMode, "on map: ", result.mapKey);
        window.location = "ingame/tips/battle/battle.html";
    } else {
        console.log("In build mode.");
        window.location = "ingame/tips/build.html";
    }
}

(function init() {
    // Get gamemode (build / battle)
    overwolf.games.Robocraft.gameData(gamemodeHandler);
})();
