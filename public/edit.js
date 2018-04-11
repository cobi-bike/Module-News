var localStorageKeyArticleDescription = 'readlater-articledescription';
var localStorageKeyJumpCategory = 'readlater-jumpcategory';
var localStorageKeyCategory = 'category';

// UI Switcher

if (COBI.parameters.state() == COBI.state.edit) {
  document.getElementById('experience').style.display = 'none';
} else {
  document.getElementById('edit').style.display = 'none';
}

// Manage Settings

// Setting: Article Description

var articleDescriptionToggle = document.getElementById('articleDescriptionToggle');
articleDescriptionToggle.checked = getArticleDescriptionSetting();
articleDescriptionToggle.onchange = function() {
  setArticleDescriptionSetting(articleDescriptionToggle.checked);
};

function getArticleDescriptionSetting() {
  var value = JSON.parse(localStorage.getItem(localStorageKeyArticleDescription));
  if (value === null) {
    return false;
  } else {
    return value;
  }
}

function setArticleDescriptionSetting(value) {
  localStorage.setItem(localStorageKeyArticleDescription, JSON.stringify(value));
}

// Setting: Jump Category

var jumpCategoryToggle = document.getElementById('jumpCategoryToggle');
jumpCategoryToggle.checked = getJumpCategorySetting();
jumpCategoryToggle.onchange = function() {
  setJumpCategorySetting(jumpCategoryToggle.checked);
};

function getJumpCategorySetting() {
  var value = JSON.parse(localStorage.getItem(localStorageKeyJumpCategory));
  if (value === null) {
    return true;
  } else {
    return value;
  }
}

function setJumpCategorySetting(value) {
  localStorage.setItem(localStorageKeyJumpCategory, JSON.stringify(value));
}

function getLastCategory() {
  var value = JSON.parse(localStorage.getItem(localStorageKeyCategory));
  return value;
}

function setLastCategory(value) {
  localStorage.setItem(localStorageKeyCategory, JSON.stringify(value));
}
