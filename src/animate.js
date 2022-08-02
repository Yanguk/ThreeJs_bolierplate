import { renderer, scene, camera } from "./init";
import * as THREE from 'three';
import Model from './asset/Model'

const car = new Model();
var clock = new THREE.Clock();
var speed = 2; //units a second
var delta = 0;

car.load('../public/asset/car/scene.gltf', 0.0025, scene);

export default function animate(delta) {
  requestAnimationFrame(animate);
  delta = clock.getDelta();

  renderer.render(scene, camera);
  camera.updateProjectionMatrix();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  car.action(delta);

  renderer.render(scene, camera);
  camera.updateProjectionMatrix();
}
