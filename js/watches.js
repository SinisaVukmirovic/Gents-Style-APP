const sliderWatches = document.querySelector('#watches .slider');
const watchesItems = sliderWatches.querySelectorAll('.item');

let isDraggedWatches = false;
let startPositionWatches = 0;
let currentTranslateWatches = 0;
let previousTranslateWatches = 0;
let animationIDWatches = 0;
let currentSlideWatches = 0;

const touchStartWatches = index => {
    return event => {
        currentSlideWatches = index;
        
        startPositionWatches = getPositionXWatches(event);

        isDraggedWatches = true;

        animationIDWatches = requestAnimationFrame(slideAnimationWatches);

        sliderWatches.classList.add('grabbed');
    }
}

const getPositionXWatches = event => {
    return event.type.includes('mouse') 
    ? event.pageX : event.touches[0].clientX;
}

const slideAnimationWatches = () => {
    setSliderPositionWatches();
    if (isDraggedWatches) requestAnimationFrame(slideAnimationWatches);
}

const setSliderPositionWatches = () => {
    sliderWatches.style.transform = `translateX(${currentTranslateWatches}px)`;
}

const touchEndWatches = () => {
    isDraggedWatches = false;
    cancelAnimationFrame(animationIDWatches);

    const movedBy = currentTranslateWatches - previousTranslateWatches;
    if (movedBy < -100 && currentSlideWatches < watchesItems.length - 1) currentSlideWatches += 1;
    if (movedBy > 100 && currentSlideWatches > 0) currentSlideWatches -= 1;

    setPositionByIndexWatches();

    pointerDisplayWatches(currentSlideWatches);
    
    sliderWatches.classList.remove('grabbed');
}

const setPositionByIndexWatches = () => {
    // currentTranslate = currentSlide * -window.innerWidth;
    currentTranslateWatches = currentSlideWatches * -sliderWatches.clientWidth;
    previousTranslateWatches = currentTranslateWatches;

    setSliderPositionWatches();
}

const pointerDisplayWatches = (currentItem) => {
    if (currentItem === 0) {
        document.querySelector('#watches .pointer-left').classList.add('hide');
    } else {
        document.querySelector('#watches .pointer-left').classList.remove('hide');
    }

    if (currentItem === watchesItems.length - 1) {
        document.querySelector('#watches .pointer-right').classList.add('hide');
    } else {
        document.querySelector('#watches .pointer-right').classList.remove('hide');
    }
}

const touchMoveWatches = event => {
    if (isDraggedWatches) {
        const currentPosition = getPositionXWatches(event); 
        currentTranslateWatches = previousTranslateWatches + currentPosition - startPositionWatches;
    }
}

watchesItems.forEach((item, index) => {
    // preventing the default behavious of click and drag an image
    const slideImage = item.querySelector('img');
    slideImage.addEventListener('dragstart', e => e.preventDefault());

    item.addEventListener('touchstart', touchStartWatches(index));
    item.addEventListener('touchend', touchEndWatches);
    item.addEventListener('touchmove', touchMoveWatches);

    item.addEventListener('mousedown', touchStartWatches(index));
    item.addEventListener('mouseup', touchEndWatches);
    item.addEventListener('mouseleave', touchEndWatches);
    item.addEventListener('mousemove', touchMoveWatches);
});

window.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}