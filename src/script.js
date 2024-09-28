import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {Pane} from 'tweakpane'

// Variables
const aspRatio = window.innerWidth/window.innerHeight
const pane = new Pane();

// intialize a scene
const scene = new THREE.Scene();

// create a mesh(object)
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const planeGeometry = new THREE.PlaneGeometry(1,1)
const torusKnotGeometry = new THREE.TorusKnotGeometry()

// =============================== Material ===============================

const material = new THREE.MeshBasicMaterial()

// * MeshBasic Material

// Set color
// material.color = new THREE.Color('limegreen');
// material.color = new THREE.Color(0x0000ff);

// change opacity
// material.transparent = true
// material.opacity = 0.5

// DoubleSided
/**
 * When using Plane Geometry you can only see plane from front side and you will see blank from behind
 * to avoid that we use THREE.DoubleSide to render both side
 */
material.side = THREE.DoubleSide 
// material.side = THREE.FrontSide //Will only render front side of plane 
// material.side = THREE.BackSide //Will only render back side of plane 

// * MeshLambert Material
// for Lambert Material Light is necessary
const lambMaterial = new THREE.MeshLambertMaterial()

// * MeshPhong Material
const phongMaterial = new THREE.MeshPhongMaterial()
phongMaterial.shininess = 90

// pane.addBinding(phongMaterial, 'shininess',{
//     min:1, max : 1000, step:1
// })

// * MeshStandard Material
const standardMaterial = new THREE.MeshStandardMaterial()

// pane.addBinding(standardMaterial, 'metalness',{
//     min:0, max : 1, step:0.01
// })

// pane.addBinding(standardMaterial, 'roughness',{
//     min:0, max : 1, step:0.01
// })

// * MeshPhysical Material
const physicalMaterial = new THREE.MeshPhysicalMaterial()
physicalMaterial.color = new THREE.Color(0x049ef4)
physicalMaterial.emissive = new THREE.Color(0x000)

pane.addBinding(physicalMaterial, 'roughness',{
    min:0, max : 1, step:0.01
})

pane.addBinding(physicalMaterial, 'clearcoat',{
    min:0, max : 1, step:0.01
})


// //Create fog like env (needs background) 
// const fog = new THREE.Fog('white', 1, 10)
// scene.fog = fog

// // Add background color
// scene.background = new THREE.Color('white')

const cubeMesh = new THREE.Mesh(cubeGeometry, material)

// const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, lambMaterial)
// const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, phongMaterial)
// const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, standardMaterial)
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, physicalMaterial)
torusKnotMesh.position.x = 2
torusKnotMesh.scale.setScalar(0.5)

const plane = new THREE.Mesh(planeGeometry, material)
plane.position.x = -2

scene.add(cubeMesh)
scene.add(plane)
scene.add(torusKnotMesh)

// Light
const ambientLight = new THREE.AmbientLight(0x000, 0.3)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 3)
pointLight.position.set(1,1,2)
scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(lightHelper)


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
