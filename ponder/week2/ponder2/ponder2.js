const selectElem = document.querySelector('#theme-select');
const body = document.body;

const themes = {
    ocean: {
        image: "url('https://wddbyui.github.io/wdd131/images/ocean.jpg')",
        font: "Papyrus, fantasy"
    },
    forest: {
        image: "url('https://wddbyui.github.io/wdd131/images/forest.jpg')",
        font: "Impact, sans-serif"
    },
    desert: {
        image: "url('https://wddbyui.github.io/wdd131/images/desert.jpg')",
        font: "'Big Caslon', serif"
    }
};

function changeTheme() {
    const choice = selectElem.value;
    const theme = themes[choice];

    if (theme) {
        body.style.backgroundImage = theme.image;
        body.style.fontFamily = theme.font;
    } else {

        body.style.backgroundImage = "none";
        body.style.fontFamily = "Georgia, serif";
    }
}

selectElem.addEventListener('change', changeTheme);