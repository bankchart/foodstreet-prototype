export default {
  PUSH_MENU(state, menu) {
    if (state.menus.length == null) {
      state.menus = [];
    }
    state.menus.push(menu);
  },
  SET_MENUS(state, menus) {
    state.menus = menus;
  },
  SET_RESTAURANT_ID(state, restaurantId) {
    state.restaurantId = restaurantId;
  },
  SET_RESTAURANT_NAME(state, restaurantName) {
    state.restaurantName = restaurantName;
  },
  RESET_MENUS(state) {
    state.menus = [];
  },
  RESET_RESTAURANT_ID(state) {
    state.restaurantId = null;
  },
  RESET_CART(state) {
    state.restaurantId = null;
    state.menus = [];
  },
  REMOVE_MENU(state, menuId) {
    if (state.menus.length > 0) {
      const index = state.menus.findIndex((m) => m.id === menuId);
      if (index > -1) {
        state.menus.splice(index, 1);
      }
    }
  },
  UPDATE_MENU(state, { menuId, menuQty }) {
    if (state.menus.length > 0) {
      const index = state.menus.findIndex((m) => m.id === menuId);
      if (index > -1) {
        state.menus[index].qty = menuQty;
      }
    }
  }
};