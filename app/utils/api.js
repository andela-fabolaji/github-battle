import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common['Accept'] = 'application/json';

function getProfile(username) {
  const encodedUrl = window.encodeURI(`/users/${username}`);
  return extractData(encodedUrl);
}

function getRepos(username) {
  const encodedUrl = window.encodeURI(`/users/${username}/repos?per_page=100`);
  return extractData(encodedUrl);
}

function getStarCount(repos) {
  return repos.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const stars = getStarCount(repos);

  return (followers * 3) + stars;
}

function getPlayerData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ])
  .then((data) => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}

function extractData(url) {
  return axios.get(url)
    .then((res) => {
      return res.data;
    })
    .catch(e => handleError);
}

function handleError(error) {
  throw new Error('request failed: ' + error);
}

export default {
  fetchPopularRepos(lang, context) {
    const encodedUrl = window.encodeURI(`/search/repositories?q=stars:>1000+language:${lang}&sort=stars&order=desc`);
    return extractData(encodedUrl);
  },
  battle(players) {
    return axios.all(players.map(getPlayerData))
      .then(sortPlayers)
      .catch(handleError);
  },

}
