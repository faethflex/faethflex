import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AnimationService } from '../engine/animation.service';
import { GenericScene } from '../shared/generic-scene.class';
import * as THREE from 'three';

@Component({
  selector: 'faeth-leftaside',
  templateUrl: './faeth-leftaside.component.html'
})
export class FaethLeftAsideComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('leftAsideCanvas', { static: true })
  public leftAsideCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('leftAsideWrapper', { static: true })
  public leftAsideWrapper: ElementRef<HTMLDivElement>;
  private leftAsideScene: GenericScene;
  private tsoGeometry: THREE.DodecahedronGeometry = new THREE.DodecahedronGeometry(1, 10);
  public mesh: THREE.Mesh;
  public $ImageLoaded: Subject<any> = new Subject();



  public constructor(private aniServ: AnimationService) {
  }

  ngOnDestroy(): void {
    this.leftAsideScene.onDestroy();
  }

  public ngAfterViewInit(): void {
    // this.leftAsideScene = new GenericScene(this.leftAsideCanvas, this.leftAsideWrapper);
    // this.aniServ.addImageToScene(this.leftAsideScene, '../assets/tso-logo-64x77.png', this.tsoGeometry, this.mesh, this.$ImageLoaded);
    console.log('done');
  }


  public ngOnInit(): void {
    this.$ImageLoaded.subscribe((m) => {
      console.log('done')
      this.mesh = m;
      this.aniServ.animateMesh360(this.leftAsideScene, this.mesh)
    })
  }

}
