import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// Variables
const aspRatio = window.innerWidth / window.innerHeight;

// intialize a scene
const scene = new THREE.Scene();

// =================== Loaders ===================
const textureLoader = new THREE.TextureLoader();
const fontLoader = new FontLoader(); //Loades a Font

//load texture
const matcapLoader = textureLoader.load("/textures/matcaps/1.png");

fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) =>
  renderText(font)
);

function renderText(font) {

// =================== Geometry ===================

  const textGeometry = new TextGeometry("Bhavesh Anandpara", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center() //centers the Text

  // =================== Material ===================

  //Create Text Material and Mesh
  const material = new THREE.MeshMatcapMaterial({matcap : matcapLoader})

  const text = new THREE.Mesh(textGeometry , material)
  scene.add(text)

  //Create Donut Material and Mesh

  console.time('donuts') //Start Timer
  const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45);

  for(let i = 0 ; i < 20 ; i++){

    const donut = new THREE.Mesh(donutGeometry  , material)

    donut.position.x = (Math.random() -0.5 ) * 5
    donut.position.y = (Math.random() -0.5 ) * 5
    donut.position.z = (Math.random() -0.5 ) * 5

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale ,scale ,scale)

    scene.add(donut)
    

  }

  console.timeEnd('donuts') //Ends Timer

}

// =================== Camera ===================

// intialize a camera
const camera = new THREE.PerspectiveCamera(75, aspRatio, 0.1, 30);
camera.position.z = 3;


// =================== Renderloop ===================

// intialize a renederer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // antialias help to reduce staircase effect
renderer.setSize(window.innerWidth, window.innerHeight);

// create controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

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
