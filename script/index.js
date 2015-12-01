function closeWindow() {
    console.log('Closing window...');
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status === 'success') {
            overwolf.windows.close(result.window.id);
        }
    });
}

function clickHandler(e) {
    // The following window doesn't work too well, so for now I'll just use a confirm.
    //openWindow('ExitWindow');
    //console.log('Opened exit prompt.');
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
    //closeWindow();
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
                console.log('Window ' + windowName + ' doesn\'t seem to exist');
            }
        }
    );
}

function init() {
    console.log('Welcome to the Robocraft tips app, by barndawg!');

    // Position window
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=='success'){
            var xPosStart = screen.width - 55;
            overwolf.windows.changePosition(result.window.id, xPosStart, -10);
        }
    });

    // Set up listeners
    console.log('Adding an event listener to the logo...');
    document.getElementById('robocraftLogo').addEventListener('click', clickHandler);

    // Get game info.
    overwolf.games.getRunningGameInfo(gameInfoHandler);
}

init();
