import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Athlete from '../_models/athlete';
import Bout from '../_models/bout';
import Club from '../_models/club';

@Injectable()
export class AthletesService {

  public athletes: Athlete[];

  constructor( 
    private http: HttpClient
  ) { }



  getAthletes(): Observable<Athlete[]> {
    // TODO: The path should come from a config file instead of hard-coded.
    return this.http.get<any>('http://localhost:3000/api/v1/athletes')
      .pipe( map ( response => {
        return this.athletes = <Athlete[]>response['athletes'];
      }));
  }

  get(): Athlete[] {
    return this.athletes;
  }

  getAthleteBouts(athleteID: String): Observable<Bout[]> {
    return this.http.get(`http://localhost:3000/api/v1/athletes/${athleteID}/bouts`)
      .pipe( map (response => {
        return <Bout[]>response['bouts'];
      }));
  }

  getClubs(): Observable<Club[]> {
    return this.http.get(`http://localhost:3000/api/v1/clubs`)
      .pipe( map (response => {
        return <Club[]>response['clubs'];
      }))
  }

  addBoutToAthlete( athlete: string, boutInfo: any): Observable<Bout> {  
    return this.http.post(`http://localhost:3000/api/v1/athletes/${athlete}/bouts`, boutInfo)
        .pipe( map (response => {
          return <Bout> response['bout'];
        }));
  }
}