import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericScene } from '../shared/generic-scene.class';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('engineWrapper', { static: true })
  public engineWrapper: ElementRef<HTMLDivElement>;
  private engineScene: GenericScene;
  public mesh: THREE.Mesh;

  public constructor(private aniServ: AnimationService) {
  }

  ngOnDestroy(): void {
    this.engineScene.onDestroy();
  }

  public ngAfterViewInit(): void {
    this.engineScene = new GenericScene(this.rendererCanvas, this.engineWrapper);
    this.aniServ.createGreenCube(this.engineScene, this.mesh, '../assets/tso-logo-64x77.png');
  }

  public ngOnInit(): void {

  }



}
