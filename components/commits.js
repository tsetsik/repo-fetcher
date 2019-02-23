import Base from './base';

export default class Commits extends Base {
  respond() {
    return this.fetch();
  }

  async fetch() {
    return await this._request(this._url()).catch(err => {
      let data = { error: true, message: 'Not Found' };
      this.h.response(data).code(403);
      return data;
    });
  }

  _url() {
    return `${process.env.COMMITS_URL}/${this.request.params.repo}/git/commits/${this.request.params.commit_hash}`;
  }
}