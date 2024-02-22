/*
* Dark mode toggle
*
* In its current state, it will cause a minor FOIT.
* Basically, the background behind the panels will
* briefly flash white before turning dark. It's
* better than before, but not perfect.
*/

/*
* localStorage will only store strings
* This means that if it has the value 'false',
* It will be truey and incorrectly cause the
* dark theme to load.
*/
var prefersDarkTheme = localStorage.getItem('darkTheme') === 'true';

var darkThemeButton = document.querySelectorAll('.dark-theme-toggle');
// var darkThemeButton2 = document.getElementById('dark-theme-toggle2');

console.log(darkThemeButton);

// darkThemeButton.innerText = prefersDarkTheme ? 'Click for Light Theme' : 'Click for Dark Theme';

/*
* Function that toggles light and dark mode
* Doesn't use jQuery, probably could with some modification
*/


function toggleTheme() {

	
	prefersDarkTheme = !prefersDarkTheme;

	var darkStyles = document.getElementById('dark-theme-styles');
	darkStyles.disabled = !darkStyles.disabled;

	localStorage.setItem('darkTheme', prefersDarkTheme);
	
    

	// darkThemeButton.innerText = prefersDarkTheme ? 'Click for Light Theme' : 'Click for Dark Theme';
}

for (let i = 0; i < darkThemeButton.length; i++) {
	
	
	darkThemeButton[i].addEventListener('click', toggleTheme);
}

