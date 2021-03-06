import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AnimationService } from 'src/app/components/engine/animation.service';
import { GenericScene } from 'src/app/components/shared/generic-scene.class';
import * as THREE from 'three';

@Component({
  selector: 'faeth-header',
  templateUrl: './faeth-header.component.html',
  styleUrls: ['./faeth-header.component.scss']
})
export class FaethHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('headerCanvas', { static: true })
  public headerCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('headerWrapper', { static: true })
  public headerWrapper: ElementRef<HTMLDivElement>;
  private headerScene: GenericScene;
  private tsoGeometry: THREE.DodecahedronGeometry = new THREE.DodecahedronGeometry(1, 10);
  public mesh: THREE.Mesh;
  public $ImageLoaded: Subject<any> = new Subject();



  public constructor(private aniServ: AnimationService) {
  }

  ngOnDestroy(): void {
    this.headerScene.onDestroy();
  }

  public ngAfterViewInit(): void {
    // this.headerScene = new GenericScene(this.headerCanvas, this.headerWrapper);
    // this.aniServ.addImageToScene(this.headerScene, '../assets/tso-logo-64x77.png', this.tsoGeometry, this.mesh, this.$ImageLoaded);
    console.log('done');
  }


  public ngOnInit(): void {
    this.$ImageLoaded.subscribe((m) => {
      console.log('done')
      this.mesh = m;
      this.aniServ.animateMesh360(this.headerScene, this.mesh)
    })
  }

}
