import axios from 'axios';

export default {
  verifyAccessToken({ commit }, { util }) {
    // const accessToken = util.getCookie('access_token');
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTg3NjE0NzUxLCJleHAiOjE1OTAyMDY3NTF9.KI_KAsoXJGho748N-CqgerXnppMEJIV48gB25Y5NlWg';
    const url = 'http://localhost:1337/users/me'; 
    commit('SET_ACCESS_TOKEN', accessToken);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        commit('SET_DISPLAY_NAME', result.data.display_name);
        commit('SET_ID', result.data.id);
        resolve(result.data);
      } catch (e) {
        if (e.response.status === 401) {
          commit('RESET_USER');
          util.deleteCookie('access_token');
        }
        reject({
          status: e.response.status,
          message: e.response.statusText
        });
      }
    });
  },
  setUserLoggedIn({ commit }, isUserLoggedIn) {
    commit('SET_USER_LOGGED_IN', isUserLoggedIn);
  },
  setDisplayName({ commit }, displayName) {
    console.log('in setDisplayName', displayName);
    commit('SET_DISPLAY_NAME', displayName);
  },
  logout({ commit }) {
    commit('RESET_USER');
  }
};
