import request from 'request';
import rp from 'request-promise';
import NodeCache from 'node-cache';

const appCache = new NodeCache();

export default class Base {
  constructor(request, h) {
    this.request = request;
    this.h = h;
  }

  _request(url, ttl = 10000) {
    let res = appCache.get(url);
    if (res) {
      return res;
    }

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
    });
  }

  render() {
    // Some checks that can be performed
    return this.respond();
  }

  respond() {
    throw "You need to overwrite respond method in order to use this route";
  }
}