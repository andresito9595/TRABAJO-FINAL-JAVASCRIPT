const SEARCH_ICON = document.querySelector('.search-icon')
const IMPUT_SEARCH = document.querySelector('.input-search')


const deployMenu = (e) => {

    IMPUT_SEARCH.classList.toggle('menu_active')
    IMPUT_SEARCH.focus()


}





const init = () => {

    SEARCH_ICON.addEventListener('click', deployMenu)
}



init();