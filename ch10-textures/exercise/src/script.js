import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { color } from 'three/examples/jsm/nodes/Nodes.js'

/**
 * Textures oldschool way
 */
// const image = new Image()
//load the image from the path and set the texture to the image
// const texture = new THREE.Texture(image)
//make sure to set the color space to sRGB to get the correct colors from the texture
// texture.colorSpace = THREE.SRGBColorSpace

// When the image is loaded, we need to update the texture with the image
// image.onload = () => {
//   texture.needsUpdate = true
// }
//set the source of the image
// image.src = '/textures/door/color.jpg'

/**
 * Textures modern way
 */
// Create a loading manager and pass it to the texture loader
const loadingManager = new THREE.LoadingManager()

// Listen to the progress of the loading manager
loadingManager.onStart = () => {
  console.log('loading started')
}
loadingManager.onProgress = () => {
  console.log('loading in progress')
}
loadingManager.onLoad = () => {
  console.log('loading finished')
}
loadingManager.onError = () => {
  console.log('loading error')
}

// Load the texture with the TextureLoader, you only need one instance of the loader to load multiple textures
const textureLoader = new THREE.TextureLoader(loadingManager)
// Load the texture from the path and then make sure to set the texture to the material
const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Repeat the texture on the object by setting the repeat property this will only repeat the last pixel however
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// this will repeat the texture on the object by setting the wrap property to repeatWrapping of the entire texture
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// Offset the texture on the object by setting the offset property
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// Rotate the texture on the object by setting the rotation property in radians
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// Sharpen the texture of the object by using the NearestFilter property
// colorTexture.minFilter = THREE.NearestFilter
// Magnify the texture of the object by using the NearestFilter property to clear up blurry textures, NearestFilters will also give better performance than LinearFilters
colorTexture.magFilter = THREE.NearestFilter

// When using NeartestFilters on minFilter we don't need mipmappings so we can deactivate them
colorTexture.generateMipmaps = false

// make sure to set the color space to sRGB to get the correct colors from the texture
colorTexture.colorSpace = THREE.SRGBColorSpace

// you can compress your textures with a tool like TinyPNG to reduce the file size
// normals are usually png files because they have an alpha channel
// good places to find textures  poliigon.com 3dtextures.me arroway-textures.ch

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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