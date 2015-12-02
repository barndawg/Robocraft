function changeTipsText(text) {
  var tipsText = document.getElementById('tipsText');
  tipsText.innerHTML = text;
}

function onInfoUpdatesHandler(result) {
  console.log('onInfoUpdates', result);
  var obj;
  if (!battleMode) {
    obj = getInfoObject(result.info, 'usernameListMyTeam');
    if (obj) {
      battleMode = 1;
      console.clear();
      console.log('Battle mode stuff starts here...');
      changeTipsText('Welcome to Battle Mode!');
    }
  }
  if (!username) {
    obj = getInfoObject(result.info, 'username');
    if (obj) {
      username = obj.value;
      changeTipsText('Welcome back, ' + username + '!');
      console.log('username = ', username);
    }
  }
}

function getInfoObject(info, key) {
  for (var i = 0, obj; i < info.length; i ++) {
    obj = info[i];
    if (obj.key === key) {
      return obj;
    } else if (obj.name === key) {
      return obj;
    }
  }
  return;
}

(function init() {
    changeTipsText('Welcome back!');
    // Get gamemode (build / battle)
    overwolf.games.events.onInfoUpdates.addListener(onInfoUpdatesHandler);

    overwolf.games.events.onNewEvents.addListener(function(result) {
      console.log('onNewEvents', result);
    });

    overwolf.games.events.onError.addListener(function(result) {
      console.log('onError', result);
    });
})();

var username;
var battleMode;
