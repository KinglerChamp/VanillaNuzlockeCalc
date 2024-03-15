const importExport = document.querySelector('.import-export')
const pokeReport = document.querySelector('.poke-import ')

importExport.addEventListener('click', () => {
    pokeReport.classList.toggle('active')
})

const trainerPok = document.querySelectorAll('.trainer-pok-list')

console.log(trainerPok.childNodes)