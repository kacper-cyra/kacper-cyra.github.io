'use strict'
const cards = document.querySelectorAll('.projects .card');
if (config.mobile === 0) {
    document.querySelector(`.projects`).addEventListener('mousemove', cardHover);

    cards.forEach(item => {
        item.addEventListener('mouseout', (e) => {
            item.style.transform = `rotate3d(0,0,0,0deg)`;
            item.classList.remove('hovered');
        })
    })
}

function cardHover(e) {
    let card = e.target;
    if (!card.classList.contains('card')) {
        let might = card.closest('.card');
        if (might) {
            card = might;
        } else {
            return 0
        }
    }
    requestAnimationFrame(() => {
        cardAnim([card, e])
    })
}

function cardAnim(inp) {
    const [card, e] = [...inp];
    const bodyRect = document.body.getBoundingClientRect();
    const cords = card.getBoundingClientRect();
    const middle = [Math.round(cords.x + Number(cords.width / 2)), Math.round(cords.y - Number(bodyRect.top) + Number(cords.height / 2))];
    const difX = Math.round(e.pageY - middle[1]) / (cords.height / 2);
    const difY = Math.round((e.pageX - middle[0])) / (cords.width / 2);
    //Wielkość kąta
    const degrees = Number(Math.sqrt((difX ** 2) + (difY ** 2)) * 15);
    //const transform = `rotateX(${-difX*degrees}deg) rotateY(${difY*degrees}deg)`;
    const transform = `rotate3d(${-difX},${difY}, 0,${degrees}deg)`;
    card.style.transform = transform;
}