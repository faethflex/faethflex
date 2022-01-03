import { Injectable, NgZone } from '@angular/core';
import { on } from 'events';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Texture } from 'three';
import { GenericScene } from '../shared/generic-scene.class';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';


@Injectable({ providedIn: 'root' })
export class AnimationService {

  public constructor(private ngZone: NgZone) { }

  public animateMesh360(scene: GenericScene, mesh: THREE.Mesh): void {
    // Check if there's a mesh
    if (scene.camera !== undefined) {
      // We have to run this outside angular zones,
      // because it could trigger heavy changeDetection cycles.
      this.ngZone.runOutsideAngular(() => {
        if (document.readyState !== 'loading') {
          this.rotateMesh360(scene, mesh);
        } else {
          window.addEventListener('DOMContentLoaded', () => {
            this.rotateMesh360(scene, mesh);
          });
        }

        window.addEventListener('resize', () => {
          this.resize(scene);
        });
      });
    }
  }

  public createGreenCube(scene: GenericScene, mesh: THREE.Mesh, path: string): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    scene.camera = new THREE.PerspectiveCamera(
      75, width / height, 0.1, 1000
    );
    scene.camera.position.z = 5;
    scene.scene.add(scene.camera);

    // soft white light
    scene.light = new THREE.AmbientLight(0x404040);
    scene.light.position.z = 10;
    scene.scene.add(scene.light);

    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      this.animateMesh360(scene, mesh);
    };

    const geometry = new THREE.DodecahedronGeometry(1, 10);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const texture = new THREE.TextureLoader(manager).load(path);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1 });
    mesh = new THREE.Mesh(geometry, material);

    scene.scene.add(mesh);
  }

  public rotateMesh360(scene: GenericScene, mesh: THREE.Mesh): void {
    scene.frameId = requestAnimationFrame(() => {
      this.rotateMesh360(scene, mesh);
    });

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    scene.renderer.render(scene.scene, scene.camera);
  }

  public resize(scene: GenericScene): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(width, height)

    scene.camera.aspect = width / height;
    scene.camera.updateProjectionMatrix();

    scene.renderer.setSize(width, height);

  }

  public resizeGLTF(scene: GenericScene, gltf: GLTF): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(width, height)

    // scene.camera.aspect = width / height;

    // gltf.scene.scale.set(.5, .5, -10);
    // // gltf.scene.scale.

    // gltf.scene.updateMatrix();

    scene.camera.aspect = width / height;
    scene.camera.updateProjectionMatrix();
    // gltf.scene.
    // scene.camera.updateProjectionMatrix();

    scene.renderer.setSize(width, height);
    var bbox = new THREE.Box3().setFromObject(gltf.scene);
    var cent = bbox.getCenter(new THREE.Vector3());
    var size = bbox.getSize(new THREE.Vector3());
    console.log(size, cent)

    //Rescale the object to normalized space
    var maxAxis = Math.max(size.x, size.y, size.z);
    gltf.scene.scale.multiplyScalar(2.0 / maxAxis);
    bbox.setFromObject(gltf.scene);
    bbox.getCenter(cent);
    bbox.getSize(size);
    //Reposition to 0,halfY,0
    gltf.scene.position.copy(cent).multiplyScalar(-1);
    gltf.scene.position.y -= (size.y * 0.5);
  }


  public addImageToScene(scene: GenericScene, path: string, geometry: THREE.BufferGeometry, mesh: THREE.Mesh, $imageLoaded: Subject<any>): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    scene.camera = new THREE.PerspectiveCamera(
      75, width / height, 0.1, 1000
    );
    scene.camera.position.z = 5;
    scene.scene.add(scene.camera);

    // soft white light
    scene.light = new THREE.AmbientLight(0x404040);
    scene.light.position.z = 10;
    scene.scene.add(scene.light);

    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      scene.renderer.render(scene.scene, scene.camera);
      mesh = new THREE.Mesh(geometry, material);
      $imageLoaded.next(mesh);
      scene.scene.add(mesh);

    };

    const texture = new THREE.TextureLoader(manager).load(path);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1 });
  }

  public add3DModelToScene(scene: GenericScene, path: string, $modelLoaded: Subject<any>): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    scene.camera = new THREE.PerspectiveCamera(
      75, width / height, 0.1, 1000
    );
    scene.camera.position.z = 5;
    scene.scene.add(scene.camera);

    // soft white light
    scene.light = new THREE.AmbientLight(0x404040);
    scene.light.position.z = 10;
    scene.scene.add(scene.light);

    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      scene.renderer.render(scene.scene, scene.camera);

    };

    const loader = new GLTFLoader(manager);
    loader.load(path, (gltf) => {

      scene.scene.add(gltf.scene);
      $modelLoaded.next(gltf);
      //console.log(gltf)
      //this.rotateGLTF360(scene, gltf);

    });
    console.log(loader)

  }

  public rotateGLTF360(scene: GenericScene, gltf: GLTF): void {
    scene.frameId = requestAnimationFrame(() => {
      this.rotateGLTF360(scene, gltf);
    });
    gltf.scene.rotation.x += 0.01;
    gltf.scene.rotation.y += 0.01;
    scene.renderer.render(scene.scene, scene.camera);
    //   export interface GLTF {
    //     animations: AnimationClip[];
    //     scene: Group;
    //     scenes: Group[];
    //     cameras: Camera[];
    //     asset: {
    //         copyright?: string;
    //         generator?: string;
    //         version?: string;
    //         minVersion?: string;
    //         extensions?: any;
    //         extras?: any;
    //     };
    //     parser: GLTFParser;
    //     userData: any;
    // }
  }
}
