import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";
import { environment } from "../../../environments/environment";

import { User } from "../models/user.model";

@Injectable()
export class UsersService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.client.base_url;
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/api/users`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createUser(payload: User): Observable<User> {
    return this.http
      .post<User>(`/api/users`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateUser(payload: User): Observable<User> {
    return this.http
      .put<User>(`/api/users/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeUser(payload: User): Observable<User> {
    return this.http
      .delete<any>(`/api/users/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
