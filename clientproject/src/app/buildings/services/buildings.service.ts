import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";
import { environment } from "../../../environments/environment";

import { Building } from "../models/building.model";
import {DataService} from '../../shared/services/data.service';
import {Result} from '../../shared/models/result.model';

@Injectable()
export class BuildingsService {
  baseUrl: string;
  constructor(private http: HttpClient, private dataService: DataService) {
    this.baseUrl = environment.client.base_url;
    this.setEndpoint();
  }

  setEndpoint(params: string = '') {
    this.dataService.setEndpoint(params === '' ? 'buildings' : `buildings/${params}`);
  }

  getBuildings(): Observable<Result<Building>> {
    this.setEndpoint();
    return this.dataService.getAll<Result<Building>>()
  }

  getBuildingProjections(payload: Building): Observable<Result<any>> {
    this.setEndpoint(`${payload.id}/employees`);
    return this.dataService.getSingleCustom<any>()
  }

  createBuilding(payload: Building): Observable<Result<Building>> {
    this.setEndpoint();
    return this.dataService.add<Building>(payload)
  }

  updateBuilding(payload: Building): Observable<Result<Building>> {
    this.setEndpoint(payload.id.toString());
    return this.dataService.update<Building>(payload)
  }

  removeBuilding(payload: Building): Observable<Building> {
    return this.http
      .delete<any>(`/api/buildings/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
