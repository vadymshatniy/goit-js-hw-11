
const backgroundBox = document.querySelector(".background");
const formBox = document.querySelector("#search-form");
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');

backgroundBox.style.height = "60px";
backgroundBox.style.padding = "15px";
backgroundBox.style.backgroundColor = "blue";
formBox.style.width = "260px";
formBox.style.margin = "auto";

const URL = 'https://pixabay.com/api/'
const KEY = '35911851-a9b32034f50e858f73749201f'
const PARAMS ='image_type=photo&orientation=horizontal&safesearch=true&per_page=40'
const name = input.value.trim();
function fetchPhotosAbout(name) {
    // https://pixabay.com/api/?key=35911851-a9b32034f50e858f73749201f&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1
    // const name = input.value.trim();
    const option = new URLSearchParams({
        page: 1,
    });
        
    fetch(`${URL}?key=${KEY}&q=${name}&${PARAMS}&${option}`)
        .then(resp => console.log(resp));
}
//             if (resp.status === 404) {
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//                 list.innerHTML = " ";
//             };
//             if (!resp.ok) {
//                 throw new Error(resp.statusText)
//             } else {
//                 return resp.json();
//             }
//     })
// }

formBox.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    // const name = input.value.trim();
    fetchPhotosAbout()
    // .then((data) => (gallery.innerHTML = createGallery(data)))
    // .catch((err) => console.log(err))
};




// function createGallery(arr) {
//     if (arr.length === 0) {
//         Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
//         return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
//             list.innerHTML = " ").join('');
//     } else {
//         return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
//             `<li>
//             <div class="photo-card">
//                 <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//                 <div class="info">
//                     <p class="info-item">
//                     <b>Likes: ${likes}</b>
//                     </p>
//                     <p class="info-item">
//                     <b>Views: ${views}</b>
//                     </p>
//                     <p class="info-item">
//                     <b>Comments: ${comments}</b>
//                     </p>
//                     <p class="info-item">
//                     <b>Downloads: ${downloads}</b>
//                     </p>
//                     </div>
//                     </div>
//             </li>`).join('');
   
//     }
// }