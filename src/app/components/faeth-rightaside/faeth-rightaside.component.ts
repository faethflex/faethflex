import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'faeth-rightaside',
  templateUrl: './faeth-rightaside.component.html'
})
export class FaethRightAsideComponent implements OnInit {

  public constructor(private router: Router) { }


  public ngOnInit(): void {
    console.log('implement right side')
  }
}
