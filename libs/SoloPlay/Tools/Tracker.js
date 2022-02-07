/*
*	@filename	Tracker.js
*	@author		isid0re, theBGuy
*	@desc		Track bot game performance and send to CSV file
*/

if (!isIncluded("SoloPlay/Tools/Developer.js")) { include("SoloPlay/Tools/Developer.js"); }
if (!isIncluded("SoloPlay/Functions/PrototypesOverrides.js")) { include("SoloPlay/Functions/PrototypesOverrides.js"); }
if (!isIncluded("SoloPlay/Functions/MiscOverrides.js")) { include("SoloPlay/Functions/MiscOverrides.js"); }

const Tracker = {
	GTPath: "libs/SoloPlay/Data/" + me.profile + "/" + me.profile + "-GameTime.json",
	LPPath: "libs/SoloPlay/Data/" + me.profile + "/" + me.profile + "-LevelingPerformance.csv",
	SPPath: "libs/SoloPlay/Data/" + me.profile + "/" + me.profile + "-ScriptPerformance.csv",
	default: {
		"Total": 0,
		"InGame": 0,
		"OOG": 0,
		"LastLevel": 0,
		"LastSave": 0
	},

	initialize: function () {
		// File Structure
		let LPHeader = "Total Time,InGame Time,Split Time,Area,Character Level,Gained EXP,Gained EXP/Minute,Difficulty,Fire Resist,Cold Resist,Light Resist,Poison Resist,Current Build" + "\n"; //Leveling Performance
		let SPHeader = "Total Time,InGame Time,Sequence Time,Sequence,Character Level,Gained EXP,Gained EXP/Minute,Difficulty,Fire Resist,Cold Resist,Light Resist,Poison Resist,Current Build" + "\n"; //Script Performance
		let GameTracker = Object.assign({}, this.default);
		GameTracker.LastLevel = me.gamestarttime;
		GameTracker.LastSave = getTickCount();

		// Create Files
		if (!FileTools.exists("libs/SoloPlay/Data/" + me.profile)) {
			folder = dopen("libs/SoloPlay/Data");
			folder.create(me.profile);
		}

		!FileTools.exists(this.GTPath) && Developer.writeObj(GameTracker, this.GTPath);
		!FileTools.exists(this.LPPath) && Misc.fileAction(this.LPPath, 1, LPHeader);
		!FileTools.exists(this.SPPath) && Misc.fileAction(this.SPPath, 1, SPHeader);
		
		return true;
	},

	checkValidity: function () {
		let GameTracker = Developer.readObj(this.GTPath);
		let found = false;
		GameTracker && Object.keys(GameTracker).forEach(function (key) {
			if (GameTracker[key] < 0) {
				console.debug("Negative value found");
				GameTracker[key] = 0;
				found = true;
			}
		});
		found && Developer.writeObj(GameTracker, this.GTPath);
	},

	logLeveling: function (obj) {
		if (typeof obj === "object" && obj.hasOwnProperty("event") && obj["event"] === "level up") {
			Tracker.leveling();
		}
	},

	script: function (starttime, subscript, startexp) {
		let GameTracker = Developer.readObj(Tracker.GTPath);
		
		// this seems to happen when my pc restarts so set last save equal to current tick count and then continue
		GameTracker.LastSave > getTickCount() && (GameTracker.LastSave = getTickCount());

		let totalTick = GameTracker.LastSave > 0 ? GameTracker.LastSave : 0;
		let newTick = me.gamestarttime >= GameTracker.LastSave ? me.gamestarttime : GameTracker.LastSave;
		let newIG = GameTracker.InGame + Developer.Timer(newTick);
		let newTotal = GameTracker.Total + Developer.Timer(totalTick);
		let scriptTime = Developer.Timer(starttime);
		let diffString = sdk.difficulty.nameOf(me.diff);
		let gainAMT = me.getStat(13) - startexp;
		let gainTime = gainAMT / (scriptTime / 60000);
		let currentBuild = SetUp.currentBuild;
		let FR = me.getStat(39);
		let CR = me.getStat(43);
		let LR = me.getStat(41);
		let PR = me.getStat(45);
		let string = Developer.formatTime(newTotal) + "," + Developer.formatTime(newIG) + "," + Developer.formatTime(scriptTime) + "," + subscript + "," + me.charlvl + "," + gainAMT + "," + gainTime + "," + diffString + "," + FR + "," + CR + "," + LR + "," + PR + "," + currentBuild + "\n";

		GameTracker.Total = newTotal;
		GameTracker.InGame = newIG;
		GameTracker.LastSave = getTickCount();
		Developer.writeObj(GameTracker, Tracker.GTPath);
		Misc.fileAction(Tracker.SPPath, 2, string);
		
		return true;
	},

	leveling: function () {
		let GameTracker = Developer.readObj(this.GTPath);

		// this seems to happen when my pc restarts so set last save equal to current tick count and then continue
		GameTracker.LastSave > getTickCount() && (GameTracker.LastSave = getTickCount());

		let totalTick = GameTracker.LastSave > 0 ? GameTracker.LastSave : 0;
		let newTick = me.gamestarttime > GameTracker.LastSave ? me.gamestarttime : GameTracker.LastSave;
		let newIG = GameTracker.InGame + Developer.Timer(newTick);
		let newTotal = GameTracker.Total + Developer.Timer(totalTick);
		let newOOG = newTotal - newIG;
		let splitTime = Developer.Timer(GameTracker.LastLevel);
		let diffString = sdk.difficulty.nameOf(me.diff);
		let areaName = Pather.getAreaName(me.area);
		let currentBuild = SetUp.currentBuild;
		let newSave = getTickCount();
		let gainAMT = me.getStat(13) - Experience.totalExp[me.charlvl - 1];
		let gainTime = gainAMT / (splitTime / 60000);
		let FR = me.getStat(39);
		let CR = me.getStat(43);
		let LR = me.getStat(41);
		let PR = me.getStat(45);
		let string = Developer.formatTime(newTotal) + "," + Developer.formatTime(newIG) + "," + Developer.formatTime(splitTime) + "," + areaName + "," + me.charlvl + "," + gainAMT + "," + gainTime + "," + diffString + "," + FR + "," + CR + "," + LR + "," + PR + "," + currentBuild + "\n";

		GameTracker.Total = newTotal;
		GameTracker.InGame = newIG;
		GameTracker.OOG = newOOG;
		GameTracker.LastLevel = newSave;
		GameTracker.LastSave = newSave;
		Developer.writeObj(GameTracker, Tracker.GTPath);
		Misc.fileAction(Tracker.LPPath, 2, string);
		
		return true;
	},

	update: function () {
		let heartBeat = getScript("tools/heartbeat.js");
		if (!heartBeat) {
			console.debug("Couldn't find heartbeat");
			return false;
		}
		if (!me.ingame) {
			console.debug("Not in game");
			return false;
		}

		let GameTracker = Developer.readObj(this.GTPath);
		
		// this seems to happen when my pc restarts so set last save equal to current tick count and then continue
		GameTracker.LastSave > getTickCount() && (GameTracker.LastSave = getTickCount());

		let totalTick = GameTracker.LastSave > 0 ? GameTracker.LastSave : 0;
		let newTick = me.gamestarttime > GameTracker.LastSave ? me.gamestarttime : GameTracker.LastSave;
		let newIG = GameTracker.InGame + Developer.Timer(newTick);
		let newTotal = GameTracker.Total + Developer.Timer(totalTick);
		let newOOG = newTotal - newIG;

		GameTracker.Total = newTotal;
		GameTracker.InGame = newIG;
		GameTracker.OOG = newOOG;
		GameTracker.LastSave = getTickCount();
		Developer.writeObj(GameTracker, Tracker.GTPath);
		
		return true;
	}
};

if (getScript(true).name.toString() === 'default.dbj') {
    const Worker = require('../../modules/Worker');

    var timer = getTickCount();
    Worker.runInBackground.intervalUpdate = function () {
        if (getTickCount() - timer < 3 * 60000) return true;
        timer = getTickCount();
        try {
            Tracker.update();
        } catch (e) {
            console.error(e.message);
        }

        return true;
    };
}
