import NodeCache from 'node-cache';

class AppCache {
  constructor() {
    this.cache = new NodeCache();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value, ttl = 10000) {
    return this.cache.set(key, value, ttl);
  }
}

const instance = new AppCache;
Object.freeze(instance);

export default instance;