import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import Athlete from '../models/athlete';

@Injectable()
export class AthletesService {

  public athletes: Athlete[];

  constructor( 
    private http: HttpClient
  ) { }



  getAthletes(): Observable<Athlete[]> {
    // TODO: The path should come from a config file instead of hard-coded.
    return this.http.get('http://localhost:3000/api/v1/athletes')
      .pipe( map ( response => {
        return this.athletes = <Athlete[]>response['athletes'];
      }));
  }

  get(): Athlete[] {
    return this.athletes;
  }
}