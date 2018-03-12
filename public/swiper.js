var swiper;

/* User Input */

// Allow swipe actions via arrow keys
function checkArrowKeys(e) {
  e = e || window.event;
  if (e.keyCode == '38' /* Up */ || e.keyCode == '37' /* Left */) prevArticle();
  if (e.keyCode == '40' /* Down */ || e.keyCode == '39' /* Right */) nextArticle();
}

/* Create Swiper */

// Create swiper and register events
function createSwiper() {
  swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical',
    onSlideChangeEnd: function(swiper) {
      selectArticle(swiper.activeIndex);
    },
    onTransitionEnd: function(swiper) {
      selectArticle(swiper.activeIndex);
    }
  });

  document.onkeydown = checkArrowKeys;

  COBI.hub.externalInterfaceAction.subscribe(function(action) {
    if (action == 'UP' || action == 'LEFT') prevArticle();
    if (action == 'DOWN' || action == 'RIGHT') nextArticle();
    if (action == 'SELECT') nextStep();
  });

  // Hide and show touch interactive buttons if touch is enabled
  COBI.app.touchInteractionEnabled.subscribe(function(enabled) {
    lastIsRiding = !enabled;
    for (var i = 0; i < articles.length; i++) showHideSwiperItemContents(i, lastIsRiding);

    document.getElementById('categoryPickerContainer').style.visibility = document.getElementById(
      'sourcePickerContainer'
    ).style.visibility = lastIsRiding ? 'hidden' : 'visible';
  });
}

/* Dynamic Item Creation */
// Create new item for slider with title, description and background image
function createSwiperItem(index, title, description, imageUrl) {
  var item = document.createElement('div');
  item.setAttribute('class', 'swiper-slide');

  var itemImageContainer = document.createElement('div');
  itemImageContainer.setAttribute('class', 'background-image');
  itemImageContainer.style.backgroundImage = 'url(' + imageUrl + ')';

  var itemLabelContainer = document.createElement('div');
  itemLabelContainer.setAttribute('class', 'content-app');

  var itemLabel = document.createElement('p');
  itemLabel.setAttribute('id', 'slide-' + index);
  itemLabel.innerHTML = title;

  itemLabelContainer.appendChild(itemLabel);

  item.appendChild(itemImageContainer);
  item.appendChild(itemLabelContainer);

  document.getElementById('item-container').appendChild(item);
}

// Shows and hides interactive buttons if bike has stopped
function showHideSwiperItemContents(index, isRiding) {
  var slide = document.getElementById('slide-' + index);
  var category = i18next.t(categoryPicker.options[categoryPicker.selectedIndex].value);
  var pageIndicator = '<h3>' + category + ' ' + (index + 1) + '/' + articles.length + '</h3>';

  if (slide)
    slide.innerHTML = isRiding
      ? articles[index].sourceName + ' ' + i18next.t('hidden-title') + '<br/>' + pageIndicator
      : articles[index].title;
  else console.log('Unknown Slide index: ' + index);
}
