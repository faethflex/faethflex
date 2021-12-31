import { ElementRef } from '@angular/core';
import * as THREE from 'three';

export class GenericScene {
    public canvas: HTMLCanvasElement;
    public renderer: THREE.WebGLRenderer;
    public camera: THREE.PerspectiveCamera;
    public scene: THREE.Scene;
    public light: THREE.AmbientLight;
    public frameId: number = null;
    public loader = new THREE.ImageLoader();

    public constructor(canvas: ElementRef<HTMLCanvasElement>, elementWrapper: ElementRef<HTMLDivElement>) {
        // create the scene
        this.scene = new THREE.Scene();

        // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas.nativeElement;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });
        this.renderer.setSize(elementWrapper.nativeElement.offsetWidth, elementWrapper.nativeElement.offsetHeight);
    }

    public onDestroy(): void {
        if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
        }
    }
}