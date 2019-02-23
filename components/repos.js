import Base from './base';

export default class Repos extends Base {
  respond() {
    return this.fetch();
  }

  async fetch() {
    return await this._request(process.env.REPOS_URL);
  }
}