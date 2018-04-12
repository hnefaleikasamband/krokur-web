import { Component, OnInit } from '@angular/core';
import User from '../../models/user';
import Athlete from '../../models/athlete';

@Component({
  selector: 'app-athlete-homescreen',
  templateUrl: './athlete-homescreen.component.html',
  styleUrls: ['./athlete-homescreen.component.css']
})
export class AthleteHomescreenComponent implements OnInit {

  user: User;
  openAthletesTab: Athlete[] = [];
  selectedTabIndex = 0;


  constructor() { }

  ngOnInit() {
    this.user = {
      name: 'Ásdís Rósa Gunnarsdóttir',
      email: 'disa@diploma.is'
    }
  }

  selectAthlete(athlete) {
    console.log('I got the athlete click in the homescreen: ', athlete);
    const alreadyOpen = this.openAthletesTab.find(a => a._id === athlete._id);
    if(!alreadyOpen || alreadyOpen === undefined) {
      this.openAthletesTab.push(athlete);
    }
    this.selectedTabIndex = this.openAthletesTab.indexOf(athlete) + 1;
  }

  printTabIndex() {
    console.log('Current tab index: ', this.selectedTabIndex);
  }

  removeTab(index) {
    this.openAthletesTab.splice(index+1,1);
  }

}
