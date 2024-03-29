import Movements from "./movements.js";

// Declaration of a new scene with Three.js
const scene = new THREE.Scene();

// decalre a background with a specific color
scene.background = new THREE.Color(0xb4f7ef);

// camera and renderer configuration
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // declare the camera

const renderer = new THREE.WebGLRenderer(); // declare the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// set up a flat space
const geometry_space = new THREE.BoxGeometry(100, 0.1, 50);
const material_space = new THREE.MeshPhongMaterial({ color: 0xffff }); // white color
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);

// create a cube
const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
const cube_material = new THREE.MeshPhongMaterial({ color: 0xe363f8 });
const cube = new THREE.Mesh(cube_geometry, cube_material);
cube.position.set(5, 3, 0);
scene.add(cube);
camera.position.z = 5;

// create a cone
const cone_geometry = new THREE.ConeGeometry(5, 20, 32);
const cone_material = new THREE.MeshPhongMaterial({ color: 0xa88132 });
const cone = new THREE.Mesh(cone_geometry, cone_material);
cone.position.set(-10, 3, 0);
scene.add(cone);

// create a cylinder
const cylinder_geometry = new THREE.CylinderGeometry(5, 5, 5, 32);
const cylinder_material = new THREE.MeshPhongMaterial({ color: 0x32a852 });
const cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);
cylinder.position.set(18, 3, 0);
scene.add(cylinder);

// set camera inside the metaverse
camera.position.set(10, 5, 40);

//adding lights to the scene
const ambient_light = new THREE.AmbientLight(0xffffff);
const direction_light = new THREE.DirectionalLight(0xe3fc03, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);

// animate the cube
function animate() {
  // cube rotation
  cube.rotation.z += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // cone.rotation.z += 0.01;
  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;

  // cylinder rotation
  cylinder.rotation.x += 0.02;

  requestAnimationFrame(animate);

  // Move to the left
  if (Movements.isPressed(37)) {
    camera.position.x -= 0.5;
  }

  // Move up
  if (Movements.isPressed(38)) {
    camera.position.x += 0.5;
    camera.position.y += 0.5;
  }

  // Move right
  if (Movements.isPressed(39)) {
    camera.position.x += 0.5;
  }

  // Move down
  if (Movements.isPressed(40)) {
    camera.position.x -= 0.5;
    camera.position.y -= 0.5;
  }

  camera.lookAt(space.position);
  renderer.render(scene, camera);
}
animate();
