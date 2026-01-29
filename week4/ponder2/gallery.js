const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector(".nav-links");

// Toggle Menu
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
    // Check if an image was actually clicked
    if (e.target.tagName === 'IMG') {
        const clickedSrc = e.target.getAttribute('src');
        
        // Swap -sm for -full to load the high-res version
        const fullSrc = clickedSrc.replace('-sm', '-full');
        
        modalImage.src = fullSrc;
        modalImage.alt = e.target.alt; // Keep accessibility consistent
        
        modal.showModal();
    }
}

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking on the backdrop
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});