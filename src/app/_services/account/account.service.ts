import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/account/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // TODO Refactor this for data store

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.url = environment.API_URL;
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}api/accounts/login`,
      { email, password }).pipe(map(user => {
        // login is successfull if there is a JSON Web Token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
