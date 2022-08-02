import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import './App.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axes = new THREE.AxesHelper(50);
scene.add(axes);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(1, 2.5, 2.5);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

const stageResize = () => {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
};

export { renderer, scene, camera, stageResize }