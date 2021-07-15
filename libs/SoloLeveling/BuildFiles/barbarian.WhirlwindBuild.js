/*
 *    @filename   	barbarian.WhirlwindBuild.js
 *	  @author	  	isid0re
 *    @desc       	Whirlwind build
 *    @credits		ebner20
 */

var finalBuild = {
	caster: false,
	skillstab: 32, // Barbarian Combat
	wantedskills: [126, 151], // Bash, Whirlwind
	usefulskills: [130, 138], // Howl, Shout
	precastSkills: [149], // Battle orders
	mercAuraName: "Might",
	mercAuraWanted: 98,
	mercDiff: 1,
	stats: [
		["vit", 40],
		["str", 60],
		["vit", 100],
		["str", 85],
		["vit", 150],
		["dex", 35],
		["str", 100],
		["vit", 180],
		["str", 125],
		["vit", 205],
		["str", 156],
		["vit", "all"]
	],
	skills: [
		[129, 1, false], //Mace Mastery
		[130, 1, false], //Howl
		[126, 1, false], //Bash
		[138, 1, false], //Shout
		[155, 1, false], //Battle Command
		[151, 1, false], //Whirlwind
		[153, 1, false], //Natural resistance
		[148, 1, false], //Increased Speed
		[145, 1, false], //Iron Skin
		[138, 9, false], //Level shout
		[149, 7, false], //Level Battle orders
		[149, 20, false], //Max Battle orders
		[138, 20, false], //Max Shout
		[151, 10, false], //whirlwind
		[129, 10, false], //Mace Matery
		[153, 10, false], //Natural resistance
		[151, 20, false], //Max whirlwind
		[129, 20, false], //Max Mace Matery
		[153, 16, false], //Natural resistance
		[145, 10, false], //Iron Skin
		[145, 20, false] //Max iron Skin
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[Type] == sword && [flag] == runeword # [ias] >= 30 # [tier] == 100000", //Grief x2 dual weild
		//Helmet
		"[name] == wingedhelm && [quality] == set && [flag] != ethereal # [fhr] >= 30 # [tier] == 100000", // gface
		//belt
		"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100000", //arach's
		//boots
		"[name] == warboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 100000", //gorerider's
		//armor
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [frw] >= 45 # [tier] == 100000", //Enigma
		//gloves
		"[name] == bramblemitts && [quality] == set && [flag] != ethereal # [ias] == 20 # [tier] == 100000", //laying of hands
		//ammy
		"[type] == amulet && [quality] == unique # [lightresist] == 35 # [tier] == 100000", //highlords
		//rings
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000", // ravenfrost
		"[type] == ring && [quality] == unique # [lifeleech] >= 5 && [maxstamina] == 50 # [tier] == 100000", // bul-kathos' wedding band
		//Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [masteriesskilltab] == 1 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == charmscore(item)",
		//Switch
		"([type] == club || [type] == sword || [type] == knife || [type] == throwingknife || [type] == mace) && [quality] == magic # [warcriesskilltab] >= 1 && [secondarymindamage] == 0 # [secondarytier] == 100000 + tierscore(item)",
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	//Fortitude
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000",	//Eth Andy's
	]
};
