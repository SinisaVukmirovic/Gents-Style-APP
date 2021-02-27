const app = document.querySelector('.app');
// const slider = app.querySelector('.slider');
// const items = [
//     Array.from(app.querySelectorAll('#vests .slider .item')),
//     Array.from(app.querySelectorAll('#cardigans .slider .item')),
//     Array.from(app.querySelectorAll('#watches .slider .item')),
// ];
const vestsSlider = app.document.querySelector('#vests');

let isDragged = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;
let currentSlide = 0;

const touchStart = index => {
    return event => {
        currentSlide = index;
        
        startPosition = getPositionX(event);

        isDragged = true;
        console.log('start');

        animationID = requestAnimationFrame(slideAnimation);

        slider.classList.add('grabbed');
    }
}

const getPositionX = event => {
    return event.type.includes('mouse') 
    ? event.pageX : event.touches[0].clientX;
}

const slideAnimation = () => {
    setSliderPosition();
    // calling function reqursively
    if (isDragged) requestAnimationFrame(slideAnimation);
}

const setSliderPosition = () => {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

const touchEnd = () => {
    isDragged = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - previousTranslate;
    if (movedBy < -100 && currentSlide < slides.length - 1) currentSlide += 1;
    if (movedBy > 100 && currentSlide > 0) currentSlide -= 1;

    setPositionByIndex();
    
    slider.classList.remove('grabbed');
}

const setPositionByIndex = () => {
    currentTranslate = currentSlide * -window.innerWidth;
    previousTranslate = currentTranslate;

    setSliderPosition();
}

const touchMove = event => {
    if (isDragged) {
        const currentPosition = getPositionX(event); 
        currentTranslate = previousTranslate + currentPosition - startPosition;
    }
}

items.forEach(category => {
    category.forEach((item, index) => {
        // preventing the default behavious of click and drag an image
        const slideImage = item.querySelector('img');
        slideImage.addEventListener('dragstart', e => e.preventDefault());

        // Touch events
        item.addEventListener('touchstart', touchStart(index));
        item.addEventListener('touchend', touchEnd);
        item.addEventListener('touchmove', touchMove);

        // Mouse events
        item.addEventListener('mousedown', touchStart(index));
        item.addEventListener('mouseup', touchEnd);
        item.addEventListener('mouseleave', touchEnd);
        item.addEventListener('mousemove', touchMove);
    });
});

window.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}