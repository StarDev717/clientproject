import { Injectable } from "@angular/core";

import {Effect, Actions, ofType} from '@ngrx/effects';
import { of } from "rxjs/observable/of";
import {map, switchMap, catchError, mergeMap, retryWhen, tap} from 'rxjs/operators';

import * as fromRoot from "../../../store";
import * as projectActions from "../actions/projects.action";

import * as fromServices from "../../services";
import {genericRetryStrategy} from '../../../shared/rxjs-utils';
import { Store } from "@ngrx/store";
import * as fromStore from '../index';
import "rxjs/add/operator/retryWhen";
import {LoadingFailed} from '../../../shared/error-messages';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectService: fromServices.ProjectsService,
    private store: Store<fromStore.ProjectsState>,
  ) {}

  @Effect()
  loadProjects$ = this.actions$.ofType(projectActions.LOAD_PROJECTS).pipe(
    switchMap(() => {
      return this.projectService
        .getProjects()
        .pipe(
          map(projects => new projectActions.LoadProjectsSuccess(projects)),
          catchError(error => of(new projectActions.LoadProjectsFail(error)))
        );
    })
  );

  @Effect()
  loadProject$ = this.actions$.ofType(projectActions.LOAD_SELECTED_PROJECT).pipe(
    map((action: projectActions.LoadSelectedProject) => action.payload),
    switchMap(project => {
      let class_obj = this;
      return this.projectService
        .getProject(project)
        .retryWhen(genericRetryStrategy({dispatch: (message) => class_obj.store.dispatch(new projectActions.LoadSelectedProjectFail(message))}))
        .pipe(
          map((project) => {
            return new projectActions.LoadSelectedProjectSuccess(project)
          }),
          catchError(error => of(new projectActions.LoadSelectedProjectFail(LoadingFailed)))
        )
    })
  );

  @Effect()
  loadProjectBuildings$ = this.actions$.ofType(projectActions.LOAD_PROJECT_BUILDINGS).pipe(
    map((action: projectActions.LoadProjectBuildings) => action.payload),
    switchMap(project => {
      let class_obj = this;
      return this.projectService
        .getProjectBuildings(project)
        .retryWhen(genericRetryStrategy({dispatch: (message) => class_obj.store.dispatch(new projectActions.LoadProjectBuildingsFail(message))}))
        .pipe(
          map((project) => {
            return new projectActions.LoadProjectBuildingsSuccess(project)
          }),
          catchError(error => of(new projectActions.LoadProjectBuildingsFail(LoadingFailed)))
        )
    })
  );

  @Effect()
  loadProjectEmployees$ = this.actions$.ofType(projectActions.LOAD_PROJECT_EMPLOYEES).pipe(
    map((action: projectActions.LoadProjectEmployees) => action.payload),
    switchMap(project => {
      let class_obj = this;
      return this.projectService
        .getProjectEmployees(project)
        .retryWhen(genericRetryStrategy({dispatch: (message) => class_obj.store.dispatch(new projectActions.LoadProjectEmployeesFail(message))}))
        .pipe(
          map((project) => {
            return new projectActions.LoadProjectEmployeesSuccess(project)
          }),
          catchError(error => of(new projectActions.LoadProjectEmployeesFail(LoadingFailed)))
        )
    })
  );

  @Effect()
  loadProjectReports$ = this.actions$.ofType(projectActions.LOAD_PROJECT_REPORTS).pipe(
    map((action: projectActions.LoadProjectReports) => action.payload),
    switchMap(project => {
      let class_obj = this;
      return this.projectService
        .getProjectReports(project)
        .retryWhen(genericRetryStrategy({dispatch: (message) => class_obj.store.dispatch(new projectActions.LoadProjectReportsSuccess(message))}))
        .pipe(
          map((project) => {
            return new projectActions.LoadProjectReportsSuccess(project)
          }),
          catchError(error => of(new projectActions.LoadProjectReportsFail(LoadingFailed)))
        )
    })
  );

  @Effect()
  loadReportData$ = this.actions$.ofType(projectActions.LOAD_REPORT_DATA).pipe(
    map((action: projectActions.LoadReportData) => action.payload),
    mergeMap(project => {
      let class_obj = this;
      return this.projectService
        .getProjectReportData(project)
        .retryWhen(genericRetryStrategy({dispatch: (message) => class_obj.store.dispatch(new projectActions.LoadReportDataFail(message))}))
        .pipe(
          map((project) => {
            return new projectActions.LoadReportDataSuccess(project)
          }),
          catchError(error => of(new projectActions.LoadReportDataFail(LoadingFailed)))
        )
    })
  );

  @Effect()
  createProject$ = this.actions$.ofType(projectActions.CREATE_PROJECT).pipe(
    map((action: projectActions.CreateProject) => action.payload),
    switchMap(project => {
      return this.projectService
        .createProject(project)
        .pipe(
          map(project => new projectActions.CreateProjectSuccess(project)),
          catchError(error => of(new projectActions.CreateProjectFail(error)))
        );
    })
  );

  @Effect()
  createProjectSuccess$ = this.actions$
    .pipe(
      ofType(projectActions.CREATE_PROJECT_SUCCESS),
      map((action: projectActions.CreateProjectSuccess) => action.payload),
      map(data => {
        return new projectActions.CreateReport(data)
        // return new fromRoot.Go({
        //   path: ["/projects"]
        // });
      })
    );

  @Effect()
  createReport$ = this.actions$.ofType(projectActions.CREATE_REPORT).pipe(
    map((action: projectActions.CreateReport) => action.payload),
    switchMap(project => {
      console.log('project', project)
      project = project.result;
      let data = {
        projectId: project.id,
        title: "Default Report",
        description: '',
      }
      return this.projectService
        .createProjectReport(data)
        .pipe(
          map(report => new projectActions.CreateReportSuccess(project)),
          catchError(error => of(new projectActions.CreateReportFail(error)))
        );
    })
  );

  @Effect()
  createReportSuccess$ = this.actions$
    .ofType(projectActions.CREATE_REPORT_SUCCESS)
    .pipe(
      map((action: projectActions.CreateReportSuccess) => action.payload),
      map(data => {
        console.log('data', data)
        return new fromRoot.Go({
          path: ["/projects",data.id, 'details']
        });
      })
    );

  @Effect()
  updateProject$ = this.actions$.ofType(projectActions.UPDATE_PROJECT).pipe(
    map((action: projectActions.UpdateProject) => action.payload),
    switchMap(project => {
      return this.projectService
        .updateProject(project)
        .pipe(
          map(project => new projectActions.UpdateProjectSuccess(project)),
          catchError(error => of(new projectActions.UpdateProjectFail(error)))
        );
    })
  );

  @Effect()
  removeProject$ = this.actions$.ofType(projectActions.REMOVE_PROJECT).pipe(
    map((action: projectActions.RemoveProject) => action.payload),
    switchMap(project => {
      return this.projectService
        .removeProject(project)
        .pipe(
          map(() => new projectActions.RemoveProjectSuccess(project)),
          catchError(error => of(new projectActions.RemoveProjectFail(error)))
        );
    })
  );

  @Effect()
  handleProjectSuccess$ = this.actions$
    .pipe(
      ofType(projectActions.UPDATE_PROJECT_SUCCESS, projectActions.REMOVE_PROJECT_SUCCESS),
      map(project => {
        return new fromRoot.Go({
          path: ["/projects/list"]
        });
      })
    );
}
