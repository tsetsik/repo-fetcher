import Base from './base';

export default class Commits extends Base {
  respond() {
    return this.fetch();
  }

  async fetch() {
    return await this._request(this._url());
  }

  _url() {
    return `${process.env.COMMITS_URL}/${this.request.params.repo}/git/commits/${this.request.params.commit_hash}`;
  }
}