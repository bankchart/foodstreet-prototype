export default {
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },
  SET_ID(state, id) {
    state.id = id;
  },
  SET_USERNAME(state, username) {
    state.username = username;
  },
  SET_DISPLAY_NAME(state, displayName) {
    state.displayName = displayName;
  },
  SET_FIRST_NAME(state, firstName) {
    state.firstName = firstName;
  },
  SET_LAST_NAME(state, lastName) {
    state.lastName = lastName;
  },
  SET_TEL(state, tel) {
    state.tel = tel;
  },
  SET_USER_IMAGE(state, userImage) {
    state.userImage = userImage;
  },
  SET_USER_LOGGED_IN(state, isUserLoggedIn) {
    state.isUserLoggedIn = isUserLoggedIn;
  },
  RESET_USER(state) {
    Object.assign(state, {
      accessToken: null,
      id: null,
      username: null,
      displayName: null,
      firstName: null,
      lastName: null,
      tel: null,
      userImage: null,
      isUserLoggedIn: false
    });
  }
};
