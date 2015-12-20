function clickHandler(e) {
  positionWindow();
    var exit = confirm('Are you sure you want to exit?');
    if (exit){
      closeWindow('MainWindow');
    }
  }
  function closeWindow(windowName) {
      overwolf.windows.obtainDeclaredWindow(windowName,
          function(result){
              if (result.status == 'success'){
                  console.log('Closing window...');
                  overwolf.windows.close(result.window.id);
              } else {
                  console.log('Window ' + windowName + ' doesn\'t seem to exist');
              }
          }
      );
      console.log('Closing window...');
      overwolf.windows.getCurrentWindow(function (result) {
          if (result.status === 'success') {
              overwolf.windows.close(result.window.id);
          }
      });
  }
function gameNotRunning() {
    alert('Please start Robocraft to use this app!');
    console.log('Robocraft isn\'t running.');
    closeWindow('MainWindow');
}
function gameInfoHandler(result){
    console.log('gameInfoHandler called.');
    if (result) {
        console.log(result.title);
        var gamesRunning = (result.title);
        if (gamesRunning === 'Robocraft') {
            openWindow('TipsWindow');
        } else {
            gameNotRunning();
        }
    } else {
        gameNotRunning();
    }
}
function openWindow(windowName){
    console.log('Attempting to open window with name: ' + windowName);
    overwolf.windows.obtainDeclaredWindow(windowName,
        function(result){
            if (result.status == 'success'){
                console.log('Window exists. Opening...');
                overwolf.windows.restore(result.window.id,
                    function(result){}
                );
            } else {
                console.log('Window ' + windowName + ' doesn\'t exist');
            }
        }
    );
}

function positionWindow() {
  overwolf.windows.getCurrentWindow(function(result){
    if (result.status=='success'){
      var xPosStart = screen.width - 85;
      overwolf.windows.changePosition(result.window.id, xPosStart, -15);
    }
  });
}

function init() {
    console.log('Welcome to the RoboCraft tips app, by barndawg!');

    // Set up listeners
    console.log('Adding an event listener to the logo...');
    document.getElementById('robocraftLogo').addEventListener('click', clickHandler);

    // Get game info.
    overwolf.games.getRunningGameInfo(gameInfoHandler);

    // Start timed positioning loop, position window
    setInterval(positionWindow, 1000);
    positionWindow();
}

init();
