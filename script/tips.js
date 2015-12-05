function changeTipsText(text) {
  var tipsText = document.getElementById('tipsText');
  tipsText.innerHTML = text;
}

// function onInfoUpdatesHandler(result) {
//   console.log('onInfoUpdates', result);
//   var obj;
//   if (!battleMode) {
//     obj = getInfoObject(result.info, 'usernameListMyTeam');
//     if (obj) {
//       battleMode = 1;
//       console.clear();
//       console.log('Battle mode stuff starts here...');
//       changeTipsText('Welcome to Battle Mode!');
//     }
//   }
//   if (!username) {
//     obj = getInfoObject(result.info, 'username');
//     if (obj) {
//       username = obj.value;
//       changeTipsText('Welcome back, ' + username + '!');
//       console.log('username = ', username);
//     }
//   }
// }

function onInfoUpdatesHandler(result) {
  result.info.forEach(function(info) {
    console.log('onInfoUpdatesHandler:', info);
    if (tips[info.key]) {
      tips[key].call(info);
    }
  });
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

function gameWonHandler(data){
  console.log('gameWonHandler:', data);
  changeTipsText(data);
}

(function init() {
    changeTipsText('Welcome back!');
    // Get gamemode (build / battle)
    overwolf.games.events.onInfoUpdates.addListener(onInfoUpdatesHandler);

    overwolf.games.events.onNewEvents.addListener(onInfoUpdatesHandler);

    overwolf.games.events.onError.addListener(function(result) {
      console.log('onError', result);
    });
})();

var username,
  battleMode;

var tips = {
  'game_won': gameWonHandler,
  'being_spotted': gameWonHandler,
  'player_killed': gameWonHandler,
  'start_getting_healed': gameWonHandler,
  'player_near_death': gameWonHandler,
  'my_base_being_captured': gameWonHandler
};

// var tips = {
//   'game_won': gameWonHandler,
//   'being_spotted': beingSpottedHandler,
//   'player_killed': playerKilledHandler,
//   'start_getting_healed': startGettingHealedHandler,
//   'player_near_death': playerNearDeathHandler,
//   'my_base_being_captured': myBaseBeingCapturedHandler
// };
