"use strict";let plane,canvas,mixer,scene=new THREE.Scene;window.scene=scene;let clock=new THREE.Clock,camera=new THREE.PerspectiveCamera(25,window.innerWidth/window.innerHeight,.5,2e4);camera.position.set(23,16,62),camera.rotation.set(-.1,.7,.07);let controls,humanMesh,head,human,INTERSECTED,animations=[],lights=[],ambientLight=new THREE.AmbientLight(4210752,.2),canMouse=new THREE.Vector3,raycaster=new THREE.Raycaster,renderer=new THREE.WebGLRenderer({alpha:!0,antialias:!0});renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),document.querySelector(".canvas-container").appendChild(renderer.domElement),canvas=document.querySelector(".canvas-container canvas"),renderer.shadowMap.enabled=!0,renderer.shadowMap.type=THREE.PCFSoftShadowMap,renderer.shadowMapSoft=!0;let loader=new THREE.GLTFLoader;function animate(){if(1===config.characterAnim){render();let e=clock.getDelta();mixer.update(e),scene.mouse.x>-8&&(scene.mouse.x=scene.mouse.x+1.5*(scene.mouse.x+8)),head.lookAt(scene.mouse),requestAnimationFrame(animate)}}function render(){raycaster.setFromCamera(canMouse,camera);let e=raycaster.intersectObjects(scene.children[0].children[0].children);e.length>0&&INTERSECTED!=e[0].object&&(INTERSECTED=e[0].object);let n=raycaster.intersectObject(plane);n.length>0&&(scene.mouse.x=n[0].point.x,scene.mouse.y=n[0].point.y),renderer.render(scene,camera)}function initScene(){scene.children[0].children.forEach(e=>{"szkielet"===e.name?(humanMesh=e.children[1],(human=e).direction=human.children[1].getWorldDirection(),head=scene.getObjectByName("mixamorigHead")):e.name.includes("light")&&lights.push(e)}),lights.forEach(e=>{e.children[0].castShadow=!0}),humanMesh.material.flatShading=!0;var e=new THREE.PlaneGeometry(120,60,72,72);plane=new THREE.Mesh(e),scene.add(plane),plane.material.visible=!1,document.addEventListener("mousemove",onDocumentMouseMove,!1),window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){config.width!==window.innerWidth&&(config.width=window.innerWidth,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setPixelRatio(window.innerWidth/window.innerHeight),renderer.setSize(window.innerWidth,window.innerHeight))}function onDocumentMouseMove(e){e.preventDefault(),canMouse.x=e.clientX/window.innerWidth*2-1,canMouse.y=-e.clientY/window.innerHeight*2+1}function startMoving(){human.position.z<6?(human.position.z+=.9*human.direction.z,human.position.y+=.9*human.direction.y,human.position.x+=.9*human.direction.x,requestAnimationFrame(startMoving)):setTimeout(()=>{animations.breath.enabled=1,animations.waving2.fadeOut(.75),animations.breath.fadeIn(.75)},1900),human.position.z<-5?human.rotation.set(0,-.75,0):(animations.waving2.enabled=1,animations.waving2.fadeIn(.7),animations.walk.fadeOut(.35))}loader.load("src/3d/hero5.glb",e=>{scene.add(e.scene),scene.mouse=new THREE.Vector3,scene.mouse.z=30,initScene(),scene.add(ambientLight);let n=new THREE.PointLight(16777215,3,100);n.position.set(40,40,40),scene.add(n),lights.push(n);let i=new THREE.PointLight(16777215,1,100);i.position.set(-10,20,40),scene.add(i),lights.push(i),mixer=new THREE.AnimationMixer(scene),e.animations.forEach(e=>{mixer.clipAction(e).play()}),mixer._actions.map(e=>{animations[e._clip.name]=e}),animations.breath.fadeOut(.01),animations.waving2.fadeOut(.01),human.position.set(0,0,-40),plane.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z),loaded()});