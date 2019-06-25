"use strict"
let body = document.body;
let html = document.documentElement;
let cir = 16;

function setup() {
    //Circle height
    if (config.width !== window.innerWidth) {
        config.width = window.innerWidth;
        document.querySelector('.line ._1').style.height = (document.querySelector('.hero').clientHeight - document.querySelector('.message').offsetTop + (document.querySelector('.message').clientHeight / 2)) - cir + 'px';
        document.querySelector('.line ._2').style.height = document.querySelector('.projects').clientHeight - cir + 'px';
        document.querySelector('.line ._3').style.height = document.querySelector('.skills').clientHeight - cir + 'px';
        document.querySelector('.line ._4').style.height = document.querySelector('.contact').clientHeight + cir + 'px';
        //
        document.querySelector('.line-con').style.top = (document.querySelector('.hero').clientHeight - document.querySelector('.message').offsetTop) - (document.querySelector('.message').clientHeight / 2) - cir + 'px';
    }
};
(() => {
    let a = document.querySelectorAll('.menu a');
    a.forEach(i => {
        i.addEventListener('click', changeActive);
    })
})()

function changeActive(e) {
    let a = e.target;
    document.querySelector('.menu .active').classList.remove('active');
    a.classList.add('active');
}
window.addEventListener('resize', setup);

function loaded() {
    let a = document.querySelector('.loader');
    a.classList.add('hide');
    a.addEventListener('transitionend', () => {
        a.classList.add('invisible');
        body.classList.remove('no-scroll');
        animate();
        startMoving()
    })
    requestAnimationFrame(() => {
        document.querySelector('.line ._1').style.height = (document.querySelector('.hero').clientHeight - document.querySelector('.message').offsetTop + (document.querySelector('.message').clientHeight / 2)) - cir + 'px';
        document.querySelector('.line ._2').style.height = document.querySelector('.projects').clientHeight - cir + 'px';
        document.querySelector('.line ._3').style.height = document.querySelector('.skills').clientHeight - cir + 'px';
        document.querySelector('.line ._4').style.height = document.querySelector('.contact').clientHeight + cir + 'px';
        document.querySelector('.line-con').style.top = (document.querySelector('.hero').clientHeight - document.querySelector('.message').offsetTop) - (document.querySelector('.message').clientHeight / 2) - cir + 'px';
    })
}