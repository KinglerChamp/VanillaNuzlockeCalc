const importExport = document.querySelector('.import-export');
const pokeReport = document.querySelector('.poke-import');

// Toggle the active class on pokeReport when importExport is clicked
importExport.addEventListener('click', () => {
    pokeReport.classList.toggle('active');
});

setTimeout(() => {
    const checkboxes = document.querySelector('.trainer-poker-checkboxes');
    const trainerPok = document.querySelector('.trainer-pok-list-opposing');

    // Object to store checkbox states
    let checkboxStates = {};

    // Variable to store the currently selected trainer
    let currentTrainer = null;

    // Function to create checkboxes
    function createCheckboxes() {
        for (let i = 0; i < trainerPok.childNodes.length; i++) {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.classList.add('trainer-pok-checkbox-input');
            input.dataset.index = i; // Add data-index attribute for reference
            checkboxes.append(input);

            // Restore the checkbox state from the saved data
            if (checkboxStates[i]) {
                input.checked = true;
                trainerPok.childNodes[i].style.opacity = '0.3'; // Apply faded opacity
            }

            // Add event listener to each checkbox
            input.addEventListener('change', function() {
                const index = parseInt(this.dataset.index); // Get the index from data-index attribute
                const childNode = trainerPok.childNodes[index];

                if (this.checked) {
                    // If checkbox is checked, fade away the corresponding child node
                    childNode.style.opacity = '0.3';
                    checkboxStates[index] = true; // Save state
                } else {
                    // If checkbox is unchecked, reset opacity of the corresponding child node
                    childNode.style.opacity = '1';
                    checkboxStates[index] = false; // Save state
                }
            });
        }
    }

    // Function to reset checkboxes
    function resetCheckboxes() {
        // Clear the checkbox states object
        checkboxStates = {};

        // Uncheck all checkboxes and reset opacity
        const inputs = checkboxes.querySelectorAll('.trainer-pok-checkbox-input');
        inputs.forEach((input, index) => {
            input.checked = false;
            trainerPok.childNodes[index].style.opacity = '1';
        });
    }

    // Initial creation of checkboxes
    createCheckboxes();

    // Create a MutationObserver to watch for changes in trainerPok.childNodes
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                // If the number of child nodes changes, recreate checkboxes
                checkboxes.innerHTML = ''; // Clear existing checkboxes
                createCheckboxes(); // Recreate checkboxes
            }
        });
    });

    // Configure the observer to watch for changes in child nodes of trainerPok
    const config = { childList: true };

    // Start observing
    observer.observe(trainerPok, config);

    // Function to extract the trainer's name from the string
    function extractTrainerName(title) {
        const match = title.match(/\((.*?)\)/);
        return match ? match[1].split("|")[0].trim() : null;
    }

    // Function to handle trainer selection
    function handleTrainerSelection(title) {
        const trainerName = extractTrainerName(title);
        if (trainerName && currentTrainer !== trainerName) {
            // If a new trainer is selected, reset checkboxes
            resetCheckboxes();
            currentTrainer = trainerName;
        }
    }

    // Example: Listening to trainer selection events
    // Assuming trainers are represented by elements with class 'trainer-item'
    const trainerItems = document.querySelectorAll('.trainer-item');
    trainerItems.forEach(trainerItem => {
        trainerItem.addEventListener('click', (event) => {
            const title = event.currentTarget.getAttribute('title'); // Use title attribute for trainer info
            handleTrainerSelection(title);
        });
    });

}, 1000);

/*
This file houses code that is run upon page refresh or when a control in changed.
*/

var READY;

var stickyMoves = (function () {
	var lastClicked = 'resultMoveL1';
	$(".result-move").click(function () {
		if (this.id === lastClicked) {
			$(this).toggleClass("locked-move");
		} else {
			$('.locked-move').removeClass('locked-move');
		}
		lastClicked = this.id;
	});

	return {
		clearStickyMove: function () {
			lastClicked = null;
			$('.locked-move').removeClass('locked-move');
		},
		setSelectedMove: function (slot) {
			lastClicked = slot;
		},
		getSelectedSide: function () {
			if (lastClicked) {
				if (lastClicked.indexOf('resultMoveL') !== -1) {
					return 'p1';
				} else if (lastClicked.indexOf('resultMoveR') !== -1) {
					return 'p2';
				}
			}
			return null;
		}
	};
})();

$(document).ready(function () {
	var customSets;
	if (localStorage.customsets) {
		customSets = JSON.parse(localStorage.customsets);
		updateDex(customSets);
	} else {
		loadDefaultLists();
	}

    var params = new URLSearchParams(window.location.search);
	var generation = GENERATION[params.get('gen')] || DEFAULTGEN;
	var game = params.get("game") || 0;
	$("#gen" + generation).prop("checked", true);
	$("#gen" + generation).change();
	$("#game" + game).prop("checked", true);
	$("#game" + game).change();
	$("#percentage").prop("checked", true);
	$("#percentage").change();
	$("#singles-format").prop("checked", true);
	$("#singles-format").change();
	$("#default-level-100").prop("checked", true);
	$("#default-level-100").change();
	loadDefaultLists();
	$(".move-selector").select2({
		dropdownAutoWidth: true,
		matcher: function (term, text) {
			// 2nd condition is for Hidden Power
			return text.toUpperCase().indexOf(term.toUpperCase()) === 0 || text.toUpperCase().indexOf(" " + term.toUpperCase()) >= 0;
		}
	});
	$(".set-selector").val(getFirstValidSetOption().id);
	$(".set-selector").change();
	$(".terrain-trigger").bind("change keyup", getTerrainEffects);
	READY = true;

    // Call get_box on page load to initialize the boxes
    get_box();
});

function previousTrainer() {
    var string = document.getElementById("trainer-pok-list-opposing").children[0].title;
    var value = parseInt(string.split("]")[0].split("[")[1]) - 1;

    for (var set of all_sets) {
        for (const [pok_name, poks] of Object.entries(set)) {
            var pok_tr_names = Object.keys(poks);
            for (var i = 0; i < pok_tr_names.length; i++) {
                var index = poks[pok_tr_names[i]]["index"];
                if (index == value) {
                    var set = `${pok_name} (${pok_tr_names[i]})`;
                    $('.opposing').val(set);
                    $('.opposing').change();
                    $('.opposing .select2-chosen').text(set);
                    return;  // Exit once the correct trainer is found
                }
            }
        }
    }
}

var previousTrainerButton = document.getElementById('previous-trainer');
previousTrainerButton.innerText = 'Previous Trainer';
previousTrainerButton.addEventListener('click', previousTrainer);

function nextTrainer() {
    var elements = document.getElementById("trainer-pok-list-opposing").children;
	var string = elements[elements.length - 1].title;
    var value = parseInt(string.split("]")[0].split("[")[1]) + 1;

    for (var set of all_sets) {
        for (const [pok_name, poks] of Object.entries(set)) {
            var pok_tr_names = Object.keys(poks);
            for (var i = 0; i < pok_tr_names.length; i++) {
                var index = poks[pok_tr_names[i]]["index"];
                if (index == value) {
                    var set = `${pok_name} (${pok_tr_names[i]})`;
                    $('.opposing').val(set);
                    $('.opposing').change();
                    $('.opposing .select2-chosen').text(set);
                    return;  // Exit once the correct trainer is found
                }
            }
        }
    }
}

var nextTrainerButton = document.getElementById('next-trainer');
nextTrainerButton.innerText = 'Next Trainer';
nextTrainerButton.addEventListener('click', nextTrainer);

$(document).on('click', '.right-side', function() {
	var set = $(this).attr('data-id')
	$('.opposing').val(set)

	$('.opposing').change()
	$('.opposing .select2-chosen').text(set)
})

$(document).on('click', '.left-side', function() {
	var set = $(this).attr('data-id')
	$('.player').val(set)

	$('.player').change()
	$('.player .select2-chosen').text(set)
})

// Click-to-copy function
$("#mainResult").click(function () {
	navigator.clipboard.writeText($("#mainResult").text()).then(function () {
		document.getElementById('tooltipText').style.visibility = 'visible';
		setTimeout(function () {
			document.getElementById('tooltipText').style.visibility = 'hidden';
		}, 1500);
	});
});

function updateGameOptions() {
	if (!READY) return;
	var params = new URLSearchParams(window.location.search);
	$("#game0").prop("checked", true);
	game = 0;
	params.delete("game");
	params = '' + params;
	if (window.history && window.history.replaceState) {
		window.history.replaceState({}, document.title, window.location.pathname + (params.length ? '?' + params : ''));
	}
}

function getTerrainEffects() {
	var className = $(this).prop("className");
	className = className.substring(0, className.indexOf(" "));
	switch (className) {
	case "type1":
	case "type2":
	case "teraType":
	case "teraToggle":
	case "item":
		var id = $(this).closest(".poke-info").prop("id");
		var terrainValue = $("input:checkbox[name='terrain']:checked").val();
		if (terrainValue === "Electric") {
			$("#" + id).find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#" + id)));
		} else if (terrainValue === "Misty") {
			$("#" + id).find(".status").prop("disabled", isPokeInfoGrounded($("#" + id)));
		}
		break;
	case "ability":
		// with autoset, ability change may cause terrain change, need to consider both sides
		var terrainValue = $("input:checkbox[name='terrain']:checked").val();
		if (terrainValue === "Electric") {
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
			$("#p1").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else if (terrainValue === "Misty") {
			$("#p1").find(".status").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find(".status").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else {
			$("#p1").find("[value='Asleep']").prop("disabled", false);
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find("[value='Asleep']").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
		}
		break;
	default:
		$("input:checkbox[name='terrain']").not(this).prop("checked", false);
		if ($(this).prop("checked") && $(this).val() === "Electric") {
			// need to enable status because it may be disabled by Misty Terrain before.
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
			$("#p1").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else if ($(this).prop("checked") && $(this).val() === "Misty") {
			$("#p1").find(".status").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find(".status").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else {
			$("#p1").find("[value='Asleep']").prop("disabled", false);
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find("[value='Asleep']").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
		}
		break;
	}
}

function isPokeInfoGrounded(pokeInfo) {
	var teraType = pokeInfo.find(".teraToggle").is(":checked") ? pokeInfo.find(".teraType").val() : undefined;
	return $("#gravity").prop("checked") || (
		  teraType ? teraType !== "Flying" : pokeInfo.find(".type1").val() !== "Flying" &&
        teraType ? teraType !== "Flying" : pokeInfo.find(".type2").val() !== "Flying" &&
        pokeInfo.find(".ability").val() !== "Levitate" &&
        pokeInfo.find(".item").val() !== "Air Balloon"
	);
}

$(".set-selector").change(function () {
	window.NO_CALC = true;
	var fullSetName = $(this).val();
	
	create_display_sprites();
			
	if ($(this).hasClass('opposing')) {
		document.getElementById('trainer-pok-list-opposing').innerHTML = "";

		var sets = get_sets(fullSetName).sort();

		for (var i in sets) {
			var pokName = check_name_exeptions(sets[i].name.split("]")[1].split(" (")[0]);
			
            var container = create_sprites(pokName, sets[i])
            container.dataset.id = sets[i].name.split("]")[1];

			document.getElementById('trainer-pok-list-opposing').appendChild(container);
		}
	}
	
	var pokemonName = fullSetName.substring(0, fullSetName.indexOf(" ("));
	var setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));
	var pokemon = pokedex[pokemonName];
	if (pokemon) {
		var pokeObj = $(this).closest(".poke-info");
		var isAutoTera =
		(startsWith(pokemonName, "Ogerpon") && endsWith(pokemonName, "Tera")) ||
		pokemonName === 'Terapagos-Stellar';
		if (stickyMoves.getSelectedSide() === pokeObj.prop("id")) {
			stickyMoves.clearStickyMove();
		}
		pokeObj.find(".teraToggle").prop("checked", isAutoTera);
		pokeObj.find(".max").prop("checked", false);
		stellarButtonsVisibility(pokeObj, 0);
		pokeObj.find(".boostedStat").val("");
		pokeObj.find(".analysis").attr("href", smogonAnalysis(pokemonName));
		pokeObj.find(".type1").val(pokemon.types[0]);
		pokeObj.find(".type2").val(pokemon.types[1]);
		pokeObj.find(".hp .base").val(pokemon.bs.hp);
		var i;
		for (i = 0; i < LEGACY_STATS[gen].length; i++) {
			pokeObj.find("." + LEGACY_STATS[gen][i] + " .base").val(pokemon.bs[LEGACY_STATS[gen][i]]);
		}
		pokeObj.find(".boost").val(0);
		pokeObj.find(".percent-hp").val(100);
		pokeObj.find(".status").val("Healthy");
		$(".status").change();
		var moveObj;
		var abilityObj = pokeObj.find(".ability");
		var itemObj = pokeObj.find(".item");
		var randset = $("#randoms").prop("checked") ? randdex[pokemonName] : undefined;
		var regSets = pokemonName in setdex && setName in setdex[pokemonName];

		if (randset) {
			var listItems = randdex[pokemonName].items ? randdex[pokemonName].items : [];
			var listAbilities = randdex[pokemonName].abilities ? randdex[pokemonName].abilities : [];
			if (gen >= 3) $(this).closest('.poke-info').find(".ability-pool").show();
			$(this).closest('.poke-info').find(".extraSetAbilities").text(listAbilities.join(', '));
			if (gen >= 2) $(this).closest('.poke-info').find(".item-pool").show();
			$(this).closest('.poke-info').find(".extraSetItems").text(listItems.join(', '));
			if (gen !== 8 && gen !== 1) {
				$(this).closest('.poke-info').find(".role-pool").show();
				if (gen >= 9) $(this).closest('.poke-info').find(".tera-type-pool").show();
			}
			var listRoles = randdex[pokemonName].roles ? Object.keys(randdex[pokemonName].roles) : [];
			$(this).closest('.poke-info').find(".extraSetRoles").text(listRoles.join(', '));
			var listTeraTypes = [];
			if (randdex[pokemonName].roles && gen >= 9) {
				for (var roleName in randdex[pokemonName].roles) {
					var role = randdex[pokemonName].roles[roleName];
					for (var q = 0; q < role.teraTypes.length; q++) {
						if (listTeraTypes.indexOf(role.teraTypes[q]) === -1) {
							listTeraTypes.push(role.teraTypes[q]);
						}
					}
				}
			}
			pokeObj.find(".teraType").val(listTeraTypes[0] || getForcedTeraType(pokemonName) || pokemon.types[0]);
			$(this).closest('.poke-info').find(".extraSetTeraTypes").text(listTeraTypes.join(', '));
		} else {
			$(this).closest('.poke-info').find(".ability-pool").hide();
			$(this).closest('.poke-info').find(".item-pool").hide();
			$(this).closest('.poke-info').find(".role-pool").hide();
			$(this).closest('.poke-info').find(".tera-type-pool").hide();
		}
		if (regSets || randset) {
			var set = regSets ? correctHiddenPower(setdex[pokemonName][setName]) : randset;
			if (regSets) {
				pokeObj.find(".teraType").val(set.teraType || getForcedTeraType(pokemonName) || pokemon.types[0]);
			}
			pokeObj.find(".level").val(set.level === undefined ? 100 : set.level);
			pokeObj.find(".hp .evs").val((set.evs && set.evs.hp !== undefined) ? set.evs.hp : 0);
			pokeObj.find(".hp .ivs").val((set.ivs && set.ivs.hp !== undefined) ? set.ivs.hp : 31);
			pokeObj.find(".hp .g1g2-evs").val((set.evs && set.evs.hp !== undefined) ? set.evs.hp : 0);
			pokeObj.find(".hp .dvs").val((set.dvs && set.dvs.hp !== undefined) ? set.dvs.hp : (set.ivs && set.ivs.hp !== undefined) ? set.ivs.hp : 15);
			for (i = 0; i < LEGACY_STATS[gen].length; i++) {
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .evs").val(
					(set.evs && set.evs[LEGACY_STATS[gen][i]] !== undefined) ?
						set.evs[LEGACY_STATS[gen][i]] : ($("#randoms").prop("checked") ? 84 : 0));
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .ivs").val(
					(set.ivs && set.ivs[LEGACY_STATS[gen][i]] !== undefined) ? set.ivs[LEGACY_STATS[gen][i]] : 31);
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .g1g2-evs").val(
					(set.evs && set.evs[LEGACY_STATS[gen][i]] !== undefined) ?
						set.evs[LEGACY_STATS[gen][i]] : ($("#randoms").prop("checked") ? 84 : 0));
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .dvs").val(
					(set.dvs && set.dvs[LEGACY_STATS[gen][i]] !== undefined) ? set.dvs[LEGACY_STATS[gen][i]] : (set.ivs && set.ivs[LEGACY_STATS[gen][i]] !== undefined) ? set.ivs[LEGACY_STATS[gen][i]] : 15);
			}
			setSelectValueIfValid(pokeObj.find(".nature"), set.nature, "Hardy");
			var abilityFallback = (typeof pokemon.abilities !== "undefined") ? pokemon.abilities[0] : "";
			if ($("#randoms").prop("checked")) {
				setSelectValueIfValid(abilityObj, randset.abilities && randset.abilities[0], abilityFallback);
				setSelectValueIfValid(itemObj, randset.items && randset.items[0], "");
			} else {
				setSelectValueIfValid(abilityObj, set.ability, abilityFallback);
				setSelectValueIfValid(itemObj, set.item, "");
			}
			var setMoves = set.moves;
			if (randset) {
				if (gen === 8 || gen === 1) {
					setMoves = randset.moves;
				} else {
					setMoves = [];
					for (var role in randset.roles) {
						for (var q = 0; q < randset.roles[role].moves.length; q++) {
							var moveName = randset.roles[role].moves[q];
							if (setMoves.indexOf(moveName) === -1) setMoves.push(moveName);
						}
					}
				}
			}
			var moves = selectMovesFromRandomOptions(setMoves);
			for (i = 0; i < 4; i++) {
				moveObj = pokeObj.find(".move" + (i + 1) + " select.move-selector");
				moveObj.attr('data-prev', moveObj.val());
				setSelectValueIfValid(moveObj, moves[i], "(No Move)");
				moveObj.change();
			}
			if (randset) {
				$(this).closest('.poke-info').find(".move-pool").show();
				$(this).closest('.poke-info').find(".extraSetMoves").html(formatMovePool(setMoves));
			}
		} else {
			pokeObj.find(".teraType").val(getForcedTeraType(pokemonName) || pokemon.types[0]);
			pokeObj.find(".level").val(defaultLevel);
			pokeObj.find(".hp .evs").val(0);
			pokeObj.find(".hp .ivs").val(31);
			pokeObj.find(".hp .g1g2-evs").val(0);
			pokeObj.find(".hp .dvs").val(15);
			for (i = 0; i < LEGACY_STATS[gen].length; i++) {
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .evs").val(0);
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .ivs").val(31);
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .g1g2-evs").val(0);
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .dvs").val(15);
			}
			pokeObj.find(".nature").val("Hardy");
			setSelectValueIfValid(abilityObj, pokemon.abilities[0], "");
			if (startsWith(pokemonName, "Ogerpon-") && !startsWith(pokemonName, "Ogerpon-Teal")) {
				itemObj.val(pokemonName.split("-")[1] + " Mask");
			} else {
				itemObj.val("");
			}
			for (i = 0; i < 4; i++) {
				moveObj = pokeObj.find(".move" + (i + 1) + " select.move-selector");
				moveObj.attr('data-prev', moveObj.val());
				moveObj.val("(No Move)");
				moveObj.change();
			}
			if ($("#randoms").prop("checked")) {
				$(this).closest('.poke-info').find(".move-pool").hide();
			}
		}
		if (typeof getSelectedTiers === "function") { // doesn't exist when in 1vs1 mode
			var format = getSelectedTiers()[0];
			var is50lvl = startsWith(format, "VGC") || startsWith(format, "Battle Spot");
			//var isDoubles = format === 'Doubles' || has50lvl; *TODO*
			if (format === "LC") pokeObj.find(".level").val(5);
			if (is50lvl) pokeObj.find(".level").val(50);
			//if (isDoubles) field.gameType = 'Doubles'; *TODO*
		}
		var formeObj = $(this).siblings().find(".forme").parent();
		itemObj.prop("disabled", false);
		var baseForme;
		if (pokemon.baseSpecies && pokemon.baseSpecies !== pokemon.name) {
			baseForme = pokedex[pokemon.baseSpecies];
		}
		if (pokemon.otherFormes) {
			showFormes(formeObj, pokemonName, pokemon, pokemonName);
		} else if (baseForme && baseForme.otherFormes) {
			showFormes(formeObj, pokemonName, baseForme, pokemon.baseSpecies);
		} else {
			formeObj.hide();
		}
		calcHP(pokeObj);
		calcStats(pokeObj);
		abilityObj.change();
		itemObj.change();
		if (pokemon.gender === "N") {
			pokeObj.find(".gender").parent().hide();
			pokeObj.find(".gender").val("");
		} else pokeObj.find(".gender").parent().show();
		if (regSets && setdex[pokemonName][setName].gender === "M") pokeObj.find(".gender").val("Male");
			if (regSets && setdex[pokemonName][setName].gender === "F") pokeObj.find(".gender").val("Female");
		}
		window.NO_CALC = false;
	}
);

function formatMovePool(moves) {
	var formatted = [];
	for (var i = 0; i < moves.length; i++) {
		formatted.push(isKnownDamagingMove(moves[i]) ? moves[i] : '<i>' + moves[i] + '</i>');
	}
	return formatted.join(', ');
}

function isKnownDamagingMove(move) {
	var m = GENERATION.moves.get(calc.toID(move));
	return m && m.basePower;
}

function selectMovesFromRandomOptions(moves) {
	var selected = [];

	var nonDamaging = [];
	for (var i = 0; i < moves.length; i++) {
		if (isKnownDamagingMove(moves[i])) {
			selected.push(moves[i]);
			if (selected.length >= 4) break;
		} else {
			nonDamaging.push(moves[i]);
		}
	}

	while (selected.length < 4 && nonDamaging.length) {
		selected.push(nonDamaging.pop());
	}

	return selected;
}

(".status").bind("keyup change", function () {
	if ($(this).val() === 'Badly Poisoned') {
		$(this).parent().children(".toxic-counter").show();
	} else {
		$(this).parent().children(".toxic-counter").hide();
	}
});

$(".teraType").change(function () {
	var pokeObj = $(this).closest(".poke-info");
	var checked = pokeObj.find(".teraToggle").prop("checked");
	stellarButtonsVisibility(pokeObj, $(this).val() === "Stellar" && checked);
});

var lockerMove = "";
// auto-update move details on select
$(".move-selector").change(function () {
	var moveName = $(this).val();
	var move = moves[moveName] || moves['(No Move)'];
	var moveGroupObj = $(this).parent();
	moveGroupObj.children(".move-bp").val(moveName === 'Present' ? 40 : move.bp);
	var m = moveName.match(HIDDEN_POWER_REGEX);
	if (m) {
		var pokeObj = $(this).closest(".poke-info");
		var pokemon = createPokemon(pokeObj);
		var actual = calc.Stats.getHiddenPower(GENERATION, pokemon.ivs);
		if (actual.type !== m[1]) {
			var hpIVs = calc.Stats.getHiddenPowerIVs(GENERATION, m[1]);
			if (hpIVs && gen < 7) {
				for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
					var legacyStat = LEGACY_STATS[gen][i];
					var stat = legacyStatToStat(legacyStat);
					
					// Only assign value if hpIVs[stat] is defined, otherwise leave it as is
					var ivValue = hpIVs[stat] !== undefined ? hpIVs[stat] : undefined;
					var dvValue = ivValue !== undefined ? calc.Stats.IVToDV(ivValue) : undefined;
				
					// Set the iv and dv only if the value is defined
					if (ivValue !== undefined) {
						pokeObj.find("." + legacyStat + " .ivs").val(ivValue);
					}
					if (dvValue !== undefined) {
						pokeObj.find("." + legacyStat + " .dvs").val(dvValue);
					}
				}
				if (gen < 3) {
					var hpDV = calc.Stats.getHPDV({
						atk: pokeObj.find(".at .ivs").val(),
						def: pokeObj.find(".df .ivs").val(),
						spe: pokeObj.find(".sp .ivs").val(),
						spc: pokeObj.find(".sa .ivs").val()
					});
					pokeObj.find(".hp .ivs").val(calc.Stats.DVToIV(hpDV));
					pokeObj.find(".hp .dvs").val(hpDV);
				}
				pokeObj.change();
				moveGroupObj.children(".move-bp").val(gen >= 6 ? 60 : 70);
			}
		} else {
			moveGroupObj.children(".move-bp").val(actual.power);
		}
	} else if (gen >= 2 && gen <= 6 && HIDDEN_POWER_REGEX.test($(this).attr('data-prev'))) {
		// If this selector was previously Hidden Power but now isn't, reset all IVs/DVs to max.
		var pokeObj = $(this).closest(".poke-info");
		for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
			var legacyStat = LEGACY_STATS[gen][i];
			pokeObj.find("." + legacyStat + " .ivs").val(31);
			pokeObj.find("." + legacyStat + " .dvs").val(15);
		}
	}
	$(this).attr('data-prev', moveName);
	moveGroupObj.children(".move-type").val(move.type);
	moveGroupObj.children(".move-cat").val(move.category);
	moveGroupObj.children(".move-crit").prop("checked", move.willCrit === true);

	var stat = move.category === 'Special' ? 'spa' : 'atk';
	var dropsStats =
		move.self && move.self.boosts && move.self.boosts[stat] && move.self.boosts[stat] < 0;
	if (Array.isArray(move.multihit) || (!isNaN(move.multihit) && move.multiaccuracy)) {
		moveGroupObj.children(".stat-drops").hide();
		moveGroupObj.children(".move-hits").empty();
		if (!isNaN(move.multihit)) {
			for (var i = 1; i <= move.multihit; i++) {
				moveGroupObj.children(".move-hits").append("<option value=" + i + ">" + i + " hits</option>");
			}
		} else {
			for (var i = move.multihit[0]; i <= move.multihit[1]; i++) {
				moveGroupObj.children(".move-hits").append("<option value=" + i + ">" + i + " hits</option>");
			}
		}
		moveGroupObj.children(".move-hits").show();
		var pokemon = $(this).closest(".poke-info");
		var moveHits =
			pokemon.find(".ability").val() === 'Skill Link' ? 5 :
				pokemon.find(".item").val() === 'Loaded Dice' ? 4 : 3;
		moveGroupObj.children(".move-hits").val(moveHits);
	} else if (dropsStats) {
		moveGroupObj.children(".move-hits").hide();
		moveGroupObj.children(".stat-drops").show();
	} else {
		moveGroupObj.children(".move-hits").hide();
		moveGroupObj.children(".stat-drops").hide();
	}
	moveGroupObj.children(".move-z").prop("checked", false);
});

$(".item").change(function () {
	var itemName = $(this).val();
	var $metronomeControl = $(this).closest('.poke-info').find('.metronome');
	if (itemName === "Metronome") {
		$metronomeControl.show();
	} else {
		$metronomeControl.hide();
	}
	var moveHits =
		$(this).closest(".poke-info").find(".ability").val() === 'Skill Link' ? 5 :
			itemName === 'Loaded Dice' ? 4 : 3;
	$(this).closest(".poke-info").find(".move-hits").val(moveHits);
	autosetQP($(this).closest(".poke-info"));
});

$(".teraToggle").change(function () {
	var pokeObj = $(this).closest(".poke-info");
	stellarButtonsVisibility(pokeObj, pokeObj.find(".teraType").val() === "Stellar" && this.checked);
	var forme = $(this).parent().siblings().find(".forme");
	var curForme = forme.val();
	if (forme.is(":hidden")) return;
	var container = $(this).closest(".info-group").siblings();
	// Ogerpon and Terapagos mechs
	if (startsWith(curForme, "Ogerpon")) {
		if (
			curForme !== "Ogerpon" && !endsWith(curForme, "Tera") &&
			container.find(".item").val() !== curForme.split("-")[1] + " Mask"
		) return;
		if (this.checked) {
			var newForme = curForme === "Ogerpon" ? "Ogerpon-Teal-Tera" : curForme + "-Tera";
			forme.val(newForme);
			container.find(".ability").val("Embody Aspect (" + newForme.split("-")[1] + ")");
			return;
		}
		if (!endsWith(curForme, "Tera")) return;
		var newForme = curForme === "Ogerpon-Teal-Tera" ? "Ogerpon" : curForme.slice(0, -5);
		forme.val(newForme);
		container.find(".ability").val(pokedex[newForme].abilities[0]);
	} else if (startsWith(curForme, "Terapagos")) {
		if (this.checked) {
			var newForme = "Terapagos-Stellar";

			forme.val(newForme);
			container.find(".ability").val(pokedex[newForme].abilities[0]);

			for (var property in pokedex[newForme].bs) {
				var baseStat = container.find("." + property).find(".base");
				baseStat.val(pokedex[newForme].bs[property]);
				baseStat.keyup();
			}
			return;
		}

		if (!endsWith(curForme, "Stellar")) return;
		var newForme = "Terapagos-Terastal";

		forme.val(newForme);
		container.find(".ability").val(pokedex[newForme].abilities[0]);
		for (var property in pokedex[newForme].bs) {
			var baseStat = container.find("." + property).find(".base");
			baseStat.val(pokedex[newForme].bs[property]);
			baseStat.keyup();
		}
	}
});

$(".forme").change(function () {
	var altForme = pokedex[$(this).val()],
		container = $(this).closest(".info-group").siblings(),
		fullSetName = container.find(".select2-chosen").first().text(),
		pokemonName = fullSetName.substring(0, fullSetName.indexOf(" (")),
		setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));

	$(this).parent().siblings().find(".type1").val(altForme.types[0]);
	$(this).parent().siblings().find(".type2").val(altForme.types[1] ? altForme.types[1] : "");
	for (var i = 0; i < LEGACY_STATS[9].length; i++) {
		var baseStat = container.find("." + LEGACY_STATS[9][i]).find(".base");
		baseStat.val(altForme.bs[LEGACY_STATS[9][i]]);
		baseStat.keyup();
	}
	if (
		(startsWith($(this).val(), "Ogerpon") && endsWith($(this).val(), "Tera")) || $(this).val() === "Terapagos-Stellar"
	) {
		$(this).parent().siblings().find(".teraToggle").prop("checked", true);
	}
	var isRandoms = $("#randoms").prop("checked");
	var pokemonSets = isRandoms ? randdex[pokemonName] : setdex[pokemonName];
	var chosenSet = pokemonSets && pokemonSets[setName];
	var greninjaSet = $(this).val().indexOf("Greninja") !== -1;
	var isAltForme = $(this).val() !== pokemonName;
	if (isAltForme && abilities.indexOf(altForme.abilities[0]) !== -1 && !greninjaSet) {
		container.find(".ability").val(altForme.abilities[0]);
	} else if (greninjaSet) {
		$(this).parent().find(".ability");
	} else if (chosenSet) {
		if (!isRandoms) {
			container.find(".abilities").val(chosenSet.ability);
		} else {
			container.find(".ability").val(chosenSet.abilities[0]);
		}
	}
	var forcedTeraType = getForcedTeraType($(this).val());
	if (forcedTeraType) {
		$(this).parent().siblings().find(".teraType").val(forcedTeraType);
	}
	container.find(".ability").keyup();
	if (startsWith($(this).val(), "Ogerpon-") && !startsWith($(this).val(), "Ogerpon-Teal")) {
		container.find(".item").val($(this).val().split("-")[1] + " Mask").keyup();
	} else {
		container.find(".item").prop("disabled", false);
	}
});

$(".current-hp").keyup(function () {
	var max = $(this).parent().children(".max-hp").text();
	validate($(this), 0, max);
	var current = $(this).val();
	calcPercentHP($(this).parent(), max, current);
});
$(".percent-hp").keyup(function () {
	var max = $(this).parent().children(".max-hp").text();
	validate($(this), 0, 100);
	var percent = $(this).val();
	calcCurrentHP($(this).parent(), max, percent);
});

$(".ability").bind("keyup change", function () {
	var moveHits =
		$(this).val() === 'Skill Link' ? 5 :
			$(this).closest(".poke-info").find(".item").val() === 'Loaded Dice' ? 4 : 3;
	$(this).closest(".poke-info").find(".move-hits").val(moveHits);

	var ability = $(this).closest(".poke-info").find(".ability").val();

	var TOGGLE_ABILITIES = ['Flash Fire', 'Intimidate', 'Minus', 'Plus', 'Slow Start', 'Unburden', 'Stakeout', 'Teraform Zero'];

	if (TOGGLE_ABILITIES.indexOf(ability) >= 0) {
		$(this).closest(".poke-info").find(".abilityToggle").show();
	} else {
		$(this).closest(".poke-info").find(".abilityToggle").hide();
	}
	var boostedStat = $(this).closest(".poke-info").find(".boostedStat");

	if (ability === "Protosynthesis" || ability === "Quark Drive") {
		boostedStat.show();
		autosetQP($(this).closest(".poke-info"));
	} else {
		boostedStat.hide();
	}

	if (ability === "Supreme Overlord") {
		$(this).closest(".poke-info").find(".alliesFainted").show();
	} else {
		$(this).closest(".poke-info").find(".alliesFainted").val('0');
		$(this).closest(".poke-info").find(".alliesFainted").hide();

	}
});

$("input:radio[name='format']").change(function () {
	var gameType = $("input:radio[name='format']:checked").val();
	if (gameType === 'Singles') {
		$("input:checkbox[name='ruin']:checked").prop("checked", false);
	}
	$(".format-specific." + gameType.toLowerCase()).each(function () {
		if ($(this).hasClass("gen-specific") && !$(this).hasClass("g" + gen)) {
			return;
		}
		$(this).show();
	});
	$(".format-specific").not("." + gameType.toLowerCase()).hide();
});

var defaultLevel = 100;
$("input:radio[name='defaultLevel']").change(function () {
	defaultLevel = $("input:radio[name='defaultLevel']:checked").val();
	$("#levelL1").val(defaultLevel);
	$("#levelR1").val(defaultLevel);
	$("#levelL1").trigger("change");
	$("#levelR1").trigger("change");
});

// auto-calc stats and current HP on change
$(".level").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcHP(poke);
	calcStats(poke);
});
$(".nature").bind("keyup change", function () {
	calcStats($(this).closest(".poke-info"));
});
$(".hp .base, .hp .evs, .hp .ivs").bind("keyup change", function () {
	calcHP($(this).closest(".poke-info"));
});
$(".at .base, .at .evs, .at .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'at');
});
$(".df .base, .df .evs, .df .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'df');
});
$(".sa .base, .sa .evs, .sa .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'sa');
});
$(".sd .base, .sd .evs, .sd .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'sd');
});
$(".sp .base, .sp .evs, .sp .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'sp');
});
$(".sl .base, .sl .g1g2-evs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'sl');
});
$(".at .dvs, .at .g1g2-evs").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'at');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});
$(".df .dvs, .df .g1g2-evs").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'df');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});
$(".sa .dvs").bind("keyup change", function () {
    var poke = $(this).closest(".poke-info");
	calcStat(poke, 'sa');
    poke.find(".sd .dvs").val($(this).val());
    calcStat(poke, 'sd');
    poke.find(".hp .dvs").val(getHPDVs(poke));
    calcHP(poke);
});
$(".sa .g1g2-evs").bind("keyup change", function () {
    var poke = $(this).closest(".poke-info");
	calcStat(poke, 'sa');
    poke.find(".sd .g1g2-evs").val($(this).val());
    calcStat(poke, 'sd');
    poke.find(".hp .dvs").val(getHPDVs(poke));
    calcHP(poke);
});
$(".sp .dvs, .sp .g1g2-evs").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'sp');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});
$(".sl .dvs, .sl .g1g2-evs").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'sl');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});