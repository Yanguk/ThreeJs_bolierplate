import * as THREE from 'three';
import './App.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axes = new THREE.AxesHelper(50);
scene.add(axes);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(1, 2.5, 2.5);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

const stageResize = () => {
  const { innerWidth, innerHeight } = window;

  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
};

window.addEventListener('resize', stageResize);
