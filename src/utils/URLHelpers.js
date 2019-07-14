export function deserializeQueryString(queryStr) {
  const params = {};
  const regExpStr = (match, key, value) => {
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  };
  if (queryStr && typeof queryStr === 'string') {
    queryStr.replace(/([^=?]+)=([^&]*)&?/g, regExpStr);
  }
  return params;
}

export function serializeQueryParams(params) {
  return params
    && Object.keys(params).filter(key => params[key] !== '' && params[key] !== undefined)
      .map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
}

export function getQueryString() {
  return window.location.search;
}

export function updateQueryParams(params) {
  const queryString = getQueryString();
  const currentParams = deserializeQueryString(queryString);
  const newParams = {
    ...currentParams,
    ...params,
  };
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${serializeQueryParams(newParams)}`;
  window.history.pushState({ path: newurl }, '', newurl);
}

export function getParamFromQueryString(key) {
  const queryString = getQueryString();
  const params = deserializeQueryString(queryString);
  if (Object.prototype.hasOwnProperty.call(params, key) && params[key].length !== 0) {
    return params[key];
  }
  return '';
}
