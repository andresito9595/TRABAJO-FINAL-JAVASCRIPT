const SEARCH_ICON = document.querySelector('.search-icon')
const IMPUT_SEARCH = document.querySelector('.input-search')


const deployMenu = (e) => {

    return IMPUT_SEARCH.classList.toggle('menu_active')

}








const init = () => {

    SEARCH_ICON.addEventListener('click', deployMenu)
}



init();