import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import User from '../../_models/user';

@Component({
  selector: 'app-user-homescreen',
  templateUrl: './user-homescreen.component.html',
  styleUrls: ['./user-homescreen.component.css']
})
export class UserHomescreenComponent implements OnInit {
  user: User;
  constructor(private router: Router) {}

  ngOnInit() {
    this.user = {
      name: 'Ásdís Rósa Gunnarsdóttir',
      email: 'disa@diploma.is'
    };
  }

  goToRoute(path: string) {
    console.log('the path: ', path);
    this.router.navigateByUrl('/' + path);
  }

  newButtonPushed(event) {
    console.log('I got event: ', event);
  }
}
