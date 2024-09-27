import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// Variables
const aspRatio = window.innerWidth/window.innerHeight

// intialize a scene
const scene = new THREE.Scene();

// create a mesh(object)
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:"red", wireframe:true})

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

// Shows X-Y-Z Axes
const axesHelper = new THREE.AxesHelper(10);
// cubeMesh.add(axesHelper) //if you add axesHelper in camera and not scene the axes helper will always centered to cube and not scene


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

/*
 * ==================================================== Transform Objects ==============================================
 */

// Copy method to copy Vector3 properties
const newPos = new THREE.Vector3(0,1,0);
cubeMesh.position.copy(newPos) // Copies positioN Values from newPos

// distanceTo method finds the distance between 2 Vector3 Objects
console.log(camera.position.distanceTo(cubeMesh.position)) // dist between camera and object

// scale method 
// cubeMesh.scale.set(2,2,2)  //set() helps to assign x,y,z value at same time
// cubeMesh.scale.setScalar(2) //Same as set() only one value will be assigned to x,y,z

// rotation
// cubeMesh.rotation.y = Math.PI * 0.25 // PI/4 =>45 deg

/*
    Three js rotates x axis first then Y and then Z -> 'XYZ'
    To force the three.js to rotate on Y Axis first and then X you will have to tell three.js
    for that we use reorder()
 */
cubeMesh.rotation.reorder('YXZ') 

cubeMesh.rotation.y = THREE.MathUtils.degToRad(45) // PI/4 => 45 deg
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45) // PI/4 => 45 deg


// Groups

const cubeGrp = new THREE.Group();

const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh1.position.x = -2

const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh2.position.x = 2

cubeGrp.add(cubeMesh)
cubeGrp.add(cubeMesh1)
cubeGrp.add(cubeMesh2)

cubeGrp.scale.setScalar(1.5)
cubeGrp.position.y = -1


console.log(camera)

// Add objects on screen
// scene.add(cubeMesh) //comment this when using group
scene.add(cubeGrp)
scene.add(camera)
scene.add(axesHelper)


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
