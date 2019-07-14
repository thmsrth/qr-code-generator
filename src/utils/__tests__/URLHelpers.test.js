import { serializeQueryParams, deserializeQueryString, getParamFromQueryString } from '../URLHelpers';

it('serializeQueryParams', () => {
  expect(serializeQueryParams({test: 123})).toEqual('test=123');
  expect(serializeQueryParams({test: 123, text: 'hallo'})).toEqual('test=123&text=hallo');
  expect(serializeQueryParams({test: 123, title: 'Appname - Spoc/Lecture'}))
    .toEqual('test=123&title=Appname%20-%20Spoc%2FLecture');
});

it('deserializeQueryString', () => {
  expect(deserializeQueryString('test=123')).toEqual({test: "123"});
  expect(deserializeQueryString('test=123&text=hallo')).toEqual({test: "123", text: 'hallo'});
  expect(deserializeQueryString('test=123&title=Appname%20-%20Spoc%2FLecture'))
    .toEqual({test: "123", title: 'Appname - Spoc/Lecture'});
});

it('getParamFromQueryString', () => {
  const newParams = { test: 123 };
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${serializeQueryParams(newParams)}`;
  window.history.pushState({path: newurl}, '', newurl);
  expect(getParamFromQueryString('test')).toEqual('123');
});
