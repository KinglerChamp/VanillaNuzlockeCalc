var game, gameId, generation, isHack;
$(".game").change(function() {
	game = $("input[name='game']:checked + label").html();
    gameId = ~~$(this).val();
	isHack = ["Emerald Kaizo"].includes(game);
    var params = new URLSearchParams(window.location.search);
	if (game == "None") {
		params.delete('game');
		params = '' + params;
		if (window.history && window.history.replaceState) {
			window.history.replaceState({}, document.title, window.location.pathname + (params.length ? '?' + params : ''));
		}
	} else {
		params.set('game', gameId);
		if (window.history && window.history.pushState) {
			params.sort();
			var path = window.location.pathname + '?' + params;
			window.history.pushState({}, document.title, path);
		}
	}

	updateGenOptions();
	if (game != "None") {
		$(".hide-from-games").hide();
	} else $(".hide-from-games").show();
    generation = gen;
    setdex = !isHack ? CUSTOMSETDEX[gameId] : CUSTOMHACKSETDEX[gameId];
	partyOrder = !isHack ? CUSTOMPARTYORDER[gameId] : CUSTOMHACKPARTYORDER[gameId];
	trainerNames = !isHack ? CUSTOMTRAINERNAMES[gameId] : CUSTOMHACKTRAINERNAMES[gameId];
	flags = !isHack ? CUSTOMFLAGS[gameId] : CUSTOMHACKFLAGS[gameId];
    if (typeof setdex === 'undefined') setdex = SETDEX[generation];
    clearField();
    $("#importedSets").prop("checked", false);
    loadDefaultLists();
    $(".gen-specific.g" + gen).show();
	$(".gen-specific").not(".g" + gen).hide();
	$(".game-specific.gm" + gameId).show();
	$(".game-specific").not(".gm" + gameId).hide();
	var typeOptions = getSelectOptions(Object.keys(typeChart));
	$("select.type1, select.move-type").find("option").remove().end().append(typeOptions);
	$("select.type2").find("option").remove().end().append("<option value=\"\">(none)</option>" + typeOptions);
	var moveOptions = getSelectOptions(Object.keys(moves), true);
	$("select.move-selector").find("option").remove().end().append(moveOptions);
	var abilityOptions = getSelectOptions(abilities, true);
	$("select.ability").find("option").remove().end().append("<option value=\"\">(other)</option>" + abilityOptions);
	var itemOptions = getSelectOptions(items, true);
	$("select.item").find("option").remove().end().append("<option value=\"\">(none)</option>" + itemOptions);

	$(".set-selector").val(getFirstValidSetOption().id);
	$(".set-selector").change();
});

var CUSTOMSETDEX = [
	undefined, // None
    typeof CUSTOMSETDEX_RB === 'undefined' ? {} : CUSTOMSETDEX_RB,
    typeof CUSTOMSETDEX_Y === 'undefined' ? {} : CUSTOMSETDEX_Y,
    typeof CUSTOMSETDEX_GS === 'undefined' ? {} : CUSTOMSETDEX_GS,
	typeof CUSTOMSETDEX_C === 'undefined' ? {} : CUSTOMSETDEX_C,
    typeof CUSTOMSETDEX_RS === 'undefined' ? {} : CUSTOMSETDEX_RS,
	typeof CUSTOMSETDEX_E === 'undefined' ? {} : CUSTOMSETDEX_E,
	typeof CUSTOMSETDEX_FRLG === 'undefined' ? {} : CUSTOMSETDEX_FRLG,
	typeof CUSTOMSETDEX_DP === 'undefined' ? {} : CUSTOMSETDEX_DP,
    typeof CUSTOMSETDEX_Pl === 'undefined' ? {} : CUSTOMSETDEX_Pl,
	typeof CUSTOMSETDEX_HGSS === 'undefined' ? {} : CUSTOMSETDEX_HGSS,
	typeof CUSTOMSETDEX_BW === 'undefined' ? {} : CUSTOMSETDEX_BW,
	typeof CUSTOMSETDEX_B2W2 === 'undefined' ? {} : CUSTOMSETDEX_B2W2,
	typeof CUSTOMSETDEX_B2W2HC === 'undefined' ? {} : CUSTOMSETDEX_B2W2HC,
	typeof CUSTOMSETDEX_XY === 'undefined' ? {} : CUSTOMSETDEX_XY,
	typeof CUSTOMSETDEX_ORAS === 'undefined' ? {} : CUSTOMSETDEX_ORAS,
	typeof CUSTOMSETDEX_SM === 'undefined' ? {} : CUSTOMSETDEX_SM,
	typeof CUSTOMSETDEX_USUM === 'undefined' ? {} : CUSTOMSETDEX_USUM,
	typeof CUSTOMSETDEX_SS === 'undefined' ? {} : CUSTOMSETDEX_SS,
	typeof CUSTOMSETDEX_BDSP === 'undefined' ? {} : CUSTOMSETDEX_BDSP,
	typeof CUSTOMSETDEX_SV === 'undefined' ? {} : CUSTOMSETDEX_SV
];

var GAMEGEN = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 3,
    8: 4,
    9: 4,
	10: 4,
	11: 5,
    12: 5,
	13: 5,
    14: 6,
    15: 6,
	16: 7,
	17: 7,
	18: 8,
	19: 8,
	20: 9
};

var CUSTOMTRAINERNAMES = [
	undefined, // None
    typeof CUSTOMTRAINERNAMES_RB === 'undefined' ? {} : CUSTOMTRAINERNAMES_RB,
    typeof CUSTOMTRAINERNAMES_Y === 'undefined' ? {} : CUSTOMTRAINERNAMES_Y,
    typeof CUSTOMTRAINERNAMES_GS === 'undefined' ? {} : CUSTOMTRAINERNAMES_GS,
	typeof CUSTOMTRAINERNAMES_C === 'undefined' ? {} : CUSTOMTRAINERNAMES_C,
    typeof CUSTOMTRAINERNAMES_RS === 'undefined' ? {} : CUSTOMTRAINERNAMES_RS,
	typeof CUSTOMTRAINERNAMES_E === 'undefined' ? {} : CUSTOMTRAINERNAMES_E,
	typeof CUSTOMTRAINERNAMES_FRLG === 'undefined' ? {} : CUSTOMTRAINERNAMES_FRLG,
	typeof CUSTOMTRAINERNAMES_DP === 'undefined' ? {} : CUSTOMTRAINERNAMES_DP,
    typeof CUSTOMTRAINERNAMES_Pl === 'undefined' ? {} : CUSTOMTRAINERNAMES_Pl,
	typeof CUSTOMTRAINERNAMES_HGSS === 'undefined' ? {} : CUSTOMTRAINERNAMES_HGSS,
	typeof CUSTOMTRAINERNAMES_BW === 'undefined' ? {} : CUSTOMTRAINERNAMES_BW,
	typeof CUSTOMTRAINERNAMES_B2W2 === 'undefined' ? {} : CUSTOMTRAINERNAMES_B2W2,
	typeof CUSTOMTRAINERNAMES_XY === 'undefined' ? {} : CUSTOMTRAINERNAMES_XY,
	typeof CUSTOMTRAINERNAMES_ORAS === 'undefined' ? {} : CUSTOMTRAINERNAMES_ORAS,
	typeof CUSTOMTRAINERNAMES_SM === 'undefined' ? {} : CUSTOMTRAINERNAMES_SM
];

var CUSTOMPARTYORDER = [
	undefined, // None
    typeof CUSTOMPARTYORDER_RB === 'undefined' ? {} : CUSTOMPARTYORDER_RB,
    typeof CUSTOMPARTYORDER_Y === 'undefined' ? {} : CUSTOMPARTYORDER_Y,
    typeof CUSTOMPARTYORDER_GS === 'undefined' ? {} : CUSTOMPARTYORDER_GS,
	typeof CUSTOMPARTYORDER_C === 'undefined' ? {} : CUSTOMPARTYORDER_C,
    typeof CUSTOMPARTYORDER_RS === 'undefined' ? {} : CUSTOMPARTYORDER_RS,
	typeof CUSTOMPARTYORDER_E === 'undefined' ? {} : CUSTOMPARTYORDER_E,
	typeof CUSTOMPARTYORDER_FRLG === 'undefined' ? {} : CUSTOMPARTYORDER_FRLG,
	typeof CUSTOMPARTYORDER_DP === 'undefined' ? {} : CUSTOMPARTYORDER_DP,
    typeof CUSTOMPARTYORDER_Pl === 'undefined' ? {} : CUSTOMPARTYORDER_Pl,
	typeof CUSTOMPARTYORDER_HGSS === 'undefined' ? {} : CUSTOMPARTYORDER_HGSS,
	typeof CUSTOMPARTYORDER_BW === 'undefined' ? {} : CUSTOMPARTYORDER_BW,
	typeof CUSTOMPARTYORDER_B2W2 === 'undefined' ? {} : CUSTOMPARTYORDER_B2W2,
	typeof CUSTOMPARTYORDER_XY === 'undefined' ? {} : CUSTOMPARTYORDER_XY,
	typeof CUSTOMPARTYORDER_ORAS === 'undefined' ? {} : CUSTOMPARTYORDER_ORAS,
	typeof CUSTOMPARTYORDER_SM === 'undefined' ? {} : CUSTOMPARTYORDER_SM
];

var CUSTOMFLAGS = [
	undefined, // None
    typeof CUSTOMFLAGS_RB === 'undefined' ? {} : CUSTOMFLAGS_RB,
    typeof CUSTOMFLAGS_Y === 'undefined' ? {} : CUSTOMFLAGS_Y,
    typeof CUSTOMFLAGS_GS === 'undefined' ? {} : CUSTOMFLAGS_GS,
	typeof CUSTOMFLAGS_C === 'undefined' ? {} : CUSTOMFLAGS_C,
    typeof CUSTOMFLAGS_RS === 'undefined' ? {} : CUSTOMFLAGS_RS,
	typeof CUSTOMFLAGS_E === 'undefined' ? {} : CUSTOMFLAGS_E,
	typeof CUSTOMFLAGS_FRLG === 'undefined' ? {} : CUSTOMFLAGS_FRLG,
	typeof CUSTOMFLAGS_DP === 'undefined' ? {} : CUSTOMFLAGS_DP,
    typeof CUSTOMFLAGS_Pl === 'undefined' ? {} : CUSTOMFLAGS_Pl,
	typeof CUSTOMFLAGS_HGSS === 'undefined' ? {} : CUSTOMFLAGS_HGSS,
	typeof CUSTOMFLAGS_BW === 'undefined' ? {} : CUSTOMFLAGS_BW,
	typeof CUSTOMFLAGS_B2W2 === 'undefined' ? {} : CUSTOMFLAGS_B2W2,
	typeof CUSTOMFLAGS_XY === 'undefined' ? {} : CUSTOMFLAGS_XY,
	typeof CUSTOMFLAGS_ORAS === 'undefined' ? {} : CUSTOMFLAGS_ORAS,
	typeof CUSTOMFLAGS_SM === 'undefined' ? {} : CUSTOMFLAGS_SM
];

var CUSTOMHACKSETDEX = [
	undefined, // None
	typeof CUSTOMHACKSETDEX_EK === 'undefined' ? {} : CUSTOMHACKSETDEX_EK
];

var HACKGEN = {
	1: 3
};

var CUSTOMHACKTRAINERNAMES = [
	undefined,
	typeof CUSTOMHACKTRAINERNAMES_EK === 'undefined' ? {} : CUSTOMHACKTRAINERNAMES_EK
];

var CUSTOMHACKPARTYORDER = [
	undefined,
	typeof CUSTOMHACKPARTYORDER_EK === 'undefined' ? {} : CUSTOMHACKPARTYORDER_EK
];

var CUSTOMHACKFLAGS = [
	undefined,
	typeof CUSTOMHACKFLAGS_EK === 'undefined' ? {} : CUSTOMHACKFLAGS_EK
];

function updateGenOptions() {
    var gamegen = !isHack ? GAMEGEN[gameId] : HACKGEN[gameId];
    if (!isHack && gen == gamegen) return;
    gen = gamegen || gen;
    GENERATION = calc.Generations.get(gen);
    $("#gen" + gamegen).prop("checked", true);
    var params = new URLSearchParams(window.location.search);
	if (gen === DEFAULTGEN) {
		params.delete('gen');
		params = '' + params;
		if (window.history && window.history.replaceState) {
			window.history.replaceState({}, document.title, window.location.pathname + (params.length ? '?' + params : ''));
		}
	} else {
		params.set('gen', gen);
		if (window.history && window.history.pushState) {
			params.sort();
			var path = window.location.pathname + '?' + params;
			window.history.pushState({}, document.title, path);
		}
	}
	pokedex = isHack ? calc.HACK_SPECIES[gameId] : calc.SPECIES[gen];
	randdex = RANDDEX[gen];
	typeChart = calc.TYPE_CHART[gen];
	moves = isHack ? calc.HACK_MOVES[gameId] : calc.MOVES[gen];
	items = isHack ? calc.HACK_ITEMS[gameId] : calc.ITEMS[gen];
	abilities = calc.ABILITIES[gen];
}

var phase1TypeMatchups = {
    "Normal-Rock": 0.5,
    "Normal-Steel": 0.5,
    "Fire-Fire": 0.5,
    "Fire-Water": 0.5,
    "Fire-Grass": 2.0,
    "Fire-Ice": 2.0,
    "Fire-Bug": 2.0,
    "Fire-Rock": 0.5,
    "Fire-Dragon": 0.5,
    "Fire-Steel": 2.0,
    "Water-Fire": 2.0,
    "Water-Water": 0.5,
    "Water-Grass": 0.5,
    "Water-Ground": 2.0,
    "Water-Rock": 2.0,
    "Water-Dragon": 0.5,
    "Electric-Water": 2.0,
    "Electric-Electric": 0.5,
    "Electric-Grass": 0.5,
    "Electric-Ground": 0.0,
    "Electric-Flying": 2.0,
    "Electric-Dragon": 0.5,
    "Grass-Fire": 0.5,
    "Grass-Water": 2.0,
    "Grass-Grass": 0.5,
    "Grass-Poison": 0.5,
    "Grass-Ground": 2.0,
    "Grass-Flying": 0.5,
    "Grass-Bug": 0.5,
    "Grass-Rock": 2.0,
    "Grass-Dragon": 0.5,
    "Grass-Steel": 0.5,
    "Ice-Water": 0.5,
    "Ice-Grass": 2.0,
    "Ice-Ice": 0.5,
    "Ice-Ground": 2.0,
    "Ice-Flying": 2.0,
    "Ice-Dragon": 2.0,
    "Ice-Steel": 0.5,
    "Ice-Fire": 0.5,
    "Fighting-Normal": 2.0,
    "Fighting-Ice": 2.0,
    "Fighting-Poison": 0.5,
    "Fighting-Flying": 0.5,
    "Fighting-Psychic": 0.5,
    "Fighting-Bug": 0.5,
    "Fighting-Rock": 2.0,
    "Fighting-Dark": 2.0,
    "Fighting-Steel": 2.0,
    "Poison-Grass": 2.0,
    "Poison-Poison": 0.5,
    "Poison-Ground": 0.5,
    "Poison-Rock": 0.5,
    "Poison-Ghost": 0.5,
    "Poison-Steel": 0.0,
    "Ground-Fire": 2.0,
    "Ground-Electric": 2.0,
    "Ground-Grass": 0.5,
    "Ground-Poison": 2.0,
    "Ground-Flying": 0.0,
    "Ground-Bug": 0.5,
    "Ground-Rock": 2.0,
    "Ground-Steel": 2.0,
    "Flying-Electric": 0.5,
    "Flying-Grass": 2.0,
    "Flying-Fighting": 2.0,
    "Flying-Bug": 2.0,
    "Flying-Rock": 0.5,
    "Flying-Steel": 0.5,
    "Psychic-Fighting": 2.0,
    "Psychic-Poison": 2.0,
    "Psychic-Psychic": 0.5,
    "Psychic-Dark": 0.0,
    "Psychic-Steel": 0.5,
    "Bug-Fire": 0.5,
    "Bug-Grass": 2.0,
    "Bug-Fighting": 0.5,
    "Bug-Poison": 0.5,
    "Bug-Flying": 0.5,
    "Bug-Psychic": 2.0,
    "Bug-Ghost": 0.5,
    "Bug-Dark": 2.0,
    "Bug-Steel": 0.5,
    "Rock-Fire": 2.0,
    "Rock-Ice": 2.0,
    "Rock-Fighting": 0.5,
    "Rock-Ground": 0.5,
    "Rock-Flying": 2.0,
    "Rock-Bug": 2.0,
    "Rock-Steel": 0.5,
    "Ghost-Normal": 0.0,
    "Ghost-Psychic": 2.0,
    "Ghost-Dark": 0.5,
    "Ghost-Steel": 0.5,
    "Ghost-Ghost": 2.0,
    "Dragon-Dragon": 2.0,
    "Dragon-Steel": 0.5,
    "Dark-Fighting": 0.5,
    "Dark-Psychic": 2.0,
    "Dark-Ghost": 2.0,
    "Dark-Dark": 0.5,
    "Dark-Steel": 0.5,
    "Steel-Fire": 0.5,
    "Steel-Water": 0.5,
    "Steel-Electric": 0.5,
    "Steel-Ice": 2.0,
    "Steel-Rock": 2.0,
    "Steel-Steel": 0.5,
    "Normal-Ghost": 0.0,
    "Fighting-Ghost": 0.0
};
function predictSwitchOrderEmerald() {
	var advanced = $("#advanced-bait").is(":checked");
	var p1 = createPokemon($("#p1"));
	var field = createField();
	if (p1.species.name === "Castform") {
		switch (field.weather) {
			case "Sun":
				p1.types[0] = "Fire";
				break;
			case "Rain":
				p1.types[0] = "Water";
				break;
			case "Hail":
				p1.types[0] = "Ice";
				break;
			default:
				p1.types[0] = "Normal";
				break;
		}
	}
	var partySpecies = partyOrder[window.CURRENT_TRAINER];

	var hasDupes = (new Set(partySpecies)).size !== partySpecies.length;
	var withMarkedDupes = [];
	if (hasDupes) {
		var count = {};
		for (var i in partySpecies) {
			if (!count[partySpecies[i]]) count[partySpecies[i]] = 0;
			count[partySpecies[i]] += 1;
		}
		for (var i in partySpecies) {
			if (count[partySpecies[i]] > 1) {
				var j = 1;
				while (withMarkedDupes.includes(`${partySpecies[i]} (${j})`)) j++;
				withMarkedDupes[i] = `${partySpecies[i]} (${j})`;
			} else withMarkedDupes[i] = partySpecies[i];
		}
	} else withMarkedDupes = partySpecies;

	var partyMons = [];
	if (hasDupes) for (var i in withMarkedDupes) {
		var current_trainer = window.CURRENT_TRAINER;
		if (withMarkedDupes[i].includes("(")) {
			var index = withMarkedDupes[i].split("(")[1].split(")")[0];
			current_trainer += ` (${index})`;
		}
		partyMons.push(setdex[partySpecies[i]][current_trainer]);
		try {
			partyMons[i].species = partySpecies[i];
			partyMons[i].setName = `${partySpecies[i]} (${current_trainer})`;
			partyMons[i].name = withMarkedDupes[i];
		} catch (ex) {
			$(".trainer-poke-switch-list").html("An error has occured.");
			return;
		}
	} else for (var i in partySpecies) {
		partyMons.push(setdex[partySpecies[i]][window.CURRENT_TRAINER]);
		try {
			partyMons[i].species = partySpecies[i];
			partyMons[i].setName = `${partySpecies[i]} (${window.CURRENT_TRAINER})`;
			partyMons[i].name = partySpecies[i];
		} catch (ex) {
			$(".trainer-poke-switch-list").html("An error has occured.");
			return;
		}
	}

	var deadList = [];
	for (var i in partyMons) {
		var dead = partyMons[i];
		if ($(`.trainer-poke-switch[data-id='${dead.setName}']`).hasClass("dead")) {
			$(`.trainer-poke-switch-explain[data-id='${dead.setName}']`).html("Dead!");
			deadList.push(dead);
		} else {
			$(`.trainer-poke-switch-explain[data-id='${dead.setName}']`).html("That's it!");
		}
	}
	for (var i in partyMons) {
		var dead = partyMons[i];
		if (deadList.includes(dead)) continue;
		var defender = p1.clone();
		var nextMon = "";
		var phase = 1;

		// Phase 1 => Best super effective move typing, worst pokemon typing
		var scores = {};
		for (var j in partyMons) {
			scores[withMarkedDupes[j]] = 10;
			var enemy = partyMons[j];
			if (deadList.includes(enemy)) continue;
			var enemyDex = !partySpecies[j].includes("Castform") ? pokedex[partySpecies[j]] : pokedex["Castform"];
			var p1types = defender.types;
			if (!p1types[1]) p1types[1] = p1types[0];
			for (var k in p1types) {
				var type = p1types[k];
				for (var matchup in phase1TypeMatchups) {
					var type1 = matchup.split("-")[0];
					var type2 = matchup.split("-")[1];
					if ((type1 == type) && (type2 == enemyDex.types[0] || type2 == enemyDex.types[1])) {
						scores[withMarkedDupes[j]] = Math.floor(scores[withMarkedDupes[j]] * phase1TypeMatchups[matchup]);
					}
				}
			}
		}

		var sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

		for (var j in sorted) {
			if (scores[sorted[j]] == 0) continue;
			var index = 0;
			if (sorted[j].includes("(")) index = Number(sorted[j].split("(")[1].split(")")[0]) - 1;
			var enemy = partyMons.filter(x => x.species == sorted[j].split(" (")[0])[index];
			if (enemy == dead) continue;
			if (deadList.includes(enemy)) {
				continue;
			}
			for (var k in enemy.moves) {
				var move = new calc.Move(GENERATION, enemy.moves[k]);
				if (move.category == "Status") continue;
				if (move.name == "Weather Ball") {
					if (field.weather == "Sun") move.type = "Fire";
					else if (field.weather == "Rain") move.type = "Water";
					else if (field.weather == "Hail") move.type = "Ice";
				}
				var typeEffectiveness1 = GENERATION.types.get(toID(move.type)).effectiveness[defender.types[0]];
				var typeEffectiveness2 = GENERATION.types.get(toID(move.type)).effectiveness[defender.types[1]];
				var typeEffectiveness = defender.types[1] ? typeEffectiveness1 * typeEffectiveness2 : typeEffectiveness1;
				if (defender.ability == "Levitate" && move.type == "Ground") typeEffectiveness = 0;
				if (typeEffectiveness > 1) {
					nextMon = enemy.name;
					break;
				}
			}
			if (nextMon) break;
		}

		// Phase 2 => Simple => Points for STAB moves for the dead mon and effective moves against me
		//         => Adavnced => Actually calculating move damage
		var highestDamage;
		if (!nextMon) {
			phase = 2;
			highestDamage = { pokemon: {}, score: 0 };
			for (var j in partyMons) {
				if (deadList.includes(partyMons[j])) continue;
				var next = structuredClone(partyMons[j]);
				if (next.setName == dead.setName) continue;
				var moves = [];
				for (var k in next.moves) moves.push(new calc.Move(GENERATION, next.moves[k]));
				var attacker = new calc.Pokemon(GENERATION, dead.species, {
					level: dead.level,
					moves: moves
				});
				for (var j in attacker.moves) {
					if (!advanced) {
						var move = attacker.moves[j];
						if (move.named(
							"Fissure", "Horn Drill", "Guilotine", "Sheer Cold",
							"Flail", "Frustration", "Low Kick", "Magnitude", "Present", "Return", "Reversal",
							"Counter", "Mirror Coat",
							"Dragon Rage", "Endeavor", "Night Shade", "Psywave", "Seismic Toss", "Sonic Boom", "Sonicboom", "Super Fang",
							"Bide", "Hidden Power"
						)) continue;
						var score = 1;
						if (attacker.types.includes(move.type)) score *= 1.5;
						if (!(move.type == "Ground" && defender.ability == "Levitate")) {
							score *= getMoveEffectiveness(GENERATION, move, defender.types[0]);
							score *= getMoveEffectiveness(GENERATION, move, defender.types[1]);
						}
						if (score > highestDamage.score) {
							highestDamage.pokemon = next;
							highestDamage.score = score;
						}
					} else {
						var move = new calc.Move(GENERATION, $(".last-move-used > select.move-selector").val(), {
							overrides: {
								type: attacker.moves[j].type,
								category: new calc.Move(GENERATION, $(".last-move-used > select.move-selector").val()).hasType('Normal', 'Fighting', 'Flying', 'Ground', 'Rock', 'Bug', 'Ghost', 'Poison', 'Steel') ? "Physical" : "Special"
							}
						});
						if (move.named(
							"Fissure", "Horn Drill", "Guilotine", "Sheer Cold",
							"Flail", "Frustration", "Low Kick", "Magnitude", "Present", "Return", "Reversal",
							"Counter", "Mirror Coat",
							"Dragon Rage", "Endeavor", "Night Shade", "Psywave", "Seismic Toss", "Sonic Boom", "Sonicboom", "Super Fang",
							"Bide", "Hidden Power"
						)) continue;
						if (new calc.Move(GENERATION, $(".last-move-used > select.move-selector").val()).category == "Status") {
							move.bp = 3;
						}
						move.bp = $(".last-move-used > .move-bp").val();
						var calculation = calc.calculateADV(GENERATION, attacker, defender, move, createField().clone().swap());
						var damage = calculation.damage;
						var score = damage ? damage[damage.length - 1] : damage;
						if (score > highestDamage.score) {
							score %= 256;
							highestDamage.pokemon = next;
							highestDamage.score = score;
						}
					}
				}
			}
			nextMon = highestDamage.pokemon.name;
		}

		var xp = Math.floor(Math.floor(pokedex[dead.species].expYield * dead.level / 7) * 1.5);

		if (nextMon) {
			$(`.trainer-poke-switch-explain[data-id='${dead.setName}']`).html(`${nextMon} (Phase ${phase})`);
			$(`.trainer-poke-switch-xp[data-id='${dead.setName}']`).html(`+${xp}`);
		}
	}
}

function predictSwitchOrder() {
	switch (game) {
		case "Emerald Kaizo":
			return predictSwitchOrderEmerald();
		default:
			return undefined;
	}
}


function predictMidTurnSwitchEmerald(p1, p2) {
	var slower = p1.stats.spe < p2.stats.spe;
	$(resultLocations[0][0]["move"]).removeClass("switch-risk");
	$(resultLocations[0][1]["move"]).removeClass("switch-risk");
	$(resultLocations[0][2]["move"]).removeClass("switch-risk");
	$(resultLocations[0][3]["move"]).removeClass("switch-risk");
	$(".trainer-poke.right-side").removeClass("switch-risk-mon");
	if (slower) {
		var partySpecies = partyOrder[window.CURRENT_TRAINER];
		for (var i in p1.moves) {
			var move = p1.moves[i];
			if (move.category == "Status") continue;
			if (!(calc.calculate(GENERATION, p1, p2, move, createField())).damage) continue;
			for (var j in partySpecies) {
				var enemy = partySpecies[j];
				if (p2.name == enemy) continue;
				var dexMon = pokedex[partySpecies[j]];
				if (partySpecies[j].includes("Castform")) dexMon = pokedex["Castform"];
				var typeEffectiveness1 = GENERATION.types.get(toID(move.type)).effectiveness[dexMon.types[0]];
				var typeEffectiveness2 = GENERATION.types.get(toID(move.type)).effectiveness[dexMon.types[1]];
				var typeEffectiveness = typeEffectiveness2 !== undefined ? typeEffectiveness1 * typeEffectiveness2 : typeEffectiveness1;
				if (typeEffectiveness < 1) {
					var enemyMoves = setdex[enemy][window.CURRENT_TRAINER].moves;
					for (var k in enemyMoves) {
						var enemyMove = new calc.Move(GENERATION, enemyMoves[k]);
						if (enemyMove.category == "Status") continue;
						var typeEffectiveness1 = GENERATION.types.get(toID(enemyMove.type)).effectiveness[p1.types[0]];
						var typeEffectiveness2 = GENERATION.types.get(toID(enemyMove.type)).effectiveness[p1.types[1]];
						var typeEffectiveness = typeEffectiveness2 !== undefined ? typeEffectiveness1 * typeEffectiveness2 : typeEffectiveness1;
						if (typeEffectiveness > 1) {
							$(resultLocations[0][i]["move"]).addClass("switch-risk");
							$(".trainer-poke.right-side").each(function(index, e) {
								if (index == j) $(this).addClass("switch-risk-mon");
							});
						}
					}
				}
			}
		}
	}

	if ($(".switch-risk").length) trySendSwitchAlert();
}

function predictMidTurnSwitch(p1, p2) {
	switch (game) {
		case "Emerald Kaizo":
			return predictMidTurnSwitchEmerald(p1, p2);
		default:
			return false;
	}
}