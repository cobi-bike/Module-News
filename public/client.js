/* Init */

var articles, index, step, lastIsRiding;

COBI.init('token');
COBI.devkit.overrideThumbControllerMapping.write(true);
COBI.app.clockVisible.write(false);

// Initialize slider if in experience or overview mode (therefore not in edit menu)
if (COBI.parameters.state() == COBI.state.experience || COBI.parameters.state() == COBI.state.overview) {
  createSwiper();
  initSourcePreferences();
  populateCategoryPicker();
  restoreCategoryPicker();
  clearContents();
  reloadContents();
  populateSourcePicker();

  // Apply material design to select pick ups
  $(document).ready(function() {
    $('select').material_select();
  });
}

/* Swiper Contents */

// Gets called with json data of article and adds a slider item
function buildArticles(jsonString) {
  var json = JSON.parse(jsonString);
  for (var i = 0; i < json.articles.length; i++) {
    var article = json.articles[i];
    var index = articles.length;
    article.sourceName = sourceNameById(article.source.id);
    articles.push(article);
    if (article.title.length > 85) {
      article.title = article.title.substring(0, 84) + '...';
    }
    createSwiperItem(index, article.title, article.description, article.urlToImage);
  }
  swiper.init();
  selectArticle(0);
}

// Load and display content for news category
function reloadContents() {
  var category = categoryPicker.options[categoryPicker.selectedIndex].value;

  localStorage.setItem('category', category);
  console.log('Reload Contents: ' + i18next.language + ' with category ' + category);

  var localSources = getCategoriesByLanguage(i18next.language)[categoryPicker.selectedIndex].sources;
  var selectedSources = [];

  for (var i = 0; i < localSources.length; i++) {
    if (getSourceEnabled(localSources[i].key)) {
      selectedSources.push(localSources[i].key);
    }
  }
  // Fetch news for aggregated news outlets
  fetchNews(selectedSources, buildArticles);
     
}

// Remove slider items
function clearContents() {
  var contentContainer = document.getElementById('item-container');
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }
  articles = [];
  step = 0;
  index = -1;
}

/* Article & Category Browsing */

// Jumps to next article or category depending on settings
function nextArticle() {
  if (this.index < articles.length - 1) {
    selectArticle(this.index + 1);
  } else if (getJumpCategorySetting()) {
    selectNextCategory();
  } else {
    selectArticle(0);
  }
}

// Jumps to previous article
function prevArticle() {
  if (this.index > 0) {
    selectArticle(this.index - 1);
  }
}

// Swipes to desired article id
function selectArticle(index) {
  if (this.index != index) {
    console.log('Select Article: ' + index + ' / Riding: ' + lastIsRiding);

    this.index = index;
    this.step = 0;

    swiper.slideTo(index);
    showHideSwiperItemContents(index, lastIsRiding);

    nextStep();
  }
}

// Reads article title, descripton or adds it to reading list depending on state and setting
function nextStep() {
  var article = articles[index];

  // Loop through steps
  if (this.step >= 3) this.step = 0;

  // Next step
  this.step++;

  // Should Read Description?
  if (this.step == 2 && !getArticleDescriptionSetting()) {
    // Nope -> Go to Reading List
    this.step = 3;
  }

  // Read Title
  if (this.step == 1) {
    console.log('Read Title: ' + article.title);
    COBI.app.textToSpeech.write({ content: article.title, language: i18next.language });
  } else if (this.step == 2) {
    // Read Description
    console.log('Read Description: ' + article.description);
    COBI.app.textToSpeech.write({ content: article.description, language: i18next.language });
  } else if (this.step == 3) {
    // Add to Read Later List on Safari
    console.log('Read Later: ' + article.url);
    COBI.app.readLater.write({ title: article.title, url: article.url });
    COBI.app.textToSpeech.write({ content: i18next.t('read-later-tts'), language: i18next.language });
    Materialize.toast(i18next.t('read-later'), 5 * 1000, 'rounded white');
  }
}
