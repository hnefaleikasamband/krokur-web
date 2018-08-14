import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AthleteAddEditComponent } from '../../shared/athlete-add-edit/athlete-add-edit.component';

/* Services & models */
import User from '../../_models/user';
import { Athlete, AthleteTab } from '../../_models/athlete';
import { AthletesService } from '../../_services/athletes.service';


@Component({
  selector: 'app-athlete-homescreen',
  templateUrl: './athlete-homescreen.component.html',
  styleUrls: ['./athlete-homescreen.component.css']
})
export class AthleteHomescreenComponent implements OnInit {

  user: User;
  openAthletesTab: AthleteTab[] = [];
  selectedTabIndex = 0;


  constructor( 
    private athletesService: AthletesService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user = {
      name: 'Ásdís Rósa Gunnarsdóttir',
      email: 'disa@diploma.is'
    }
    console.log(this.athletesService.get());
  }

  selectAthlete(athlete) {
    console.log('I got the athlete click in the homescreen: ', athlete);
    const alreadyOpen = this.openAthletesTab.find(a => a._id === athlete._id);
    if(!alreadyOpen || alreadyOpen === undefined) {
      this.athletesService.getAthleteBouts(athlete._id).subscribe( response => {
        athlete.bouts = response;
        this.openAthletesTab.push(athlete);
        this.selectedTabIndex = this.openAthletesTab.indexOf(athlete) + 1;
      })
    } else {
      this.selectedTabIndex = this.openAthletesTab.indexOf(athlete) + 1;
    }
  }

  printTabIndex() {
    console.log('Current tab index: ', this.selectedTabIndex);
  }

  removeTab(index) {
    console.log('Index being removed:', index);
    this.openAthletesTab.splice(index,1);
  }

  goToRoute(path: string) {
    console.log('the path: ', path);
    this.router.navigateByUrl('/' + path);
  }

  newButtonPushed() {
    let editDialogRef = this.dialog.open(AthleteAddEditComponent, {
      width: '30%'
    });
    
    editDialogRef.afterClosed().subscribe( result => {
      console.log('Closing dialog:',result);
    })
  }

}
