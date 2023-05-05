import axios from 'axios'
import Notiflix from 'notiflix';


const backgroundBox = document.querySelector(".upper-background");
const formBox = document.querySelector("#search-form");
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector(".load-more");
loadMoreButton.setAttribute("hidden", "hidden");
const loadMoreStrip = document.querySelector(".lower-background");

backgroundBox.style.height = "60px";
backgroundBox.style.padding = "15px";
backgroundBox.style.backgroundColor = "blue";
formBox.style.width = "260px";
formBox.style.margin = "auto";
loadMoreButton.style.backgroundColor = "blue";
loadMoreButton.style.color = "white";
loadMoreStrip.style.height = "50px";
loadMoreStrip.style.padding = "10px";
loadMoreStrip.style.display = "flex";
loadMoreStrip.style.justifyContent = "center";

const URL = 'https://pixabay.com/api/'
const KEY = '35911851-a9b32034f50e858f73749201f'
const PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
let page = 1;
// https://pixabay.com/api/?key=35911851-a9b32034f50e858f73749201f&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1

const name = input.value.trim();
let allHits = 0;
async function fetchPhotosAbout(name, page) {
    try {
        let response = await axios.get(`${URL}?key=${KEY}&q=${name}&${PARAMS}&page=${page}`);
        allHits = response.data.totalHits;
        if (response.data.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            gallery.innerHTML = "";
            loadMoreButton.setAttribute("hidden", "hidden");
            return [];
        }
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        loadMoreButton.removeAttribute("hidden");
        return response.data.hits;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function createGallery(data) {
    let galleryHTML = "";
    data.forEach(photo => {
        galleryHTML +=
            `
            <div class="photo-card">
            <a href="${photo.largeImageURL}" target="_blank">
            <img src="${photo.webformatURL}" alt="${photo.tags}"></a>
            <div class="info">
                <p class="info-item"><b>Likes: ${photo.likes}</b></p>
                <p class="info-item"><b>Views: ${photo.views}</b></p>
                <p class="info-item"><b>Comments: ${photo.comments}</b></p>
                <p class="info-item"><b>Downloads: ${photo.downloads}</b></p>
                </div>
            </div>
            `;
    });
    return galleryHTML;
}

formBox.addEventListener('submit', async (event) => {
    event.preventDefault();
    let page = 1;
    const name = input.value.trim();
    let data = await fetchPhotosAbout(name, page);
    gallery.innerHTML = createGallery(data);
});

loadMoreButton.addEventListener('click', async (event) => {
    page += 1;
    const name = input.value.trim();
    let data = await fetchPhotosAbout(name, page);
    gallery.innerHTML = createGallery(data);
    if (allHits < page * 40) {
        loadMoreButton.setAttribute("hidden", "hidden");
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
});

