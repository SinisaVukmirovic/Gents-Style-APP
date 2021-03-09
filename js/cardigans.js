// const app2 = document.querySelector('.app');
const sliderCardigans = document.querySelector('#cardigans .slider');
// const items = [
//     Array.from(app.querySelectorAll('#vests .slider .item')),
//     Array.from(app.querySelectorAll('#cardigans .slider .item')),
//     Array.from(app.querySelectorAll('#watches .slider .item')),
// ];
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
    
    sliderCardigans.classList.remove('grabbed');



    // TO DO - make this for arrows
    console.log(cardiganItems.length)
    if (currentSlideCardigan === 0) {
        document.querySelector('#cardigans .category').classList.add('lime')
    } else {
        document.querySelector('#cardigans .category').classList.remove('lime')
    }

}

const setPositionByIndexCardigan = () => {
    // currentTranslate = currentSlide * -window.innerWidth;
    currentTranslateCardigan = currentSlideCardigan * -sliderCardigans.clientWidth;
    previousTranslateCardigan = currentTranslateCardigan;

    setSliderPositionCardigan();
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

// export const bbooddyy = document.querySelector('body');