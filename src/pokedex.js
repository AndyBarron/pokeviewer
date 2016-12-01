import Pokedex from 'pokedex-promise-v2'

const CACHE_SECONDS = 24 * 60 * 60; // one day
const P = new Pokedex();

export function getPokemonByName(id) {
  let cached = null;
  try {
    cached = JSON.parse(localStorage[id]);
  } catch (e) {
    // ignore
  }
  if (cached && cached.date >= Date.now() - CACHE_SECONDS) {
    console.info(`Retrieved from cache: ${id}`);
    return Promise.resolve(cached.info);
  } else {
    console.info(`Not found in cache, fetching: ${id}`);
    return P.getPokemonByName(id).then((info) => {
      console.info(`Retrieved from API, caching: ${id}`);
      setTimeout(() => {
        localStorage[id] = JSON.stringify({
          info,
          date: Date.now(),
        });
      }, 0);
      return info;
    });
  }
}
