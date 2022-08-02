/* eslint-disable no-sequences */
import * as THREE from 'three';
import { each, pipe, go, map } from 'fxjs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { renderer, scene, camera } from './init';
// eslint-disable-next-line no-unused-vars
const log = a => (console.log(a), a);

const clock = new THREE.Clock();

const getGltf = url =>
  new Promise(res => {
    const loader = new GLTFLoader();
    loader.load(url, res, undefined, err => console.log(err));
  });

let mixer;

const renderCar = pipe(
  getGltf,
  gltf => (gltf.scene.scale.set(0.0025, 0.0025, 0.0025), gltf),
  gltf => (scene.add(gltf.scene), gltf),
  gltf => {
    mixer = new THREE.AnimationMixer(gltf.scene);
    return gltf;
  },
  gltf => (mixer.clipAction(gltf.animations[0]).play(), gltf)
);

renderCar('../public/asset/car/scene.gltf');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(1, 0, 2);
scene.add(cube);

export default function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  renderer.render(scene, camera);
  camera.updateProjectionMatrix();

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  mixer?.update(delta);
}
