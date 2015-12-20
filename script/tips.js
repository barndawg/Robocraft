function changeTipsText(text) {
  var tipsText = document.getElementById('tipsText');
  text = text.toUpperCase();
  console.log('Changing tips text to:', text);
  tipsText.innerHTML = text;
}

function onInfoUpdatesHandler(result) {
  //console.log('onInfoUpdatesHandler:', result);
  var obj;
  if (!battleMode) {
    obj = getInfoObject(result.info, 'usernameListMyTeam');
    if (obj) {
        battleMode = true;
        changeTipsText('Welcome to Battle Mode!');
      }
  } else {
    obj = getInfoObject(result.info, 'softCurrency');
    if (obj) {
      battleMode = false;
      var message = 'Back in the Mothership!';
      changeTipsText(message);
    }
  }
  if (!username) {
    obj = getInfoObject(result.info, 'username');
    if (obj) {
      username = obj.value;
      changeTipsText('Welcome back, ' + username + '!');
      console.log('username = ', username);
      localStorage.setItem('RCTipsApp-Username', username);
    }
  }
}

function onNewEventsHandler(result) {
  //console.log('onNewEventsHandler:', result);
  result.events.forEach(function(event) {
    //console.log('onNewEventsHandler:', event);
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

function miscTips() {
  var randTip;
  if (battleMode) {
    randTip = Math.floor(Math.random() * miscBattleTips.length);
    changeTipsText(miscBattleTips[randTip]);
  } else {
    randTip = Math.floor(Math.random() * miscBuildTips.length);
    changeTipsText(miscBuildTips[randTip]);
  }
}

function positionWindow() {
  overwolf.windows.getCurrentWindow(function(result){
      if (result.status=='success'){
          overwolf.windows.changePosition(result.window.id, -15, -25);
      }
  });
}

function init() {

    // Change tips text
    prevUsername = localStorage.getItem('RCTipsApp-Username');
    if (prevUsername) {
      var welcomeMessage = 'Welcome back, ' + prevUsername + '!';
      changeTipsText(welcomeMessage);
    } else {
      changeTipsText('Welcome back to Robocraft!');
    }

    // Start timed positioning loop, position window
    setInterval(positionWindow, 1000);
    positionWindow();

    // Add listeners
    overwolf.games.events.onInfoUpdates.addListener(onInfoUpdatesHandler);
    overwolf.games.events.onNewEvents.addListener(onNewEventsHandler);
    document.getElementById('tipsText').addEventListener('click', positionWindow);

    // Start miscellanious tips loop, set interval of 15 seconds for the function
    setInterval(miscTips, 15000);
    miscTips();
}

// Set variables: username var + tips
var username, battleMode;

var tips = {
  'game_won': 'Good job! Another victory for E-14!',
  'game_lost': 'You\'ve lost this one, but on to victory next time!',
  'being_spotted': 'You have been spotted, so you are visible to enemies from their minimap.',
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

var miscBuildTips = [
  // Lots of these were taken from http://robocraft.gamepedia.com/Design_Strategy
  'Don\'t connect important parts of your robot only by thin \'sticks\'.',
  'A good robot should have 6 or more weapons.',
  'Armor the areas around important functional components like guns.',
  'Press the middle mouse button to select a block from your robot.',
  'Electroplates are a great way to add additional armor points to a build.',
  'Armored Cubes have a greater amount of armor per CPU than Electroplates',
  'You are going to take damage. Build with this in mind.',
  'Whenever possible, regardless of armor strategy, place your hardware and special cubes as far away from each other as possible.',
  'Each weapon has strengths and weaknesses, none are overpowered or weak by nature.',
  'Press [M] to activate \'Mirror Mode\'.',
  'You can charge up to 6 rails, and fire up to 6 plasma cannons at once.',
  'The fire rate of SMGs does not increase after 6 guns are on your robot.',
  'Build stable & compact!',
  'The bigger your robot, the bigger a target it will be in a battle.',
  'Tank treads are excellent for making large, well-armored battle tanks',
  'Rotors give stable flight at any height!',
  'You can stack multiple Radar Jammers together for additional strength',
  'When buying cubes from the store, you can hold down [CTRL] to choose 10 blocks at a time for fast purchasing.',
  'Thrusters should be placed at the same level as your center of mass.',
  'Wheels carry a lot of load more easily while hoverblades offer higher mobility.',
  'Each weapon requires a different way of aiming.',
  'Test your vehicle when you make changes to it!',
  'Press [ and ] to move the line of symmetry.'
];

var miscBattleTips = [
  'Press \'F\' to flip your robot over if it is upside-down or stuck.',
  'To place a \'ping\' on the map, hold [CTRL] and click on the point you want to ping on the minimap.',
  'When attacking an enemy, try to aim for their weapons so you have a better chance of killing them.',
  'If you \'bust fire\' an SMG, your accuracy will be much higher.',
  'When an enemy is in your crosshairs, press [Q] to spot them.',
  'Don\'t go solo. Stay with the team, and don\'t go for a \'suicide rush\' - it doesn\'t help anyone.',
  'In battle arena, you can destroy Protonium crystals more quickly by aiming for the connection points.',
  'When you kill someone in The Pit, you will be brought back to full health.',
  'The leader in The Pit is displayed as \'on fire\'.',
  'On the ice maps, stay off the ice unless you are a hover! You will lose control of your robot.',
  'Most hovercraft can scale hills if you move forward slowly without deviation and continue to hold your lift key.'
];

init();
