import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from '../../users/models/user.model';
import {Result} from '../models/result.model';
import * as projectActions from '../../projects/store/actions/projects.action';
@Injectable()
export class DataService {

    private actionUrl: string;
    private endpointUrl: string;
    constructor(private http: HttpClient, private configuration: ConfigurationService) {
        this.actionUrl = configuration.ServerWithApiUrl;
    }

    public setEndpoint(endpoint: string, params: string = '') {
        this.endpointUrl = this.actionUrl + `${endpoint}/${params}`;
    }

    public getAll<T>(): Observable<Result<T>> {
        const authToken = localStorage.getItem('token');
        const _headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .set('UserId', localStorage.getItem('userId'))
        const httpOptions = {
            headers: _headers,
        };
        return this.http.get<Result<T>>(this.endpointUrl, httpOptions);
    }

    public getSingle<T>(id: string): Observable<Result<T>> {
        return this.http.get<Result<T>>(this.endpointUrl + id);
    }

    public getSingleCustom<T>(): Observable<Result<T>> {
      return this.http.get<Result<T>>(this.endpointUrl);
    }

    public add<T>(data: T): Observable<Result<T>> {
        const _headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('UserId', localStorage.getItem('userId'))
      const httpOptions = {
            headers: _headers,
        };
        return this.http.post<Result<T>>(this.endpointUrl, data, httpOptions);
    }

  public update<T>(data: T): Observable<Result<T>> {
    const _headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: _headers,
    };
    return this.http.put<Result<T>>(this.endpointUrl, data, httpOptions);
  }

    public upload(input: any) {
        return this.http.post(this.endpointUrl, input);
    }

    public logIn<T>(data: T): Observable<T> {
      const _headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      const httpOptions = {
        headers: _headers,
      };
      let userId = localStorage.getItem('userId')
      return this.http.post<T>(this.endpointUrl + 'login/', data, httpOptions);
    }

}
