function placeBsBtn() {
	var importBtn = "<button id='import' class='bs-btn bs-btn-default'>Import</button>";
	$("#import-1_wrapper").append(importBtn);

	$("#import.bs-btn").click(function () {
		var pokes = document.getElementsByClassName("import-team-text")[0].value;
		var name = document.getElementsByClassName("import-name-text")[0].value.trim() === "" ? "Custom Set" : document.getElementsByClassName("import-name-text")[0].value;
		addSets(pokes, name);
	});
}

function ExportPokemon(pokeInfo) {
	var pokemon = createPokemon(pokeInfo);
	var EV_counter = 0;
	var finalText = "";
	finalText = pokemon.name + (pokemon.item ? " @ " + pokemon.item : "") + "\n";
	finalText += "Level: " + pokemon.level + "\n";
	finalText += pokemon.nature && gen > 2 ? pokemon.nature + " Nature" + "\n" : "";
	if (gen === 9) {
		var teraType = pokeInfo.find(".teraType").val();
		if (teraType !== undefined && teraType !== pokemon.types[0]) {
			finalText += "Tera Type: " + teraType + "\n";
		}
	}
	finalText += pokemon.ability ? "Ability: " + pokemon.ability + "\n" : "";
	var EVs_Array = [];
	for (var stat in pokemon.evs) {
		var ev = pokemon.evs[stat] ? pokemon.evs[stat] : 0;
		if (ev > 0) {
			EVs_Array.push(ev + " " + calc.Stats.displayStat(stat));
		}
		EV_counter += ev;
		if (gen == 1) {
			if (EV_counter > 65535 * 5) break;
		} else if (gen == 2) {
			if (EV_counter > 65535 * 6) break;
		} else {
			if (EV_counter > 510) break;
		}
	}
	if (EVs_Array.length > 0) {
		finalText += "EVs: ";
		finalText += serialize(EVs_Array, " / ");
		finalText += "\n";
	}

	var IVs_Array = [];
	for (var stat in pokemon.ivs) {
		var iv = pokemon.ivs[stat] ? pokemon.ivs[stat] : 0;
		if (gen > 2) {
			if (iv < 31) {
				IVs_Array.push(iv + " " + calc.Stats.displayStat(stat));
			}
		} else if (iv < 15) {
			IVs_Array.push(iv + " " + calc.Stats.displayStat(stat));
		}
	}
	if (IVs_Array.length > 0) {
		finalText += "IVs: ";
		finalText += serialize(IVs_Array, " / ");
		finalText += "\n";
	}

	for (var i = 0; i < 4; i++) {
		var moveName = pokemon.moves[i].name;
		if (moveName !== "(No Move)") {
			finalText += "- " + moveName + "\n";
		}
	}
	finalText = finalText.trim();
	$("textarea.import-team-text").val(finalText);
}

$("#save-set").click(function () {
	ExportPokemon($("#p1"));
	var pokes = document.getElementsByClassName("import-team-text")[0].value;
	var name = document.getElementsByClassName("import-name-text")[0].value.trim() === "" ? "Custom Set" : document.getElementsByClassName("import-name-text")[0].value;
	addSets(pokes, name);
});

$("#exportL").click(function () {
	ExportPokemon($("#p1"));
});

$("#exportR").click(function () {
	ExportPokemon($("#p2"));
});

function serialize(array, separator) {
	var text = "";
	for (var i = 0; i < array.length; i++) {
		if (i < array.length - 1) {
			text += array[i] + separator;
		} else {
			text += array[i];
		}
	}
	return text;
}

function getAbility(row) {
	var ability = row[1] ? row[1].trim() : '';
	if (calc.ABILITIES[9].indexOf(ability) !== -1) return ability;
}

function getTeraType(row) {
	var teraType = row[1] ? row[1].trim() : '';
	if (Object.keys(calc.TYPE_CHART[9]).slice(1).indexOf(teraType) !== -1) return teraType;
}

function statToLegacyStat(stat) {
	switch (stat) {
	case 'hp':
		return "hp";
	case 'atk':
		return "at";
	case 'def':
		return "df";
	case 'spa':
		return (gen > 1) ? "sa" : "sl";
	case 'spd':
		return "sd";
	case 'spe':
		return "sp";
	}
}

function getStats(currentPoke, rows, offset) {
	currentPoke.nature = "Serious";
	var currentEV;
	var currentIV;
	var currentAbility;
	var currentTeraType;
	var currentNature;
	currentPoke.level = 100;
	for (var x = offset; x < offset + 9; x++) {
		var currentRow = rows[x] ? rows[x].split(/[/:]/) : '';
		var evs = {};
		var ivs = {};
		var ev;
		var j;

		switch (currentRow[0]) {
		case 'Level':
			currentPoke.level = parseInt(currentRow[1].trim());
			break;
		case 'EVs':
			for (j = 1; j < currentRow.length; j++) {
				currentEV = currentRow[j].trim().split(" ");
				currentEV[1] = statToLegacyStat(currentEV[1].toLowerCase());
				evs[currentEV[1]] = parseInt(currentEV[0]);
			}
			currentPoke.evs = evs;
			break;
		case 'IVs':
			for (j = 1; j < currentRow.length; j++) {
				currentIV = currentRow[j].trim().split(" ");
				currentIV[1] = statToLegacyStat(currentIV[1].toLowerCase());
				ivs[currentIV[1]] = parseInt(currentIV[0]);
			}
			currentPoke.ivs = ivs;
			break;

		}
		currentAbility = rows[x] ? rows[x].trim().split(":") : '';
		if (currentAbility[0] == "Ability") {
			currentPoke.ability = currentAbility[1].trim();
		}

		currentTeraType = rows[x] ? rows[x].trim().split(":") : '';
		if (currentTeraType[0] == "Tera Type") {
			currentPoke.teraType = currentTeraType[1].trim();
		}

		currentNature = rows[x] ? rows[x].trim().split(" ") : '';
		if (currentNature[1] == "Nature") {
			currentPoke.nature = currentNature[0];
		}
	}
	return currentPoke;
}

function getItem(currentRow, j) {
	for (;j < currentRow.length; j++) {
		var item = currentRow[j].trim();
		if (calc.ITEMS[9].indexOf(item) != -1) {
			return item;
		}
	}
}

function getMoves(currentPoke, rows, offset) {
	var movesFound = false;
	var moves = [];
	for (var x = offset; x < offset + 12; x++) {
		if (rows[x]) {
			if (rows[x][0] == "-") {
				movesFound = true;
				var move = rows[x].substr(2, rows[x].length - 2).replace("[", "").replace("]", "").replace("  ", "");
				moves.push(move);
			} else {
				if (movesFound == true) {
					break;
				}
			}
		}
	}
	currentPoke.moves = moves;
	return currentPoke;
}

function addToDex(poke) {
	var dexObject = {};
	if ($("#randoms").prop("checked")) {
		if (GEN9RANDOMBATTLE[poke.name] == undefined) GEN9RANDOMBATTLE[poke.name] = {};
		if (GEN8RANDOMBATTLE[poke.name] == undefined) GEN8RANDOMBATTLE[poke.name] = {};
		if (GEN7RANDOMBATTLE[poke.name] == undefined) GEN7RANDOMBATTLE[poke.name] = {};
		if (GEN6RANDOMBATTLE[poke.name] == undefined) GEN6RANDOMBATTLE[poke.name] = {};
		if (GEN5RANDOMBATTLE[poke.name] == undefined) GEN5RANDOMBATTLE[poke.name] = {};
		if (GEN4RANDOMBATTLE[poke.name] == undefined) GEN4RANDOMBATTLE[poke.name] = {};
		if (GEN3RANDOMBATTLE[poke.name] == undefined) GEN3RANDOMBATTLE[poke.name] = {};
		if (GEN2RANDOMBATTLE[poke.name] == undefined) GEN2RANDOMBATTLE[poke.name] = {};
		if (GEN1RANDOMBATTLE[poke.name] == undefined) GEN1RANDOMBATTLE[poke.name] = {};
	} else {
		if (SETDEX_SV[poke.name] == undefined) SETDEX_SV[poke.name] = {};
		if (SETDEX_SS[poke.name] == undefined) SETDEX_SS[poke.name] = {};
		if (SETDEX_SM[poke.name] == undefined) SETDEX_SM[poke.name] = {};
		if (SETDEX_XY[poke.name] == undefined) SETDEX_XY[poke.name] = {};
		if (SETDEX_BW[poke.name] == undefined) SETDEX_BW[poke.name] = {};
		if (SETDEX_DPP[poke.name] == undefined) SETDEX_DPP[poke.name] = {};
		if (SETDEX_ADV[poke.name] == undefined) SETDEX_ADV[poke.name] = {};
		if (SETDEX_GSC[poke.name] == undefined) SETDEX_GSC[poke.name] = {};
		if (SETDEX_RBY[poke.name] == undefined) SETDEX_RBY[poke.name] = {};
	}
	if (poke.ability !== undefined) {
		dexObject.ability = poke.ability;
	}
	if (poke.teraType !== undefined) {
		dexObject.teraType = poke.teraType;
	}
	dexObject.level = poke.level;
	dexObject.evs = poke.evs;
	dexObject.ivs = poke.ivs;
	dexObject.moves = poke.moves;
	dexObject.nature = poke.nature;
	dexObject.item = poke.item;
	dexObject.isCustomSet = poke.isCustomSet;
	var customsets;
	if (localStorage.customsets) {
		customsets = JSON.parse(localStorage.customsets);
	} else {
		customsets = {};
	}
	if (!customsets[poke.name]) {
		customsets[poke.name] = {};
	}
	customsets[poke.name][poke.nameProp] = dexObject;
	if (poke.name === "Aegislash-Blade") {
		if (!customsets["Aegislash-Shield"]) {
			customsets["Aegislash-Shield"] = {};
		}
		customsets["Aegislash-Shield"][poke.nameProp] = dexObject;
	}
	updateDex(customsets);
}

function updateDex(customsets) {
	for (var pokemon in customsets) {
		for (var moveset in customsets[pokemon]) {
			if (!SETDEX_SV[pokemon]) SETDEX_SV[pokemon] = {};
			SETDEX_SV[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_SS[pokemon]) SETDEX_SS[pokemon] = {};
			SETDEX_SS[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_SM[pokemon]) SETDEX_SM[pokemon] = {};
			SETDEX_SM[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_XY[pokemon]) SETDEX_XY[pokemon] = {};
			SETDEX_XY[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_BW[pokemon]) SETDEX_BW[pokemon] = {};
			SETDEX_BW[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_DPP[pokemon]) SETDEX_DPP[pokemon] = {};
			SETDEX_DPP[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_ADV[pokemon]) SETDEX_ADV[pokemon] = {};
			SETDEX_ADV[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_GSC[pokemon]) SETDEX_GSC[pokemon] = {};
			SETDEX_GSC[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_RBY[pokemon]) SETDEX_RBY[pokemon] = {};
			SETDEX_RBY[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_RB[pokemon]) CUSTOMSETDEX_RB[pokemon] = {};
			CUSTOMSETDEX_RB[pokemon][moveset] = customsets[pokemon][moveset];
			if(!CUSTOMSETDEX_Y[pokemon]) CUSTOMSETDEX_Y[pokemon] = {};
			CUSTOMSETDEX_Y[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_GS[pokemon]) CUSTOMSETDEX_GS[pokemon] = {};
			CUSTOMSETDEX_GS[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_C[pokemon]) CUSTOMSETDEX_C[pokemon] = {};
			CUSTOMSETDEX_C[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_RS[pokemon]) CUSTOMSETDEX_RS[pokemon] = {};
			CUSTOMSETDEX_RS[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_E[pokemon]) CUSTOMSETDEX_E[pokemon] = {};
			CUSTOMSETDEX_E[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_FRLG[pokemon]) CUSTOMSETDEX_FRLG[pokemon] = {};
			CUSTOMSETDEX_FRLG[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_DP[pokemon]) CUSTOMSETDEX_DP[pokemon] = {};
			CUSTOMSETDEX_DP[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_Pl[pokemon]) CUSTOMSETDEX_Pl[pokemon] = {};
			CUSTOMSETDEX_Pl[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_HGSS[pokemon]) CUSTOMSETDEX_HGSS[pokemon] = {};
			CUSTOMSETDEX_HGSS[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_BW[pokemon]) CUSTOMSETDEX_BW[pokemon] = {};
			CUSTOMSETDEX_BW[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_B2W2[pokemon]) CUSTOMSETDEX_B2W2[pokemon] = {};
			CUSTOMSETDEX_B2W2[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_B2W2HC[pokemon]) CUSTOMSETDEX_B2W2HC[pokemon] = {};
			CUSTOMSETDEX_B2W2HC[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_XY[pokemon]) CUSTOMSETDEX_XY[pokemon] = {};
			CUSTOMSETDEX_XY[pokemon][moveset] = customsets[pokemon][moveset];
			if(!CUSTOMSETDEX_ORAS[pokemon]) CUSTOMSETDEX_ORAS[pokemon] = {};
			CUSTOMSETDEX_ORAS[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_SM[pokemon]) CUSTOMSETDEX_SM[pokemon] = {};
			CUSTOMSETDEX_SM[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_USUM[pokemon]) CUSTOMSETDEX_USUM[pokemon] = {};
			CUSTOMSETDEX_USUM[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_SS[pokemon]) CUSTOMSETDEX_SS[pokemon] = {};
			CUSTOMSETDEX_SS[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_BDSP[pokemon]) CUSTOMSETDEX_BDSP[pokemon] = {};
			CUSTOMSETDEX_BDSP[pokemon][moveset] = customsets[pokemon][moveset];
			if (!CUSTOMSETDEX_SV[pokemon]) CUSTOMSETDEX_SV[pokemon] = {};
			CUSTOMSETDEX_SV[pokemon][moveset] = customsets[pokemon][moveset]
		}
	}
	localStorage.customsets = JSON.stringify(customsets);
}

function get_held_items() {
    var all_sets = [
        {}, 
		typeof SETDEX_RBY === 'undefined' ? {} : SETDEX_RBY,
		typeof SETDEX_GSC === 'undefined' ? {} : SETDEX_GSC,
		typeof SETDEX_ADV === 'undefined' ? {} : SETDEX_ADV,
		typeof SETDEX_DPP === 'undefined' ? {} : SETDEX_DPP,
		typeof SETDEX_BW === 'undefined' ? {} : SETDEX_BW,
		typeof SETDEX_XY === 'undefined' ? {} : SETDEX_XY,
		typeof SETDEX_SM === 'undefined' ? {} : SETDEX_SM,
		typeof SETDEX_SS === 'undefined' ? {} : SETDEX_SS,
		typeof SETDEX_SV === 'undefined' ? {} : SETDEX_SV,
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
    
    var held_items = [];

    all_sets.forEach(function(set) {
        for (const [pok_name, poks] of Object.entries(set)) {
            var pok_tr_names = Object.keys(poks);
            for (var i = 0; i < pok_tr_names.length; i++) {
                var item = poks[pok_tr_names[i]]["item"];

                held_items.push(`${item}`);
			}
		}
    });

    return held_items;
}

// Function to get box and generate HTML for draggable items
function get_box() {
		var names = get_trainer_names();
		var items = get_held_items();
		var box = [];
	
		// Object to keep track of encountered custom entries
		var encounteredCustom = {};
	
		// Clear the content of the default div
		document.getElementById('box-poke-list').innerHTML = "";
	
		for (var i = 0; i < names.length; i++) {
			if (names[i].includes("Custom")) {
				var customName = names[i].split(" (")[0];
				var heldItem = items[i];
				var item_name = heldItem.toLowerCase().replace(" ", "_");
	
				// Check if this custom entry has been encountered before
				if (!encounteredCustom[customName]) {
					encounteredCustom[customName] = true;
	
					// Push the custom name to the box array
					box.push(customName);
	
					// Extract the Pokémon name from the custom name
					var pok_name = customName.split(" (")[0];
					switch (pok_name) {
						case "Zygarde-10%":
							pok_name = "Zygarde-10%25";
							break;
						case "Flabébé":
							pok_name = "Flabébé";
							break;
						case "Pumpkaboo-Large":
						case "Pumpkaboo-Super":
						case "Pumpkaboo-Small":
							pok_name = "Pumpkaboo";
							break;
						case "Aegislash-Blade":
						case "Aegislash-Shield":
						case "Aegislash-Both":
							pok_name = "Aegislash";
							break;
					}
	
					const container = document.createElement('div');
					container.id = `pok-${i}`;
					container.className = 'trainer-pok left-side flipped-image draggable-pok';
					container.setAttribute('draggable', 'true');
					container.dataset.id = `${customName} (Custom Set)`;
					container.title = `${customName} (Custom Set)`;
					container.style.position = 'relative';
	
					const pok = new Image();
					var pok_img = `https://raw.githubusercontent.com/KinglerChamp/Sprites-for-calc/master/${pok_name}.png`;
					pok.src = pok_img;
					pok.setAttribute('draggable', 'false');
					pok.style.width = '100%';

					const item = new Image();
					var item_img = `https://raw.githubusercontent.com/PurpleYoyo/Little-Emerald-Calc/main/items/${item_name}.png`;
					item.src = item_img;
					item.setAttribute('draggable', 'false');
					item.style.top = '40%';
					item.style.left = 0;
					item.style.width = '50%';
					item.style.position = 'absolute';

					pok.onload = function() {
						container.appendChild(pok);
					}
					pok.onerror = function() {
						var err = new Image();
						err.src = `https://raw.githubusercontent.com/PurpleYoyo/Little-Emerald-Calc/main/items/unknown.png`;
						err.setAttribute('draggable', 'false');
						err.style.width = '100%';
						container.appendChild(err);
					}
					
					item.onload = function() {
						if (item_name != "undefined") {
							container.appendChild(item);
						}
					}
	
					// Add dragstart event listener
					container.addEventListener('dragstart', dragStart);
					container.addEventListener('dragend', dragEnd);
	
					// Append the Pokémon sprite to the default box-poke-list drop zone
					document.getElementById('box-poke-list').appendChild(container);
				}
			}
		}
	
		// Add drag and drop event listeners to the dynamically generated elements
		const dropzones = document.querySelectorAll('.dropzone');
	
		dropzones.forEach(zone => {
			zone.addEventListener('dragover', dragOver);
			zone.addEventListener('drop', drop);
			zone.addEventListener('dragleave', dragLeave);
		});
	
		// Return the box array (optional)
		return box;
}
		
// Function to handle the start of a drag event
function dragStart(event) {
	event.dataTransfer.setData('text/plain', event.target.id); // Set the drag data to the ID of the target
	event.target.classList.add('dragging'); // Add a class to indicate dragging
	setTimeout(() => {
		event.target.style.display = 'none'; // Hide the element to prevent duplicate display
	}, 0);
}

// Function to handle the end of a drag event
function dragEnd(event) {
	event.target.classList.remove('dragging'); // Remove the dragging class
	event.target.style.display = 'block'; // Show the element again
}

// Function to handle drag-over events
function dragOver(event) {
	event.preventDefault(); // Prevent default behavior to allow drop
	event.currentTarget.classList.add('dragover'); // Add a class to indicate the drag-over state
}

// Function to handle drop events
function drop(event) {
	event.preventDefault(); // Prevent default behavior
	const id = event.dataTransfer.getData('text/plain'); // Get the ID of the dragged element
	const draggable = document.getElementById(id); // Get the draggable element using the ID
	event.currentTarget.classList.remove('dragover'); // Remove the drag-over class
	event.currentTarget.appendChild(draggable); // Append the draggable element to the drop zone
	draggable.style.display = 'block'; // Ensure the element is visible after dropping
}

// Function to handle drag-leave events
function dragLeave(event) {
	event.currentTarget.classList.remove('dragover'); // Remove the drag-over class
}
function addSets(pokes, name) {
	var rows = pokes.split("\n");
	var currentRow;
	var currentPoke;
	var addedpokes = 0;
	for (var i = 0; i < rows.length; i++) {
		currentRow = rows[i].split(/[()@]/);
		for (var j = 0; j < currentRow.length; j++) {
			currentRow[j] = checkExeptions(currentRow[j].trim());
			if (calc.SPECIES[9][currentRow[j].trim()] !== undefined) {
				currentPoke = calc.SPECIES[9][currentRow[j].trim()];
				currentPoke.name = currentRow[j].trim();
				currentPoke.item = getItem(currentRow, j + 1);
				if (j === 1 && currentRow[0].trim()) {
					currentPoke.nameProp = "Custom Set";
				} else {
					currentPoke.nameProp = "Custom Set";
				}
				currentPoke.isCustomSet = true;
				currentPoke.ability = getAbility(rows[i + 1].split(":"));
				currentPoke.teraType = getTeraType(rows[i + 1].split(":"));
				currentPoke = getStats(currentPoke, rows, i + 1);
				currentPoke = getMoves(currentPoke, rows, i);
				addToDex(currentPoke);
				addedpokes++;
			}
		}
	}
	if (addedpokes > 0) {
		get_box()
		console.log("Successfully imported " + addedpokes + " set(s)."); // Debugging
	} else {
		alert("No sets imported, please check your syntax and try again");
	}	
}

function checkExeptions(poke) {
	switch (poke) {
	case 'Aegislash':
		poke = "Aegislash-Blade";
		break;
	case 'Basculin-Blue-Striped':
		poke = "Basculin";
		break;
	case 'Gastrodon-East':
		poke = "Gastrodon";
		break;
	case 'Mimikyu-Busted-Totem':
		poke = "Mimikyu-Totem";
		break;
	case 'Mimikyu-Busted':
		poke = "Mimikyu";
		break;
	case 'Pikachu-Belle':
	case 'Pikachu-Cosplay':
	case 'Pikachu-Libre':
	case 'Pikachu-Original':
	case 'Pikachu-Partner':
	case 'Pikachu-PhD':
	case 'Pikachu-Pop-Star':
	case 'Pikachu-Rock-Star':
		poke = "Pikachu";
		break;
	case 'Vivillon-Fancy':
	case 'Vivillon-Pokeball':
		poke = "Vivillon";
		break;
	case 'Florges-White':
	case 'Florges-Blue':
	case 'Florges-Orange':
	case 'Florges-Yellow':
		poke = "Florges";
		break;
	case 'Shellos-East':
		poke = "Shellos";
		break;
	case 'Deerling-Summer':
	case 'Deerling-Autumn':
	case 'Deerling-Winter':
		poke = "Deerling";
		break;
	}
	return poke;

}

$(allPokemon("#clearSets")).click(function () {
	if (confirm("Are you sure you want to delete your custom sets? This action cannot be undone.")) {
		localStorage.removeItem("customsets");
		alert("Custom Sets successfully cleared. Please refresh the page.");
		$(allPokemon("#importedSetsOptions")).hide();
		loadDefaultLists();
$('.player-poks').html("")
	}
});

$(allPokemon("#importedSets")).click(function () {
	var pokeID = $(this).parent().parent().prop("id");
	var showCustomSets = $(this).prop("checked");
	if (showCustomSets) {
		loadCustomList(pokeID);
	} else {
		loadDefaultLists();
	}
});

$(document).ready(function () {
	var customSets;
	placeBsBtn();
	if (localStorage.customsets) {
		customSets = JSON.parse(localStorage.customsets);
		updateDex(customSets);
		$(allPokemon("#importedSetsOptions")).css("display", "flex");
	} else {
		loadDefaultLists();
	}

});




