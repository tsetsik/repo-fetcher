import Base from './base';
import github from 'octonode';

export default class Auth extends Base {
  constructor(request, h) {
    super(request, h)
    this.secret = process.env.JWT_SECRET;
  }

  render() {
    //Github api - basic atuhentication was returning 401 even with valid username:password for authorized and not authorized users
    //So check for one user, just for demo purposes, the best way is to be oauth authorization
    let payload = this.request.payload;
    if(payload.username !== process.env.USERNAME || payload.password !== process.env.PASSWORD)
      return this.respondFail();

    return this.respondSuccess();
  }

  respondSuccess() {
    let response = this.h.response({ username: this.request.payload.username });

    this.jwt_token = this.token.generate(this.request);
    this.addResponseHeaders(response);

    return response;
  }
}