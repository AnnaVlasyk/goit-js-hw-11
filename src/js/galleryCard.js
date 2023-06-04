import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const searchFormInput = document.querySelector(".search-form__input");
caches;
const loader = document.querySelector(".loader");

let latesInputValue;
let loadMoreValue;
let totalPhotoInWindow = 40;
let totalCountOfPhotosFromApi;

let galleryEL = new SimpleLightbox('.gallery a',{
	captions: true,
	captionsData: 'alt',
	captionPosition: 'bottom',
	captionDelay: 250,
});

function requestToApiAfterScrolling() {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

		if (clientHeight + scrollTop >= scrollHeight) {
			loader.classList.add('show');

			anotherRequestsToApi(searchFormInput.value, loadMoreValue);

			loadMoreValue += 1;
			totalPhotoInWindow += 40;
			
		   if (totalPhotoInWindow >= totalCountOfPhotosFromApi) {
				window.removeEventListener('scroll', requestToApiAfterScrolling);
				return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
			}
		}
}

function requestToApi(name, page) {
	fetchPhotos(name, page)
		.then(data => {
			
			if (data.data.hits.length === 0) {
				return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
			}
			
			addMarkup(data.data.hits);
			showTotalHitsMessage(data.data.totalHits);
			window.addEventListener('scroll', requestToApiAfterScrolling);
			
			loadMoreValue = 2;
			totalPhotoInWindow = 40;
			totalCountOfPhotosFromApi = data.data.totalHits;
		})
}

function anotherRequestsToApi(name, page) {
	fetchPhotos(name, page)
		.then(data => {
			addMarkup(data.data.hits);
			scrollSmooth();
			loader.classList.remove('show');
		})
}

function addMarkup(photosArray) {
	const photosMarkup = photosArray.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
		`<div class="photo-card">
			<a href="${largeImageURL}">
				<img class="photo-card__img"
   				src="${webformatURL}"
   				alt="${tags}"
   				width="100%"
   				loading="lazy"/></a>
  				<div class="info">
   				<div class="info-item">
						<b>Likes</b>
						<p>${likes}</p>
					</div>
    				<div class="info-item">
						<b>Views</b>
						<p>${views}</p>
    				</div>
    				<div class="info-item">
						<b>Comments</b>
						<p>${comments}</p>
    				</div>
    				<div class="info-item">
						<b>Downloads</b>
						<p>${downloads}</p>
    				</div>
  				</div>
		</div>`
	).join("");
}



