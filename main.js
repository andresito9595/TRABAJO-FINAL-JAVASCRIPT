
import { sillas, sommiers, exterior, mesas, roperos, sofas } from './PRODUCTS.JS'
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

const allProducts = [sillas, sommiers, exterior, mesas, roperos, sofas]
const NAME_CATEGORY_DIV = document.querySelector('.category-container')

/* SEARCH */
const FORM = document.querySelector('form')
const SEARCH_ICON = document.querySelector('.search-icon')
const IMPUT_SEARCH = document.querySelector('.input-search')
const BODY = document.querySelector('body')

/* burger MENU */

const BTN_burger = document.querySelector('.toggle')
const BURGER_MENU = document.querySelector('.burger__div')
const SUBMENU_BTN = document.querySelectorAll('.submenu_link')


/* PRODUCTS RENDER */

const BOTONES = document.querySelectorAll('.botonesCATEGORY')
const CARD_CONTAINER = document.querySelector('.cardProduct__div')
/* MENU BURGER */

const deployMenu = (e) => {

    if (e.target.matches('.toggle *') || e.target.matches('.toggle')) {

        BTN_burger.classList.toggle('toggle1')
        BURGER_MENU.classList.toggle('burger__menu-active');
        BODY.classList.toggle('overflow')

    }
}
function deploySubMenu(e) {
    e.preventDefault()

    const childMenu = this.nextElementSibling
    const height1 = childMenu.scrollHeight
    console.log(childMenu.children.length)
    console.log(height1)

    if (childMenu.classList.contains('desplegar')) {
        childMenu.classList.remove('desplegar')
        childMenu.removeAttribute('style')
    } else {
        childMenu.classList.add('desplegar')
        childMenu.style.height = `${height1 * childMenu.children.length * 2}px`
    }
}
/* SEARCH */

const deploySearch = (e) => {

    IMPUT_SEARCH.classList.toggle('search_active')
    IMPUT_SEARCH.focus()
    FORM.reset()
}

const searching = (e) => {

}

const renderCategory = (e) => {
    e.preventDefault();


    CategoryFilter(categorySelected)



}
/* MODIFICAR LOCALSTORAGE CON CATEGORIA NUEVA*/

const linkCategory = (e) => {

    let categoria_id = e.target.dataset.id;
    let arrayCategoria = []
    for (let i = 0; i <= allProducts.length - 1; i++) {

        allProducts[i].forEach(element => {
            if (element.category === categoria_id) {
                arrayCategoria.push(element)
                setearLS(arrayCategoria)

            }

        })

    }




}

let contenidoLS = JSON.parse(localStorage.getItem('categoria')) || []
/* SETEAR LS */
const setearLS = (categoria) => {



    if (contenidoLS.length === 0 || contenidoLS === null) {
        console.log('seteando todos los productos')
        localStorage.setItem('categoria', JSON.stringify(allProducts))
    } else {
        console.log('seteando la categoria elegida')
        localStorage.setItem('categoria', JSON.stringify(categoria))

    }

}


/* setear LS y Enviar Categorias Seleccionadas*/
const iniciarCategorias = () => {

    setearLS(contenidoLS)

    const categorySelected = [JSON.parse(localStorage.getItem('categoria'))]

    renderCardProduct(categorySelected)

}


/* RENDERIZADO PRODUCTOS */

const renderCardProduct = (array) => {
    array.forEach(e => {

        for (let i = 0; i <= e.length - 1; i++) {


            const { name, description, price_normal, discount, img, category } = e[i];

            NAME_CATEGORY_DIV.innerHTML = `<h2>${category.toUpperCase()}</h2>`;


            const precioDiscount = price_normal - (price_normal * (discount / 100))


            CARD_CONTAINER.innerHTML += `
            <div class="cardProduct__card">
                  <div class="discount-sillas"><p>${discount}%OFF</p></div>
                  <div class="contains_img">
                  <img
                  class="cardProduct__img-sillas"
                  src="${img}"
                  alt=""
                /></div>
                  
                  <p class="cardProduct__name-sillas">${name}</p>
                  <p class="cardProduct__details-sillas">
                  ${description}
                  </p>
                  <p class="cardProduct__cuotas-sillas">
                    12 CUOTAS SIN INTERES DE $${(precioDiscount / 12.).toFixed(2)}
                  </p>
                  <p class="cardProduct__precioDiscount-sillas">${price_normal}</p>
                  <p class="cardProduct__precio-sillas">$${precioDiscount}</p>
                  <input class="cardProduct__btn-sillas" type="submit" value="COMPRAR" />
                </div>
               
            `

        }

    });

}

const init = () => {
    BOTONES.forEach(e => e.addEventListener('click', linkCategory))
    window.addEventListener('DOMContentLoaded', iniciarCategorias)
    BTN_burger.addEventListener('click', deployMenu);
    SUBMENU_BTN.forEach(e => e.addEventListener('click', deploySubMenu))
    SEARCH_ICON.addEventListener('click', deploySearch);
    IMPUT_SEARCH.addEventListener('keyup', searching);



}


init();












