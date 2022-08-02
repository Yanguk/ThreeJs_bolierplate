import './App.css';
import { renderer, stageResize } from './init';
import animate from './animate';

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', stageResize);
window.requestAnimationFrame(animate);

