import axios from 'axios';

export default {
  create({ commit }, { userId, restaurantId, menus, accessToken }) {
    let url = 'http://localhost:1337/order-api',
    productsAdded = menus,
    pricesArray = [],
    finalPrice = '',
    quantity = 1;

    productsAdded.forEach(product => {
      if (product.qty >= 1) {
        quantity = product.qty;
      }
      pricesArray.push((product.price * quantity));
    });

    finalPrice = pricesArray.reduce((a, b) => a + b, 0);
    userId = userId ? userId.toString() : null;

    const order = {
      total_price: finalPrice,
      restaurant: restaurantId
    };

    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.post(url, { order, menus }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        resolve(result.data);
      } catch (e) {
        reject({
          status: e.response.status,
          message: e.response.statusText
        });
      }
    });
  },
  getOrderByAccessToken({ commit }, { accessToken }) {
    let url = 'http://localhost:1337/order-api';
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${url}/orders`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        resolve(result.data);
      } catch (e) {
        console.error(e);
        reject({
          status: e.response.status,
          message: e.response.statusText
        });
      }
    })
  }
};
