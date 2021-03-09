const sliderVests = document.querySelector('#vests .slider');
const vestsItems = sliderVests.querySelectorAll('.item');

let isDraggedVests = false;
let startPositionVests = 0;
let currentTranslateVests = 0;
let previousTranslateVests = 0;
let animationIDVests = 0;
let currentSlideVests = 0;

const touchStartVests = index => {
    return event => {
        currentSlideVests = index;
        
        startPositionVests = getPositionXVests(event);

        isDraggedVests = true;

        animationIDVests = requestAnimationFrame(slideAnimationVests);

        sliderVests.classList.add('grabbed');
    }
}

const getPositionXVests = event => {
    return event.type.includes('mouse') 
    ? event.pageX : event.touches[0].clientX;
}

const slideAnimationVests = () => {
    setSliderPositionVests();
    // calling function reqursively
    if (isDraggedVests) requestAnimationFrame(slideAnimationVests);
}

const setSliderPositionVests = () => {
    sliderVests.style.transform = `translateX(${currentTranslateVests}px)`;
}

const touchEndVests = () => {
    isDraggedVests = false;
    cancelAnimationFrame(animationIDVests);

    const movedBy = currentTranslateVests - previousTranslateVests;
    if (movedBy < -100 && currentSlideVests < vestsItems.length - 1) currentSlideVests += 1;
    if (movedBy > 100 && currentSlideVests > 0) currentSlideVests -= 1;

    setPositionByIndexVests();

    pointerDisplayVests(currentSlideVests);
    
    sliderVests.classList.remove('grabbed');
}

const setPositionByIndexVests = () => {
    // currentTranslate = currentSlide * -window.innerWidth;
    currentTranslateVests = currentSlideVests * -sliderVests.clientWidth;
    previousTranslateVests = currentTranslateVests;

    setSliderPositionVests();
}

const pointerDisplayVests = (currentItem) => {
    if (currentItem === 0) {
        document.querySelector('#vests .pointer-left').classList.add('hide');
    } else {
        document.querySelector('#vests .pointer-left').classList.remove('hide');
    }

    if (currentItem === vestsItems.length - 1) {
        document.querySelector('#vests .pointer-right').classList.add('hide');
    } else {
        document.querySelector('#vests .pointer-right').classList.remove('hide');
    }
}

const touchMoveVests = event => {
    if (isDraggedVests) {
        const currentPosition = getPositionXVests(event); 
        currentTranslateVests = previousTranslateVests + currentPosition - startPositionVests;
    }
}

vestsItems.forEach((item, index) => {
    // preventing the default behavious of click and drag an image
    const slideImage = item.querySelector('img');
    slideImage.addEventListener('dragstart', e => e.preventDefault());

    // Touch events
    item.addEventListener('touchstart', touchStartVests(index));
    item.addEventListener('touchend', touchEndVests);
    item.addEventListener('touchmove', touchMoveVests);

    // Mouse events
    item.addEventListener('mousedown', touchStartVests(index));
    item.addEventListener('mouseup', touchEndVests);
    item.addEventListener('mouseleave', touchEndVests);
    item.addEventListener('mousemove', touchMoveVests);
});

window.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}