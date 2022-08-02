import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';

class Model {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.mixer = null;
  }

  action(delta) {
    this.mixer?.update(delta);
  }

  async load(url, scale, scene) {
    const loader = new GLTFLoader();
    let mixer;

    await new Promise(res => {
      loader.load(url, gltf => {
        gltf.scene.scale.set(scale, scale, scale);
        mixer = new AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        scene.add(gltf.scene);
        res();
      },
        undefined,
        err => console.log(err)
      );
    })

    this.mixer = mixer;
    return scene;
  }
}

export default Model;