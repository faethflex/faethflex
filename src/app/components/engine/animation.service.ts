import { Injectable, NgZone } from '@angular/core';
import { on } from 'events';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Texture } from 'three';
import { GenericScene } from '../shared/generic-scene.class';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

    scene.camera.aspect = width / height;
    scene.camera.updateProjectionMatrix();

    scene.renderer.setSize(width, height);
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
    const loader = new GLTFLoader();
    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      scene.renderer.render(scene.scene, scene.camera);
      loader.load(path, function (gltf) {

        $modelLoaded.next(gltf);
        scene.scene.add(gltf.scene);

      }, undefined, function (error) {

        console.error(error);

      });
    };
  }
}
