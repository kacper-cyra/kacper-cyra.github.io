'use strict'
let config = {
    mobile: 0,
    characterAnim: 1,
    width: window.innerWidth
}

if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) || window.innerWidth < 650
) {
    config.mobile = 1;
};

if (config.mobile === 1) {
    config.characterAnim = 0
};

window.addEventListener('resize', () => {
    if (config.width !== window.innerWidth) {
        config.width = window.innerWidth;

        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i) || window.innerWidth < 650
        ) {
            config.mobile = 1;
        };

        if (config.mobile === 1) {
            config.characterAnim = 0
        };
    }
})
