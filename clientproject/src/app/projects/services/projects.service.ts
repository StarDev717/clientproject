import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";
import { environment } from "../../../environments/environment";

import { Project } from "../models/project.model";
import {DataService} from '../../shared/services/data.service';
import {Result} from '../../shared/models/result.model';

@Injectable()
export class ProjectsService {
  baseUrl: string;
  constructor(private http: HttpClient, private dataService: DataService) {
    this.baseUrl = environment.client.base_url;
    this.setEndpoint();
  }

  setEndpoint(params: string = '') {
    this.dataService.setEndpoint(params === '' ? 'projects' : `projects/${params}`);
  }

  setCustomEndpoint(endpoint: string) {
    this.dataService.setEndpoint(endpoint);
  }

  getProjects(): Observable<Result<Project>> {
    this.setEndpoint();
    return this.dataService.getAll<Project>()
  }

  getProject(payload): Observable<Result<Project>> {
    this.setEndpoint();
    return this.dataService.getSingle<Project>(payload.id)
  }

  getProjectBuildings(payload): Observable<Result<Project>> {
    this.setEndpoint(`${payload.id}/buildings`);
    return this.dataService.getSingleCustom<any>()
  }

  getProjectEmployees(payload): Observable<Result<Project>> {
    this.setEndpoint(`${payload.id}/employees`);
    return this.dataService.getSingleCustom<any>()
  }


  getProjectReports(payload): Observable<Result<Project>> {
    this.setEndpoint(`${payload.id}/reports`);
    return this.dataService.getSingleCustom<any>()
  }

  getProjectReportData(payload): Observable<Result<Project>> {
    this.setCustomEndpoint(`reports/${payload.id}`);
    return this.dataService.getSingleCustom<any>()
  }

  createProject(payload: Project): Observable<Result<Project>> {
    this.setEndpoint();
    return this.dataService.add<Project>(payload)
  }

  createProjectReport(payload: any): Observable<Result<any>> {
    this.setCustomEndpoint(`reports`);
    return this.dataService.add<any>(payload)
  }

  updateProject(payload: Project): Observable<Result<Project>> {
    this.setEndpoint(payload.id.toString());
    return this.dataService.update<Project>(payload)
  }

  removeProject(payload: Project): Observable<Project> {
    return this.http
      .delete<any>(`/api/projects/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
