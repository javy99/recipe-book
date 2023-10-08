/* eslint-disable */

import { renderMainPage } from './main-page.js';
import { renderFavoritesPage } from './favorites-page.js';

const sideBarContent = `
  <div id="sidebar">
    <div class="sidebar-nav">
      <a class="page-link main-page-link">
        <img src="public/images/main-icon.svg" alt="Main Page Icon">
      </a>
    </div>
    <div class="sidebar-nav">
      <a class="page-link favorites-page-link">
        <img src="public/images/favorites-icon.svg" alt="Favorites Page Icon">
      </a>
    </div>
  </div>
`;

export function renderSideBar(activePage) {
  const container = document.querySelector('.container');
  container.insertAdjacentHTML('afterbegin', sideBarContent);

  const mainPageLink = document.querySelector('.main-page-link');
  const favoritesPageLink = document.querySelector('.favorites-page-link');

  if (activePage === 'main-page-link') {
    mainPageLink.classList.add('active');
    favoritesPageLink.classList.remove('active');
  } else if (activePage === 'favorites-page-link') {
    favoritesPageLink.classList.add('active');
    mainPageLink.classList.remove('active');
  }

  mainPageLink.addEventListener('click', function (event) {
    event.preventDefault();
    renderMainPage();
  });

  favoritesPageLink.addEventListener('click', function (event) {
    event.preventDefault();
    renderFavoritesPage();
  });
}
