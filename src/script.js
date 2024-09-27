import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// Variables
const aspRatio = window.innerWidth/window.innerHeight

// intialize a scene
const scene = new THREE.Scene();

// ================================== Geometry ==================================

/** 
 * *Buffer Geometry
 * 
 *  1. Create Vertices Array => (0,0) origin , (3,0) , (0,3) on X-Y plane
 *  2. Now convert this into BufferAttribute
 *  3. create new BufferGeometry and assign this attr as position
 *     we can also set colors, rotation, etc.
 */

const vertices = new Float32Array([
    0,0,0,
    3,0,0,
    0,3,0
])

const bufferAttr = new THREE.BufferAttribute(vertices, 3); // use group of 3 as 1 vertex coordinates
const bufferGeo = new THREE.BufferGeometry()
bufferGeo.setAttribute('position', bufferAttr)

/** 
 * *Primitives Geometry
 */


//  more segments means more triangles 
//  - makes geometry smoother but is takes lot of processing power
 

// const geometry = new THREE.BoxGeometry(1,1,1 , 2, 2, 2); 
// const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
// const geometry = new THREE.CircleGeometry( 5, 32 );
// const geometry = new THREE.ConeGeometry( 1, 2, 8 );
// const geometry = new THREE.DodecahedronGeometry( 1, 0); 
// const geometry = new THREE.PlaneGeometry( 1, 1 );
// const geometry = new THREE.RingGeometry( 3, 5, 12 ); 
// const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
// const geometry = new THREE.TorusGeometry( 2, 1, 24, 100 ); 
const geometry = new THREE.TorusKnotGeometry( 1, 0.4, 64, 8 ); 

const material = new THREE.MeshBasicMaterial({color:"red", wireframe:true})
const mesh = new THREE.Mesh(geometry, material)
mesh.add(new THREE.AxesHelper(5))
scene.add(mesh)

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
controls.autoRotate = true

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
