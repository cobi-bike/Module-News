var categoryPicker = document.getElementById('categoryPicker');
var sourcePicker = document.getElementById('sourcePicker');

function getCategoriesByLanguage(language) {
  return sources[language.substr(0,2)];
}

function didPickCategory() {
  clearContents();
  reloadContents();
  populateSourcePicker();
}

function didPickSources() {
  saveSourcePreferences();
  clearContents();
  reloadContents();
}

function populateCategoryPicker() {
  var categories = getCategoriesByLanguage(i18next.language);
  removeAllOptions(categoryPicker);
  
  for (var i = 0; i < categories.length; i++) {
    var option = document.createElement("option");
    option.value = categories[i].key;
    option.innerHTML = i18next.t(categories[i].key);
    categoryPicker.appendChild(option); 
  }
  $('select').material_select();
}

function populateSourcePicker() {
  var categorySources = getCategoriesByLanguage(i18next.language)[categoryPicker.selectedIndex].sources;
  removeAllOptions(sourcePicker);
  for (var i = 0; i < categorySources.length; i++) {
    var categorySource = categorySources[i].key;
    var option = document.createElement("option");
    option.value = categorySource;
    option.innerHTML = categorySources[i].name;
    // Set default value
    if (localStorage.getItem(categorySource) === null) {
      localStorage.setItem(categorySource, JSON.stringify(categorySources[i].defaultOn));
    }
    option.selected = JSON.parse(localStorage.getItem(categorySource)) === true;
    sourcePicker.appendChild(option); 
  }
  $('select').material_select();
}

function restoreCategoryPicker() {
  var lastSelectedCategory = localStorage.getItem('category');
  var index = [].map.call(categoryPicker, function(option) {
    return option.value;
  }).indexOf(lastSelectedCategory);
  
  if (index > -1) categoryPicker.selectedIndex = index;
}

function selectNextCategory() {
  if (categoryPicker.selectedIndex < categoryPicker.options.length-1) {
    categoryPicker.selectedIndex = categoryPicker.selectedIndex+1;        
  } else {
    categoryPicker.selectedIndex = 0;        
  }  
  didPickCategory();
}

/* Preferences */

function initSourcePreferences() {
  for (var locale in sources) {
    for (var i = 0; i < sources[locale].length; i++) {
      for (var j = 0; j < sources[locale][i].sources.length; j++) {
        var categorySource = sources[locale][i].sources[j];
        if (localStorage.getItem(categorySource.key) === null) {
          localStorage.setItem(categorySource.key, JSON.stringify(categorySource.defaultOn === true));
        }
      }
    }
  }  
}

function saveSourcePreferences() {
  for (var i = 0; i < sourcePicker.options.length; i++) {
    localStorage.setItem(sourcePicker.options[i].value, JSON.stringify(sourcePicker.options[i].selected));
  }
}

function getSourceEnabled(source) {
  return JSON.parse(localStorage.getItem(source)) === true;
}

/* Helper Methods */

function removeAllOptions(select) {
    var i;
    for(i = select.options.length - 1 ; i >= 0 ; i--) {
        select.remove(i);
    }
}

function sourceNameById(sourceId) {
  for (var i = 0; i < sourcePicker.options.length; i++) {
    if (sourcePicker.options[i].value == sourceId) return sourcePicker.options[i].innerHTML;
  }
}