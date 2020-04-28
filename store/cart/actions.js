const fn = {
  setCartCookie(restaurantId, restaurantName, menus, vueComp) {
    vueComp.$util.setCookie('cart', JSON.stringify({
      restaurantId,
      restaurantName,
      menus
    }));
  },
  getCartCookie(vueComp) {
    const cart = vueComp.$util.getCookie('cart');
    return JSON.parse(cart);
  }
};

export default {
  initial({ commit }, { util }) {
    let cart = util.getCookie('cart');
    if (!cart) {
      cart = {
        restaurantId: null,
        restaurantName: null,
        menus: []
      };
      util.setCookie('cart', JSON.stringify({
        restaurantId: cart.restaurantId,
        restaurantName: cart.restaurantName,
        menus: cart.menus
      }));
    } else {
      try {
        cart = JSON.parse(cart);
        commit('SET_RESTAURANT_ID', cart.restaurantId);
        commit('SET_RESTAURANT_NAME', cart.restaurantName);
        commit('SET_MENUS', cart.menus);
      } catch (e) {
        console.error(e);
      }
    }
  },
  addToCart({ commit, state }, { restaurantId, restaurantName, menu, vueComp }) {
    console.log('restaurantId', restaurantId);
    console.log('restaurantName', restaurantName);
    if (restaurantId !== fn.getCartCookie(vueComp).restaurantId) {
      commit('RESET_CART');
    }
    commit('SET_RESTAURANT_ID', restaurantId);
    commit('SET_RESTAURANT_NAME', restaurantName);
    commit('PUSH_MENU', menu);
    fn.setCartCookie(restaurantId, restaurantName, state.menus, vueComp);
  },
  removeFromCart({ commit, state }, { restaurantId, restaurantName, menuId, vueComp }) {
    commit('REMOVE_MENU', menuId);
    fn.setCartCookie(restaurantId, restaurantName, state.menus, vueComp);
  },
  updateQtyCart({ commit, state }, { restaurantId, restaurantName, menuId, menuQty, vueComp }) {
    commit('UPDATE_MENU', { menuId, menuQty });
    fn.setCartCookie(restaurantId, restaurantName, state.menus, vueComp);
  },
  reset({ commit, state }, { util }) {
    commit('RESET_CART');
    util.setCookie('cart', JSON.stringify({
      restaurantId: state.restaurantId,
      restaurantName: state.restaurantName,
      menus: state.menus
    }));
  }
};
