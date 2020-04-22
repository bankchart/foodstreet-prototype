const utilities = {
  isEmailPattern: (val) => {
    return (val || '')
      .trim()
      .match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      );
  },
  getQueryStringByName: (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  isDevice: () => {
    return (
      !document.URL.includes('http://') && !document.URL.includes('https://')
    );
  },
  getCookie: (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },
  setCookie: (cname, cvalue, exdays = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  },
  deleteCookie: (name, path, domain) => {
    if (name) {
      utilities.setCookie(name, '', -1);
    }
  },
  setStyleAttribute: (vueComp, refName, attrName, value) => {
    const refElm = vueComp.$refs[refName];
    if (refElm) {
      refElm.style[attrName] = value;
    }
  },
  addClass: (ref, className) => {
    if (!ref.classList.contains(className)) {
      ref.classList.add(className);
      return true;
    }
    return false;
  },
  removeClass: (ref, className) => {
    if (ref.classList.contains(className)) {
      ref.classList.remove(className);
      return true;
    }
    return false;
  },
  inputFieldValidate: (
    store,
    actionName,
    value,
    validity,
    validityKey,
    validatePattern,
    validateFn
  ) => {
    const reg = new RegExp(validatePattern);
    const valueTmp = (value || '').trim();
    store.dispatch(actionName, valueTmp);
    if (validateFn) {
      validateFn();
    } else {
      validity[validityKey] = value ? reg.test(valueTmp) : false;
    }
  },
  inputFieldValidateNotSet: (
    value,
    validity,
    validityKey,
    validatePattern,
    validateFn
  ) => {
    const reg = new RegExp(validatePattern);
    const valueTmp = (value || '').trim();
    if (validateFn) {
      validateFn();
    } else {
      validity[validityKey] = value ? reg.test(valueTmp) : false;
    }
  },
  xor: (onceActive, validity) => {
    return (onceActive && !validity) || (!onceActive && validity);
  },
  clone: (data) => {
    return Object.assign({}, data);
  }
};

export default (ctx, inject) => {
  inject('util', utilities);
};
