import Pokedex from 'pokedex-promise-v2'

const CACHE_MS = 24 * 60 * 60 * 1000; // one day
window.dex = new Pokedex();
const queue = [];
let fetching = false;

const makeWrapper = function(name) {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    let record;
    const promise = new Promise((resolve, reject) => {
      record = {name, args, resolve, reject};
    });
    queue.push(record);
    fetchNext();
    return promise;
  };
};

const makeKey = function(name, args) {
  return name + '/' + Array.prototype.join.call(args, ',');
};

const fetchNext = function() {
  if (fetching) return;
  const record = queue.shift();
  if (!record) return;
  const {name, args, resolve, reject} = record;
  const key = makeKey(name, args);
  let cached = null;
  try {
    cached = JSON.parse(localStorage[key]);
  } catch (e) {
    // ignore
  }
  if (cached && cached.timestamp && cached.timestamp >= Date.now() - CACHE_MS) {
    console.debug(`Retrieved from cache: ${key}`);
    setTimeout(fetchNext, 0);
    resolve(cached.data);
  } else {
    console.debug(`Fetching via AJAX: ${key}`);
    fetching = true;
    dex[name].apply(dex, args)
      .then((data) => {
        console.debug(`Fetched from API, caching: ${key}`);
        setTimeout(fetchNext, 0);
        setTimeout(() => {
          const timestamp = Date.now();
          localStorage[key] = JSON.stringify({data, timestamp});
        }, 0);
        resolve(data);
      })
      .catch(reject)
      .finally(() => fetching = false);
  }
};

export default {
  getPokemonByName: makeWrapper('getPokemonByName'),
  getMoveByName: makeWrapper('getMoveByName'),
  getPokemonsList: makeWrapper('getPokemonsList'),
};