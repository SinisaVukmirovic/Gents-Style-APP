// const app2 = document.querySelector('.app');
const slider2 = document.querySelector('#cardigans .slider');
// const items = [
//     Array.from(app.querySelectorAll('#vests .slider .item')),
//     Array.from(app.querySelectorAll('#cardigans .slider .item')),
//     Array.from(app.querySelectorAll('#watches .slider .item')),
// ];
const cards = slider2.querySelectorAll('.item');

let isDragged2 = false;
let startPosition2 = 0;
let currentTranslate2 = 0;
let previousTranslate2 = 0;
let animationID2 = 0;
let currentSlide2 = 0;

const touchStart2 = index => {
    return event => {
        currentSlide2 = index;
        
        startPosition2 = getPositionX2(event);

        isDragged2 = true;

        animationID2 = requestAnimationFrame(slideAnimation2);

        slider2.classList.add('grabbed');
    }
}

const getPositionX2 = event => {
    return event.type.includes('mouse') 
    ? event.pageX : event.touches[0].clientX;
}

const slideAnimation2 = () => {
    setSliderPosition2();
    // calling function reqursively
    if (isDragged2) requestAnimationFrame(slideAnimation2);
}

const setSliderPosition2 = () => {
    slider2.style.transform = `translateX(${currentTranslate2}px)`;
}

const touchEnd2 = () => {
    isDragged2 = false;
    cancelAnimationFrame(animationID2);

    const movedBy = currentTranslate2 - previousTranslate2;
    if (movedBy < -100 && currentSlide2 < cards.length - 1) currentSlide2 += 1;
    if (movedBy > 100 && currentSlide2 > 0) currentSlide2 -= 1;

    setPositionByIndex2();
    
    slider2.classList.remove('grabbed');
}

const setPositionByIndex2 = () => {
    // currentTranslate = currentSlide * -window.innerWidth;
    currentTranslate2 = currentSlide2 * -slider2.clientWidth;
    previousTranslate2 = currentTranslate2;

    setSliderPosition2();
}

const touchMove2 = event => {
    if (isDragged2) {
        const currentPosition = getPositionX2(event); 
        currentTranslate2 = previousTranslate2 + currentPosition - startPosition2;
    }
}

// items.forEach(category => {
//     category.forEach((item, index) => {
    cards.forEach((item, index) => {
        // preventing the default behavious of click and drag an image
        const slideImage = item.querySelector('img');
        slideImage.addEventListener('dragstart', e => e.preventDefault());

        // Touch events
        item.addEventListener('touchstart', touchStart2(index));
        item.addEventListener('touchend', touchEnd2);
        item.addEventListener('touchmove', touchMove2);

        // Mouse events
        item.addEventListener('mousedown', touchStart2(index));
        item.addEventListener('mouseup', touchEnd2);
        item.addEventListener('mouseleave', touchEnd2);
        item.addEventListener('mousemove', touchMove2);
    });
// });

window.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}