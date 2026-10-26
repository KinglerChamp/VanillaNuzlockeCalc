(function () {

    'use strict';



    var games = [

        {id: 'rb', label: 'Red / Blue', generation: 1, data: 'CUSTOMSETDEX_RB'},

        {id: 'y', label: 'Yellow', generation: 1, data: 'CUSTOMSETDEX_Y'},

        {id: 'gs', label: 'Gold / Silver', generation: 2, data: 'CUSTOMSETDEX_GS'},

        {id: 'c', label: 'Crystal', generation: 2, data: 'CUSTOMSETDEX_C'},

        {id: 'rs', label: 'Ruby / Sapphire', language: 'English', family: 'Ruby / Sapphire', generation: 3, data: 'CUSTOMSETDEX_RS'},

        {id: 'rs-fr', label: 'French', language: 'French', family: 'Ruby / Sapphire', generation: 3, data: 'CUSTOMSETDEX_RSFR'},

        {id: 'rs-it', label: 'Italian', language: 'Italian', family: 'Ruby / Sapphire', generation: 3, data: 'CUSTOMSETDEX_RSIT'},

        {id: 'rs-de', label: 'German', language: 'German', family: 'Ruby / Sapphire', generation: 3, data: 'CUSTOMSETDEX_RSDE'},

        {id: 'rs-es', label: 'Spanish', language: 'Spanish', family: 'Ruby / Sapphire', generation: 3, data: 'CUSTOMSETDEX_RSES'},

        {id: 'rs-ja', label: 'Japanese', language: 'Japanese', family: 'Ruby / Sapphire', generation: 3, data: 'CUSTOMSETDEX_RSJA'},

        {id: 'e', label: 'Emerald', language: 'English', family: 'Emerald', generation: 3, data: 'CUSTOMSETDEX_E'},

        {id: 'e-fr', label: 'French', language: 'French', family: 'Emerald', generation: 3, data: 'CUSTOMSETDEX_EFR'},

        {id: 'e-it', label: 'Italian', language: 'Italian', family: 'Emerald', generation: 3, data: 'CUSTOMSETDEX_EIT'},

        {id: 'e-de', label: 'German', language: 'German', family: 'Emerald', generation: 3, data: 'CUSTOMSETDEX_EDE'},

        {id: 'e-es', label: 'Spanish', language: 'Spanish', family: 'Emerald', generation: 3, data: 'CUSTOMSETDEX_EES'},

        {id: 'e-ja', label: 'Japanese', language: 'Japanese', family: 'Emerald', generation: 3, data: 'CUSTOMSETDEX_EJA'},

        {id: 'frlg', label: 'FireRed / LeafGreen', language: 'English', family: 'FireRed / LeafGreen', generation: 3, data: 'CUSTOMSETDEX_FRLG'},

        {id: 'frlg-fr', label: 'French', language: 'French', family: 'FireRed / LeafGreen', generation: 3, data: 'CUSTOMSETDEX_FRLGFR'},

        {id: 'frlg-it', label: 'Italian', language: 'Italian', family: 'FireRed / LeafGreen', generation: 3, data: 'CUSTOMSETDEX_FRLGIT'},

        {id: 'frlg-de', label: 'German', language: 'German', family: 'FireRed / LeafGreen', generation: 3, data: 'CUSTOMSETDEX_FRLGDE'},

        {id: 'frlg-es', label: 'Spanish', language: 'Spanish', family: 'FireRed / LeafGreen', generation: 3, data: 'CUSTOMSETDEX_FRLGES'},

        {id: 'frlg-ja', label: 'Japanese', language: 'Japanese', family: 'FireRed / LeafGreen', generation: 3, data: 'CUSTOMSETDEX_FRLGJA'},

        {id: 'dp', label: 'Diamond / Pearl', generation: 4, data: 'CUSTOMSETDEX_DP'},

        {id: 'pl', label: 'Platinum', generation: 4, data: 'CUSTOMSETDEX_Pl'},

        {id: 'hgss', label: 'HeartGold / SoulSilver', generation: 4, data: 'CUSTOMSETDEX_HGSS'},

        {id: 'bw', label: 'Black / White', generation: 5, data: 'CUSTOMSETDEX_BW'},

        {id: 'b2w2', label: 'Black 2 / White 2', generation: 5, data: 'CUSTOMSETDEX_B2W2'},

        {id: 'b2w2hc', label: 'Black 2 / White 2 Challenge Mode', generation: 5, data: 'CUSTOMSETDEX_B2W2HC'},

        {id: 'xy', label: 'X / Y', generation: 6, data: 'CUSTOMSETDEX_XY'},

        {id: 'oras', label: 'Omega Ruby / Alpha Sapphire', generation: 6, data: 'CUSTOMSETDEX_ORAS'},

        {id: 'sm', label: 'Sun / Moon', generation: 7, data: 'CUSTOMSETDEX_SM'},

        {id: 'usum', label: 'Ultra Sun / Ultra Moon', generation: 7, data: 'CUSTOMSETDEX_USUM'},

        {id: 'ss', label: 'Sword / Shield', generation: 8, data: 'CUSTOMSETDEX_SS'},

        {id: 'bdsp', label: 'Brilliant Diamond / Shining Pearl', generation: 8, data: 'CUSTOMSETDEX_BDSP'},

        {id: 'sv', label: 'Scarlet / Violet', generation: 9, data: 'CUSTOMSETDEX_SV'}

    ];

    var storageKey = 'trainer-chart-selection';

    var calculatorGames = {

        rb: 1, y: 2, gs: 3, c: 4, rs: 5, 'rs-fr': 6, 'rs-it': 7, 'rs-de': 8, 'rs-es': 9, 'rs-ja': 10,

        e: 11, 'e-fr': 12, 'e-it': 13, 'e-de': 14, 'e-es': 15, 'e-ja': 16, frlg: 17, 'frlg-fr': 18,

        'frlg-it': 19, 'frlg-de': 20, 'frlg-es': 21, 'frlg-ja': 22, dp: 23, pl: 24, hgss: 25,

        bw: 26, b2w2: 27, b2w2hc: 28, xy: 29, oras: 30, sm: 31, usum: 32, ss: 33, bdsp: 34, sv: 35

    };

    var gamePicker = document.getElementById('game-picker');

    var trainerSelect = document.getElementById('trainer-select');

    var trainerLabel = document.getElementById('trainer-label');

    var chart = document.getElementById('team-chart');

    var fightName = document.getElementById('fight-name');

    var fightGame = document.getElementById('fight-game');

    var teamSummary = document.getElementById('team-summary');

    var previousRouteButton = document.getElementById('previous-route');

    var nextRouteButton = document.getElementById('next-route');

    var currentGame;



    function getGameData(game) {

        return window[game.data] || {};

    }



    function getTrainerNames(game) {

        var names = {};

        Object.keys(getGameData(game)).forEach(function (pokemon) {

            Object.keys(getGameData(game)[pokemon] || {}).forEach(function (trainer) {
                var index = Number(getGameData(game)[pokemon][trainer].index) || 0;
                if (names[trainer] === undefined || index < names[trainer]) names[trainer] = index;

            });

        });

        return Object.keys(names).sort(function (left, right) {

            return names[left] - names[right];

        });

    }

    function getTrainerLocation(trainerName) {
        var parts = trainerName.split('|').map(function (part) { return part.trim(); });
        return parts.length >= 3 && parts[parts.length - 2] ? parts[parts.length - 2] : 'Unknown location';
    }

    function getLocationLabel(location) {
        return location.replace(/^R(\d+)$/, 'Route $1');
    }

    function getTrainerDisplayName(trainerName) {
        var parts = trainerName.split('|').map(function (part) { return part.trim(); });
        var locationIndex = Math.max(1, parts.length - 2);
        var displayName = parts.slice(0, locationIndex).join(' | ');
        var variation = parts[parts.length - 1].match(/\(\d+\)$/);
        return displayName + (variation ? ' ' + variation[0] : '');
    }

    function getLocations(game) {
        var locations = {};
        getTrainerNames(game).forEach(function (trainerName) {
            var location = getTrainerLocation(trainerName);
            if (locations[location] === undefined) {
                locations[location] = getTrainerEntries(game, trainerName)[0].set.index;
            }
        });
        return Object.keys(locations).sort(function (left, right) {
            return locations[left] - locations[right];
        });
    }

    function getRouteLocations(game) {
        var routes = {};
        var data = getGameData(game);
        Object.keys(data).forEach(function (pokemon) {
            Object.keys(data[pokemon] || {}).forEach(function (trainerName) {
                var location = getTrainerLocation(trainerName);
                if (!/^(?:R\d+|Route\s+\d+)\b/i.test(location)) return;
                var index = Number(data[pokemon][trainerName].index) || 0;
                if (!routes[location] || index < routes[location].index) {
                    routes[location] = {location: location, index: index, trainer: trainerName};
                }
            });
        });
        return Object.keys(routes).map(function (location) {
            return routes[location];
        }).sort(function (left, right) {
            return left.index - right.index;
        });
    }

    function getLocationIndex(game, location) {
        var index = 0;
        var data = getGameData(game);
        Object.keys(data).forEach(function (pokemon) {
            Object.keys(data[pokemon] || {}).forEach(function (trainerName) {
                if (getTrainerLocation(trainerName) !== location) return;
                var trainerIndex = Number(data[pokemon][trainerName].index) || 0;
                if (!index || trainerIndex < index) index = trainerIndex;
            });
        });
        return index;
    }

    function getTrainerEntries(game, trainerName) {

        var entries = [];

        var data = getGameData(game);

        Object.keys(data).forEach(function (pokemon) {

            var set = data[pokemon] && data[pokemon][trainerName];

            if (set) entries.push({pokemon: pokemon, set: set});

        });

        return entries.sort(function (left, right) {

            return Number(left.set.index || 0) - Number(right.set.index || 0);

        });

    }



    function titleCase(value) {

        return value.replace(/-/g, ' ').replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });

    }



    function escapeHtml(value) {

        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {

            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character];

        });

    }

    var natureStatChanges = {
        adamant: ['at', 'sa'], bashful: ['sa', 'sa'], bold: ['df', 'at'], brave: ['at', 'sp'],
        calm: ['sd', 'at'], careful: ['sd', 'sa'], docile: ['df', 'df'], gentle: ['sd', 'df'],
        hardy: ['at', 'at'], hasty: ['sp', 'df'], impish: ['df', 'sa'], jolly: ['sp', 'sa'],
        lax: ['df', 'sd'], lonely: ['at', 'df'], mild: ['sa', 'df'], modest: ['sa', 'at'],
        naive: ['sp', 'sd'], naughty: ['at', 'sd'], quiet: ['sa', 'sp'], quirky: ['sd', 'sd'],
        rash: ['sa', 'sd'], relaxed: ['df', 'sp'], sassy: ['sd', 'sp'], serious: ['sp', 'sp'],
        timid: ['sp', 'at']
    };

    function getNatureChange(nature, statKey) {
        var changes = natureStatChanges[String(nature || '').toLowerCase()];
        if (!changes || changes[0] === changes[1]) return '';
        if (changes[0] === statKey) return 'increase';
        if (changes[1] === statKey) return 'decrease';
        return '';
    }

    function renderStatValues(label, values, nature) {
        if (!values || typeof values !== 'object') return '';

        var stats = [
            {key: 'hp', label: 'HP', name: 'HP'},
            {key: 'at', label: 'Atk', name: 'Attack'},
            {key: 'df', label: 'Def', name: 'Defense'},
            {key: 'sa', label: 'SpA', name: 'Special Attack'},
            {key: 'sd', label: 'SpD', name: 'Special Defense'},
            {key: 'sp', label: 'Spe', name: 'Speed'}
        ].filter(function (stat) {
            return values[stat.key] !== undefined && values[stat.key] !== null;
        });
        if (!stats.length) return '';
        if (label === 'EVs' && stats.every(function (stat) {
            return Number(values[stat.key]) === 0;
        })) return '';

        return '<div class="stat-training-row"><span class="stat-training-label">' + label +
            '</span><div class="stat-training-values">' + stats.map(function (stat) {
                var natureChange = label === 'IVs' ? getNatureChange(nature, stat.key) : '';
                var indicator = natureChange === 'increase' ? '↑' : natureChange === 'decrease' ? '↓' : '';
                var title = stat.name + (natureChange ? ' — nature ' + natureChange : '');
                var natureClass = natureChange ? 'nature-' + natureChange : '';
                var natureClassAttribute = natureClass ? ' class="' + natureClass + '"' : '';
                return '<span title="' + escapeHtml(title) + '"><abbr' + natureClassAttribute + '>' + stat.label +
                    (indicator ? '<i aria-hidden="true">' + indicator + '</i>' : '') +
                    '</abbr><strong><span class="stat-training-number' +
                    (natureClass ? ' ' + natureClass : '') + '">' +
                    escapeHtml(values[stat.key]) + '</span></strong></span>';
            }).join('') + '</div></div>';
    }



    function renderCard(entry, position, generation) {

        var set = entry.set;

        var item = set.item && set.item !== 'None' ? set.item : 'No item';

        var ability = set.ability || 'Unknown ability';

        var nature = set.nature || 'Unknown nature';

        var gender = set.gender === 'M' ? 'male' : set.gender === 'F' ? 'female' : '';
        var genderSymbol = gender === 'male' ? '&#9794;' : gender === 'female' ? '&#9792;' : '';

        var moves = (set.moves || []).filter(function (move) { return move && move !== 'No Move'; });
        var details = '';
        if (generation >= 3) {
            details += '<div class="fight-detail"><span>Ability</span><strong>' + escapeHtml(ability) + '</strong></div>';
        }
        if (generation >= 2) {
            details += '<div class="fight-detail"><span>Item</span><strong>' + escapeHtml(item) + '</strong></div>';
        }
        if (generation >= 3) {
            details += '<div class="fight-detail"><span>Nature</span><strong>' + escapeHtml(nature) + '</strong></div>';
        }
        details += renderStatValues(generation < 3 ? 'DVs' : 'IVs', generation < 3 ? set.dvs : set.ivs, nature);
        details += renderStatValues('EVs', set.evs);

        return '<article class="pokemon-card" style="animation-delay:' + position * 45 + 'ms">' +

            '<div class="pokemon-card-topline"><span class="slot-number">' + String(position + 1).padStart(2, '0') +
            '</span>' + (genderSymbol ? '<span class="gender-symbol gender-' + gender + '" role="img" aria-label="' +
                (gender === 'male' ? 'Male' : 'Female') + '" title="' + (gender === 'male' ? 'Male' : 'Female') +
                '">' + genderSymbol + '</span>' : '') + '</div>' +

            '<img class="sprite" src="https://raw.githubusercontent.com/KinglerChamp/Sprites-for-calc/master/' + encodeURIComponent(entry.pokemon) + '.png" alt="' + escapeHtml(entry.pokemon) + ' sprite" loading="lazy">' +

            '<h3>' + escapeHtml(set.nickname || entry.pokemon) + '</h3>' +

            '<p class="level">Level ' + escapeHtml(set.level || '?') + '</p>' +

            details +

            '<h4 class="moves-heading">Moves</h4>' +
            '<ul class="moves">' + moves.map(function (move) {
                return '<li><strong>' + escapeHtml(move) + '</strong></li>';
            }).join('') + '</ul>' +

        '</article>';

    }

    function renderTeamGrid(entries, generation) {
        var cards = entries.map(function (entry, position) {
            return renderCard(entry, position, generation);
        });
        for (var i = entries.length; i < 6; i++) {
            cards.push('<div class="pokemon-card pokemon-card-empty" aria-hidden="true"></div>');
        }
        return '<div class="team-grid">' + cards.join('') + '</div>';
    }

    function renderTrainerMetadata(entries) {
        var metadata = [
            {label: 'Location', key: 'location'},
            {label: 'Split', key: 'split'}
        ].map(function (field) {
            var values = entries.map(function (entry) {
                return entry.set[field.key];
            }).filter(function (value, index, allValues) {
                return value && allValues.indexOf(value) === index;
            });
            if (!values.length) return '';
            return '<span class="trainer-context-item"><span>' + field.label +
                '</span><strong>' + values.map(escapeHtml).join(', ') + '</strong></span>';
        }).join('');
        return metadata ? '<div class="trainer-context">' + metadata + '</div>' : '';
    }

    function renderTrainerTeam(name, entries, game, generation) {
        var heading = '<div class="trainer-team-heading"><h3 class="trainer-team-title">' +
            escapeHtml(getTrainerDisplayName(name)) + '</h3>';
        heading += renderTrainerMetadata(entries);
        if (entries.length) {
            var firstPokemon = entries[0].pokemon + ' (' + name + ')';
            var calcUrl = './index.html?game=' + calculatorGames[game.id] + '&gen=' + game.generation +
                '&trainer=' + encodeURIComponent(firstPokemon);
            heading += '<a class="fight-calc-link" href="' + escapeHtml(calcUrl) + '">Calc</a>';
        }
        return '<section class="trainer-team">' + heading + '</div>' +
            renderTeamGrid(entries, generation) + '</section>';
    }


    function renderTrainers(game) {

        currentGame = game;

        var saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
        if (jQuery(trainerSelect).data('select2')) {
            jQuery(trainerSelect).select2('destroy');
        }
        if (game.generation === 1) {
            trainerLabel.textContent = 'Location';
            trainerSelect.innerHTML = getLocations(game).map(function (location) {
                return '<option value="' + escapeHtml(location) + '">' + escapeHtml(getLocationLabel(location)) + '</option>';
            }).join('');
            if (saved.location && trainerSelect.querySelector('option[value="' + CSS.escape(saved.location) + '"]')) {
                trainerSelect.value = saved.location;
            }
        } else {
            trainerLabel.textContent = 'Trainer';
            trainerSelect.innerHTML = getTrainerNames(game).map(function (name) {
                return '<option value="' + escapeHtml(name) + '">' + escapeHtml(name.trim()) + '</option>';
            }).join('');
            if (saved.trainer && trainerSelect.querySelector('option[value="' + CSS.escape(saved.trainer) + '"]')) {
                trainerSelect.value = saved.trainer;
            }
        }

        jQuery(trainerSelect).select2({
            width: '100%',
            minimumResultsForSearch: 0,
            dropdownCssClass: 'trainer-select2-drop',
            formatNoMatches: function () {
                return 'No matching ' + (game.generation === 1 ? 'locations' : 'trainers') + '.';
            }
        });

        renderTeam();

    }


    function renderGamePicker(activeGame) {

        var groups = {};

        games.forEach(function (game) {

            if (!groups[game.generation]) groups[game.generation] = [];

            groups[game.generation].push(game);

        });

        gamePicker.innerHTML = Object.keys(groups).map(function (generation) {

            var isActiveGeneration = String(activeGame.generation) === generation;

            var options;

            if (generation === '3') {

                var families = {};

                groups[generation].forEach(function (game) {

                    if (!families[game.family]) families[game.family] = [];

                    families[game.family].push(game);

                });

                options = Object.keys(families).map(function (family) {

                    var isActiveFamily = isActiveGeneration && activeGame.family === family;

                    return '<div class="game-family' + (isActiveFamily ? ' is-active' : '') + '"><button type="button" class="family-label" aria-expanded="' + (isActiveFamily ? 'true' : 'false') + '">' + escapeHtml(family) + '</button><div class="language-options">' + families[family].map(function (game) {

                        return '<button type="button" class="game-option" data-game="' + game.id + '" aria-pressed="' + (game.id === activeGame.id ? 'true' : 'false') + '">' + escapeHtml(game.language) + '</button>';

                    }).join('') + '</div></div>';

                }).join('');

            } else {

                options = groups[generation].map(function (game) {

                    return '<button type="button" class="game-option" data-game="' + game.id + '" aria-pressed="' + (game.id === activeGame.id ? 'true' : 'false') + '">' + escapeHtml(game.label) + '</button>';

                }).join('');

            }

            return '<div class="generation-option generation-option-' + generation + '"><button type="button" class="generation-label" aria-expanded="false">Gen ' + generation + '</button><div class="game-options">' + options + '</div></div>';

        }).join('');

        gamePicker.addEventListener('click', function (event) {

            var button = event.target.closest('.game-option');

            if (button) {

                var game = games.find(function (item) { return item.id === button.dataset.game; });

                if (!game) return;

                gamePicker.querySelectorAll('.game-option').forEach(function (option) {

                    option.setAttribute('aria-pressed', option === button ? 'true' : 'false');

                });

                gamePicker.querySelectorAll('.generation-option').forEach(function (option) {

                    option.classList.remove('is-active');

                    option.querySelector('.generation-label').setAttribute('aria-expanded', 'false');

                });

                renderTrainers(game);

                return;

            }

            var familyButton = event.target.closest('.family-label');

            if (familyButton) {

                var familyOption = familyButton.parentElement;

                var familyIsActive = familyOption.classList.toggle('is-active');

                familyOption.parentElement.querySelectorAll('.game-family').forEach(function (option) {

                    if (option !== familyOption) {

                        option.classList.remove('is-active');

                        option.querySelector('.family-label').setAttribute('aria-expanded', 'false');

                    }

                });

                familyButton.setAttribute('aria-expanded', familyIsActive ? 'true' : 'false');

                return;

            }

            var generationButton = event.target.closest('.generation-label');

            if (!generationButton) return;

            var generationOption = generationButton.parentElement;

            var isActive = generationOption.classList.toggle('is-active');

            gamePicker.querySelectorAll('.generation-option').forEach(function (option) {

                if (option !== generationOption) {

                    option.classList.remove('is-active');

                    option.querySelector('.generation-label').setAttribute('aria-expanded', 'false');

                }

            });

            generationButton.setAttribute('aria-expanded', isActive ? 'true' : 'false');

        });

    }



    function renderTeam() {

        var game = currentGame || games[0];

        var selectedValue = trainerSelect.value;
        var isLocationView = game.generation === 1;
        var selectedEntries = getTrainerEntries(game, selectedValue);
        var currentIndex = isLocationView ? getLocationIndex(game, selectedValue) :
            (selectedEntries.length ? Number(selectedEntries[0].set.index) || 0 : 0);
        var routeLocations = getRouteLocations(game);
        var previousRoute = routeLocations.slice().reverse().find(function (route) {
            return route.index < currentIndex;
        });
        var nextRoute = routeLocations.find(function (route) {
            return route.index > currentIndex;
        });
        previousRouteButton.disabled = !previousRoute;
        previousRouteButton.setAttribute('aria-label', previousRoute ?
            'Go to ' + getLocationLabel(previousRoute.location) : 'No previous route available');
        nextRouteButton.disabled = !nextRoute;
        nextRouteButton.setAttribute('aria-label', nextRoute ?
            'Go to ' + getLocationLabel(nextRoute.location) : 'No next route available');

        var trainerGroups = isLocationView ? getTrainerNames(game).filter(function (name) {
            return getTrainerLocation(name) === selectedValue;
        }).map(function (name) {
            return {name: name, entries: getTrainerEntries(game, name)};
        }) : [];
        var entries = isLocationView ? trainerGroups.reduce(function (all, group) {
            return all.concat(group.entries);
        }, []) : getTrainerEntries(game, selectedValue);

        fightGame.textContent = 'Generation ' + game.generation + ' / ' + (game.family ? game.family + ' (' + game.language + ')' : game.label);

        fightName.textContent = selectedValue ? (isLocationView ? getLocationLabel(selectedValue) : selectedValue.trim()) : 'Choose a trainer';

        teamSummary.textContent = isLocationView ?
            trainerGroups.length + ' trainers · ' + entries.length + ' Pokémon' :
            entries.length + (entries.length === 1 ? ' Pokemon' : ' Pokemon');

        if (isLocationView) {
            chart.innerHTML = trainerGroups.length ? trainerGroups.map(function (group) {
                return renderTrainerTeam(group.name, group.entries, game, game.generation);
            }).join('') : '<div class="empty">No trainer teams are available for this location.</div>';
        } else {
            chart.innerHTML = entries.length ?
                renderTrainerTeam(selectedValue, entries, game, game.generation) :
                '<div class="empty">No trainer team data is available for this game.</div>';
        }

        var saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
        saved.game = game.id;
        saved[isLocationView ? 'location' : 'trainer'] = selectedValue;
        localStorage.setItem(storageKey, JSON.stringify(saved));

    }

    previousRouteButton.addEventListener('click', function () {
        var game = currentGame || games[0];
        var selectedValue = trainerSelect.value;
        var isLocationView = game.generation === 1;
        var selectedEntries = getTrainerEntries(game, selectedValue);
        var currentIndex = isLocationView ? getLocationIndex(game, selectedValue) :
            (selectedEntries.length ? Number(selectedEntries[0].set.index) || 0 : 0);
        var previousRoute = getRouteLocations(game).slice().reverse().find(function (route) {
            return route.index < currentIndex;
        });
        if (!previousRoute) return;

        jQuery(trainerSelect).val(isLocationView ? previousRoute.location : previousRoute.trainer).trigger('change');
        renderTeam();
    });

    nextRouteButton.addEventListener('click', function () {
        var game = currentGame || games[0];
        var selectedValue = trainerSelect.value;
        var isLocationView = game.generation === 1;
        var selectedEntries = getTrainerEntries(game, selectedValue);
        var currentIndex = isLocationView ? getLocationIndex(game, selectedValue) :
            (selectedEntries.length ? Number(selectedEntries[0].set.index) || 0 : 0);
        var nextRoute = getRouteLocations(game).find(function (route) {
            return route.index > currentIndex;
        });
        if (!nextRoute) return;

        jQuery(trainerSelect).val(isLocationView ? nextRoute.location : nextRoute.trainer).trigger('change');
        renderTeam();
    });



    var saved = JSON.parse(localStorage.getItem(storageKey) || '{}');

    var activeGame = games.find(function (game) { return game.id === saved.game; }) || games[0];

    renderGamePicker(activeGame);

    var activeButton = gamePicker.querySelector('[data-game="' + CSS.escape(activeGame.id) + '"]');

    if (activeButton) activeButton.setAttribute('aria-pressed', 'true');

    renderTrainers(activeGame);

    jQuery(trainerSelect).on('change', renderTeam);

}());
