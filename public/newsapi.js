// Hardcoded german and english news outlets with name, id and default visibility
var sources = {
  en: [
    {
      key: 'business',
      sources: [
        { name: 'Bloomberg', key: 'bloomberg' },
        { name: 'Financial Times', key: 'financial-times', defaultOn: true },
        { name: 'The Economist', key: 'the-economist', defaultOn: true },
        { name: 'The Wall Street Journal', key: 'the-wall-street-journal' }
      ]
    },
    {
      key: 'entertainment',
      sources: [
        { name: 'Buzzfeed', key: 'buzzfeed', defaultOn: true },
        { name: 'Mashable', key: 'mashable', defaultOn: true }
      ]
    },
    {
      key: 'general',
      sources: [
        { name: 'BBC News', key: 'bbc-news' },
        { name: 'CNN', key: 'cnn', defaultOn: true },
        { name: 'Huffington Post', key: 'the-huffington-post' },
        { name: 'The Guardian', key: 'the-guardian-uk', defaultOn: true },
        { name: 'The New York Times', key: 'the-new-york-times' }
      ]
    },
    {
      key: 'technology',
      sources: [
        { name: 'Ars Technica', key: 'ars-technica' },
        { name: 'Engadget', key: 'engadget' },
        { name: 'Hacker News', key: 'hacker-news' },
        { name: 'Techcrunch', key: 'techcrunch' },
        { name: 'The Next Web', key: 'the-next-web', defaultOn: true },
        { name: 'The Verge', key: 'the-verge', defaultOn: true }
      ]
    },
    {
      key: 'sport',
      sources: [
        { name: 'BBC Sport', key: 'bbc-sport', defaultOn: true },
        { name: 'ESPN', key: 'espn' }]
    }
  ],
  de: [
    {
      key: 'business',
      sources: [
        { name: 'Die Zeit', key: 'die-zeit', defaultOn: true },
        { name: 'Handelsblatt', key: 'handelsblatt', defaultOn: true },
        { name: 'Wirtschafts Woche', key: 'wirtschafts-woche' }
      ]
    },
    {
      key: 'general',
      sources: [
        { name: 'Bild', key: 'bild' },
        { name: 'Focus', key: 'focus', defaultOn: true },
        { name: 'Spiegel Online', key: 'spiegel-online', defaultOn: true }
      ]
    },
    {
      key: 'technology',
      sources: [
        { name: 'Gründerszene', key: 'gruenderszene' },
        { name: 'T3n', key: 't3n', defaultOn: true },
        { name: 'Wired', key: 'wired-de', defaultOn: true }
      ]
    }
  ]
};

// Fetches newsapi with source identifier and calls callback with json data
function fetchNews(sources, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        callback(request.responseText);
      } else {
        console.log('Failed to fetch news for source: Connection to server has failed. ' + ' | Status: ' + request.status);
        Materialize.toast(i18next.t('connection-error'), 5 * 1000, 'rounded white');
      }
    }
  };

  // Request news over backend proxy
  var url = 'news/' + sources.join(',');
  request.open('GET', url, true);
  request.send(null);
}
