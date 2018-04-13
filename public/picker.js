var categoryPicker = document.getElementById('categoryPicker');
var sourcePicker = document.getElementById('sourcePicker');

// Returns array of categories by language identifier (e.g. "de-DE")
function getCategoriesByLanguage(language) {
  return sources[language.substr(0, 2)];
}

// Gets called when user picks category
function didPickCategory() {
  clearContents();
  reloadContents();
  populateSourcePicker();
}

// Get called when user picks news source
function didPickSources() {
  saveSourcePreferences();
  clearContents();
  reloadContents();
}

// Fills category picker with all categories in the user's language
function populateCategoryPicker() {
  var categories = getCategoriesByLanguage(i18next.language);
  removeAllOptions(categoryPicker);

  for (var i = 0; i < categories.length; i++) {
    var option = document.createElement('option');
    option.value = categories[i].key;
    option.innerHTML = i18next.t(categories[i].key);
    categoryPicker.appendChild(option);
  }
  $('select').material_select();
}

// Fills news source picker with all sources for the selected category
function populateSourcePicker() {
  var categorySources = getCategoriesByLanguage(i18next.language)[categoryPicker.selectedIndex].sources;
  removeAllOptions(sourcePicker);
  for (var i = 0; i < categorySources.length; i++) {
    var categorySource = categorySources[i].key;
    var option = document.createElement('option');
    option.value = categorySource;
    option.innerHTML = categorySources[i].name;
    // Set default value
    if (getSourceEnabled(categorySource) === null) {
      setSourceEnabeld(categorySource, categorySources[i].defaultOn);
    }
    option.selected = getSourceEnabled(categorySource) === true;
    sourcePicker.appendChild(option);
  }
  $('select').material_select();
}

// Initializes category picker with last picked category from local storage
function restoreCategoryPicker() {
  var lastSelectedCategory = getLastCategory();
  // Call array.map on picker element
  var index = [].map
    .call(categoryPicker, function(option) {
      return option.value;
    })
    .indexOf(lastSelectedCategory);

  if (index > -1) categoryPicker.selectedIndex = index;
}

// Rotates category
function selectNextCategory() {
  if (categoryPicker.selectedIndex < categoryPicker.options.length - 1) {
    categoryPicker.selectedIndex = categoryPicker.selectedIndex + 1;
  } else {
    categoryPicker.selectedIndex = 0;
  }
  didPickCategory();
}

/* Preferences */
// Creates local storage entries for the visibility of each news outlet
function initSourcePreferences() {
  for (var locale in sources) {
    for (var i = 0; i < sources[locale].length; i++) {
      for (var j = 0; j < sources[locale][i].sources.length; j++) {
        var categorySource = sources[locale][i].sources[j];
        if (getSourceEnabled(categorySource.key) === null) {
          setSourceEnabled(categorySource.key, categorySource.defaultOn);
        }
      }
    }
  }
}

// Stores selected news outlets in local storage
function saveSourcePreferences() {
  for (var i = 0; i < sourcePicker.options.length; i++) {
    localStorage.setItem(sourcePicker.options[i].value, JSON.stringify(sourcePicker.options[i].selected));
  }
}

// Checks if news outlet is enabled in local storage
function getSourceEnabled(source) {
  return JSON.parse(localStorage.getItem(source)) === true;
}

/* Helper Methods */

// Removes all elements of select picker
function removeAllOptions(select) {
  var i;
  for (i = select.options.length - 1; i >= 0; i--) {
    select.remove(i);
  }
}

// Removes element by id from select picker
function sourceNameById(sourceId) {
  var categories = getCategoriesByLanguage(i18next.language);
  for (var k = 0; k < categories.length; k++) {
    var categorySources = categories[k].sources;
    for (var i = 0; i < categorySources.length; i++) {
      if (categorySources[i].key == sourceId) return categorySources[i].name;
    }
  }
}
