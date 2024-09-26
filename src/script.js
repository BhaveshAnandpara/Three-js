import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// Variables
const aspRatio = window.innerWidth/window.innerHeight

// intialize a scene
const scene = new THREE.Scene();

// create a mesh(object)
const cubeGeometry = new THREE.BoxGeometry(1,2,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"})

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

// intialize a camera


// ============================================================ Perspective Camera ============================================================

/**
 * fov (FIELD OF VIEW) - first parameter of perspective camera
 *                       what it means that how how much the camera can capture the view
 *                       bigger fov - camera captures more scene (view)
 *                       smaller fov - camera captures less scene (view)
 *                       it may look like we are zooming but it's diff. checkout below visualizor
 *                       https://observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera
 * 
 * aspect ratio - aspect-ratio of the camera
 * 
 * near - The near property defines by how close to the camera Three.js should render the scene.
 * 
 * far - The far property defines by how far to the camera Three.js should render the scene.
 *       e.g : so If your camera z position is 5 which means dist betn camera & obj is 5 unit
 *             and you have far = 4, it won't render the object.
 *       My view : If your scene is restricted like your objects are really moving far from camera keep far same as camera z position.
 *                 casuse if your objects are at max 5 units and you are rendering as far as 100 unit it will be unecessary calculations.
 */


const perCamera = new THREE.PerspectiveCamera(50,aspRatio, 0.1, 30)
  

// ============================================================ Orthographic Camera ============================================================

// In Orthographic Perspective, objects appear the same size regardless of their distance from the camera. This camera type is often used for 2D games or architectural visualizations.
// diff btn perspective & orthographic camera = https://stackoverflow.com/questions/36573283/from-perspective-picture-to-orthographic-picture


/**
 *  for Orthographic camera, perspective is in rectangle so we need to specify 4 corners
 *  left - units left from camera should be covered 
 *  right - units right from camera should be covered 
 *  top - units top from camera should be covered 
 *  bottom - units bottom from camera should be covered
 *  near
 *  far 
 */
const orthCamera = new THREE.OrthographicCamera( -aspRatio, aspRatio, 1 , -1, 0.1, 200 )


// variables 
const camera = perCamera
camera.position.z = 10
camera.lookAt(0,0,0);

/**
 * Camera Helper to visualize camera lines
 */

const helper = new THREE.CameraHelper( camera );
scene.add( helper );


// intialize a renederer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight )

// create controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

// renderloop
const renderloop= ()=>{

    controls.update() //necessary for enableDamping & autoRotate
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()
