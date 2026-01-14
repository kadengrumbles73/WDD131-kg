
let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;

    let targetElement= document.getElementById(codeValue);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        targetElement.style.backgroundColor = 'blue';
        setTimeout(() => {
            targetElement.style.backgroundColor = 'transparent';
        }, 1000);
    }
})
