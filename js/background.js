'use strict'
let fss = {
    renderer: new FSS.CanvasRenderer(),
    container: document.querySelector('.background'),
    scene: new FSS.Scene(),
    geometry: new FSS.Plane(window.innerWidth * 1.7, window.innerHeight * 2, Math.round(window.innerWidth / window.innerHeight * 7), 7),
    material: new FSS.Material('#333333', '#AAAAAA'),
    mesh: 0,
    light: new FSS.Light('#232121', '#514e4e'),
    play: 1,
    x: 0
}
fss.renderer.setSize(fss.container.offsetWidth * 1.7, fss.container.offsetHeight * 2);
fss.light.setPosition(0, 0, 60);
fss.mesh = new FSS.Mesh(fss.geometry, fss.material)
fss.container.appendChild(fss.renderer.element);
fss.scene.add(fss.mesh);
fss.scene.add(fss.light);
fss.renderer.render(fss.scene);
fss.mesh.speed = 0.001;
fss.mesh.xRange = 0.7;
fss.mesh.yRange = 0.1;
fss.mesh.zRange = 5;
fss.mesh.depth = 10;
let now, start = Date.now();

fss.geometry.vertices.forEach((v) => {
    v.anchor = FSS.Vector3.clone(v.position);
    v.step = FSS.Vector3.create(
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0)
    );
    v.time = Math.randomInRange(0, Math.PIM2);
});

//
function cycle() {
    let ox, oy, oz;
    let offset = fss.mesh.depth / 2;
    fss.geometry.vertices.forEach(v => {
        ox = Math.sin(v.time + v.step[0] * now * fss.mesh.speed);
        oy = Math.cos(v.time + v.step[1] * now * fss.mesh.speed);
        oz = Math.sin(v.time + v.step[2] * now * fss.mesh.speed);

        FSS.Vector3.set(v.position,
            fss.mesh.xRange * fss.geometry.segmentWidth * ox,
            fss.mesh.yRange * fss.geometry.sliceHeight * oy,
            fss.mesh.zRange * offset * oz - offset);
        FSS.Vector3.add(v.position, v.anchor);
    });

    // Set the Geometry to dirty
    fss.geometry.dirty = true;
}

function Render() {
    fss.renderer.render(fss.scene);
}

function backgroundAnimation() {
    now = Date.now() - start;
    cycle();
    Render();
    fss.play === 1 ? requestAnimationFrame(backgroundAnimation) : 0;
}

backgroundAnimation();
window.addEventListener('resize', backgroundResize);

function backgroundResize() {
    if (config.width !== window.innerWidth) {
        config.width = window.innerWidth;
        fss.scene = new FSS.Scene();
        fss.geometry = new FSS.Plane(window.innerWidth * 1.7, window.innerHeight * 2, Math.round(window.innerWidth / window.innerHeight * 7), 7);
        fss.renderer.setSize(fss.container.offsetWidth * 1.7, fss.container.offsetHeight * 2);
        fss.light.setPosition(0, 0, 60);
        fss.mesh = new FSS.Mesh(fss.geometry, fss.material)
        fss.container.appendChild(fss.renderer.element);
        fss.scene.add(fss.mesh);
        fss.scene.add(fss.light);
        fss.renderer.render(fss.scene);
        fss.mesh.speed = 0.001;
        fss.mesh.xRange = 0.7;
        fss.mesh.yRange = 0.1;
        fss.mesh.zRange = 5;
        fss.mesh.depth = 10;

        fss.geometry.vertices.forEach((v) => {
            v.anchor = FSS.Vector3.clone(v.position);
            v.step = FSS.Vector3.create(
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0),
                Math.randomInRange(0.2, 1.0)
            );
            v.time = Math.randomInRange(0, Math.PIM2);
        });
    }
}


function backgroundTranslate() {
    fss.x = (fss.renderer.element.clientWidth - window.innerWidth) / 2;
    //0,1 na góre i dół
    let k = (fss.renderer.element.clientHeight - (fss.renderer.element.clientHeight * 0.2) - (0.2 * fss.renderer.element.clientHeight)) / (document.querySelector('body').clientHeight + window.innerHeight);
    let s = document.querySelector('html').scrollTop;
    let y = 0.1 * fss.renderer.element.clientHeight + s * k;
    fss.renderer.element.style.transform = `translate(${-fss.x}px, ${-y}px)`;
}
backgroundTranslate()

function backgroundScrolling() {
    let k = (fss.renderer.element.clientHeight - (fss.renderer.element.clientHeight * 0.2) - (0.2 * fss.renderer.element.clientHeight)) / (document.querySelector('body').clientHeight + window.innerHeight);
    let s = document.querySelector('html').scrollTop;
    let y = 0.1 * fss.renderer.element.clientHeight + s * k;
    fss.renderer.element.style.transform = `translate(${-fss.x}px, ${-y}px)`;
}