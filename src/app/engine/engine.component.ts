import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EngineService} from './engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: [ './engine.component.scss']
})
export class EngineComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('engineWrapper', {static: true})
  public engineWrapper: ElementRef<HTMLDivElement>;

  public constructor(private engServ: EngineService) {
  }
  
  public ngAfterViewInit(): void {
    
  }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas, this.engineWrapper);
    this.engServ.animate();
    console.log(this.rendererCanvas);
  }



}
