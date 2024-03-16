const importExport = document.querySelector('.import-export')
const pokeReport = document.querySelector('.poke-import ')

importExport.addEventListener('click', () => {
    pokeReport.classList.toggle('active')
})

setTimeout(() => {
    const checkboxes = document.querySelector('.trainer-poker-checkboxes');
    const trainerPok = document.querySelector('.trainer-pok-list-opposing');

    // Function to create checkboxes
    function createCheckboxes() {
        for (let i = 0; i < trainerPok.childNodes.length; i++) {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.classList.add('trainer-pok-checkbox-input');
            input.dataset.index = i; // Add data-index attribute for reference
            checkboxes.append(input);

            // Add event listener to each checkbox
            input.addEventListener('change', function() {
                const index = parseInt(this.dataset.index); // Get the index from data-index attribute
                const childNode = trainerPok.childNodes[index];
                if (this.checked) {
                    // If checkbox is checked, fade away the corresponding child node
                    childNode.style.opacity = '0.3';
                } else {
                    // If checkbox is unchecked, reset opacity of the corresponding child node
                    childNode.style.opacity = '1';
                }
            });
        }
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

}, 1000);
