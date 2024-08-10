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

document.addEventListener('DOMContentLoaded', function() {
    // Function to handle click event and update background
    function handleClick1(event, backgroundDiv) {
        const imageUrl = event.target.getAttribute('src');
        if (backgroundDiv && imageUrl) {
            // Create a new style rule for background image
            const style = document.createElement('style');
            style.textContent = `
                .move-result-group > div:first-child::before {
                    background-image: url("${imageUrl}");
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
            document.head.appendChild(style);
        } else {
            console.error('Could not find elements');
        }
    }

    function handleClick2(event, backgroundDiv) {
        const imageUrl = event.target.getAttribute('src');
        if (backgroundDiv && imageUrl) {
            // Create a new style rule for background image
            const style = document.createElement('style');
            style.textContent = `
                .move-result-group > div:last-child::before {
                    background-image: url("${imageUrl}");
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
            document.head.appendChild(style);
        } else {
            console.error('Could not find elements');
        }
    }

    // Select the common parent element for .trainer-pok-list and .trainer-pok-list-opposing
    const container = document.querySelector('.trainer-poks');
    const containerOpposing = document.querySelector('.trainer-pok-list-opposing');
    
    // Add click event listener to the common parent element
    container.addEventListener('click', function(event) {
        const backgroundDiv = document.querySelector('.move-result-group > div:first-child');
        handleClick1(event, backgroundDiv);
    });

    containerOpposing.addEventListener('click', function(event) {
        const backgroundDivOpposing = document.querySelector('.move-result-group > div:last-child');
        handleClick2(event, backgroundDivOpposing);
    });
});
