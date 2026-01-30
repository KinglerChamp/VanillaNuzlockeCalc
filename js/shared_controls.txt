/*
This file houses code that both update.js and moveset_import.js use.
*/

function check_name_exeptions(poke) {
    var pok_name = "Ditto";

	switch (poke) {
	case 'Basculin-Blue-Striped':
		pok_name = "Basculin";
		break;
	case 'Gastrodon-East':
		pok_name = "Gastrodon";
		break;
	case 'Mimikyu-Busted-Totem':
		pok_name = "Mimikyu-Totem";
		break;
	case 'Mimikyu-Busted':
		pok_name = "Mimikyu";
		break;
	case 'Pikachu-Belle':
	case 'Pikachu-Cosplay':
	case 'Pikachu-Libre':
	case 'Pikachu-Original':
	case 'Pikachu-Partner':
	case 'Pikachu-PhD':
	case 'Pikachu-Pop-Star':
	case 'Pikachu-Rock-Star':
		pok_name = "Pikachu";
		break;
	case 'Vivillon-Fancy':
	case 'Vivillon-Pokeball':
		pok_name = "Vivillon";
		break;
	case 'Florges-White':
	case 'Florges-Blue':
	case 'Florges-Orange':
	case 'Florges-Yellow':
		pok_name = "Florges";
		break;
	case 'Shellos-East':
		pok_name = "Shellos";
		break;
	case 'Deerling-Summer':
	case 'Deerling-Autumn':
	case 'Deerling-Winter':
		pok_name = "Deerling";
		break;
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
    case "Deerling-Spring":		
	case "Deerling-Summer":
	case "Deerling-Winter":
	case "Deerling-Autumn":
		pok_name = "Deerling";
	case "Burmy-Plant":
	case "Burmy-Sandy":
	case "Burmy-Trash":
		pok_name = "Burmy";
    
    // Little Emerald Forms
	case "Snorunt-Ghost":
		pok_name = "Snorunt";
	case "Charcadet-Psychic":
	case "Charcadet-Ghost":
		pok_name = "Charcadet";
	case "Magikarp-Monster":
		pok_name = "Magikarp";
	case "Ralts-Fighting":
		pok_name = "Ralts";
	case "Pichu-Mega":
		pok_name = "Pikachu";
	case "Cleffa-Mega":
		pok_name = "Clefairy";				
	case "Igglybuff-Mega":
		pok_name = "Jigglypuff";
	case "Togepi-Mega":
		pok_name = "Togetic";
	case "Tyrogue-Mega-C":
		pok_name = "Hitmonchan";
	case "Tyrogue-Mega-L":
		pok_name = "Hitmonlee";
	case "Tyrogue-Mega-T":
		pok_name = "Hitmontop";
	case "Elekid-Mega":
		pok_name = "Electabuzz";
	case "Magby-Mega":
		pok_name = "Magmar";
	case "Smoochum-Mega":
		pok_name = "Jynx";
	case "Azurill-Mega":
		pok_name = "Wynaut";
	case "Toxel-Mega-A":
		pok_name = "Toxtricity";
	case "Toxel-Mega-L":
		pok_name = "Toxtricity-Low-Key";
	case "Mime Jr.-Mega-K":
		pok_name = "Mr. Mime";
	case "Mime Jr.-Mega-G":
		pok_name = "Mr. Mime-Galar";
	case "Wurmple-Poison":
		pok_name = "Wurmple";
	case "Nincada-Ghost":
		pok_name = "Nincada";
	case "Exeggcute-Dragon":
		pok_name = "Exeggcute";
	case "Koffing-Fairy":
		pok_name = "Koffing";
	case "Petilil-Fighting":
		pok_name = "Petilil";
	case "Rufflet-Psychic":
		pok_name = "Rufflet";
	case "Goomy-Steel":
		pok_name = "Goomy";
	case "Bergmite-Rock":
		pok_name = "Bergmite";
	case "Froakie-Special":
		pok_name = "Froakie";
	case "Rockruff-Special":
		pok_name = "Rockruff";
    case 'Eevee-Electric':
    case 'Eevee-Water':
    case 'Eevee-Fire':
    case 'Eevee-Grass':
    case 'Eevee-Ice':
    case 'Eevee-Dark':
    case 'Eevee-Psychic':
    case 'Eevee-Fairy':
    case 'Eevee-Starter-Electric':
    case 'Eevee-Starter-Water':
    case 'Eevee-Starter-Fire':
    case 'Eevee-Starter-Grass':
    case 'Eevee-Starter-Ice':
    case 'Eevee-Starter-Dark':
    case 'Eevee-Starter-Psychic':
    case 'Eevee-Starter-Fairy':
        pok_name = "Eevee";
        break;
	}

	return pok_name;
}

function get_team_indices() {
    var teamChildren = document.getElementById('team-poke-list').children;
	var teamIndices = [];
	for (var i = 0; i < teamChildren.length; i++) {
		teamIndices.push(teamChildren[i].id);
	}   

    return teamIndices;
}

function create_tooltip(customName, setData) {
    var ttp_setName = `${customName} (Custom Set)`;
	var ttp_level = setData.level;
	var ttp_ability = setData.ability;
	var ttp_nature = setData.nature;

    var moves = setData.moves;
	var move1 = moves[0];
	var move2 = moves[1];
	var move3 = moves[2];
	var move4 = moves[3];
	
	var title = ttp_setName;

	if (ttp_level != undefined) {
		title += `\nLevel: ${ttp_level}`;
	}
	if (ttp_nature != undefined) {
		title += `\nNature: ${ttp_nature}`;
	}
	if (ttp_ability != undefined) {
		title += `\nAbility: ${ttp_ability}`;
	}
	if (move1 != undefined) {
		title += `\n-${move1}`;
	}
	if (move2 != undefined) {
		title += `\n-${move2}`;
	}
	if (move3 != undefined) {
		title += `\n-${move3}`;
	}
	if (move4 != undefined) {
		title += `\n-${move4}`;
	}

    return title;
}

function create_sprites(customName, setData, pokId = undefined) {
    var tooltip = create_tooltip(customName, setData);

    var heldItem = setData.item;
	var itemName = heldItem.toLowerCase().replace(" ", "_");

    // Create a container for the mon sprie and held item sprite
    const container = document.createElement('div');
	
	if (pokId != undefined) {
    	container.id = pokId;
	}

	container.className = 'trainer-pok left-side flipped-image draggable-pok';
	container.setAttribute('draggable', 'true');
	container.dataset.id = `${customName} (Custom Set)`;
	container.title = tooltip;
	container.style.position = 'relative';

    const pok = new Image();
    pok.src = `https://raw.githubusercontent.com/KinglerChamp/Sprites-for-calc/master/${customName}.png`;
	
    pok.setAttribute('draggable', 'false');
	pok.style.width = '100%';

    pok.onload = function() {
		container.appendChild(pok);
	}
	pok.onerror = function() { // If the sprite is not found, use the question mark sprite
		var err = new Image();
		err.src = `https://raw.githubusercontent.com/PurpleYoyo/Little-Emerald-Calc/main/items/unknown.png`;

		err.setAttribute('draggable', 'false');
		err.style.width = '100%';
		container.appendChild(err);
	}
	
    const item = new Image();
	item.src = `https://raw.githubusercontent.com/PurpleYoyo/Little-Emerald-Calc/main/items/${itemName}.png`;
	
    item.setAttribute('draggable', 'false');
	item.style.top = '40%';
	item.style.left = 0;
	item.style.width = '50%';
	item.style.position = 'absolute';
	
	item.onload = function() { // If the sprite is not found, don't append anything
		if (item_name != undefined) {
			container.appendChild(item);
		}
	}

    return container
}

function repopulate_boxes(box1_html, box2_html, trash_html, team_html) {
    // Clear the content of the boxes
	document.getElementById('box-poke-list').innerHTML = "";
	document.getElementById('box-poke-list2').innerHTML = "";
	document.getElementById('trash-box').innerHTML = "";
	document.getElementById('team-poke-list').innerHTML = "";

    // Loop through the arrays and add the containers to the corresponding boxes
	for (var i = 0; i < box1_html.length; i++) {
		document.getElementById('box-poke-list').appendChild(box1_html[i]);
	}

	for (var i = 0; i < box2_html.length; i++) {
		document.getElementById('box-poke-list2').appendChild(box2_html[i]);
	}

	for (var i = 0; i < trash_html.length; i++) {
		document.getElementById('trash-box').appendChild(trash_html[i]);
	}

    // In order to preserve team order, first sort by the index
	team_html.sort((a, b) => a.index - b.index).forEach(value => {
		document.getElementById('team-poke-list').appendChild(value.html);
	});
}

function get_sets(setName = undefined) {
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

    var sets = [];

    all_sets.forEach(set => {
        // Set structure: "[pokemon]: { set_name1: { set1 } }, { set_name2: { set2 } }, ..."
        Object.values(set).forEach(pok_sets => {
            Object.entries(pok_sets).forEach(([set_name, set_data]) => {
				if (
					setName == undefined ||
					setName.includes(set_name)
				) {
                	sets.push({
 	                    name: set_name,
    	            	data: set_data
        	        });
				}
            });
        });
    });

    return sets;
}

function create_display_sprites() {
	var playerSetName = $(".set-selector.player").val();
	var playerImageUrl = `https://raw.githubusercontent.com/KinglerChamp/Sprites-for-calc/master/${playerSetName.split(" (")[0]}.png`;

    // Create a new style rule for background image
    const playerStyle = document.createElement('style');
    playerStyle.textContent = `
        .move-result-group > div:first-child::before {
            background-image: url("${playerImageUrl}");
        }
	    .move-result-group::before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            height: 100px;
            /* border: 1px solid red; */
            background-color: rgb(78, 80, 95);
            border-radius: 8px;
            }      
    `;

    // Append the style rule to the document head
    document.head.appendChild(playerStyle);

	var opponentSetName = $(".set-selector.opposing").val();
	var opponentImageUrl = `https://raw.githubusercontent.com/KinglerChamp/Sprites-for-calc/master/${opponentSetName.split(" (")[0]}.png`;

    // Create a new style rule for background image
    const opponentStyle = document.createElement('style');
    opponentStyle.textContent = `
        .move-result-group > div:last-child::before {
            background-image: url("${opponentImageUrl}");
        }
	    .move-result-group::before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            height: 100px;
            /* border: 1px solid red; */
            background-color: rgb(78, 80, 95);
            border-radius: 8px;
            }      
    `;

	// Append the style rule to the document head
    document.head.appendChild(opponentStyle);
}

function get_box() {
	var sets = get_sets();
	var box = []; // What is this for?

	// Object to keep track of encountered custom entries
	var encounteredCustom = {};

	create_display_sprites();

	var curBox;
    // Create arrays to store the HTML
	var box1_html = [];
	var box2_html = [];
	var team_html = [];
	var trash_html = [];

    // Get the current indices of each sprite in the team area
	teamIndices = get_team_indices();

	for (var i = 0; i < sets.length; i++) {
        var setName = sets[i].name;
        var setData = sets[i].data;

		if (setName.includes("Custom")) {
            var pokId = `pok-${i}`;

            // Check if the child already exists, if so, store the area that it is in
			var child = document.getElementById(pokId);
			if (child) {
				var curBox = child.parentElement.id;
			}

			var pokName = setName.split(" (")[0];

			// Check if this custom entry has been encountered before
			if (!encounteredCustom[pokName]) {
				encounteredCustom[pokName] = true;

				// Push the custom name to the box array
				box.push(pokName);
				
				var container = create_sprites(check_name_exeptions(pokName), setData, pokId)

				// Add drag event listeners
				container.addEventListener('dragstart', dragStart);
				container.addEventListener('dragend', dragEnd);
				
                // Put the container into the corresponding array; this preserves the box each sprite was in on import instead of just dupming them all in box 1
				switch (curBox) {
					default:
					case "box-poke-list":
						box1_html.push(container);
						break;
					case "box-poke-list2":
						box2_html.push(container);
						break;
					case "trash-box":
						trash_html.push(container);
						break;
					case "team-poke-list":
                        // Push the index as well as the container; this is done to preserve party order on import
						team_html.push({ 'html': container, 'index': teamPoks.indexOf(container.id) });
						break;
				}
			}
		}
	}

	repopulate_boxes(box1_html, box2_html, trash_html, team_html);

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

/*
Drag listeners for the player's boxes
*/

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

function loadDefaultLists() {
	$(".set-selector").select2({
		formatResult: function (object) {
			if ($("#randoms").prop("checked")) {
				return object.pokemon;
			} else {
				return object.set ? ("&nbsp;&nbsp;&nbsp;" + object.text) : ("<b>" + object.text + "</b>");
			}
		},

		query: function (query) {
			var pageSize = 30;
			var results = [];
			var options = getSetOptions();

			for (var i = 0; i < options.length; i++) {
				var option = options[i];
				var fullName = option.text.toUpperCase();
				if (!query.term || query.term.toUpperCase().split(" ").every(function (term) {
					return fullName.indexOf(term) === 0
						|| fullName.indexOf("-" + term) >= 0
						|| fullName.indexOf(" " + term) >= 0
						|| fullName.indexOf("(" + term) >= 0;
				})) {
					if ($("#randoms").prop("checked")) {
						if (option.id) {
							results.push(option);
						}
					}
					else {
						results.push(option);
					}
				}
			}

			query.callback({
				results: results.slice((query.page - 1) * pageSize, query.page * pageSize),
				more: results.length >= query.page * pageSize
			});
		},
		
		initSelection: function (element, callback) {
			callback(getFirstValidSetOption());
		}
	});
}

function getSetOptions(sets) {
	var setsHolder = sets;
	if (setsHolder === undefined) {
		setsHolder = pokedex;
	}
	var pokeNames = Object.keys(setsHolder);
	pokeNames.sort();
	var setOptions = [];
	for (var i = 0; i < pokeNames.length; i++) {
		var pokeName = pokeNames[i];
		setOptions.push({
			pokemon: pokeName,
			text: pokeName
		});
		if ($("#randoms").prop("checked")) {
			if (pokeName in randdex) {
				setOptions.push({
					pokemon: pokeName,
					set: 'Randoms Set',
					text: pokeName + " (Randoms)",
					id: pokeName + " (Randoms)"
				});
			}
		} else {
			if (pokeName in setdex) {
				var setNames = Object.keys(setdex[pokeName]);
				for (var j = 0; j < setNames.length; j++) {
					var setName = setNames[j];
					setOptions.push({
						pokemon: pokeName,
						set: setName,
						text: pokeName + " (" + setName + ")",
						id: pokeName + " (" + setName + ")",
						isCustom: setdex[pokeName][setName].isCustomSet,
						nickname: setdex[pokeName][setName].nickname || ""
					});
				}
			}
			setOptions.push({
				pokemon: pokeName,
				set: "Blank Set",
				text: pokeName + " (Blank Set)",
				id: pokeName + " (Blank Set)"
			});
		}
	}
	return setOptions;
}

function getFirstValidSetOption() {
	var sets = getSetOptions();
	// NB: The first set is never valid, so we start searching after it.
	for (var i = 1; i < sets.length; i++) {
		if (sets[i].id && sets[i].id.indexOf('(Blank Set)') === -1) return sets[i];
	}
	return undefined;
}

var gen, genWasChanged, notation, pokedex, setdex, randdex, typeChart, moves, abilities, items, calcHP, calcStat, GENERATION;

var DEFAULTGEN = 9;
$(".gen").change(function () {
	gen = ~~$(this).val() || DEFAULTGEN;
	GENERATION = calc.Generations.get(gen);
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
			gtag('config', 'UA-26211653-3', {'page_path': path});
		}
	}
	genWasChanged = true;
	pokedex = calc.SPECIES[gen];
	setdex = SETDEX[gen];
	randdex = RANDDEX[gen];
	typeChart = calc.TYPE_CHART[gen];
	moves = calc.MOVES[gen];
	items = calc.ITEMS[gen];
	abilities = calc.ABILITIES[gen];
	clearField();
	$("#importedSets").prop("checked", false);
	loadDefaultLists();
	$(".gen-specific.g" + gen).show();
	$(".gen-specific").not(".g" + gen).hide();
	var typeOptions = getSelectOptions(Object.keys(typeChart));
	$("select.type1, select.move-type").find("option").remove().end().append(typeOptions);
	$("select.teraType").find("option").remove().end().append(getSelectOptions(Object.keys(typeChart).slice(1)));
	$("select.type2").find("option").remove().end().append("<option value=\"\">(none)</option>" + typeOptions);
	var moveOptions = getSelectOptions(Object.keys(moves), true);
	$("select.move-selector").find("option").remove().end().append(moveOptions);
	var abilityOptions = getSelectOptions(abilities, true);
	$("select.ability").find("option").remove().end().append("<option value=\"\">(other)</option>" + abilityOptions);
	var itemOptions = getSelectOptions(items, true);
	$("select.item").find("option").remove().end().append("<option value=\"\">(none)</option>" + itemOptions);

	$(".set-selector").val(getFirstValidSetOption().id);
	$(".set-selector").change();
	updateGameOptions();
});

var GENERATION = {
	'1': 1, 'rb': 1, 'rby': 1,
	'2': 2, 'gs': 2, 'gsc': 2,
	'3': 3, 'rs': 3, 'rse': 3, 'frlg': 3, 'adv': 3,
	'4': 4, 'dp': 4, 'dpp': 4, 'hgss': 4,
	'5': 5, 'bw': 5, 'bw2': 5, 'b2w2': 5,
	'6': 6, 'xy': 6, 'oras': 6,
	'7': 7, 'sm': 7, 'usm': 7, 'usum': 7,
	'8': 8, 'ss': 8,
	'9': 9, 'sv': 9
};

var SETDEX = [
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
];

var RANDDEX = [
	{},
	typeof GEN1RANDOMBATTLE === 'undefined' ? {} : GEN1RANDOMBATTLE,
	typeof GEN2RANDOMBATTLE === 'undefined' ? {} : GEN2RANDOMBATTLE,
	typeof GEN3RANDOMBATTLE === 'undefined' ? {} : GEN3RANDOMBATTLE,
	typeof GEN4RANDOMBATTLE === 'undefined' ? {} : GEN4RANDOMBATTLE,
	typeof GEN5RANDOMBATTLE === 'undefined' ? {} : GEN5RANDOMBATTLE,
	typeof GEN6RANDOMBATTLE === 'undefined' ? {} : GEN6RANDOMBATTLE,
	typeof GEN7RANDOMBATTLE === 'undefined' ? {} : GEN7RANDOMBATTLE,
	typeof GEN8RANDOMBATTLE === 'undefined' ? {} : GEN8RANDOMBATTLE,
	typeof GEN9RANDOMBATTLE === 'undefined' ? {} : GEN9RANDOMBATTLE,
];

const { cloneElement } = require("react");

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) { // eslint-disable-line no-extend-native
		var k;
		if (this == null) {
			throw new TypeError('"this" equals null or n is undefined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = +fromIndex || 0;
		if (Math.abs(n) === Infinity) {
			n = 0;
		}
		if (n >= len) {
			return -1;
		}
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		while (k < len) {
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}

function startsWith(string, target) {
	return (string || '').slice(0, target.length) === target;
}

function endsWith(string, target) {
	return (string || '').slice(-target.length) === target;
}

var LEGACY_STATS_RBY = ["hp", "at", "df", "sl", "sp"];
var LEGACY_STATS_GSC = ["hp", "at", "df", "sa", "sd", "sp"];
var LEGACY_STATS = [[], LEGACY_STATS_RBY, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC];
var HIDDEN_POWER_REGEX = /Hidden Power (\w*)/;


var CALC_STATUS = {
	'Healthy': '',
	'Paralyzed': 'par',
	'Poisoned': 'psn',
	'Badly Poisoned': 'tox',
	'Burned': 'brn',
	'Asleep': 'slp',
	'Frozen': 'frz'
};

function legacyStatToStat(st) {
	switch (st) {
	case 'hp':
		return "hp";
	case 'at':
		return "atk";
	case 'df':
		return "def";
	case 'sa':
		return "spa";
	case 'sd':
		return "spd";
	case 'sp':
		return "spe";
	case 'sl':
		return "spc";
	}
}

// input field validation
var bounds = {
	"level": [0, 100],
	"base": [1, 255],
	"evs": [0, 252],
	"ivs": [0, 31],
	"dvs": [0, 15],
	"move-bp": [0, 65535],
	"g1g2-evs": [0, 65535]
};
for (var bounded in bounds) {
	attachValidation(bounded, bounds[bounded][0], bounds[bounded][1]);
}
function attachValidation(clazz, min, max) {
	$("." + clazz).keyup(function () {
		validate($(this), min, max);
	});
}
function validate(obj, min, max) {
	obj.val(Math.max(min, Math.min(max, ~~obj.val())));
}

function getForcedTeraType(pokemonName) {
	if (startsWith(pokemonName, "Ogerpon-Cornerstone")) {
		return "Rock";
	} else if (startsWith(pokemonName, "Ogerpon-Hearthflame")) {
		return "Fire";
	} else if (pokemonName === "Ogerpon" || startsWith(pokemonName, "Ogerpon-Teal")) {
		return "Grass";
	} else if (startsWith(pokemonName, "Ogerpon-Wellspring")) {
		return "Water";
	} else if (startsWith(pokemonName, "Terapagos")) {
		return "Stellar";
	}
	return null;
}

function getHPDVs(poke) {
	return (~~poke.find(".at .dvs").val() % 2) * 8 +
(~~poke.find(".df .dvs").val() % 2) * 4 +
(~~poke.find(".sp .dvs").val() % 2) * 2 +
(~~poke.find(gen === 1 ? ".sl .dvs" : ".sa .dvs").val() % 2);
}

function calcStats(poke) {
	for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
		calcStat(poke, LEGACY_STATS[gen][i]);
	}
}

function calcCurrentHP(poke, max, percent, skipDraw) {
	var current = Math.round(Number(percent) * Number(max) / 100);
	poke.find(".current-hp").val(current);
	if (!skipDraw) drawHealthBar(poke, max, current);
	return current;
}
function calcPercentHP(poke, max, current, skipDraw) {
	var percent = Math.round(100 * Number(current) / Number(max));
	if (percent === 0 && current > 0) {
		percent = 1;
	} else if (percent === 100 & current < max) {
		percent = 99;
	}

	poke.find(".percent-hp").val(percent);
	if (!skipDraw) drawHealthBar(poke, max, current);
	return percent;
}
function drawHealthBar(poke, max, current) {
	var fillPercent = 100 * current / max;
	var fillColor = fillPercent > 50 ? "green" : fillPercent > 20 ? "yellow" : "red";

	var healthbar = poke.find(".hpbar");
	healthbar.addClass("hp-" + fillColor);
	var unwantedColors = ["green", "yellow", "red"];
	unwantedColors.splice(unwantedColors.indexOf(fillColor), 1);
	for (var i = 0; i < unwantedColors.length; i++) {
		healthbar.removeClass("hp-" + unwantedColors[i]);
	}
	healthbar.css("background", "linear-gradient(to right, " + fillColor + " " + fillPercent + "%, white 0%");
}

function autosetQP(pokemon) {
	var currentWeather = $("input:radio[name='weather']:checked").val();
	var currentTerrain = $("input:checkbox[name='terrain']:checked").val() || "No terrain";

	var item = pokemon.find(".item").val();
	var ability = pokemon.find(".ability").val();
	var boostedStat = pokemon.find(".boostedStat").val();

	if (!boostedStat || boostedStat === "auto") {
		if (
			(item === "Booster Energy") ||
			(ability === "Protosynthesis" && currentWeather === "Sun") ||
			(ability === "Quark Drive" && currentTerrain === "Electric")
		) {
			pokemon.find(".boostedStat").val("auto");
		} else {
			pokemon.find(".boostedStat").val("");
		}
	}
}

$("#p1 .ability").bind("keyup change", function () {
	autosetWeather($(this).val(), 0);
	autosetTerrain($(this).val(), 0);
	autosetQP($(this).closest(".poke-info"));
});

$("input[name='weather']").change(function () {
	var allPokemon = $('.poke-info');
	allPokemon.each(function () {
		autosetQP($(this));
	});
});

var lastManualWeather = "";
var lastAutoWeather = ["", ""];
function autosetWeather(ability, i) {
	var currentWeather = $("input:radio[name='weather']:checked").val();
	if (lastAutoWeather.indexOf(currentWeather) === -1) {
		lastManualWeather = currentWeather;
		lastAutoWeather[1 - i] = "";
	}
	switch (ability) {
	case "Drought":
	case "Orichalcum Pulse":
		lastAutoWeather[i] = "Sun";
		$("#sun").prop("checked", true);
		break;
	case "Drizzle":
		lastAutoWeather[i] = "Rain";
		$("#rain").prop("checked", true);
		break;
	case "Sand Stream":
		lastAutoWeather[i] = "Sand";
		$("#sand").prop("checked", true);
		break;
	case "Snow Warning":
		if (gen >= 9) {
			lastAutoWeather[i] = "Snow";
			$("#snow").prop("checked", true);
		} else {
			lastAutoWeather[i] = "Hail";
			$("#hail").prop("checked", true);
		}
		break;
	case "Desolate Land":
		lastAutoWeather[i] = "Harsh Sunshine";
		$("#harsh-sunshine").prop("checked", true);
		break;
	case "Primordial Sea":
		lastAutoWeather[i] = "Heavy Rain";
		$("#heavy-rain").prop("checked", true);
		break;
	case "Delta Stream":
		lastAutoWeather[i] = "Strong Winds";
		$("#strong-winds").prop("checked", true);
		break;
	default:
		lastAutoWeather[i] = "";
		var newWeather = lastAutoWeather[1 - i] !== "" ? lastAutoWeather[1 - i] : "";
		$("input:radio[name='weather'][value='" + newWeather + "']").prop("checked", true);
		break;
	}
}

$("input[name='terrain']").change(function () {
	var allPokemon = $('.poke-info');
	allPokemon.each(function () {
		autosetQP($(this));
	});
});

var lastManualTerrain = "";
var lastAutoTerrain = ["", ""];
function autosetTerrain(ability, i) {
	var currentTerrain = $("input:checkbox[name='terrain']:checked").val() || "No terrain";
	if (lastAutoTerrain.indexOf(currentTerrain) === -1) {
		lastManualTerrain = currentTerrain;
		lastAutoTerrain[1 - i] = "";
	}
	// terrain input uses checkbox instead of radio, need to uncheck all first
	$("input:checkbox[name='terrain']:checked").prop("checked", false);
	switch (ability) {
	case "Electric Surge":
	case "Hadron Engine":
		lastAutoTerrain[i] = "Electric";
		$("#electric").prop("checked", true);
		break;
	case "Grassy Surge":
		lastAutoTerrain[i] = "Grassy";
		$("#grassy").prop("checked", true);
		break;
	case "Misty Surge":
		lastAutoTerrain[i] = "Misty";
		$("#misty").prop("checked", true);
		break;
	case "Psychic Surge":
		lastAutoTerrain[i] = "Psychic";
		$("#psychic").prop("checked", true);
		break;
	default:
		lastAutoTerrain[i] = "";
		var newTerrain = lastAutoTerrain[1 - i] !== "" ? lastAutoTerrain[1 - i] : lastManualTerrain;
		if ("No terrain" !== newTerrain) {
			$("input:checkbox[name='terrain'][value='" + newTerrain + "']").prop("checked", true);
		}
		break;
	}
}

$("#p1 .item").bind("keyup change", function () {
	autosetStatus("#p1", $(this).val());
});

var lastManualStatus = {"#p1": "Healthy"};
var lastAutoStatus = {"#p1": "Healthy"};
function autosetStatus(p, item) {
	var currentStatus = $(p + " .status").val();
	if (currentStatus !== lastAutoStatus[p]) {
		lastManualStatus[p] = currentStatus;
	}
	if (item === "Flame Orb") {
		lastAutoStatus[p] = "Burned";
		$(p + " .status").val("Burned");
		$(p + " .status").change();
	} else if (item === "Toxic Orb") {
		lastAutoStatus[p] = "Badly Poisoned";
		$(p + " .status").val("Badly Poisoned");
		$(p + " .status").change();
	} else {
		lastAutoStatus[p] = "Healthy";
		if (currentStatus !== lastManualStatus[p]) {
			$(p + " .status").val(lastManualStatus[p]);
			$(p + " .status").change();
		}
	}
}

function smogonAnalysis(pokemonName) {
	var generation = ["rb", "gs", "rs", "dp", "bw", "xy", "sm", "ss", "sv"][gen - 1];
	return "https://smogon.com/dex/" + generation + "/pokemon/" + pokemonName.toLowerCase() + "/";
}
function sortmons(a,b){
	return parseInt(a.split("[")[1].split("]")[0]) - parseInt(b.split("[")[1].split("]")[0])
}

function showFormes(formeObj, pokemonName, pokemon, baseFormeName) {
	var formes = pokemon.otherFormes.slice();
	formes.unshift(baseFormeName);

	var defaultForme = formes.indexOf(pokemonName);
	if (defaultForme < 0) defaultForme = 0;

	var formeOptions = getSelectOptions(formes, false, defaultForme);
	formeObj.children("select").find("option").remove().end().append(formeOptions).change();
	formeObj.show();
}

function stellarButtonsVisibility(pokeObj, vis) {
	var fullSetName = pokeObj.find("input.set-selector").val();
	var pokemonName = fullSetName.substring(0, fullSetName.indexOf(" ("));
	var moveObjs = [
		pokeObj.find(".move1"),
		pokeObj.find(".move2"),
		pokeObj.find(".move3"),
		pokeObj.find(".move4")
	];
	if (vis && !startsWith(pokemonName, 'Terapagos')) {
		for (var i = 0; i < moveObjs.length; i++) {
			var moveObj = moveObjs[i];
			moveObj.find(".move-stellar").prop("checked", true);
			moveObj.find(".stellar-btn").show();
		}
		return;
	}
	for (var i = 0; i < moveObjs.length; i++) {
		var moveObj = moveObjs[i];
		moveObj.find(".move-stellar").prop("checked", false);
		moveObj.find(".stellar-btn").hide();
	}
}

function setSelectValueIfValid(select, value, fallback) {
	select.val(!value ? fallback : select.children("option[value='" + value + "']").length ? value : fallback);
}

function correctHiddenPower(pokemon) {
	// After Gen 7 bottlecaps means you can have a HP without perfect IVs
	// Level 100 is elided from sets so if its undefined its level 100
	if (gen >= 7 && (!pokemon.level || pokemon.level >= 100)) return pokemon;

	// Convert the legacy stats table to a useful one, and also figure out if all are maxed
	var ivs = {};
	var maxed = true;
	for (var i = 0; i <= LEGACY_STATS[9].length; i++) {
		var s = LEGACY_STATS[9][i];
		var iv = ivs[legacyStatToStat(s)] = (pokemon.ivs && pokemon.ivs[s]) || 31;
		if (iv !== 31) maxed = false;
	}

	var expected = calc.Stats.getHiddenPower(GENERATION, ivs);
	for (var i = 0; i < pokemon.moves.length; i++) {
		var m = pokemon.moves[i].match(HIDDEN_POWER_REGEX);
		if (!m) continue;
		if (game != "None") {
			pokemon.moves[i] = "Hidden Power " + expected.type;
			continue;
		}
		// The Pokemon has Hidden Power and is not maxed but the types don't match we don't
		// want to attempt to reconcile the user's IVs so instead just correct the HP type
		if (!maxed && expected.type !== m[1]) {
			pokemon.moves[i] = "Hidden Power " + expected.type;
		} else {
			// Otherwise, use the default preset hidden power IVs that PS would use
			var hpIVs = calc.Stats.getHiddenPowerIVs(GENERATION, m[1]);
			if (!hpIVs) continue; // some impossible type was specified, ignore
			pokemon.ivs = pokemon.ivs || {hp: 31, at: 31, df: 31, sa: 31, sd: 31, sp: 31};
			pokemon.dvs = pokemon.dvs || {hp: 15, at: 15, df: 15, sa: 15, sd: 15, sp: 15};
			for (var stat in hpIVs) {
				pokemon.ivs[calc.Stats.shortForm(stat)] = hpIVs[stat];
				pokemon.dvs[calc.Stats.shortForm(stat)] = calc.Stats.IVToDV(hpIVs[stat]);
			}
			if (gen < 3) {
				pokemon.dvs.hp = calc.Stats.getHPDV({
					atk: pokemon.ivs.at || 31,
					def: pokemon.ivs.df || 31,
					spe: pokemon.ivs.sp || 31,
					spc: pokemon.ivs.sa || 31
				});
				pokemon.ivs.hp = calc.Stats.DVToIV(pokemon.dvs.hp);
			}
		}
	}
	return pokemon;
}

function createPokemon(pokeInfo) {
	if (typeof pokeInfo === "string") { // in this case, pokeInfo is the id of an individual setOptions value whose moveset's tier matches the selected tier(s)
		var name = pokeInfo.substring(0, pokeInfo.indexOf(" ("));
		var setName = pokeInfo.substring(pokeInfo.indexOf("(") + 1, pokeInfo.lastIndexOf(")"));
		var isRandoms = $("#randoms").prop("checked");
		var set = isRandoms ? randdex[name] : setdex[name][setName];
		var ivs = {};
		var evs = {};
		for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
			var legacyStat = LEGACY_STATS[gen][i];
			var stat = legacyStatToStat(legacyStat);
			ivs[stat] = (set.ivs && typeof set.ivs[legacyStat] !== "undefined") ? set.ivs[legacyStat] : 31;
			evs[stat] = (set.evs && typeof set.evs[legacyStat] !== "undefined") ? set.evs[legacyStat] : 0;
		}
		var moveNames = set.moves;
		if (isRandoms && (gen !== 8 && gen !== 1)) {
			moveNames = [];
			for (var role in set.roles) {
				for (var q = 0; q < set.roles[role].moves.length; q++) {
					var moveName = set.roles[role].moves[q];
					if (moveNames.indexOf(moveName) === -1) moveNames.push(moveName);
				}
			}
		}

		var pokemonMoves = [];
		for (var i = 0; i < 4; i++) {
			var moveName = moveNames[i];
			pokemonMoves.push(new calc.Move(gen, moves[moveName] ? moveName : "(No Move)", {ability: ability, item: item}));
		}

		if (isRandoms) {
			pokemonMoves = pokemonMoves.filter(function (move) {
				return move.category !== "Status";
			});
		}

		return new calc.Pokemon(gen, name, {
			level: set.level,
			ability: set.ability,
			abilityOn: true,
			item: set.item && typeof set.item !== "undefined" && (set.item === "Eviolite" || set.item.indexOf("ite") < 0) ? set.item : "",
			nature: set.nature,
			ivs: ivs,
			evs: evs,
			moves: pokemonMoves
		});
	} else {
		var setName = pokeInfo.find("input.set-selector").val();
		var name;
		if (setName.indexOf("(") === -1) {
			name = setName;
		} else {
			var pokemonName = setName.substring(0, setName.indexOf(" ("));
			var species = pokedex[pokemonName];
			try {
				name = (species.otherFormes || (species.baseSpecies && species.baseSpecies !== pokemonName)) ? pokeInfo.find(".forme").val() : pokemonName;
			} catch {
				name = pokemonName;
			}
		}

		var baseStats = {};
		var ivs = {};
		var evs = {};
		var boosts = {};
		for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
			var stat = legacyStatToStat(LEGACY_STATS[gen][i]);
			baseStats[stat === 'spc' ? 'spa' : stat] = ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .base").val();
			ivs[stat] = gen > 2 ? ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .ivs").val() : ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .dvs").val() * 2 + 1;
			evs[stat] = gen > 2 ? ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .evs").val() : ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .g1g2-evs").val();
			if (gen === 2) evs['spd'] = evs['spa']; 
			boosts[stat] = ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .boost").val();
		}
		if (gen === 1) baseStats.spd = baseStats.spa;

		var ability = pokeInfo.find(".ability").val();
		var item = pokeInfo.find(".item").val();
		var isDynamaxed = pokeInfo.find(".max").prop("checked");
		var teraType = pokeInfo.find(".teraToggle").is(":checked") ? pokeInfo.find(".teraType").val() : undefined;
		var opts = {
			ability: ability,
			item: item,
			isDynamaxed: isDynamaxed,
			teraType: teraType,
		};
		pokeInfo.isDynamaxed = isDynamaxed;
		calcHP(pokeInfo);
		var curHP = ~~pokeInfo.find(".current-hp").val();
		// FIXME the Pokemon constructor expects non-dynamaxed HP
		if (isDynamaxed) curHP = Math.floor(curHP / 2);
		var types = [pokeInfo.find(".type1").val(), pokeInfo.find(".type2").val()];
		return new calc.Pokemon(gen, name, {
			level: ~~pokeInfo.find(".level").val(),
			ability: ability,
			abilityOn: pokeInfo.find(".abilityToggle").is(":checked"),
			item: item,
			gender: pokeInfo.find(".gender").is(":visible") ? getGender(pokeInfo.find(".gender").val()) : "N",
			nature: pokeInfo.find(".nature").val(),
			ivs: ivs,
			evs: evs,
			isDynamaxed: isDynamaxed,
			isSaltCure: pokeInfo.find(".saltcure").is(":checked"),
			alliesFainted: parseInt(pokeInfo.find(".alliesFainted").val()),
			boostedStat: pokeInfo.find(".boostedStat").val() || undefined,
			teraType: teraType,
			boosts: boosts,
			curHP: curHP,
			status: CALC_STATUS[pokeInfo.find(".status").val()],
			toxicCounter: status === 'Badly Poisoned' ? ~~pokeInfo.find(".toxic-counter").val() : 0,
			moves: [
				getMoveDetails(pokeInfo.find(".move1"), opts),
				getMoveDetails(pokeInfo.find(".move2"), opts),
				getMoveDetails(pokeInfo.find(".move3"), opts),
				getMoveDetails(pokeInfo.find(".move4"), opts),
			],
			overrides: {
				baseStats: baseStats,
				types: types
			}
		});
	}
}

function getGender(gender) {
	if (!gender || gender === 'genderless' || gender === 'N') return 'N';
	if (gender.toLowerCase() === 'male' || gender === 'M') return 'M';
	return 'F';
}

function getMoveDetails(moveInfo, opts) {
	var moveName = moveInfo.find("select.move-selector").val();
	var isZMove = gen > 6 && moveInfo.find("input.move-z").prop("checked");
	var isCrit = moveInfo.find(".move-crit").prop("checked");
	var isStellarFirstUse = moveInfo.find(".move-stellar").prop("checked");
	var hits = +moveInfo.find(".move-hits").val();
	var timesUsed = +moveInfo.find(".stat-drops").val();
	var timesUsedWithMetronome = moveInfo.find(".metronome").is(':visible') ? +moveInfo.find(".metronome").val() : 1;
	var overrides = {
		basePower: +moveInfo.find(".move-bp").val(),
		type: moveInfo.find(".move-type").val()
	};
	if (moveName === 'Tera Blast') {
		// custom logic for stellar type tera blast
		var isStellar = opts.teraType === 'Stellar';
		var statDrops = moveInfo.find('.stat-drops');
		var dropsStats = statDrops.is(':visible');
		if (isStellar !== dropsStats) {
			// update stat drop dropdown here
			if (isStellar) statDrops.show(); else statDrops.hide();
		}
		if (isStellar) overrides.self = {boosts: {atk: -1, spa: -1}};
	}
	if (gen >= 4) overrides.category = moveInfo.find(".move-cat").val();
	return new calc.Move(gen, moveName, {
		ability: opts.ability, item: opts.item, useZ: isZMove, species: opts.species, isCrit: isCrit, hits: hits,
		isStellarFirstUse: isStellarFirstUse, timesUsed: timesUsed, timesUsedWithMetronome: timesUsedWithMetronome,
		overrides: overrides, useMax: opts.isDynamaxed
	});
}

function createField() {
	var gameType = $("input:radio[name='format']:checked").val();
	var isBeadsOfRuin = $("#beads").prop("checked");
	var isTabletsOfRuin = $("#tablets").prop("checked");
	var isSwordOfRuin = $("#sword").prop("checked");
	var isVesselOfRuin = $("#vessel").prop("checked");
	var isMagicRoom = $("#magicroom").prop("checked");
	var isWonderRoom = $("#wonderroom").prop("checked");
	var isGravity = $("#gravity").prop("checked");
	var isSR = [$("#srL").prop("checked"), $("#srR").prop("checked")];
	var weather;
	var spikes;
	if (gen === 2) {
		spikes = [$("#gscSpikesL").prop("checked") ? 1 : 0, $("#gscSpikesR").prop("checked") ? 1 : 0];
		weather = $("input:radio[name='gscWeather']:checked").val();
	} else {
		weather = $("input:radio[name='weather']:checked").val();
		spikes = [~~$("input:radio[name='spikesL']:checked").val(), ~~$("input:radio[name='spikesR']:checked").val()];
	}
	var steelsurge = [$("#steelsurgeL").prop("checked"), $("#steelsurgeR").prop("checked")];
	var vinelash = [$("#vinelashL").prop("checked"), $("#vinelashR").prop("checked")];
	var wildfire = [$("#wildfireL").prop("checked"), $("#wildfireR").prop("checked")];
	var cannonade = [$("#cannonadeL").prop("checked"), $("#cannonadeR").prop("checked")];
	var volcalith = [$("#volcalithL").prop("checked"), $("#volcalithR").prop("checked")];
	var terrain = ($("input:checkbox[name='terrain']:checked").val()) ? $("input:checkbox[name='terrain']:checked").val() : "";
	var isReflect = [$("#reflectL").prop("checked"), $("#reflectR").prop("checked")];
	var isLightScreen = [$("#lightScreenL").prop("checked"), $("#lightScreenR").prop("checked")];
	var isProtected = [$("#protectL").prop("checked"), $("#protectR").prop("checked")];
	var isSeeded = [$("#leechSeedL").prop("checked"), $("#leechSeedR").prop("checked")];
	var isForesight = [$("#foresightL").prop("checked"), $("#foresightR").prop("checked")];
	var isHelpingHand = [$("#helpingHandL").prop("checked"), $("#helpingHandR").prop("checked")];
var isBadgeAtk = [$("#AtkL").prop("checked")];
	var isBadgeSpec = [$("#SpecL").prop("checked")];
	var isBadgeDef = [$("#DefL").prop("checked")];
	var isBadgeSpeed = [$("#SpeL").prop("checked")];
	var isBadgeBoosted = [$("#badgeL").prop("selectedIndex")];
	var isTailwind = [$("#tailwindL").prop("checked"), $("#tailwindR").prop("checked")];
	var isFlowerGift = [$("#flowerGiftL").prop("checked"), $("#flowerGiftR").prop("checked")];
	var isFriendGuard = [$("#friendGuardL").prop("checked"), $("#friendGuardR").prop("checked")];
	var isAuroraVeil = [$("#auroraVeilL").prop("checked"), $("#auroraVeilR").prop("checked")];
	var isBattery = [$("#batteryL").prop("checked"), $("#batteryR").prop("checked")];
	var isPowerSpot = [$("#powerSpotL").prop("checked"), $("#powerSpotR").prop("checked")];
	// TODO: support switching in as well!
	var isSwitchingOut = [$("#switchingL").prop("checked"), $("#switchingR").prop("checked")];

	var createSide = function (i) {
		return new calc.Side({
			spikes: spikes[i], isSR: isSR[i], steelsurge: steelsurge[i],
			vinelash: vinelash[i], wildfire: wildfire[i], cannonade: cannonade[i], volcalith: volcalith[i],
			isReflect: isReflect[i], isLightScreen: isLightScreen[i],
			isProtected: isProtected[i], isSeeded: isSeeded[i], isForesight: isForesight[i],
			isTailwind: isTailwind[i], isHelpingHand: isHelpingHand[i], isFlowerGift: isFlowerGift[i], isBadgeAtk: isBadgeAtk[i], isBadgeSpec: isBadgeSpec[i], isBadgeDef: isBadgeDef[i], isBadgeSpeed: isBadgeSpeed[i], isBadgeBoosted: isBadgeBoosted[i], isFriendGuard: isFriendGuard[i],
			isAuroraVeil: isAuroraVeil[i], isBattery: isBattery[i], isPowerSpot: isPowerSpot[i], isSwitching: isSwitchingOut[i] ? 'out' : undefined
		});
	};
	return new calc.Field({
		gameType: gameType, weather: weather, terrain: terrain,
		isMagicRoom: isMagicRoom, isWonderRoom: isWonderRoom, isGravity: isGravity,
		isBeadsOfRuin: isBeadsOfRuin, isTabletsOfRuin: isTabletsOfRuin,
		isSwordOfRuin: isSwordOfRuin, isVesselOfRuin: isVesselOfRuin,
		attackerSide: createSide(0), defenderSide: createSide(1)
	});
}

function calcHP(poke) {
	var total = calcStat(poke, "hp");
	var $maxHP = poke.find(".max-hp");

	var prevMaxHP = Number($maxHP.attr('data-prev')) || total;
	var $currentHP = poke.find(".current-hp");
	var prevCurrentHP = $currentHP.attr('data-set') ? Math.min(Number($currentHP.val()), prevMaxHP) : prevMaxHP;
	// NOTE: poke.find(".percent-hp").val() is a rounded value!
	var prevPercentHP = 100 * prevCurrentHP / prevMaxHP;

	$maxHP.text(total);
	$maxHP.attr('data-prev', total);

	var newCurrentHP = calcCurrentHP(poke, total, prevPercentHP);
	calcPercentHP(poke, total, newCurrentHP);

	$currentHP.attr('data-set', true);
}

function calcStat(poke, StatID) {
	var stat = poke.find("." + StatID);
	var base = ~~stat.find(".base").val();
	var level = ~~poke.find(".level").val();
	var nature, ivs, evs;
	if (gen < 3) {
		ivs = ~~stat.find(".dvs").val() * 2;
		evs = ~~stat.find(".g1g2-evs").val();
	} else {
		ivs = ~~stat.find(".ivs").val();
		evs = ~~stat.find(".evs").val();
		if (StatID !== "hp") nature = poke.find(".nature").val();
	}
	// Shedinja still has 1 max HP during the effect even if its Dynamax Level is maxed (DaWoblefet)
	var total = calc.calcStat(gen, legacyStatToStat(StatID), base, ivs, evs, level, nature);
	if (gen > 7 && StatID === "hp" && poke.isDynamaxed && total !== 1) {
		total *= 2;
	}
	stat.find(".total").text(total);
	return total;
}

function clearField() {
	$("#singles-format").prop("checked", true);
	$("#clear").prop("checked", true);
	$("#gscClear").prop("checked", true);
	$("#gravity").prop("checked", false);
	$("#srL").prop("checked", false);
	$("#srR").prop("checked", false);
	$("#spikesL0").prop("checked", true);
	$("#spikesR0").prop("checked", true);
	$("#gscSpikesL").prop("checked", false);
	$("#gscSpikesR").prop("checked", false);
	$("#steelsurgeL").prop("checked", false);
	$("#steelsurgeR").prop("checked", false);
	$("#vinelashL").prop("checked", false);
	$("#vinelashR").prop("checked", false);
	$("#wildfireL").prop("checked", false);
	$("#wildfireR").prop("checked", false);
	$("#cannonadeL").prop("checked", false);
	$("#cannonadeR").prop("checked", false);
	$("#volcalithL").prop("checked", false);
	$("#volcalithR").prop("checked", false);
	$("#reflectL").prop("checked", false);
	$("#reflectR").prop("checked", false);
	$("#lightScreenL").prop("checked", false);
	$("#lightScreenR").prop("checked", false);
	$("#protectL").prop("checked", false);
	$("#protectR").prop("checked", false);
	$("#leechSeedL").prop("checked", false);
	$("#leechSeedR").prop("checked", false);
	$("#foresightL").prop("checked", false);
	$("#foresightR").prop("checked", false);
	$("#helpingHandL").prop("checked", false);
	$("#helpingHandR").prop("checked", false);
	$("#tailwindL").prop("checked", false);
	$("#tailwindR").prop("checked", false);
	$("#friendGuardL").prop("checked", false);
	$("#friendGuardR").prop("checked", false);
	$("#auroraVeilL").prop("checked", false);
	$("#auroraVeilR").prop("checked", false);
	$("#batteryL").prop("checked", false);
	$("#batteryR").prop("checked", false);
	$("#switchingL").prop("checked", false);
	$("#switchingR").prop("checked", false);
	$("input:checkbox[name='terrain']").prop("checked", false);
}