export default {
  accessToken(state) {
    return state.accessToken;
  },
  id(state) {
    return state.id;
  },
  username(state) {
    return state.username;
  },
  displayName(state) {
    return state.displayName;
  },
  firstName(state) {
    return state.firstName;
  },
  lastName(state) {
    return state.lastName;
  },
  fullName(state) {
    return `${state.firstName || ''} ${state.lastName || ''}`;
  },
  tel(state) {
    return state.tel;
  },
  userImage(state) {
    return state.userImage;
  },
  isUserLoggedIn(state) {
    return state.isUserLoggedIn;
  }
};
