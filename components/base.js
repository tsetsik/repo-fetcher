import request from 'request';
import rp from 'request-promise';
import appCache from './app_cache';
import Token from './token';

export default class Base {
  constructor(request, h) {
    this.request = request;
    this.h = h;
    this.token = new Token;
  }

  _request(url, opts, ttl = 10000) {
    let res = appCache.get(url);
    if (res) return res;

    let options = Object.assign({
      url: url,
      method: 'GET',
      headers: {
        'User-Agent': 'request'
      }
    }, opts || {});

    return rp(options)
      .then(body => {
        let items = JSON.parse(body);
        appCache.set(url, items, ttl)
        return items;
      })
      .catch(err => {
        let data = { error: true, message: 'Not Found' };
        this.h.response(data).code(404);
        return data;
      });
  }

  render() {
    // Validate the jwt token
    return this.validateJwtToken() ? this.respond() : this.respondFail();
  }
  
  validateJwtToken() {
    let jwt_token = this.request.headers['authorization'].replace('Bearer ', '');
    return this.token.verify(jwt_token);
  }

  addResponseToken(token) {
    // let response = ;
    // this.h.response('success').response.header('Authorization', token);
    // this.h.response({'foo': '111'}).code(200);
  }

  respond() {
    throw "You need to implement respond method in order to use it";
  }

  respondFail(message = 'Unatuhorized request', code = 401) {
    let data = { error: true, message: message };
    this.h.response(data).code(code);
    return data;
  }
}