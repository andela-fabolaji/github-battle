import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common['Accept'] = 'application/json';

export default {
  fetchPopularRepos(lang, context) {
    const encodedUrl = window.encodeURI(`/search/repositories?q=stars:>1000+language:${lang}&sort=stars&order=desc`);
    return this.extractData(encodedUrl);
  },
  getPlayerData(username) {
    const encodedUrl = window.encodeURI(`/search/users?q=${username}`);
    return this.extractData(encodedUrl);
  },
  extractData(url) {
    return axios.get(url)
      .then((res) => {
        return res.data.items;
      })
      .catch(e => e);
  }
}
