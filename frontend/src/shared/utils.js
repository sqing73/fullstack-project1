const bindURL = "http://192.168.1.7:5000";

const getCookieItem = (sKey) => {
  if (typeof window !== 'undefined') {
    return document.cookie.replace(
      new RegExp(
        "(?:(?:^|.*;)\\s*" +
          sKey.replace(/[\-\.\+\*]/g, "\\$&") +
          "\\s*\\=\\s*([^;]*).*$)|^.*$"
      ),
      "$1"
    );
  }
};

const isLogin = () => {
  return getCookieItem('isLogin') === 'true';
};

const isAdmin = () => {
  return getCookieItem('isAdmin') == 1;
};

const isSelf = (uid) => {
  return getCookieItem('uid') === uid;
};

const canDelete = (uid) => {
  return isSelf(uid) || isAdmin();
};

export { bindURL, getCookieItem, isLogin, isAdmin, isSelf, canDelete };