import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AthleteAddEditComponent } from '../../shared/athlete-add-edit/athlete-add-edit.component';

/* Services & models */
import { Athlete, AthleteTab } from '../../_models/athlete';
import authedUser from '../../_models/authedUser';
import { AthletesService } from '../../_services/athletes.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-athlete-homescreen',
  templateUrl: './athlete-homescreen.component.html',
  styleUrls: ['./athlete-homescreen.component.css']
})
export class AthleteHomescreenComponent implements OnInit {
  user: authedUser;
  openAthletesTab: AthleteTab[] = [];
  selectedTabIndex = 0;

  constructor(
    private athletesService: AthletesService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  selectAthlete(athlete) {
    const alreadyOpen = this.openAthletesTab.find(a => a._id === athlete._id);
    if (!alreadyOpen || alreadyOpen === undefined) {
      this.athletesService.getAthleteBouts(athlete._id).subscribe(response => {
        athlete.bouts = response;
        this.openAthletesTab.push(athlete);
        this.selectedTabIndex = this.openAthletesTab.indexOf(athlete) + 1;
      });
    } else {
      this.selectedTabIndex = this.openAthletesTab.indexOf(athlete) + 1;
    }
  }

  printTabIndex() {
    console.log('Current tab index: ', this.selectedTabIndex);
  }

  removeTab(index) {
    console.log('Index being removed:', index);
    this.openAthletesTab.splice(index, 1);
  }

  goToRoute(path: string) {
    console.log('the path: ', path);
    this.router.navigateByUrl('/' + path);
  }

  newButtonPushed() {
    const editDialogRef = this.dialog.open(AthleteAddEditComponent, {
      width: '30%'
    });

    editDialogRef.afterClosed().subscribe(result => {
      console.log('Closing dialog:', result);
    });
  }
}
