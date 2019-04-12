// blank values are replaced at runtime by the set-config.js node script
(function(window) {
  window._env = window._env || {};
  window._env.apiKey = '${env.APIKEY}';
})(this);
