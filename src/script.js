import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// Variables
const aspRatio = window.innerWidth/window.innerHeight

// intialize a scene
const scene = new THREE.Scene();

// Texture Loaders
const loader = new THREE.TextureLoader()
const partical = loader.load('/textures/particles/2.png')

// ====================================== Sphere particals Geometry ======================================
const particalGeometry = new THREE.SphereGeometry( 1, 16, 16)
const particleMaterial = new THREE.PointsMaterial({
        size : 0.02,
        sizeAttenuation : true //Gives perspective small if far and big if near
})    

//Partical
const particlesMesh = new THREE.Points(particalGeometry, particleMaterial)
scene.add(particlesMesh)

// ====================================== Custome particals Geometry ======================================

const particalCustomGeometry = new THREE.BufferGeometry()
const count = 2000

const positions = new Float32Array(count * 3) //Count * 3 because there is x  ,y, ,z to a single particle
const colors = new Float32Array(count * 3)  

for(let i = 0 ; i < count *3 ; i++){
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particalCustomGeometry.setAttribute(
    'position', 
    new THREE.BufferAttribute(positions , 3)
)

particalCustomGeometry.setAttribute(
    'color', 
    new THREE.BufferAttribute(colors , 3)
)

const particleCustomMaterial = new THREE.PointsMaterial({
    size : 0.1,
    sizeAttenuation : true, //Gives perspective small if far and big if near
    // // color : 0xff88cc, //hide so other colors won't be impacted
    transparent : true, //necessary for alphamap
    alphaMap : partical, //loads particles as per texture 
    alphaTest : 0.001, //Basically Telling renderer to not render the black part of image
    depthTest : false, //Basically says donot render which is forward and which is behind solves issue but not good when there is an object
    depthWrite : false, //THis solves all our Issues
    blending : THREE.AdditiveBlending, //Glows if there is particle over another ,
    vertexColors : true //Whithout it wont change colors
})  

const particles = new THREE.Points(particalCustomGeometry, particleCustomMaterial)
scene.add(particles)

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

const clock = new THREE.Clock()


const renderloop= ()=>{

    const elapsedTime = clock.getElapsedTime()


    //By Single Particle (Very BAd for performance as we are using it to change position for every particle)
    for(let i = 0 ; i < count ; i ++){

        const n = i * 3 //So that it can access direct x position of every particle -- xyz xyz xyz so that it can jump every 3 elements

        const x = particalCustomGeometry.attributes.position.array[n]
        particalCustomGeometry.attributes.position.array[n + 1] = Math.tan(elapsedTime + x) //n + 1 will access y 

    }

    particalGeometry.attributes.position.needsUpdate = true //to update attributes

    controls.update() //necessary for enableDamping & autoRotate

    renderer.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()
