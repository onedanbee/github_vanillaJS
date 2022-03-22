export const debounce = (callback, limit = 200) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
};

export const sortUserId = (userList) => {
  if (userList === null) {
    return;
  }

  const tempUserList = [...userList];
  tempUserList.sort((a, b) => {
    return a.login.localeCompare(b.login);
  });
  return tempUserList;
};

export const calculateTotalPage = (totalCount, perPage) => {
  return Math.ceil(totalCount / perPage);
};
