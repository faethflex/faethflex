import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericScene } from '../shared/generic-scene.class';
import { AnimationService } from './animation.service';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('engineWrapper', { static: true })
  public engineWrapper: ElementRef<HTMLDivElement>;
  private engineScene: GenericScene;
  public mesh: THREE.Mesh;
  public $ModelLoaded: Subject<any> = new Subject();
  private m: GLTF;

  public constructor(private aniServ: AnimationService) {
  }

  ngOnDestroy(): void {
    this.engineScene.onDestroy();
  }

  public ngAfterViewInit(): void {
    this.engineScene = new GenericScene(this.rendererCanvas, this.engineWrapper);
    // this.aniServ.createGreenCube(this.engineScene, this.mesh, '../assets/tso-logo-64x77.png');
    this.aniServ.add3DModelToScene(this.engineScene, '../assets/tso-logo-working.glb', this.$ModelLoaded);
  }

  public ngOnInit(): void {
    this.$ModelLoaded.subscribe((m) => {
      this.m = m;
      this.aniServ.rotateGLTF360(this.engineScene, this.m)
    });
  }
}
