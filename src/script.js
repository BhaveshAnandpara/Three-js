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
const cubeTextureLoader = new THREE.CubeTextureLoader()

// ====================================== Load Texture for Standard Material ======================================


const texture = loader.load('/texture/used-stainless-steel2-bl/used-stainless-steel2_albedo.png')
const textureAo = loader.load('/texture/used-stainless-steel2-bl/used-stainless-steel2_ao.png')
const textureHeight = loader.load('/texture/used-stainless-steel2-bl/used-stainless-steel2_height.png')
const textureMetallic = loader.load('/texture/used-stainless-steel2-bl/used-stainless-steel2_metallic.png')
const textureRoughness = loader.load('/texture/used-stainless-steel2-bl/used-stainless-steel2_roughness.png')
const textureNormal = loader.load('/texture/used-stainless-steel2-bl/used-stainless-steel2_normal-ogl.png')

const enviromentMapTexture = cubeTextureLoader.load(
    [
        '/environmentMaps/3/px.jpg',
        '/environmentMaps/3/nx.jpg',
        '/environmentMaps/3/py.jpg',
        '/environmentMaps/3/ny.jpg',
        '/environmentMaps/3/pz.jpg',
        '/environmentMaps/3/nz.jpg',
    ]
)


const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide
material.map = texture
material.aoMap = textureAo

material.roughnessMap = textureRoughness
material.roughness = 1

material.metalnessMap = textureMetallic
material.normalMap = textureNormal

material.displacementMap = textureHeight

material.envMap = enviromentMapTexture

// ====================================== Load Texture for MeshMatcapMaterial ======================================

/*
const material = new THREE.MeshMatcapMaterial();

const matcapTexture = loader.load('/matcaps/3.png')
material.matcap = matcapTexture
*/

// ====================================== Load Texture for MeshToonMaterial ======================================

/*
const material = new THREE.MeshToonMaterial()

const gradientTexture = loader.load('/gradients/5.jpg')
material.gradientMap = gradientTexture
*/


const cubeMesh = new THREE.Mesh(sphereGeometry, material);
scene.add(cubeMesh);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(2, 2, 3);

scene.add(ambientLight);
// scene.add(new THREE.PointLightHelper(pointLight));



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
