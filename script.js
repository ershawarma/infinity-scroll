const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'NrVWG84lrPouzhifcxT3hnVbvapu3ziulUyRotBBLRo';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all image were loaded
const imageLoaded = () => {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function to set attributes on dom elements
function setAttributes (element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for link and photos, add to dom
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> fot photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash APi
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here 
    }
}

// Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();