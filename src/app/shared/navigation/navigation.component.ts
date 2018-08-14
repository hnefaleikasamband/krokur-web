import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import User from '../../_models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() color: String;
  navColor: String
  // Maybe this should not be an input, maybe get it from the auth service?
  @Input() user: User;
  @Input() buttonIcon: String;
  fabIcon: String;
  @Output() newButton = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.navColor = this.color.toLowerCase() !== 'primary' ? 'primary' : 'accent';
    this.fabIcon = this.buttonIcon ? this.buttonIcon : 'add';
    console.log('current Icon is: ', this.fabIcon);
  }

  goToRoute(path: string) {
    console.log('the path: ', path);
    this.router.navigateByUrl('/' + path);
  }

  newButtonClicked() {
    console.log('emitting shit from navigation');
    this.newButton.emit();
  }

}
