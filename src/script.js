import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// Variables
const aspRatio = window.innerWidth/window.innerHeight

// intialize a scene
const scene = new THREE.Scene();

// create a mesh(object)


/**
 * To cast shadow
 *  - enable shadowMap in renderer
 *  - castShadow of mesh and light
 *  - recieve shadow for plane
 */

const sphere = new THREE.SphereGeometry(0.5, 32, 32);
const plane = new THREE.PlaneGeometry(4,5);

const material = new THREE.MeshStandardMaterial()
material.side = THREE.DoubleSide

const sphereMesh = new THREE.Mesh(sphere, material)
sphereMesh.castShadow = true //castshadow

const planeMesh = new THREE.Mesh(plane, material)
planeMesh.receiveShadow = true

planeMesh.position.set(0,-1,0)
planeMesh.rotation.x = 2

scene.add(sphereMesh)
scene.add(planeMesh)

// Light
const ambLight = new THREE.AmbientLight('white', 0.6)
scene.add(ambLight)

/**
 * Directional Lights
*/

const dirLight = new THREE.DirectionalLight('white', 1)
dirLight.position.set(2,2,1)

dirLight.castShadow = true //castshadow
dirLight.shadow.mapSize.width = 1024  //Lower the No. More Pixelated
dirLight.shadow.mapSize.height = 1024

dirLight.shadow.camera.near = 1 
dirLight.shadow.camera.far = 6 //By Default Far is infinte hence not optimised 
dirLight.shadow.radius = 10 //Blurs Shadow

scene.add(dirLight)
scene.add(new THREE.DirectionalLightHelper(dirLight))

/**
 * Spot Lights
*/
const spotLight = new THREE.SpotLight('#ffffff' , 20 , 5 , Math.PI * 0.3)
spotLight.position.set(0 , 2 ,2 )

spotLight.castShadow = true

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 1 
spotLight.shadow.camera.far = 6
spotLight.shadow.camera.fov = 30

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
scene.add(spotLight)

/**
 * PointLight
*/

const pointLight = new THREE.PointLight('#ffffff' , 10)
pointLight.position.set(1 , 2, 0)

pointLight.castShadow = true

pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 6


const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)

scene.add(pointLight)

scene.add(new THREE.AxesHelper())

// intialize a camera
const camera = new THREE.PerspectiveCamera(75,aspRatio, 0.1, 30)
camera.position.z = 5

scene.add(new THREE.CameraHelper(camera))

// intialize a renederer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({canvas, antialias:true}) // antialias help to reduce staircase effect
renderer.setSize(window.innerWidth, window.innerHeight )
renderer.shadowMap.enabled = true

// create controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true

// resize according to window
window.addEventListener('resize', ()=>{
    let newAspRatio = window.innerWidth/window.innerHeight;
    camera.aspect = newAspRatio;
    camera.updateProjectionMatrix(); // need to call this everytime if camera property is changed
    renderer.setSize(window.innerWidth, window.innerHeight )
})

const renderloop= ()=>{

    controls.update() //necessary for enableDamping & autoRotate

    renderer.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()
