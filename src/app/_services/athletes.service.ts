import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import Athlete from '../_models/athlete';
import Bout from '../_models/bout';
import Club from '../_models/club';

@Injectable()
export class AthletesService {
  private athletes = new BehaviorSubject<Athlete[]>([]);
  public athleteList = this.athletes.asObservable();

  constructor(private http: HttpClient) {}

  getAthletes(): Observable<boolean> {
    return this.http.get<any>(`${environment.baseUrl}/athletes`).pipe(
      retry(2),
      map(response => {
        this.athletes.next(<Athlete[]>response['athletes']);
        return true;
      }),
      catchError(this.handleError)
    );
  }

  getAthlete(id: string): Observable<Athlete> {
    return this.http.get<Athlete>(`${environment.baseUrl}/athletes/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAthleteBouts(athleteID: String): Observable<Bout[]> {
    return this.http
      .get(`${environment.baseUrl}/athletes/${athleteID}/bouts`)
      .pipe(
        map(response => {
          return <Bout[]>response['bouts'];
        })
      );
  }

  getClubs(): Observable<Club[]> {
    return this.http.get(`${environment.baseUrl}/clubs`).pipe(
      map(response => {
        return <Club[]>response['clubs'];
      })
    );
  }

  addAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post(`${environment.baseUrl}/athletes`, athlete).pipe(
      catchError(this.handleError),
      map(response => {
        const newAthlete = <Athlete>response['athlete'];
        this.athletes.next([...this.athletes.value, newAthlete]);
        return newAthlete;
      })
    );
  }

  editAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http
      .put(`${environment.baseUrl}/athletes/${athlete._id}`, athlete)
      .pipe(
        catchError(this.handleError),
        map(response => {
          const updatedAthlete = <Athlete>response['athlete'];
          this.athletes.next(
            this.athletes.value.map(
              data => (data._id === athlete._id ? athlete : data)
            )
          );
          return updatedAthlete;
        })
      );
  }

  addBoutToAthlete(athlete: string, boutInfo: any): Observable<Bout> {
    return this.http
      .post(`${environment.baseUrl}/athletes/${athlete}/bouts`, boutInfo)
      .pipe(
        map(response => {
          return <Bout>response['bout'];
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status === 400) {
        return throwError(error.error.message);
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
