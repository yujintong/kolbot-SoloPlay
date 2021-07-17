/*
*	@filename	Barbarian.SoloLeveling.js
*	@author		isid0re
*	@desc		Config Settings for SoloLeveling Barbarian
*
*	FinalBuild choices
*		To select your finalbuild.
*		1. Go into the D2BS console manager.
*		2. Select the Bots profile
*		3. In the info tag box enter one of the following choices:
*			Whirlwind
*           Singer
*		4. Save the profile and start
*/

function LoadConfig () {
	if (!isIncluded("common/Storage.js")) {
		include("common/Storage.js");
	}

	if (!isIncluded("common/Misc.js")) {
		include("common/Misc.js");
	}

	if (!isIncluded("NTItemParser.dbl")) {
		include("NTItemParser.dbl");
	}

	if (!isIncluded("SoloLeveling/Functions/Globals.js")) {
		include("SoloLeveling/Functions/Globals.js");
	}

	SetUp.include();

	/* Script */
	Scripts.UserAddon = false;
	Scripts.SoloLeveling = true;

	/* General configuration. */
	Config.MinGameTime = 400;
	Config.MaxGameTime = 7200;
	Config.MiniShopBot = true;
	Config.PacketShopping = true;
	Config.TownCheck = me.findItem("tbk", 0, 3);
	Config.LogExperience = false;
	Config.PingQuit = [{Ping: 600, Duration: 10}];
	Config.Silence = true;
	Config.OpenChests = me.hell ? 2 : true;
	Config.LowGold = me.normal ? 25000 : me.nightmare ? 50000 : 100000;
	Config.PrimarySlot = 0;
	Config.PacketCasting = 1;
	Config.WaypointMenu = true;
	Config.Cubing = !me.classic ? me.getItem(549) : false;
	Config.MakeRunewords = !me.classic ? true : false;

	/* General logging. */
	Config.ItemInfo = false;
	Config.LogKeys = false;
	Config.LogOrgans = false;
	Config.LogMiddleRunes = true;
	Config.LogHighRunes = true;
	Config.ShowCubingInfo = true;

	/* Town configuration. */
	Config.HealHP = 99;
	Config.HealMP = 99;
	Config.HealStatus = true;
	Config.UseMerc = true;
	Config.MercWatch = true;
	Config.StashGold = me.charlvl * 100;
	Config.ClearInvOnStart = false;

	/* Chicken configuration. */
	Config.LifeChicken = me.playertype ? 60 : 10;
	Config.ManaChicken = 0;
	Config.MercChicken = 0;
	Config.TownHP = me.playertype ? 0 : Config.TownCheck ? 35 : 0;
	Config.TownMP = 0;

	/* Potions configuration. */
	Config.UseHP = me.playertype ? 90 : 75;
	Config.UseRejuvHP = me.playertype ? 65 : 40;
	Config.UseMP = me.playertype ? 75 : 55;
	Config.UseMercHP = 75;

	/* Belt configuration. */
	Config.BeltColumn = ["hp", "mp", "mp", "rv"];
	Config.MinColumn[0] = Config.BeltColumn[0] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
	Config.MinColumn[1] = Config.BeltColumn[1] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
	Config.MinColumn[2] = Config.BeltColumn[2] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
	Config.MinColumn[3] = Config.BeltColumn[3] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;

	/* Inventory buffers and lock configuration. */
	Config.HPBuffer = 0;
	Config.MPBuffer = 0;
	Config.RejuvBuffer = 4;
	Config.Inventory[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[3] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	/* Pickit configuration. */
	Config.PickRange = 40;
	Config.FastPick = false;
	Config.CainID.Enable = false;
	Config.FieldID = false;
	//	Config.PickitFiles.push("kolton.nip");
	//	Config.PickitFiles.push("LLD.nip");

	/* Gambling configuration. */
	Config.Gamble = true;
	Config.GambleGoldStart = 1250000;
	Config.GambleGoldStop = 750000;
	Config.GambleItems.push("Amulet");
	Config.GambleItems.push("Ring");

	/* AutoMule configuration. */
	Config.AutoMule.Trigger = [];
	Config.AutoMule.Force = [];
	Config.AutoMule.Exclude = [
		"[name] >= elrune && [name] <= lemrune",
		"[Name] == Mephisto'sSoulstone",
		"[Name] == HellForgeHammer",
		"[Name] == ScrollOfInifuss",
		"[Name] == KeyToTheCairnStones",
		"[name] == BookOfSkill",
		"[Name] == HoradricCube",
		"[Name] == ShaftOfTheHoradricStaff",
		"[Name] == TopOfTheHoradricStaff",
		"[Name] == HoradricStaff",
		"[Name] == ajadefigurine",
		"[Name] == TheGoldenBird",
		"[Name] == potionoflife",
		"[Name] == lamesen'stome",
		"[Name] == Khalim'sEye",
		"[Name] == Khalim'sHeart",
		"[Name] == Khalim'sBrain",
		"[Name] == Khalim'sFlail",
		"[Name] == Khalim'sWill",
		"[Name] == ScrollofResistance",
	];

	/* AutoEquip configuration. */
	Config.AutoEquip = true;

	var levelingTiers = [ // autoequip setup
		//weapon
		"[Type] == Sword && ([Quality] >= Magic || [flag] == runeword) && [flag] != ethereal && [wsm] <= 0 # [secondarymindamage] == 0 && [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//Helmet
		"([type] == helm || [type] == primalhelm) && ([Quality] >= Magic || [flag] == runeword) && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//belt
		"[type] == belt && [Quality] >= Magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//boots
		"[Type] == Boots && [Quality] >= Magic && [Flag] != Ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//armor
		"[type] == armor && ([Quality] >= Magic || [flag] == runeword) && [Flag] != Ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//gloves
		"[Type] == Gloves && [Quality] >= Magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//ammy
		"[Type] == Amulet && [Quality] >= Magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//rings
		"[Type] == Ring && [Quality] >= Magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//Charms
		"[name] == smallcharm && [quality] == magic # # [invoquantity] == 8 && [charmtier] == charmscore(item)",
		//Special Charms
		"[name] == smallcharm && [quality] == unique # [itemallskills] == 1 # [charmtier] == 100000",
		"[name] == largecharm && [quality] == unique # [itemaddclassskills] == 3 # [charmtier] == 100000",
		"[name] == grandcharm && [quality] == unique # [itemmagicbonus] >= 30 || [itemgoldbonus] >= 150 # [charmtier] == 100000",
		//merc
		"([type] == circlet || [type] == helm) && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
		"[Type] == armor && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
		"me.charlvl > 14 && [Type] == Polearm && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
	];
	NTIP.arrayLooping(levelingTiers);

	var imbueables = [
		"me.diff == 0 && [name] == avengerguard && [quality] >= normal && [quality] <= superior && [flag] != ethereal # # [MaxQuantity] == 1",
		"me.diff == 1 && [name] == slayerguard && [quality] >= normal && [quality] <= superior && [flag] != ethereal # # [MaxQuantity] == 1",
		"me.diff == 2 && [name] == carnagehelm && [quality] >= normal && [quality] <= superior && [flag] != ethereal # # [MaxQuantity] == 1",
	];

	if (!me.getQuest(3, 0)) {
		NTIP.arrayLooping(imbueables);
	}

	/* FastMod configuration. */
	Config.FCR = 255;
	Config.FHR = 255;
	Config.FBR = 255;
	Config.IAS = me.realm ? 0 : 255;

	/* Attack configuration. */
	Config.AttackSkill = [-1, 0, 0, 0, 0];
	Config.LowManaSkill = [0, -1];
	Config.MaxAttackCount = 1000;
	Config.BossPriority = me.normal ? true : false;
	Config.ClearType = 0;
	Config.ClearPath = {
		Range: 30,
		Spectype: 0xF,
	};

	/* Monster skip configuration. */
	Config.SkipException = [];
	Config.SkipEnchant = [];
	Config.SkipAura = [];

	/* Shrine scan configuration. */
	Config.ScanShrines = [15, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];

	/* AutoStat configuration. */
	Config.AutoStat.Enabled = true;
	Config.AutoStat.Save = 0;
	Config.AutoStat.BlockChance = 57;
	Config.AutoStat.UseBulk = true;
	Config.AutoStat.Build = SetUp.specPush("stats");

	/* AutoSkill configuration. */
	Config.AutoSkill.Enabled = true;
	Config.AutoSkill.Save = 0;
	Config.AutoSkill.Build = SetUp.specPush("skills");

	/* AutoBuild configuration. */
	Config.AutoBuild.Enabled = true;
	Config.AutoBuild.Verbose = false;
	Config.AutoBuild.DebugMode = false;
	Config.AutoBuild.Template = SetUp.getBuild();

	// Class specific config
	Config.FindItem = false; // Use Find Item skill on corpses after clearing.
	Config.FindItemSwitch = false; // Switch to non-primary slot when using Find Item skills

	/* LOD gear */
	if (!me.classic) {
		let finalGear = Check.finalBuild().finalGear;
		NTIP.arrayLooping(finalGear);

		switch (SetUp.finalBuild) { // finalbuilld autoequip setup
		case 'Whirlwind':
			if (!Check.haveItem("sword", "runeword", "Grief")) {
				var Grief = [
					"[Name] == EthRune # # [MaxQuantity] == 1",
					"[Name] == TirRune # # [MaxQuantity] == 1",
					"[Name] == LoRune",
					"[Name] == MalRune",
					"[Name] == RalRune # # [MaxQuantity] == 1",
					"[Name] == PhaseBlade && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 5 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(Grief);

				Config.Runewords.push([Runeword.Grief, "Phase Blade"]);
				Config.KeepRunewords.push("[Type] == sword # [ias] >= 30");
			}

			break;
		case 'Singer':
			if (!Check.haveItem("mace", "runeword", "Heart of the Oak")) {
				var HotO = [
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == PulRune",
					"[Name] == KoRune # # [MaxQuantity] == 1",
					"[Name] == VexRune",
				];
				NTIP.arrayLooping(HotO);

				if (me.getItem(635)) {
					NTIP.addLine("([Name] == Flail || [Name] == Knout) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");
				}

				if (!me.getItem(635)) {
					Config.Recipes.push([Recipe.Rune, "Um Rune"]);
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]);
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]);
				}

				Config.Runewords.push([Runeword.HeartoftheOak, "Knout"]);
				Config.Runewords.push([Runeword.HeartoftheOak, "Flail"]);
				Config.KeepRunewords.push("[Type] == mace # [FCR] == 40");
			}

			break;
		default:
			break;
		}

		if (!Check.haveItem("armor", "runeword", "Enigma")) { // Enigma
			var Enigma = [
				"[Name] == JahRune",
				"[Name] == IthRune # # [MaxQuantity] == 1",
				"[Name] == BerRune",
			];
			NTIP.arrayLooping(Enigma);

			if (!me.getItem(639)) {
				Config.Recipes.push([Recipe.Rune, "Sur Rune"]); // sur to ber
			}

			if (!me.getItem(640)) {
				Config.Recipes.push([Recipe.Rune, "Ber Rune"]); // ber to jah
			}

			if (me.getItem(639) && me.getItem(640)) {
				Config.Runewords.push([Runeword.Enigma, "Mage Plate", Roll.NonEth]);
				Config.Runewords.push([Runeword.Enigma, "DuskShroud", Roll.NonEth]);
				Config.Runewords.push([Runeword.Enigma, "WyrmHide", Roll.NonEth]);
				Config.Runewords.push([Runeword.Enigma, "ScarabHusk", Roll.NonEth]);

				NTIP.addLine("([Name] == MagePlate || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
			} else {
				NTIP.addLine("([Name] == MagePlate || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Flag] != Ethereal && [Quality] == Superior # [enhanceddefense] >= 10 && [Sockets] == 3 # [MaxQuantity] == 1");
			}

			Config.KeepRunewords.push("[type] == armor # [frw] >= 45");
		}

		if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(4).tier < 3600) { // Merc Insight
			var Insight = [
				"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1",
				"!me.hell && ([Name] == voulge || [Name] == scythe || [Name] == poleaxe || [Name] == halberd || [Name] == warscythe || [Name] == bill || [Name] == battlescythe || [Name] == partizan || [Name] == grimscythe) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
				"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Insight);

			if (!me.hell && Item.getEquippedItemMerc(4).prefixnum !== 20568 && !Check.haveBase("polearm", 4)) {
				NTIP.addLine("[Name] == voulge && [flag] != ethereal && [Quality] == Normal && [Level] >= 26 && [Level] <= 40 # [Sockets] == 0 # [MaxQuantity] == 1");
			}

			Config.Recipes.push([Recipe.Socket.Weapon, "Giant Thresher"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "thresher"]);

			Config.Runewords.push([Runeword.Insight, "Giant Thresher"]);
			Config.Runewords.push([Runeword.Insight, "Great Poleaxe"]);
			Config.Runewords.push([Runeword.Insight, "Cryptic Axe"]);
			Config.Runewords.push([Runeword.Insight, "Thresher"]);
			Config.Runewords.push([Runeword.Insight, "Grim Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Partizan"]);
			Config.Runewords.push([Runeword.Insight, "Battle Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Bill"]);
			Config.Runewords.push([Runeword.Insight, "War Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Halberd"]);
			Config.Runewords.push([Runeword.Insight, "Poleaxe"]);
			Config.Runewords.push([Runeword.Insight, "Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Voulge"]);

			Config.KeepRunewords.push("[type] == polearm # [meditationaura] >= 12");
		}

		if (Item.getEquippedItem(4).tier < 1200) {	//Lawbringer - Amn/Lem/Ko
			var Lawbringer = [
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == LemRune",
				"[Name] == KoRune",
				"[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 0 && [strreq] <= 150 # [secondarymindamage] == 0 && [Sockets] == 3",
			];
			NTIP.arrayLooping(Lawbringer);

			if (!me.getItem(627)) {		// Ko Rune
				Config.Recipes.push([Recipe.Rune, "Hel Rune"]);	//Hel -> Io
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);	//Io -> Lum
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);	//Lum -> Ko			
			}

			if (!me.getItem(629)) {		// Lem Rune
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ko Rune"]);
				Config.Recipes.push([Recipe.Rune, "Fal Rune"]);
			}

			Config.Runewords.push([Runeword.Lawbringer, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.Lawbringer, "Battle Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Rune Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Conquest Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Cryptic Sword"]);
			Config.Runewords.push([Runeword.Lawbringer, "Phase Blade"]);

			Config.KeepRunewords.push("[type] == sword # [sanctuaryaura] >= 16");
		}

		if (Item.getEquippedItem(4).tier < 1200) {	//Voice Of Reason - Lem/Ko/El/Eld
			var VoiceofReason = [
				"[Name] == LemRune",
				"[Name] == KoRune",
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == EldRune # # [MaxQuantity] == 1",
				"[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 0 && [strreq] <= 150 # [secondarymindamage] == 0 && [Sockets] == 4",
			];
			NTIP.arrayLooping(VoiceofReason);

			if (!me.getItem(627)) {		// Ko Rune
				Config.Recipes.push([Recipe.Rune, "Hel Rune"]);	//Hel -> Io
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);	//Io -> Lum
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);	//Lum -> Ko			
			}

			if (!me.getItem(629)) {		// Lem Rune
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ko Rune"]);
				Config.Recipes.push([Recipe.Rune, "Fal Rune"]);
			}

			Config.Runewords.push([Runeword.VoiceofReason, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Battle Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Rune Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Conquest Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Cryptic Sword"]);
			Config.Runewords.push([Runeword.VoiceofReason, "Phase Blade"]);

			Config.KeepRunewords.push("[type] == sword # [passivecoldpierce] >= 24");
		}

		if (Item.getEquippedItem(4).tier < 1000) {	//Honor - Amn/El/Ith/Tir/Sol
			var Honor = [
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == IthRune # # [MaxQuantity] == 1",
				"[Name] == TirRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 0 && [strreq] <= 150 # [secondarymindamage] == 0 && [Sockets] == 5",
			];
			NTIP.arrayLooping(Honor);

			Config.Runewords.push([Runeword.Honor, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.Honor, "Phase Blade"]);

			Config.KeepRunewords.push("[type] == sword # [enhanceddamage] >= 160 && [tohit] >= 250 && [itemallskills] >= 1");
		}

		if (Item.getEquippedItem(1).tier < 100000) { // Lore
			if (!Check.haveItem("helm", "runeword", "Lore")) {
				var loreRunes = [
					"[Name] == OrtRune # # [MaxQuantity] == 1",
					"[Name] == SolRune # # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(loreRunes);

				Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
				Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
			}

			var loreHelm = [
				"!me.hell && ([Name] == Crown || [Name] == BoneHelm || [Name] == FullHelm) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
				"([Name] == Casque || [Name] == Sallet || [Name] == DeathMask || [Name] == GrimHelm) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
				"[type] == primalhelm && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior && [strreq] <= 150 # [Sockets] == 2",
				"[type] == primalhelm && [Quality] == Normal && [strreq] <= 150 # ([barbarianskills]+[barbcombatskilltab]+[skillbattleorders]+[skillfrenzy]+[skilldoubleswing]+[skillnaturalresistance]) >= 1 && [Sockets] == 0",
			];
			NTIP.arrayLooping(loreHelm);

			Config.Runewords.push([Runeword.Lore, "Jawbone Cap"]);
			Config.Runewords.push([Runeword.Lore, "Fanged Helm"]);
			Config.Runewords.push([Runeword.Lore, "Horned Helm"]);
			Config.Runewords.push([Runeword.Lore, "Assault Helmet"]);
			Config.Runewords.push([Runeword.Lore, "Avenger Guard"]);
			Config.Runewords.push([Runeword.Lore, "Jawbone Visor"]);
			Config.Runewords.push([Runeword.Lore, "Lion Helm"]);
			Config.Runewords.push([Runeword.Lore, "Rage Mask"]);
			Config.Runewords.push([Runeword.Lore, "Savage Helmet"]);
			Config.Runewords.push([Runeword.Lore, "Slayer Guard"]);
			Config.Runewords.push([Runeword.Lore, "Carnage Helm"]);
			Config.Runewords.push([Runeword.Lore, "Fury Visor"]);

			Config.Recipes.push([Recipe.Socket.Helm, "Jawbone Cap"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Fanged Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Horned Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Assault Helmet"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Avenger Guard"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Jawbone Visor"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Lion Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Rage Mask"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Savage Helmet"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Slayer Guard"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Carnage Helm"]);
			Config.Recipes.push([Recipe.Socket.Helm, "Fury Visor"]);

			Config.Runewords.push([Runeword.Lore, "Grim Helm"]);
			Config.Runewords.push([Runeword.Lore, "Bone Helm"]);
			Config.Runewords.push([Runeword.Lore, "Sallet"]);
			Config.Runewords.push([Runeword.Lore, "Casque"]);
			Config.Runewords.push([Runeword.Lore, "Death Mask"]);
			Config.Runewords.push([Runeword.Lore, "Full Helm"]);
			Config.KeepRunewords.push("([type] == circlet || [type] == helm || [type] == primalhelm) # [LightResist] >= 25");
		}

		if (Item.getEquippedItemMerc(3).prefixnum !== 20547) { // Merc Fortitude
			var fort = [
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"[Name] == DolRune # # [MaxQuantity] == 1",
				"[Name] == LoRune",
				"([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Defense] >= 1000 && [Sockets] == 4 # [MaxQuantity] == 1",
				"([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Defense] >= 700 && [Sockets] == 0 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(fort);

			Config.Recipes.push([Recipe.Socket.Armor, "Hellforge Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Kraken Shell"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Balrog Skin"]);
			Config.Recipes.push([Recipe.Socket.Armor, "BoneWeave"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Great Hauberk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Loricated Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Diamond Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Wire Fleece"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Scarab Husk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud"]);

			Config.Runewords.push([Runeword.Fortitude, "Breast Plate"]);
			Config.Runewords.push([Runeword.Fortitude, "Mage Plate"]);
			Config.Runewords.push([Runeword.Fortitude, "Hellforge Plate"]);
			Config.Runewords.push([Runeword.Fortitude, "Kraken Shell"]);
			Config.Runewords.push([Runeword.Fortitude, "Archon Plate"]);
			Config.Runewords.push([Runeword.Fortitude, "Balrog Skin"]);
			Config.Runewords.push([Runeword.Fortitude, "BoneWeave"]);
			Config.Runewords.push([Runeword.Fortitude, "Great Hauberk"]);
			Config.Runewords.push([Runeword.Fortitude, "Loricated Mail"]);
			Config.Runewords.push([Runeword.Fortitude, "Diamond Mail"]);
			Config.Runewords.push([Runeword.Fortitude, "Wire Fleece"]);
			Config.Runewords.push([Runeword.Fortitude, "Scarab Husk"]);
			Config.Runewords.push([Runeword.Fortitude, "WyrmHide"]);
			Config.Runewords.push([Runeword.Fortitude, "Dusk Shroud"]);

			Config.KeepRunewords.push("[type] == armor # [enhanceddefense] >= 200 && [enhanceddamage] >= 300");
		}

		if (Item.getEquippedItemMerc(3).tier < 15000) { // Merc Treachery
			var Treachery = [
				"([Name] == BreastPlate || [Name] == MagePlate || [Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
				"!me.normal && ([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Sockets] == 0 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Treachery);

			Config.Recipes.push([Recipe.Socket.Armor, "Hellforge Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Kraken Shell"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Balrog Skin"]);
			Config.Recipes.push([Recipe.Socket.Armor, "BoneWeave"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Great Hauberk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Loricated Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Diamond Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Wire Fleece"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Scarab Husk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud"]);

			Config.Runewords.push([Runeword.Treachery, "Breast Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Hellforge Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Kraken Shell"]);
			Config.Runewords.push([Runeword.Treachery, "Archon Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Balrog Skin"]);
			Config.Runewords.push([Runeword.Treachery, "BoneWeave"]);
			Config.Runewords.push([Runeword.Treachery, "Great Hauberk"]);
			Config.Runewords.push([Runeword.Treachery, "Loricated Mail"]);
			Config.Runewords.push([Runeword.Treachery, "Diamond Mail"]);
			Config.Runewords.push([Runeword.Treachery, "Wire Fleece"]);
			Config.Runewords.push([Runeword.Treachery, "Scarab Husk"]);
			Config.Runewords.push([Runeword.Treachery, "WyrmHide"]);
			Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);

			Config.KeepRunewords.push("[Type] == armor # [ias] == 45 && [coldresist] == 30");
		}

		if (Item.getEquippedItem(3).tier < 634) { // Smoke
			if (!Check.haveItem("armor", "runeword", "Smoke") && !me.hell) {
				if (!me.getItem(626)) { // Cube to Lum Rune
					Config.Recipes.push([Recipe.Rune, "Io Rune"]); // cube Io to Lum
				}

				var smokeRunes = [
					"[Name] == NefRune # # [MaxQuantity] == 1",
					"[Name] == LumRune # # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(smokeRunes);
			}

			NTIP.addLine("([Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor || [Name] == LightPlate || [Name] == MagePlate || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1");

			Config.Runewords.push([Runeword.Smoke, "demonhide armor"]);
			Config.Runewords.push([Runeword.Smoke, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Smoke, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Smoke, "Light Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Mage Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Smoke, "trellised armor"]);
			Config.Runewords.push([Runeword.Smoke, "WyrmHide"]);

			Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");
		}

		if (Item.getEquippedItem(3).tier < 634) {	// Treachery
			var treach = [
				"[Name] == ShaelRune # # [MaxQuantity] == 1",
				"[Name] == ThulRune # # [MaxQuantity] == 1",
				"[Name] == LemRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(treach);

			if (!me.getItem(629)) {		// Lem rune
				Config.Recipes.push([Recipe.Rune, "Io Rune"]);
				Config.Recipes.push([Recipe.Rune, "Lum Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ko Rune"]);
				Config.Recipes.push([Recipe.Rune, "Fal Rune"]);
			}

			if (me.getItem(629)) {
				NTIP.addLine("([Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor || [Name] == LightPlate || [Name] == MagePlate || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Treachery, "demonhide armor"]);
			Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Treachery, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Treachery, "Light Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Treachery, "trellised armor"]);
			Config.Runewords.push([Runeword.Treachery, "WyrmHide"]);

			Config.KeepRunewords.push("[Type] == armor # [ias] == 45 && [coldresist] == 30");
		}

		if (Item.getEquippedItem(3).tier < 400) {	// Myth
			var Myth = [
				"[Name] == HelRune # # [MaxQuantity] == 1",
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == NefRune # # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Myth);

			if (!me.getItem(624)) {		// Hel rune
				Config.Recipes.push([Recipe.Rune, "Dol Rune"]);
			}

			if (me.getItem(624)) {
				NTIP.addLine("([Name] == BreastPlate || [Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor || [Name] == LightPlate || [Name] == MagePlate || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1");
			}

			Config.Runewords.push([Runeword.Myth, "Breast Plate"]);
			Config.Runewords.push([Runeword.Myth, "demonhide armor"]);
			Config.Runewords.push([Runeword.Myth, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Myth, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Myth, "Light Plate"]);
			Config.Runewords.push([Runeword.Myth, "Mage Plate"]);
			Config.Runewords.push([Runeword.Myth, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Myth, "trellised armor"]);
			Config.Runewords.push([Runeword.Myth, "WyrmHide"]);

			Config.KeepRunewords.push("[Type] == armor # [barbarianskills] == 2");
		}

		if (Item.getEquippedItem(4).tier < 500) {	//Kings Grace - Amn/Ral/Thul
			var KingsGrace = [
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == RalRune # # [MaxQuantity] == 1",
				"[Name] == ThulRune # # [MaxQuantity] == 1",
				"[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 0 && [strreq] <= 150 # [secondarymindamage] == 0 && [Sockets] == 3",
			];
			NTIP.arrayLooping(KingsGrace);

			Config.Runewords.push([Runeword.KingsGrace, "Crystal Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Broad Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Long Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "War Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Dimensional Blade"]);
			Config.Runewords.push([Runeword.KingsGrace, "Battle Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Rune Sword"]);
			Config.Runewords.push([Runeword.KingsGrace, "Ancient Sword"]);

			Config.KeepRunewords.push("[type] == sword # [enhanceddamage] >= 100 && [lifeleech] >= 7");
		}

		if (Item.getEquippedItem(4).tier < 175) {	//Malice - IthElEth
			var Malice = [
				"[Name] == IthRune # # [MaxQuantity] == 1",
				"[Name] == ElRune # # [MaxQuantity] == 1",
				"[Name] == EthRune # # [MaxQuantity] == 1",
				"[Type] == Sword && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior && [wsm] <= 0 && [strreq] <= 150 # [secondarymindamage] == 0 && [Sockets] == 3",
			];
			NTIP.arrayLooping(Malice);

			Config.Runewords.push([Runeword.Malice, "Crystal Sword"]);
			Config.Runewords.push([Runeword.Malice, "Broad Sword"]);
			Config.Runewords.push([Runeword.Malice, "Long Sword"]);
			Config.Runewords.push([Runeword.Malice, "War Sword"]);

			Config.KeepRunewords.push("[type] == sword # [enhanceddamage] >= 33 && [tohit] >= 50");
		}

		if (Item.getEquippedItem(3).tier < 233) { // Stealth
			if (!Check.haveItem("armor", "runeword", "Stealth") && me.normal) {
				var stealthRunes = [
					"[Name] == TalRune # # [MaxQuantity] == 1",
					"[Name] == EthRune # # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(stealthRunes);
			}

			var stealthArmor = [
				"!me.hell && ([Name] == StuddedLeather || [Name] == BreastPlate || [Name] == LightPlate) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
				"([Name] == GhostArmor || [Name] == SerpentskinArmor || [Name] == MagePlate) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(stealthArmor);

			Config.Runewords.push([Runeword.Stealth, "Mage Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Stealth, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Stealth, "Light Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Breast Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Studded Leather"]);

			Config.KeepRunewords.push("[type] == armor # [frw] == 25");
		}
	}
}
