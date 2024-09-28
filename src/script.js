import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// Variables
const aspRatio = window.innerWidth / window.innerHeight;
const pane = new Pane();

// intialize a scene
const scene = new THREE.Scene();

// create a mesh(object)
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);

// TextureLoader
const loader = new THREE.TextureLoader();

// ====================================== Load Texture ======================================

const texture = loader.load('/texture/ocean-rock-bl/ocean-rock_albedo.png')
const textureAo = loader.load('/texture/ocean-rock-bl/ocean-rock_ao.png')
const textureHeight = loader.load('/texture/ocean-rock-bl/ocean-rock_height.png')
const textureMetallic = loader.load('/texture/ocean-rock-bl/ocean-rock_metallic.png')
const textureRoughness = loader.load('/texture/ocean-rock-bl/ocean-rock_roughness.png')
const textureNormal = loader.load('/texture/ocean-rock-bl/ocean-rock_normal-ogl.png')

// Material
const material = new THREE.MeshStandardMaterial();
material.map = texture
material.aoMap = textureAo
material.aoMapIntensity = 1
material.roughnessMap = textureRoughness
material.roughness = 1
material.normalMap = textureNormal
material.displacementMap = textureHeight
material.displacementScale = 0.1

console.log(material)


const sphereMesh = new THREE.Mesh(sphereGeometry, material);
scene.add(sphereMesh);


// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff,  1);
pointLight.position.set(1,1,1);

pane.addBinding(pointLight, 'position', {
    x:{min:-10,max:10,step:0.1},
    y:{min:-10,max:10,step:0.1},
    z:{min:-10,max:10,step:0.1}
})

scene.add(pointLight);

// intialize a camera
const camera = new THREE.PerspectiveCamera(75, aspRatio, 0.1, 30);
camera.position.z = 2;
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

  controls.update(); //necessary for enableDamping & autoRotate

  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
