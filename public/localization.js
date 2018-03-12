// Initialize localization with language set by cobi parameter
i18next.init(
  {
    lng: COBI.parameters.language(),
    resources: {
      en: {
        translation: {
          'read-later': 'Added to Reading List 👌',
          'read-later-tts': 'Added to your reading list',
          'hidden-title': '💬',
          business: 'Business',
          entertainment: 'Entertainment',
          general: 'General',
          technology: 'Technology',
          sport: 'Sport'
        }
      },
      de: {
        translation: {
          'read-later': 'Auf Leseliste hinzugefügt 👌',
          'read-later-tts': 'Auf deine Leseliste hinzugefügt',
          'hidden-title': '💬',
          business: 'Business',
          entertainment: 'Unterhaltung',
          general: 'Allgemein',
          technology: 'Technologie',
          sport: 'Sport'
        }
      }
    }
  },
  function(err, t) {}
);
