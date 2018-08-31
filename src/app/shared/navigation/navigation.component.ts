import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import authedUser from '../../_models/authedUser';

// Services
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input()
  color: String;
  navColor: String;

  @Input()
  buttonIcon: String;
  fabIcon: String;

  @Output()
  newButton = new EventEmitter<any>();

  user: authedUser;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    this.navColor =
      this.color.toLowerCase() !== 'primary' ? 'primary' : 'accent';
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

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
