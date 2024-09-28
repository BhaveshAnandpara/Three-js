import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'


// Variables
const aspRatio = window.innerWidth/window.innerHeight

// intialize a scene
const scene = new THREE.Scene();

// create a mesh(object)
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshStandardMaterial({color:"red"})

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

// intialize a camera
const camera = new THREE.PerspectiveCamera(75,aspRatio, 0.1, 30)
camera.position.z = 5

// intialize a renederer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({canvas, antialias:true}) // antialias help to reduce staircase effect
renderer.setSize(window.innerWidth, window.innerHeight )

// create controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true

// ================================== Lights ==================================

const ambientLight = new THREE.AmbientLight('#fff' , 0.5)
// scene.add(ambientLight)

const directionalLIght = new THREE.DirectionalLight('#00fffc' , 3)
directionalLIght.position.set(1 , 1 , 0.3)
// scene.add(directionalLIght)

const hemisphereLight = new THREE.HemisphereLight('#f00' , '#0f0' , 1)
// hemisphereLight.position.set(1 , 1 , 0.3)
// scene.add(hemisphereLight)

const pointLight = new THREE.PointLight('#ff9000' , 0.8 , 10 , 2)
pointLight.position.set(1, 1, 1)
// scene.add(pointLight)

const rectlight = new THREE.RectAreaLight('#4e00ff' , 20, 1 , 2)
rectlight.position.set(-1.5 , 0 , 1.5)
rectlight.lookAt(new THREE.Vector3()) // Now Light is looking at (0 ,0 , 0) i.e Center bcoz THREE.Vector3() gives 0  , 0 , 0
// scene.add(rectlight)

const spotLight = new THREE.SpotLight('#78ff00' , 4 , 10  , Math.PI *0.1 , 1 , 1)
spotLight.position.set(1, 1 , 1)
scene.add(spotLight)

spotLight.target.position.x = -0.75
scene.add(spotLight.target)


// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight , 0.4)
// scene.add(hemisphereLightHelper)

const directionalLIghtHelper = new THREE.DirectionalLightHelper(directionalLIght , 0.4)
// scene.add(directionalLIghtHelper)

const pointLIghtHelper = new THREE.PointLightHelper(pointLight , 0.2)
// scene.add(pointLIghtHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectlight)
// scene.add(rectAreaLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)


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
