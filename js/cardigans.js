const sliderCardigans = document.querySelector('#cardigans .slider');
const cardiganItems = sliderCardigans.querySelectorAll('.item');

let isDraggedCardigan = false;
let startPositionCardigan = 0;
let currentTranslateCardigan = 0;
let previousTranslateCardigan = 0;
let animationIDCardigan = 0;
let currentSlideCardigan = 0;

const touchStartCardigan = index => {
    return event => {
        currentSlideCardigan = index;
        
        startPositionCardigan = getPositionXCardigan(event);

        isDraggedCardigan = true;

        animationIDCardigan = requestAnimationFrame(slideAnimationCardigan);

        sliderCardigans.classList.add('grabbed');
    }
}

const getPositionXCardigan = event => {
    return event.type.includes('mouse') 
    ? event.pageX : event.touches[0].clientX;
}

const slideAnimationCardigan = () => {
    setSliderPositionCardigan();
    // calling function reqursively
    if (isDraggedCardigan) requestAnimationFrame(slideAnimationCardigan);
}

const setSliderPositionCardigan = () => {
    sliderCardigans.style.transform = `translateX(${currentTranslateCardigan}px)`;
}

const touchEndCardigan = () => {
    isDraggedCardigan = false;
    cancelAnimationFrame(animationIDCardigan);

    const movedBy = currentTranslateCardigan - previousTranslateCardigan;
    if (movedBy < -100 && currentSlideCardigan < cardiganItems.length - 1) currentSlideCardigan += 1;
    if (movedBy > 100 && currentSlideCardigan > 0) currentSlideCardigan -= 1;

    setPositionByIndexCardigan();

    pointerDisplayCardigans(currentSlideCardigan);
    
    sliderCardigans.classList.remove('grabbed');
}

const setPositionByIndexCardigan = () => {
    // currentTranslate = currentSlide * -window.innerWidth;
    currentTranslateCardigan = currentSlideCardigan * -sliderCardigans.clientWidth;
    previousTranslateCardigan = currentTranslateCardigan;

    setSliderPositionCardigan();
}

const pointerDisplayCardigans = (currentItem) => {
    if (currentItem === 0) {
        document.querySelector('#cardigans .pointer-left').classList.add('hide');
    } else {
        document.querySelector('#cardigans .pointer-left').classList.remove('hide');
    }

    if (currentItem === cardiganItems.length - 1) {
        document.querySelector('#cardigans .pointer-right').classList.add('hide');
    } else {
        document.querySelector('#cardigans .pointer-right').classList.remove('hide');
    }
}

const touchMoveCardigan = event => {
    if (isDraggedCardigan) {
        const currentPosition = getPositionXCardigan(event); 
        currentTranslateCardigan = previousTranslateCardigan + currentPosition - startPositionCardigan;
    }
}

cardiganItems.forEach((item, index) => {
    // preventing the default behavious of click and drag an image
    const slideImage = item.querySelector('img');
    slideImage.addEventListener('dragstart', e => e.preventDefault());

    // Touch events
    item.addEventListener('touchstart', touchStartCardigan(index));
    item.addEventListener('touchend', touchEndCardigan);
    item.addEventListener('touchmove', touchMoveCardigan);

    // Mouse events
    item.addEventListener('mousedown', touchStartCardigan(index));
    item.addEventListener('mouseup', touchEndCardigan);
    item.addEventListener('mouseleave', touchEndCardigan);
    item.addEventListener('mousemove', touchMoveCardigan);
});

window.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}