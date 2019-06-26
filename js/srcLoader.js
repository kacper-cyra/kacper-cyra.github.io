'use strict'
// Load 3D Scene
let plane;
let canvas;
let scene = new THREE.Scene();
window.scene = scene;
let mixer;
let clock = new THREE.Clock();
let camera = new THREE.PerspectiveCamera(25, (window.innerWidth) / window.innerHeight, 0.5, 20000);
camera.position.set(23, 16, 62)
camera.rotation.set(-0.1, 0.7, 0.07);
let animations = [];
let controls;
let lights = [],
    humanMesh, head, human;
let ambientLight = new THREE.AmbientLight(0x404040, 0.2);
let canMouse = new THREE.Vector3(),
    INTERSECTED;
let raycaster = new THREE.Raycaster();
// Load a Renderer
let renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.canvas-container').appendChild(renderer.domElement);
canvas = document.querySelector('.canvas-container canvas');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMapSoft = true;


// glTf 2.0 Loader

let loader = new THREE.GLTFLoader();
(() => {
    loader.load('src/3d/hero5.glb', (gltf) => {
        //Dodanie sceny
        scene.add(gltf.scene);
        scene.mouse = new THREE.Vector3();
        scene.mouse.z = 30
        initScene();
        //lights
        scene.add(ambientLight);
        let light = new THREE.PointLight(0xffffff, 3, 100);
        light.position.set(40, 40, 40);
        scene.add(light);
        lights.push(light);
        let light2 = new THREE.PointLight(0xffffff, 1, 100);
        light2.position.set(-10, 20, 40);
        scene.add(light2);
        lights.push(light2);
        mixer = new THREE.AnimationMixer(scene);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });
        mixer._actions.map((item) => {
            animations[item._clip.name] = item;
        })
        animations['breath'].fadeOut(0.01)
        animations['waving2'].fadeOut(0.01)
        human.position.set(0, 0, -40)
        plane.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
        loaded();
    })
})()

function animate() {
    if (config.characterAnim === 1) {
        render();
        let delta = clock.getDelta();
        mixer.update(delta);
        if (scene.mouse.x > -8) {
            scene.mouse.x = scene.mouse.x + ((scene.mouse.x + 8) * 1.5)
        }
        head.lookAt(scene.mouse);
        requestAnimationFrame(animate);
    }
}

function render() {
    raycaster.setFromCamera(canMouse, camera);
    let intersects = raycaster.intersectObjects(scene.children[0].children[0].children);

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
        }
    };
    let background = raycaster.intersectObject(plane)
    if (background.length > 0) {
        scene.mouse.x = background[0].point.x;
        scene.mouse.y = background[0].point.y;
    }
    renderer.render(scene, camera);
}

function initScene() {

    scene.children[0].children.forEach((item) => {
        if (item.name === 'szkielet') {
            humanMesh = item.children[1];
            human = item;
            human.direction = human.children[1].getWorldDirection();
            head = scene.getObjectByName('mixamorigHead');
        } else if (item.name.includes('light')) {
            lights.push(item)
        };
    });

    lights.forEach((item) => {
        item.children[0].castShadow = true;
    });

    humanMesh.material.flatShading = true;

    /*Kurtyna*/
    var geometry = new THREE.PlaneGeometry(120, 60, 72, 72);
    plane = new THREE.Mesh(geometry);
    scene.add(plane);
    plane.material.visible = false;
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    if (config.width !== window.innerWidth) {
        config.width = window.innerWidth;
        camera.aspect = (window.innerWidth) / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(window.innerWidth / window.innerHeight);
        renderer.setSize((window.innerWidth), window.innerHeight);
    }
}

function onDocumentMouseMove(e) {
    e.preventDefault();
    canMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    canMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

function startMoving() {
    if (human.position.z < 6) {
        human.position.z += human.direction.z * 0.9;
        human.position.y += human.direction.y * 0.9;
        human.position.x += human.direction.x * 0.9;
        requestAnimationFrame(startMoving);
    } else {
        startBreathing()
    };
    if (human.position.z < -5) {
        human.rotation.set(0, -0.75, 0)
    } else {
        animations['waving2'].enabled = 1;
        animations['waving2'].fadeIn(0.7);
        animations['walk'].fadeOut(0.7);
    };

    function startBreathing() {
        setTimeout(() => {
            animations['breath'].enabled = 1;
            animations['waving2'].fadeOut(0.75);
            animations['breath'].fadeIn(0.75);
        }, 1900);
    }
}