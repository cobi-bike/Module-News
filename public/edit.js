var localStorageKeyArticleDescription = 'readlater-articledescription';
var localStorageKeyJumpCategory = 'readlater-jumpcategory';

// UI Switcher

if (COBI.parameters.state() == COBI.state.edit) {
  document.getElementById('experience').style.display = 'none';
} else {
  document.getElementById('edit').style.display = 'none';
}

// Manage Settings

// Set Defaults

if (!localStorage.getItem(localStorageKeyArticleDescription)) localStorage.setItem(localStorageKeyArticleDescription, JSON.stringify(false));
if (!localStorage.getItem(localStorageKeyJumpCategory)) localStorage.setItem(localStorageKeyJumpCategory, JSON.stringify(true));

// Setting: Article Description

var articleDescriptionToggle = document.getElementById("articleDescriptionToggle");
articleDescriptionToggle.checked = getArticleDescriptionSetting();
articleDescriptionToggle.onchange = function() {
  localStorage.setItem(localStorageKeyArticleDescription, JSON.stringify(articleDescriptionToggle.checked));
};

function getArticleDescriptionSetting() {
  return JSON.parse(localStorage.getItem(localStorageKeyArticleDescription));
} 

// Setting: Jump Category

var jumpCategoryToggle = document.getElementById("jumpCategoryToggle");
jumpCategoryToggle.checked = getJumpCategorySetting();
jumpCategoryToggle.onchange = function() {
  localStorage.setItem(localStorageKeyJumpCategory, JSON.stringify(jumpCategoryToggle.checked));
};

function getJumpCategorySetting() {
  return JSON.parse(localStorage.getItem(localStorageKeyJumpCategory));
} 