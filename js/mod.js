let modInfo = {
	name: "The Empire Building Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("c", 11)) gain=gain.mul(upgradeEffect("c",11))
		if(getBuyableAmount("c",12).gte(1)) gain=gain.mul(buyableEffect("c",12))
	if(getBuyableAmount("c",11).gte(1)) gain=gain.mul(buyableEffect("c",11))
        if(hasUpgrade("c", 21)) gain=gain.mul(upgradeEffect("c",21))
            if(hasMilestone("c",1)) gain=gain.mul(5)
        
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
let isCKeyHeld = false;
let holdInterval = null;

document.addEventListener('keydown', (event) => {
  if (event.key === 'c' || event.key === 'C') {
      // Toggle the isWKeyHeld state
      isCKeyHeld = !isCKeyHeld;
      if (isCKeyHeld) {
          startHoldingC();
      } else {
          stopHoldingC();
      }
      // Synchronize with autowinbutton
      autowinbutton = isCKeyHeld;
      // Save the state in localStorage to keep it consistent after a refresh
      localStorage.setItem('isCKeyHeld', isCKeyHeld);
  }
});

function startHoldingC() {
  // Start a repeating action while "C" is held down
  holdInterval = setInterval(() => {
      if (!isCKeyHeld) {
          clearInterval(holdInterval);
          holdInterval = null;
          return;
      }
      // Perform action while holding down "W"
  }, 1000);
}

function stopHoldingC() {
  // Perform cleanup or final actions
  if (holdInterval) {
      clearInterval(holdInterval);
      holdInterval = null;
  }
}
function pointAdd(){
    player.points=player.points.add(10000000)
    
}
function lifeSpan(){
    
    if(player.c.points.gte(100)) player.c.points=player.c.points.sub(player.c.points.div(1000))
     return player.c.points.div(1000)
        
}
setInterval(lifeSpan,1000);