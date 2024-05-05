import * as THREE from 'three'
import gsap from 'gsap'
import './style.css'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time
// let time = Date.now()

// Clock
// const clock = new THREE.Clock()

gsap.to(mesh.position, { x: 2, duration: 1, delay: 1})
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2})

// Animations
const tick = () => {
  //Time, take the current time and subtract the previous time in order to get the delta time and then update the time to the current time so that the next time we call tick we can get the delta time again and so on.
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // Clock displays the time in seconds since the clock was created
  // const eslapedTime = clock.getElapsedTime()

  // Update objects
    //  camera.position.y = Math.sin(eslapedTime)
    //  camera.position.x = Math.cos(eslapedTime)
    //  camera.lookAt(mesh.position)

  // Updating Mesh with deltaTime
  // mesh.rotation.y += 0.001 * deltaTime
  
 // Renderer
 renderer.render(scene, camera)

 window.requestAnimationFrame(tick)
}

tick()