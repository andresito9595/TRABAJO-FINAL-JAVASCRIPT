import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay: {
        delay: 3500
    }
});

const SEARCH_ICON = document.querySelector('.search-icon')
const IMPUT_SEARCH = document.querySelector('.input-search')


const deployMenu = (e) => {

    IMPUT_SEARCH.classList.toggle('menu_active')
    IMPUT_SEARCH.focus()


}

const searching = (e) => {

    console.log(e.target.value)

}



const init = () => {

    SEARCH_ICON.addEventListener('click', deployMenu)
    IMPUT_SEARCH.addEventListener('keyup', searching)
}



init();












