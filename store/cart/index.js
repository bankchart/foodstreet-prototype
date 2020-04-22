const state = () => ({
  restaurantId: null,
  restaurantName: null,
  menus: []
});

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export { state, getters, mutations, actions };