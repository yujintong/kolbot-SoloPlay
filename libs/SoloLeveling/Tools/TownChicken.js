/**
*	@filename	TownChicken.js
*	@author		kolton
*	@desc		handle town chicken
*/

js_strict(true);

include("json2.js");
include("NTItemParser.dbl");
include("OOG.js");
include("Gambling.js");
include("CraftingSystem.js");
include("common/Attack.js");
include("common/Cubing.js");
include("common/Config.js");
include("common/CollMap.js");
include("common/Loader.js");
include("common/misc.js");
include("common/util.js");
include("common/Pickit.js");
include("common/Pather.js");
include("common/Precast.js");
include("common/Prototypes.js");
include("common/Runewords.js");
include("common/Storage.js");
include("common/Town.js");

function main() {
	var townCheck = false;

	this.togglePause = function () {
		var i,	script,
			scripts = ["default.dbj", "tools/antihostile.js", "tools/rushthread.js", "tools/CloneKilla.js"];

		for (i = 0; i < scripts.length; i += 1) {
			script = getScript(scripts[i]);

			if (script) {
				if (script.running) {
					if (i === 0) { // default.dbj
						print("ÿc1Pausing.");
					}

					script.pause();
				} else {
					if (i === 0) { // default.dbj
						if (!getScript("tools/clonekilla.js")) { // resume only if clonekilla isn't running
							print("ÿc2Resuming.");
							script.resume();
						}
					} else {
						script.resume();
					}
				}
			}
		}

		return true;
	};

	addEventListener("scriptmsg",
		function (msg) {
			if (msg === "townCheck") {
				switch (me.area) {
				case 120:
					print("Don't tp from Arreat Summit.");

					break;
				case 136:
					print("Can't tp from uber trist.");

					break;
				default:
					townCheck = true;

					break;
				}
			}
		});

	// Init config and attacks
	D2Bot.init();
	Config.init();
	Pickit.init();
	Attack.init();
	Storage.Init();
	CraftingSystem.buildLists();
	Runewords.init();
	Cubing.init();

	let useHowl = me.barbarian && me.getSkill(130, 0);
	let useTerror = me.necromancer && me.getSkill(77, 0);
	let unit;
	/*let canGoToTown = false;
	let book = me.getItem(518);

	if (book.getStat(70) >= 1) {
		canGoToTown = true;
	} else {
		let scroll = me.getItem(529)

		if (scroll) {
			canGoToTown = true;
		}
	}*/

	while (true) {
		if (!me.inTown && (townCheck ||
			(Config.TownHP > 0 && me.hp < Math.floor(me.hpmax * Config.TownHP / 100)) ||
			(Config.TownMP > 0 && me.mp < Math.floor(me.mpmax * Config.TownMP / 100)))) {
			this.togglePause();

			while (!me.gameReady) {
				delay(100);
			}

			if (me.dead) {
				break;
			}

			try {
				me.overhead("Going to town");
				print("Going to town");
				unit = getUnit(1);
				
				if ([156, 211, 242, 243, 544, 571].indexOf(unit.classid) === -1) {
					if (useHowl && Skill.getManaCost(130) < me.mp) {
						Skill.cast(130, 0);
					}

					if (useTerror && Skill.getManaCost(77) < me.mp) {
						Skill.cast(77, 0);
					}
				}
				
				Town.visitTown();
			} catch (e) {
				Misc.errorReport(e, "TownChicken.js");
				scriptBroadcast("quit");

				return;
			} finally {
				this.togglePause();

				townCheck = false;
			}
		}

		delay(50);
	}
}