import axios from 'axios';

export default {
  create({ commit }, { userId, restaurantId, menus }) {
    let url = 'http://localhost:1337/order-api',
    accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTg3NjE0ODIxLCJleHAiOjE1OTAyMDY4MjF9.zARj9hRYUdygS8lkMWXdzW5ScRD2hca8r7JTrMp6eWY',
    productsAdded = menus,
    pricesArray = [],
    finalPrice = '',
    quantity = 1,
    currentDatetime = new Date().toISOString();

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
  }
};
