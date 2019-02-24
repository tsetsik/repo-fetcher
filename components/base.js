import request from 'request';
import rp from 'request-promise';
import appCache from './app_cache';

export default class Base {
  constructor(request, h) {
    this.request = request;
    this.h = h;
  }

  _request(url, ttl = 10000) {
    let res = appCache.get(url);
    if (res) return res;

    return rp(
      {
        url: url,
        headers: {
          'User-Agent': 'request'
        }
      }
    )
    .then(body => {
      let items = JSON.parse(body);
      appCache.set(url, items, ttl)
      return items;
    })
    .catch(err => {
      let data = { error: true, message: 'Not Found' };
      this.h.response(data).code(403);
      return data;
    });
  }

  render() {
    // Some general validations that can be performed
    return this.respond();
  }

  respond() {
    throw "You need to implement respond method in order to use it";
  }
}