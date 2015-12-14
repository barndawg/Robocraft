function changeTipsText(text) {
  var tipsText = document.getElementById('tipsText');
  console.log('Changing tips text to:', text);
  tipsText.innerHTML = text;
}

function onInfoUpdatesHandler(result) {
  console.log('onInfoUpdatesHandler:', result);
  var obj;
  if (!username) {
    obj = getInfoObject(result.info, 'username');
    if (obj) {
      username = obj.value;
      changeTipsText('Welcome back, ' + username + '!');
      console.log('username = ', username);
    }
  }
}

function onNewEventsHandler(result) {
  console.log('onNewEventsHandler:', result);
  result.events.forEach(function(event) {
    console.log('onNewEventsHandler:', event);
    if (tips[event.name]) {
      changeTipsText(tips[event.name]);
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
    changeTipsText('Welcome to Robocraft!');

    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=='success'){
            var xPosStart = 0;
            var yPosStart = -screen.height + 100;
            overwolf.windows.changePosition(result.window.id, xPosStart, -10);
        }
    });

    overwolf.games.events.onInfoUpdates.addListener(onInfoUpdatesHandler);

    overwolf.games.events.onNewEvents.addListener(onNewEventsHandler);

    overwolf.games.events.onError.addListener(function(result) {
      console.log('onError', result);
    });
})();

var username,
  battleMode;

var tips = {
  // Misc. event-based tips
  'game_won': 'Good job! Another victory for E-14!',
  'game_lost': 'You\'ve lost this one, but on to victory next time!',
  'being_spotted': 'You have been spotted, so you are visible to enemies from their minimap.',
  'player_killed': 'Ouch! Looks like that hurt...',
  'start_getting_healed': 'You are now being healed. Remember to, if you can, protect your medic.',
  'player_near_death': 'You are near death - you should find a medic, or return to your base.',
  'my_base_being_captured': 'Your base is under attack! You may want to return to defend it.',  
  'enemy_base_under_attack': 'Your team are attacking the enemy base. You might want to join them and help!',
  'battle_left': 'Leaving a battle? You\'ll serve a penalty if you do that lots!',
  'self_destruct': 'Boooom. Next time you might want to get a medic\'s attention.',
  'my_base_near_to_be_captured': 'Your base is almost captured! You should stop the attackers before they win the game.',
  'enemy_base_near_to_be_captured': 'The enemy base is almost captured! Hang in there and you\'ll win this!',
  'you_become_leader': 'You are now the leader! You appear as \'on fire\' to enemies, and you may be a large target.',
  'player_defending_base': 'A team-mate is defending your base. You may want to help them stop the attackers.'
};

// var tips = {
//   'game_won': gameWonHandler,
//   'being_spotted': beingSpottedHandler,
//   'player_killed': playerKilledHandler,
//   'start_getting_healed': startGettingHealedHandler,
//   'player_near_death': playerNearDeathHandler,
//   'my_base_being_captured': myBaseBeingCapturedHandler
// };
