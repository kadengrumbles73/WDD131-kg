const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const clickedSrc = e.target.getAttribute('src');
        
        // Swap -sm for -full
        const fullSrc = clickedSrc.replace('-sm', '-full');
        
        modalImage.src = fullSrc;
        modalImage.alt = e.target.alt;
        
        modal.showModal();
    }
});
closeButton.addEventListener('click', () => {
    modal.close();
});
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});