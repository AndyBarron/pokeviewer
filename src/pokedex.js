import axios from 'axios';

const API = '//pokeapi.co/api/v2';
const CACHE_MS = 24 * 60 * 60 * 1000; // one day
const queue = [];
let fetching = false;

const get = function(url) {
  let record;
  const promise = new Promise((resolve, reject) => {
    record = {url, resolve, reject};
  });
  queue.push(record);
  fetchNext();
  return promise;
};

const fetchNext = function() {
  if (fetching) return;
  const record = queue.shift();
  if (!record) return;
  const {url, resolve, reject} = record;
  let cached = null;
  try {
    cached = JSON.parse(localStorage[url]);
  } catch (e) {
    // ignore
  }
  if (cached && cached.timestamp && cached.timestamp >= Date.now() - CACHE_MS) {
    console.debug(`Retrieved from cache: ${url}`);
    setTimeout(fetchNext, 0);
    resolve(cached.data);
  } else {
    console.debug(`Fetching via AJAX: ${url}`);
    fetching = true;
    axios.get(url)
      .then(response => {
        console.debug(`Fetched from API, caching: ${url}`);
        const data = response.data;
        setTimeout(fetchNext, 0);
        setTimeout(() => {
          const timestamp = Date.now();
          localStorage[url] = JSON.stringify({data, timestamp});
        }, 0);
        resolve(data);
        fetching = false;
      })
      .catch(err => {
        reject(err);
        fetching = false;
      });
  }
};

export default {
  queue,
  getPokemonByName: function(name) {
    return get(`${API}/pokemon/${name}`);
  },
  getMoveByName: function(name) {
    return get(`${API}/move/${name}`);
  },
  getPokemonsList: function() {
    return get(`${API}/pokemon/?limit=100000&offset=0`);
  },
};