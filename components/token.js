import jwt from 'jsonwebtoken';

export default class Token {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  generate(request, opts) {
    opts = opts || {};

    let expiresDefault = '7d';

    let token = jwt.sign({
      auth:  this.generateGUID(),
      agent: request.headers['user-agent']
    }, this.secret, { expiresIn: opts.expires || expiresDefault });

    return token;
  }

  generateGUID() {
    return new Date().getTime(); // Can be better and stronger
  }

  verify(token) {
    let decoded = false;
    try {
      decoded = jwt.verify(token, this.secret);
    } catch (e) {
      decoded = false; // still false
    }

    return decoded;
  }
}