import { sillas, sommiers, exterior, mesas, roperos, sofas } from './PRODUCTS.JS'

const CARD_CONTAINER = document.querySelector('.cardProduct__div')

const allProducts = [sillas, sommiers, exterior, mesas, roperos, sofas]


const renderCardProduct = (sillas) => {


    const { name, description, price_normal, discount, img } = sillas[0]

    const precioDiscount = price_normal - (price_normal * (discount / 100))

    CARD_CONTAINER.innerHTML += `
    <div class="cardProduct__card">
          <div class="discount-sillas"><p>${discount}%OFF</p></div>
          <img
            class="cardProduct__img-sillas"
            src="${img}"
            alt=""
          />
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
    console.log(price_normal / 100 * discount)
}

const categorization = {
    categorization: null
}

const CategoryFilter = (CategoryInLocalStorage) => {

    savedCategory(CategoryInLocalStorage)
    categorization.categorization = CategoryInLocalStorage
}
/* const init = () => {
   
    window.addEventListener('DOMContentLoaded', selectCategory)
}
 */
