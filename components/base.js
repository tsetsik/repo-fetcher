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
        appCache.set(url, items, ttl);
        return items;
      })
      .catch(err => {
        let data = { error: true, message: 'Not Found' };
        this.h.response(data).code(404);
        return data;
      });
  }

  async render() {
    let response = this.h.response(
      this.validateJwtToken() ? await this.respond(response) : this.respondFail(response)
    );
    this.addResponseHeaders(response);
    return response;
  }
  
  validateJwtToken() {
    let jwt_token = this.request.headers['authorization'].replace('Bearer ', '');
    let valid = this.token.verify(jwt_token);

    if (valid)
      this.jwt_token = jwt_token;

    return valid;
  }

  addResponseHeaders(response) {
    // Add the token to the response
    if (this.jwt_token)
      response.header('X-JWT-TOKEN', this.jwt_token);

    return response;
  }

  respond(response) {
    throw "You need to implement respond method in order to use it";
  }

  respondFail(response, message = 'Unatuhorized request', code = 401) {
    let data = { error: true, message: message };
    (response || this.h.response(data)).code(code);
    return data;
  }
}