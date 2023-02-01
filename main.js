import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
/* SEARCH */
const FORM = document.querySelector('form')
const SEARCH_ICON = document.querySelector('.search-icon')
const IMPUT_SEARCH = document.querySelector('.input-search')

/* burger MENU */

const BTN_burger = document.querySelector('.toggle')
const BURGER_MENU = document.querySelector('.burger__div')


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


const deployMenu = (e) => {

    if (e.target.matches('.toggle *') || e.target.matches('.toggle')) {

        BTN_burger.classList.toggle('toggle1')
        BURGER_MENU.classList.toggle('burger__active')
    }

}




const deploySearch = (e) => {

    IMPUT_SEARCH.classList.toggle('search_active')
    IMPUT_SEARCH.focus()

    FORM.reset()
}

const searching = (e) => {



}



const init = () => {

    SEARCH_ICON.addEventListener('click', deploySearch);
    IMPUT_SEARCH.addEventListener('keyup', searching);
    BTN_burger.addEventListener('click', deployMenu)
}



init();












