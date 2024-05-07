import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'
// npm install lil-gui to get the gui library

/**
 * Debug  , documentation at lil-gui.georgealways.com
 * add tweaks as you build the project, DON'T WAIT TILL THE END
 */
const gui = new GUI({
  width: 340,
  title: 'Nice Debug Ui',
  closeFolders: false
})

// Close the gui by default
// gui.close()
// Hides the gui by default
gui.hide()

window.addEventListener('keydown', (e) => {
  if (e.key === 'h') {
    gui.show(gui._hidden)
  }
})

const debugObject = {

}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#a778d8'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Gui control folder for the cube tweaks
const cubeTweaks = gui.addFolder('Cube Tweaks')
// Closes the folder by default
// cubeTweaks.close()

// Gui debug control definitions
cubeTweaks
  .add(mesh.position, 'y')
  .min(-3).max(3)
  .step(0.01)
  .name('elevation')

cubeTweaks.add(mesh, 'visible')

cubeTweaks.add(material, 'wireframe')

cubeTweaks
  .addColor(debugObject, 'color')
  // Helper function to update the color of the material
  .onChange(() => {
    material.color.set(debugObject.color)
  })

debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}

cubeTweaks.add(debugObject, 'spin')


// Subdivision control for the box geometry
debugObject.subdivision = 2
cubeTweaks
  .add(debugObject, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(
      1, 1, 1,
      debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
  })

// let myVariable = 1337
// gui.add(myVariable, '???')

// const myObject = {
//   myVariable: 1337
// }
// gui.add(myObject, 'myVariable')



/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()