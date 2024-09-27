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


// Add objects on screen
scene.add(camera)
scene.add(cubeMesh)
scene.add(axesHelper)

// resize according to window
window.addEventListener('resize', ()=>{
    let newAspRatio = window.innerWidth/window.innerHeight;
    camera.aspect = newAspRatio;
    camera.updateProjectionMatrix(); // need to call this everytime if camera property is changed
    renderer.setSize(window.innerWidth, window.innerHeight )
})

// ======================================================== Animations ========================================================
const clock = new THREE.Clock() 
let prevTime = 0

const renderloop= ()=>{

    const currentTime = clock.getElapsedTime(); // gets the exact time since the function fired
    const delta = currentTime - prevTime // will get the time since last frame
    prevTime = currentTime

    // cubeMesh.rotation.x += 0.01 // This will rotate the cube but for devices with diff fps the rotation speed will change
    /**
     * delta - time between current frame and last frame
     *         this makes sures rotation speed is consistent for all fps devices
     *         let's say for device 1 - 1 fps, device 2 - 2 fps
     *         that means for device 1 - renderloop will run each sec and same for device 2 but it will run every 2 sec
     * 
     *         if we are incrementing += 1 to rotation for a min 
     *         device 1 -> 1*60 = 60 (loops runs for 60 times) 
     *         device 2 -> 1*30 = 30 (loops runs for 30 times)
     * 
     *         to make sure both run same rotations
     *         delta1 = 1, delta2 = 2
     *          
     *         if we are incrementing += 1*delta to rotation for a min
     *         device 1 -> 1*1*60 = 60 (loops runs for 60 times)
     *         device 2 -> 1*2*30 = 60 (loops runs for 30 times)
     *          
     */
    // cubeMesh.rotation.x +=  THREE.MathUtils.degToRad(1) * delta * 40
    // cubeMesh.rotation.y +=  THREE.MathUtils.degToRad(1) * delta * 40

    /**
     * 
     * sin() and cos() gives value in range of -1 to 1
     * 
     * sin() - starts from 0
     * cos() - starts from 1
     * 
     * sin() on x and cos() on y gives circle rotation`
     * 
     */

    // cubeMesh.position.x = Math.sin(currentTime) * 5
    // cubeMesh.position.y = Math.cos(currentTime) * 5
    cubeMesh.scale.z = Math.tan(currentTime)


    controls.update() //necessary for enableDamping & autoRotate

    renderer.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()
