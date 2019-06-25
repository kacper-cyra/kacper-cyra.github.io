'use strict'
let height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
let background = document.querySelector('.background');
document.addEventListener('scroll', scrolling);

let scroll = {
    delta: 0,
    previous: 0,
    menuHeight: document.querySelector('nav').clientHeight,
    menu: document.querySelector('nav .wrapper')
}

function scrolling(e) {
    let top = document.querySelector('html').scrollTop;
    //
    let offset = window.pageYOffset;
    let k = (2000 - window.innerHeight) / height;
    background.style.backgroundPositionY = `${Math.round(-offset*k)}px`;
    //
    let delta = scroll.previous - top;
    if (delta > 0 && scroll.menu.classList.contains('hide')) {
        //up
        scroll.menu.classList.remove('hide');
    } else if (delta < 0 && !scroll.menu.classList.contains('hide')) {
        scroll.menu.classList.add('hide');
    }
    scroll.previous = top;
    //
    menu();
    requestAnimationFrame(backgroundScrolling)
}

function menu() {
    let b = document.querySelectorAll('.line .header');
    b.forEach(i => {
        let c = i.getClientRects()[0];
        if (c.y >= 0 && c.y <= 200) {
            let x = i.getAttribute('id');
            let w = document.querySelector(`.menu-full [href='#${x}']`);
            if (!w.classList.contains('active')) {
                document.querySelector('.menu-full .active').classList.remove('active');
                w.classList.add('active');
            }
        }
    })
}

//Observer
let observer = new IntersectionObserver(targeting, {
    rootMargin: '0px',
    threshold: 0.3
});

function targeting(entries, observer) {
    let entry = entries[0];
    let elem = entry.target;
    if (entry.intersectionRatio > observer.thresholds[0] && config.characterAnim === 0) {
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        config.characterAnim = 1;
        animations[1].play();
        animate();
    } else if (entry.intersectionRatio < observer.thresholds[0]) {
        config.characterAnim = 0;
        animations[0].stop();
        document.removeEventListener('mousemove', onDocumentMouseMove);
    }
}

observer.observe(document.querySelector('.hero'));