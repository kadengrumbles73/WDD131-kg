const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('nav');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    menuButton.classList.toggle('change');
});