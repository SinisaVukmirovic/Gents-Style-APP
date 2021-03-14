document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.querySelector('.intro-screen');
    
    setTimeout(() => {
        // introScreen.classList.add('.js-fade-out');
        introScreen.parentNode.removeChild(introScreen);
    }, 4500);
});