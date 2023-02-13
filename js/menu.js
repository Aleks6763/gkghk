const menu = () => {
   const cardsMenu = document.querySelector('.cards-menu');

   const cardArray = localStorage.getItem('cart') ?
      JSON.parse(localStorage.getItem('cart')) : [];

   const changeTitle = (restaurant) => {
      const restaurantTitle = document.querySelector('.restaurant-title');
      restaurantTitle.textContent = restaurant.name;
   }

   const changeRating = (restaurant) => {
      const restaurantRate = document.querySelector(".rating");
      restaurantRate.textContent = restaurant.stars;
   };

   const changePrice = (restaurant) => {
      const restaurantPrice = document.querySelector(".price");
      restaurantPrice.textContent = "От " + restaurant.price + " ₽";
   };

   const changeCategory = (restaurant) => {
      const restaurantKitchen = document.querySelector(".category");
      restaurantKitchen.textContent = restaurant.kitchen;
   };

   const addToCard = (cartItem) => {
      if (cardArray.some((item) => item.id === cartItem.id)) {
         cardArray.map((item => {
            if (item.id === cartItem.id) {
               item.count++;
            }
            return item;
         }));
      } else {
         cardArray.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cardArray));
   }

   const renderItem = (data) => {
      data.forEach(({
         description,
         id,
         image,
         name,
         price
      }) => {
         const card = document.createElement('div');
         // console.log(description);
         card.classList.add('card');

         card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-image" />
            <div class="card-text">
               <div class="card-heading">
                  <h3 class="card-title card-title-reg">${name}</h3>
               </div>
               <div class="card-info">
                  <div class="ingredients">
                  ${description}
                  </div>
               </div>
                  <div class="card-buttons">
                     <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                     </button>
                     <strong class="card-price-bold">${price} ₽</strong>
                  </div>
            </div>
         `
         card.querySelector('.button-card-text').addEventListener('click', () => {
            addToCard({
               name,
               price,
               id,
               count: 1
            })
         });

         cardsMenu.append(card);
      });
   }

   if (localStorage.getItem('restaurant')) {
      const restaurant = JSON.parse(localStorage.getItem('restaurant'));

      changeTitle(restaurant);
      changeRating(restaurant);
      changePrice(restaurant);
      changeCategory(restaurant);

      fetch(`./db/${restaurant.products}`)
         .then((response) => response.json())
         .then((data) => {
            renderItem(data);
         })
         .catch((error) => {
            console.log(error);
         })
   } else {
      window.location.href = '/';
   }
}

menu();