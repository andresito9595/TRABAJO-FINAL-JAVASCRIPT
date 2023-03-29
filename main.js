
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
const CATEGORY = document.querySelector('.category_btn')


/* CART */

const CART_DIV = document.querySelector('.cart__div');
const CART_ICON = document.querySelector('.cart__icon');
let ADDCART_BTN = document.querySelectorAll('.cardProduct__btn');
const PRODUCT_CART_DIV = document.querySelector('.cardProduct_div')
const NOPRODUCTS = document.querySelector('.noProductsText')
const TOTAL_CART = document.querySelector('.cart__total')



/* PRODUCTS RENDER */

const BOTONES = document.querySelectorAll('.botonesCATEGORY') /*  BOTONES MENU HAMBURGUESA FILTRADO */
const BOTONES_CATEGORY = document.querySelectorAll('.filters_input-category'); /* BOTONES FILTRADO */
const CARD_CONTAINER = document.querySelector('.cardProduct__div');
const NAME_CATEGORY_DIV = document.querySelector('.category-container'); /* NOMBRE DE LA CATEGORIA */
const BOTONES_ORDER = document.querySelectorAll('.filters_input-order') /* BOTONES ORDER */

/* ORDER AND FILTERS BTN */


const ORDER_BTN = document.querySelector('.orderBtn')
const CATEGORY_BTN = document.querySelector('.categoryBtn')

const controladorProductos = {
    cantidad: 0,
    total: 0
}




/* RENDERIZADO PRODUCTOS */
const renderCardProduct = (categoria) => {
    if (categoria === 'allProducts') {
        stock.forEach(e => {
            renderProduct(e)
        })
    } else if (order === 'mayor' || order === 'menor') {
        getLSOrderArray.forEach(e => {
            renderProduct(e)
        })

    } else if (stock.some(e => e.category === categoria)) {
        const productsFilters = stock.filter(e => e.category === categoria)
        productsFilters.forEach(e => {


            renderProduct(e)
        })
    } else {
        categoria.forEach(e => {

            renderProduct(e)
        })
    }
}


/* FUNCION PARA ORDENAR ITEMS*/


const ordenarItems = (pulsedBtn) => {
    if (pulsedBtn === 'menor') {

        const arrayProductosOrdenados = stock.sort((a, b) => {
            return (a.price_normal - (a.price_normal * (a.discount / 100))) - (b.price_normal - (b.price_normal * (b.discount / 100)))
        })


        localStorage.setItem('order', JSON.stringify('menor'))

        localStorage.setItem('orderedArray', JSON.stringify(arrayProductosOrdenados))
        location.reload()
    } else if (pulsedBtn === 'mayor') {
        console.log('enter donde quiero')
        const arrayProductosOrdenados = stock.sort((a, b) => {
            return (b.price_normal - (b.price_normal * (b.discount / 100))) - (a.price_normal - (a.price_normal * (a.discount / 100)))
        })
        localStorage.setItem('order', JSON.stringify('mayor'))
        localStorage.setItem('orderedArray', JSON.stringify(arrayProductosOrdenados))
        location.reload()
    }
}
/* LOCAL STORAGE CONFIG */
const getLS = JSON.parse(localStorage.getItem('categoria'))
const getLSOrderArray = JSON.parse(localStorage.getItem('orderedArray'))
const order = JSON.parse(localStorage.getItem('order'))


const setearLS = (parametro) => {
    localStorage.setItem('categoria', JSON.stringify(parametro))
}
/*  SELECCIONAR CATEGORIA */

const selectCategory = (e) => {

    localStorage.removeItem('order')
    let buttonCategory = e.target.dataset.id;
    setearLS(buttonCategory)
    renderCardProduct(buttonCategory)

}

/* RELAOD PAGE PRODUCT SECCTION */
const iniciarCategorias = () => {
    if (getLS === 'allProducts' && order) {

        renderCardProduct(getLSOrderArray)
    }
    else if (getLS === 'allProducts') {
        setearLS('allProducts')
        renderCardProduct(getLS)
    }

    else {
        renderCardProduct(getLS)
    }
    actualizarBtnAdd();


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

    if (getLS === 'allProducts') {

        if (order === null) {

            ordenarItems(pulsedBtn)


        } else if (order !== null) {
            ordenarItems(pulsedBtn)
        }
    }
    else if (pulsedBtn === 'mayor') {

        const arrayProductosOrdenados = stock.filter(e => e.category === getLS).sort((a, b) => {
            return (b.price_normal - (b.price_normal * (b.discount / 100))) - (a.price_normal - (a.price_normal * (a.discount / 100)))

        })
        localStorage.setItem('order', JSON.stringify('mayor'))
        localStorage.setItem('orderedArray', JSON.stringify(arrayProductosOrdenados))
        location.reload()


    } else if (pulsedBtn === 'menor') {

        const arrayProductosOrdenados = stock.filter(e => e.category === getLS).sort((a, b) => {
            return (a.price_normal - (a.price_normal * (a.discount / 100))) - (b.price_normal - (b.price_normal * (b.discount / 100)))
        })
        localStorage.setItem('order', JSON.stringify('menor'))
        localStorage.setItem('orderedArray', JSON.stringify(arrayProductosOrdenados))
        location.reload()
    }

}
/* FUNCION PARA ABRIR OrderBtn */
const openOrder = (e) => {

    if (e.target.matches('.orderBtn *') || e.target.matches('.orderBtn')) {
        ORDER_BTN.lastElementChild.classList.toggle('menu_active')
        if (ORDER_BTN.lastElementChild.classList.contains('menu_active')) {
            CATEGORY_BTN.lastElementChild.classList.remove('menu_active')

        }
    }
}


/* FUNCION PARA ABRIR CategoryBtn */

const openCategorys = (e) => {
    if (e.target.matches('.categoryBtn *') || e.target.matches('.category')) {
        CATEGORY_BTN.lastElementChild.classList.toggle('menu_active')
    }
    if (CATEGORY_BTN.lastElementChild.classList.contains('menu_active')) {

        ORDER_BTN.lastElementChild.classList.remove('menu_active')
    }
}

/* FUNCION PARA CERRAR MENU BURGER */

const closeMenu = (e) => {
    if (BURGER_MENU.classList.contains('burger__menu-active')) {
        if (e.target === OVERLAY) {
            console.log('aca')
            BURGER_MENU.classList.remove('burger__menu-active')
            OVERLAY.style.display = 'none'
        }
    }
}

/* FUNCION PARA CERRAR CART */

const closeCart = (e) => {
    if (CART_DIV.classList.contains('cart__div-active')) {
        if (e.target === OVERLAY) {
            console.log('aca')
            CART_DIV.classList.remove('cart__div-active')
            OVERLAY.style.display = 'none'
        }
    }
}


/* ------------------ */
const actualizarBtnCart = () => {
    let CART_DELETE = document.querySelectorAll('.cart__product-delete')

    let CART_REMOVE = document.querySelectorAll('.remove')
    let CART_ADD = document.querySelectorAll('.add')

    CART_DELETE.forEach(btn => btn.addEventListener('click', deleteProduct))
    CART_REMOVE.forEach(btn => btn.addEventListener('click', removeQuantity))
    CART_ADD.forEach(btn => btn.addEventListener('click', addQuantity))

}
const AmountTotal = () => {
    let PRODUCTS_DIV_BOX = document.querySelector('.cart__product');

    if (PRODUCTS_DIV_BOX) {
        TOTAL_CART.innerHTML = `
        <p>Cantidad de Productos : ${controladorProductos.cantidad}</p>
        <p>TOTAL = $ ${controladorProductos.total}</p>
        `
    }
}

const sumadorTotal = (precio) => {
    controladorProductos.total = controladorProductos.total + precio
}

const setearLsCantidad = () => {

    localStorage.setItem('cantidadCart', JSON.stringify(controladorProductos.cantidad))
    localStorage.setItem('totalCart', JSON.stringify(controladorProductos.total))
}

let cantidadCartLS = JSON.parse(localStorage.getItem('cantidadCart'))
let totalCartLS = JSON.parse(localStorage.getItem('totalCart'))

const actualizarCantidadCart = () => {
    controladorProductos.cantidad = cantidadCartLS
    controladorProductos.total = totalCartLS
}






const actualizarBtnAdd = () => {
    ADDCART_BTN = document.querySelectorAll('.cardProduct__btn')

    ADDCART_BTN.forEach(boton => boton.addEventListener('click', addProduct))
}
/*  FUNCION AGREGAR PRODUCTO A CART */
let productsAddedCart = JSON.parse(localStorage.getItem('productsInCart')) || []

const loadProductsAddedCart = () => {

    return productsAddedCart = JSON.parse(localStorage.getItem('productsInCart')) || []
}

const textNoProducts = () => {
    let PRODUCTS_DIV_BOX = document.querySelector('.cart__product')

    if (PRODUCTS_DIV_BOX) {

        NOPRODUCTS.style.display = 'none'
    } else {

        NOPRODUCTS.style.display = 'flex'
    }
}

const LoadCart = () => {

    renderProductInCart(productsAddedCart)
    textNoProducts()
}

const deleteProduct = (e) => {

    let idProducto = e.currentTarget.dataset.id
    let newArray = productsAddedCart.filter(product => product.id != idProducto)

    localStorage.setItem('productsInCart', JSON.stringify(newArray))
    loadProductsAddedCart()

    let card = e.target.closest('.cart__product');
    let divQuantity = e.currentTarget.previousElementSibling
    let cantidad = divQuantity.children[1].textContent
    let newcantidad = parseFloat(cantidad)

    controladorProductos.cantidad = controladorProductos.cantidad - newcantidad


    let card2 = e.target.closest('.cart__product');

    let price = card2.children[2].textContent;
    let totalString = price.slice(1)
    let totalNumber = parseFloat(totalString)


    controladorProductos.total = controladorProductos.total - totalNumber



    /* let newcantidad2 = parseFloat(cantidad2) */


    AmountTotal()
    LoadCart()
    card.remove()
    setearLsCantidad()



}
const removeQuantity = () => {
    console.log('log')
}
const addQuantity = () => {
    console.log('loco')
}



/* ------------------ */
const openCart = () => {

    CART_DIV.classList.toggle('cart__div-active')
    if (CART_DIV.classList.contains('cart__div-active')) {
        BURGER_MENU.classList.remove('burger__menu-active');
        IMPUT_SEARCH.classList.remove('search_active');
        if (OVERLAY) {
            OVERLAY.style.display = 'block'
        }
        BODY.addEventListener('click', closeCart)
    } else {
        if (OVERLAY) {
            OVERLAY.style.display = 'none'
        }
    }
}


const addProduct = (e) => {

    const idBoton = e.target.dataset.id;

    const productSelectedForCart = stock.find(producto => producto.id == idBoton)
    if (!productsAddedCart.some(e => e.id === productSelectedForCart.id)) {

        productSelectedForCart.cantidad = 1
        productsAddedCart.push(productSelectedForCart)
        renderProductInCart(productsAddedCart)
        openCart()
        textNoProducts()
        controladorProductos.cantidad++

        let card2 = e.target.previousElementSibling.textContent
        console.log(card2)

        let totalString = card2.slice(1)
        let totalNumber = parseFloat(totalString)
        console.log(totalNumber)
        sumadorTotal(totalNumber)
        AmountTotal()
        setearLsCantidad()

    } else {

        const index = productsAddedCart.findIndex(producto => producto.id == idBoton)
        productsAddedCart[index].cantidad++
        renderProductInCart(productsAddedCart)
        openCart()
        textNoProducts()
        controladorProductos.cantidad++

        AmountTotal()
        setearLsCantidad()
    }

    localStorage.setItem('productsInCart', JSON.stringify(productsAddedCart))
}
/* MENU BURGER */

const deployMenu = (e) => {

    if (e.target.matches('.toggle *') || e.target.matches('.toggle')) {

        BTN_burger.classList.toggle('toggle1')
        BURGER_MENU.classList.toggle('burger__menu-active');
        BODY.classList.toggle('overflow')
        if (BURGER_MENU.classList.contains('burger__menu-active')) {
            IMPUT_SEARCH.classList.remove('search_active')
            CART_DIV.classList.remove('cart__div-active')
            if (OVERLAY) {
                OVERLAY.style.display = 'block'
            }
        } else {
            if (OVERLAY) { OVERLAY.style.display = 'none' }
        }

    }
}
function deploySubMenu(e) {
    e.preventDefault()

    const childMenu = this.nextElementSibling
    const height1 = childMenu.scrollHeight


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
        if (OVERLAY) {
            OVERLAY.style.display = 'block'
        }
        BODY.addEventListener('click', closeCart)
    } else {
        if (OVERLAY) {
            OVERLAY.style.display = 'none'
        }
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

const searchingProduct = (e) => {



}

/* FUNCION RENDERIZADO */

const renderProduct = (product) => {
    const { name, description, price_normal, discount, img, category, id } = product;
    const precioDiscount = price_normal - (price_normal * (discount / 100))
    let categoriaTitle = product === 'allProducts' ? `<h2>Todos</h2>` : `<h2>${category.toUpperCase()}</h2>`;
    if (NAME_CATEGORY_DIV) {

        NAME_CATEGORY_DIV.innerHTML = categoriaTitle;

        CARD_CONTAINER.innerHTML += `
        <div class="cardProduct__card">
              <div class="discount"><p>${discount}%OFF</p></div>
              <div class="contains_img">
              <img
              class="discountcardProduct__img"
              src="${img}"
              alt=""
            /></div>
              
              <p class="cardProduct__name">${name}</p>
              <p class="cardProduct__details">
              ${description}
              </p>
              <p class="cardProduct__cuotas">
                12 CUOTAS SIN INTERES DE $${(precioDiscount / 12.).toFixed(2)}
              </p>
              <p class="cardProduct__preciodiscount">$${price_normal}</p>
              <p class="cardProduct__precio">$${precioDiscount}</p>
              <input class="cardProduct__btn" type="button" value="ADD CART" data-id="${id}" />
            </div>
           
        `
            ;
    }

}
const renderProductInCart = (arrayProductos) => {
    if (PRODUCT_CART_DIV) {

        PRODUCT_CART_DIV.innerHTML = ''
        arrayProductos.forEach(producto => renderProductInDivCart(producto))
    }


}

const renderProductInDivCart = (product) => {
    const { img, description, price_normal, discount, cantidad, id } = product
    const precioDiscount = price_normal - (price_normal * (discount / 100))
    PRODUCT_CART_DIV.innerHTML +=
        `<div class="cart__product">
            <img class="cart__product-img" src="${img}" alt="">
            <p class="cart__product-description">${description}</p>
             <p class="cart_price">$${precioDiscount}</p>
         <div class="cart_quantity">
             <div class="cart__btn-add-remove">
                <button class="cart__product-btn remove">-</button>
                <p class="cart__product-quanty">${cantidad}</p>
                <button class="cart__product-btn add">+</button>  
             </div>
<button class="cart__product-delete" data-id="${id}"><img src="Icons/remove-cart.png"  alt=""></button>
        </div>
        </div>
        `

    actualizarBtnCart()



}
/* ------------------ */

/* INTERACCIONES CART */

actualizarCantidadCart()

const init = () => {

    BOTONES.forEach(e => e.addEventListener('click', selectCategory));
    BOTONES_CATEGORY.forEach(e => e.addEventListener('click', buttonsFilters));
    BOTONES_ORDER.forEach(e => e.addEventListener('click', orderProducts));

    window.addEventListener('load', iniciarCategorias);
    BTN_burger.addEventListener('click', deployMenu);
    SUBMENU_BTN.forEach(e => e.addEventListener('click', deploySubMenu))
    SEARCH_ICON.addEventListener('click', deploySearch);
    IMPUT_SEARCH.addEventListener('keyup', searchingProduct);
    CART_ICON.addEventListener('click', deployCart);
    LoadCart()

    if (CATEGORY) {
        CATEGORY.addEventListener('click', selectCategory);
    }
    if (ORDER_BTN) {

        ORDER_BTN.addEventListener('click', openOrder);
    }
    if (CATEGORY_BTN) {
        CATEGORY_BTN.addEventListener('click', openCategorys);
    }
    if (OVERLAY) {
        OVERLAY.addEventListener('click', closeMenu)
    }
    loadProductsAddedCart()

}


init()



