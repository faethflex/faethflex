import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-button',
  templateUrl: './right-button.component.html',
  styleUrls: ['./right-button.component.scss']
})
export class RightButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //this.router.navigate('')
    console.log('')
  }
}
