import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// Variables
const aspRatio = window.innerWidth / window.innerHeight;
const pane = new Pane();

// intialize a scene
const scene = new THREE.Scene();

// create a mesh(object)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry();
const sphereGeometry = new THREE.SphereGeometry(0.5, 52, 52);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1);

// TextureLoader
const loader = new THREE.TextureLoader();

// ====================================== Load Texture ======================================

const texture = loader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png')
const textureAo = loader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png')
const textureHeight = loader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_height.png')
const textureMetallic = loader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png')
const textureRoughness = loader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png')
const textureNormal = loader.load('/texture/whispy-grass-meadow-bl/wispy-grass-meadow_normal.png')

/**
 * If wer are mapping texture on a 10x10 plane, the texture will be stretched 
 * Sol - repeat textures of 1x1 over 10x10  
 * wrapS - repeats horizontally (X-Axis)
 * wrapT - repeats vertically (Y-Axis)
 * ps: use space-ship-monitor-bl texture for repeat method
 */

// texture.repeat.set(10,10)

// for repearWrapping tile will be repeated from start 
// 0-100,0-100,0-100.....
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping

// for MirroredRepeatWrapping tile will be mirrored and then repeated 
// 0-100,100-0,0-100.....
// texture.wrapS = THREE.MirroredRepeatWrapping
// texture.wrapT = THREE.MirroredRepeatWrapping


// pane.addBinding(texture, 'offset', {
//     x:{
//         min:-1,max:1,step:0.001
//     },
//     y:{
//         min:-1,max:1,step:0.001
//     }
// })

// Material

const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide
material.map = texture
material.aoMap = textureAo
material.roughnessMap = textureRoughness
material.roughness = 1
material.metalnessMap = textureMetallic
material.normalMap = textureNormal

const cubeMesh = new THREE.Mesh(cubeGeometry, material);
cubeMesh.position.y = -2;

const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.position.x = -2;
// planeMesh.rotation.x = THREE.MathUtils.degToRad(90)
// planeMesh.scale.setScalar(10)

const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
torusKnotMesh.position.x = 2;
torusKnotMesh.scale.setScalar(0.4);

const sphereMesh = new THREE.Mesh(sphereGeometry, material);


const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
cylinderMesh.position.y = 2;

// scene.add(cubeMesh);
scene.add(planeMesh);
// scene.add(torusKnotMesh);
// scene.add(sphereMesh);
// scene.add(cylinderMesh);

const rotate = new THREE.Group();
rotate.add(cubeMesh, planeMesh, torusKnotMesh, sphereMesh, cylinderMesh);
// rotate.add( planeMesh);
scene.add(rotate)

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(0, 0, 3);

// scene.add(pointLight);
// scene.background = new THREE.Color('white')

// intialize a camera
const camera = new THREE.PerspectiveCamera(75, aspRatio, 0.1, 30);
camera.position.z = 5;
camera.position.y = 2;

// intialize a renederer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // antialias help to reduce staircase effect
renderer.setSize(window.innerWidth, window.innerHeight);

// create controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true

// resize according to window
window.addEventListener("resize", () => {
  let newAspRatio = window.innerWidth / window.innerHeight;
  camera.aspect = newAspRatio;
  camera.updateProjectionMatrix(); // need to call this everytime if camera property is changed
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {

//   rotate.children.forEach(mesh => {
//     if(mesh instanceof THREE.Mesh) mesh.rotation.y += 0.02
//   });
  controls.update(); //necessary for enableDamping & autoRotate

  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
