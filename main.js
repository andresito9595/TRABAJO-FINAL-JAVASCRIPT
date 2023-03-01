
import { stock } from './PRODUCTS.JS'
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



/* SEARCH */
const FORM = document.querySelector('form')
const SEARCH_ICON = document.querySelector('.search-icon')
const IMPUT_SEARCH = document.querySelector('.input-search')
const BODY = document.querySelector('body')

/* burger MENU */

const BTN_burger = document.querySelector('.toggle')
const BURGER_MENU = document.querySelector('.burger__div')
const SUBMENU_BTN = document.querySelectorAll('.submenu_link')
const OVERLAY = document.querySelector('.overlay')
const CATEGORY_BTN = document.querySelector('.category_btn')


/* CART */

const CART_DIV = document.querySelector('.cart__div');
const CART_ICON = document.querySelector('.cart__icon');

/* PRODUCTS RENDER */

const BOTONES = document.querySelectorAll('.botonesCATEGORY') /*  BOTONES MENU HAMBURGUESA FILTRADO */
const BOTONES_CATEGORY = document.querySelectorAll('.filters_input-category'); /* BOTONES FILTRADO */
const CARD_CONTAINER = document.querySelector('.cardProduct__div');
const NAME_CATEGORY_DIV = document.querySelector('.category-container'); /* NOMBRE DE LA CATEGORIA */
const BOTONES_ORDER = document.querySelectorAll('.filters_input-order') /* BOTONES ORDER */

/* MENU BURGER */

const deployMenu = (e) => {

    if (e.target.matches('.toggle *') || e.target.matches('.toggle')) {

        BTN_burger.classList.toggle('toggle1')
        BURGER_MENU.classList.toggle('burger__menu-active');
        BODY.classList.toggle('overflow')
        if (BURGER_MENU.classList.contains('burger__menu-active')) {
            IMPUT_SEARCH.classList.remove('search_active')
            CART_DIV.classList.remove('cart__div-active')
            OVERLAY.style.display = 'block'
        } else {
            OVERLAY.style.display = 'none'
        }

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
/* TOOGLE CART */
const deployCart = (e) => {
    CART_DIV.classList.toggle('cart__div-active')
    if (CART_DIV.classList.contains('cart__div-active')) {
        BURGER_MENU.classList.remove('burger__menu-active');
        IMPUT_SEARCH.classList.remove('search_active');
        OVERLAY.style.display = 'block'
    } else {
        OVERLAY.style.display = 'none'

    }
}
/* SEARCH */

const deploySearch = (e) => {

    IMPUT_SEARCH.classList.toggle('search_active')
    if (IMPUT_SEARCH.classList.contains('search_active')) {
        BURGER_MENU.classList.remove('burger__menu-active')
        CART_DIV.classList.remove('cart__div-active')
    }
    IMPUT_SEARCH.focus()
    FORM.reset()

}

const searching = (e) => {

    const fitroCategoria = () => {

    }

}




/* RENDERIZADO PRODUCTOS */
const renderCardProduct = (categoria) => {
    console.log(categoria)
    console.log(stock.some(e => e.category === categoria))
    if (categoria === 'allProducts') {
        console.log('primer if todos')
        stock.forEach(e => {

            const { name, description, price_normal, discount, img, category } = e;
            const precioDiscount = price_normal - (price_normal * (discount / 100))
            NAME_CATEGORY_DIV.innerHTML = `<h2>${category.toUpperCase()}</h2>`;

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
                      <input class="cardProduct__btn-sillas" type="submit" value="ADD CART" />
                    </div>
                   
                `

        })

    } else if (order === 'mayor' || order === 'menor') {
        console.log('psegundo if getorderarray')
        console.log(getLSOrderArray)
        getLSOrderArray.forEach(e => {

            const { name, description, price_normal, discount, img, category } = e;
            const precioDiscount = price_normal - (price_normal * (discount / 100))
            NAME_CATEGORY_DIV.innerHTML = `<h2>${category.toUpperCase()}</h2>`;

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
                      <input class="cardProduct__btn-sillas" type="submit" value="ADD CART" />
                    </div>
                   
                `

        })

    } else if (stock.some(e => e.category === categoria)) {
        const productsFilters = stock.filter(e => e.category === categoria)
        productsFilters.forEach(e => {


            const { name, description, price_normal, discount, img, category } = e;
            const precioDiscount = price_normal - (price_normal * (discount / 100))

            NAME_CATEGORY_DIV.innerHTML = `<h2>${category.toUpperCase()}</h2>`;

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
                       <input class="cardProduct__btn-sillas" type="submit" value="ADD CART" />
                     </div>
                    
                 `
        })
    } else {
        categoria.forEach(e => {

            const { name, description, price_normal, discount, img, category } = e;
            const precioDiscount = price_normal - (price_normal * (discount / 100))
            NAME_CATEGORY_DIV.innerHTML = `<h2>${category.toUpperCase()}</h2>`;

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
                      <input class="cardProduct__btn-sillas" type="submit" value="ADD CART" />
                    </div>
                   
                `

        })
    }

}

const getLS = JSON.parse(localStorage.getItem('categoria'))
const getLSOrderArray = JSON.parse(localStorage.getItem('orderedArray'))
const order = JSON.parse(localStorage.getItem('order'))


const setearLS = (parametro) => {
    localStorage.setItem('categoria', JSON.stringify(parametro))
}
/*  SELECCIONAR CATEGORIA */

const selectCategory = (e) => {


    let buttonCategory = e.target.dataset.id;
    setearLS(buttonCategory)
    renderCardProduct(buttonCategory)

}
const reset = true
/* RELAOD PAGE PRODUCT SECCTION */
const iniciarCategorias = () => {
    if (getLS === 'allProducts') {
        setearLS('allProducts')
        renderCardProduct(getLS)
        return
    }
    if (order) {
        console.log('voy por aqui')
        renderCardProduct(getLSOrderArray)
    }
    else {
        renderCardProduct(getLS)
    }

}
/* BUTTONS FILTERS */
const buttonsFilters = (e) => {


    localStorage.removeItem('order')
    selectCategory(e)
    location.reload()
}
/* FUNCTION ORDER */

const orderProducts = (e) => {

    let pulsedBtn = e.target.dataset.id
    if (pulsedBtn === 'mayor') {

        const arrayProductosOrdenados = stock.filter(e => e.category === getLS).sort((a, b) => {
            return (b.price_normal - (b.price_normal * (b.discount / 100))) - (a.price_normal - (a.price_normal * (a.discount / 100)))

        })
        localStorage.setItem('order', JSON.stringify('mayor'))

        localStorage.setItem('orderedArray', JSON.stringify(arrayProductosOrdenados))
        location.reload()


    } else {

        const arrayProductosOrdenados = stock.filter(e => e.category === getLS).sort((a, b) => {
            return (a.price_normal - (a.price_normal * (a.discount / 100))) - (b.price_normal - (b.price_normal * (b.discount / 100)))
        })
        localStorage.setItem('order', JSON.stringify('menor'))

        localStorage.setItem('orderedArray', JSON.stringify(arrayProductosOrdenados))
        location.reload()


    }
}







/* ------------------ */



const init = () => {
    BOTONES.forEach(e => e.addEventListener('click', selectCategory))
    BOTONES_CATEGORY.forEach(e => e.addEventListener('click', buttonsFilters))
    BOTONES_ORDER.forEach(e => e.addEventListener('click', orderProducts))
    CATEGORY_BTN.addEventListener('click', selectCategory)
    window.addEventListener('load', iniciarCategorias)
    BTN_burger.addEventListener('click', deployMenu);
    SUBMENU_BTN.forEach(e => e.addEventListener('click', deploySubMenu))
    SEARCH_ICON.addEventListener('click', deploySearch);
    IMPUT_SEARCH.addEventListener('keyup', searching);
    CART_ICON.addEventListener('click', deployCart);


}


init();








/*  <div class="product__cart">
        <img src="Muebles/Sillas/3.webp" alt="" />
        <p>$1500</p>
        <div class="cart__qualy">
          <input class="removeAmount" type="button" value="-" />
          <input class="amount" type="button" value="1" />
          <input class="addAmount" type="button" "button" value="+"/>
        </div>
        <span class="product__delete"
          ><img src="Icons/remove-cart.png" alt=""
        /></span>
      </div>  */



