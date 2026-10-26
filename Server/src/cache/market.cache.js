
const cache = new Map();

export function get(key) {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() >= entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function set(key, data, ttl = 20_000) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
}

export function del(key) {
  cache.delete(key);
}

export function clear() {
  cache.clear();
}
