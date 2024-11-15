
let currentImageIndex = 0;
const images = document.querySelectorAll('.slideshow-image');
const totalImages = images.length;
        
function showNextImage() {
    const currentImage = images[currentImageIndex];
    currentImage.classList.remove('active');
    currentImage.classList.add('previous'); 
    
    currentImageIndex = (currentImageIndex + 1) % totalImages;

    const nextImage = images[currentImageIndex];
    nextImage.classList.remove('previous');
    nextImage.classList.add('active'); 

    setTimeout(() => {
        currentImage.classList.remove('previous'); 
    }, 1000); 
}

setTimeout(() => {
    showNextImage(); 
    setInterval(showNextImage, 5000);
}, 5000); 

function showDetails(description, color, cost, imageUrl) {
   
    const modal = document.getElementById('detailsModal');
    const modalImage = document.getElementById('modalImage');
    const descElem = document.getElementById('description');
    const colorElem = document.getElementById('color');
    const costElem = document.getElementById('cost');

    
    modalImage.src = imageUrl;
    descElem.textContent = "Description: " + description;
    colorElem.textContent = "Color: " + color;
    costElem.textContent = "Cost: " + cost;


    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
