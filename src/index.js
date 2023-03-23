import axios from 'axios';
import Notiflix from 'notiflix';
import { createImage } from './createElement.js';
import SimpleLightbox from 'simplelightbox';
import MoveTo from 'moveto/src/moveTo.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '30370578-997578adb70a7e834e9536c05';
const API_URL = 'https://pixabay.com/api/?';
const LIMIT = 40;
const searchFormEl = document.getElementById('search-form');
const galleryEl = document.getElementById('gallery');
const showMoreEl = document.getElementById('show-more');

// let variable to control the pagination and query Search
let page = 1;
let querySearch = '';
let totalPages = 0;

const fetchPhotos = () => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: querySearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: LIMIT,
  });
  return fetch(API_URL + searchParams)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(error => console.log(error));
};

const createPhotoArray = data => {
  if (data.hits.length === 0) throw new Error();
  const photoArray = data.hits.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    })
  );
  return photoArray;
};

const getPictures = () => {
  fetchPhotos()
    .then(data => {
      totalPages = data.totalHits / LIMIT;
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      createPhotoArray(data).forEach(photo => createImage(galleryEl, showMoreEl, photo));
    })
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    )
    .then(() => new SimpleLightbox('#gallery a'));
};

const showMore = () => {
  if (page > totalPages) {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    return;
  }
  page++;
  const moveTo = new MoveTo({
    duration: 5000,
  });

  fetchPhotos()
    .then(data =>
      createPhotoArray(data).forEach(photo => createImage(galleryEl, showMoreEl, photo))
    )
    .then(() => new SimpleLightbox('#gallery a'))
    .then(() => moveTo.move(showMoreEl));
};

const resetOnSubmit = event => {
  event.preventDefault();
  querySearch = event.currentTarget.elements.searchQuery.value;
  page = 1;
  totalPages = 0;
  galleryEl.innerHTML = '';
  showMoreEl.classList.add('hidden');
};

searchFormEl.addEventListener('submit', event => {
  resetOnSubmit(event);
  getPictures();
});

showMoreEl.addEventListener('click', () => showMore());
