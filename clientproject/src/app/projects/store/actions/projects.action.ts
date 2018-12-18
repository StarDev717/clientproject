import { Action } from "@ngrx/store";

import { Project } from "../../models/project.model";
import {Result} from '../../../shared/models/result.model';

// load project building
export const LOAD_SELECTED_PROJECT = "[Projects] LOAD_SELECTED_PROJECT";
export const LOAD_SELECTED_PROJECT_FAIL = "[Projects] LOAD_SELECTED_PROJECT_FAIL";
export const LOAD_SELECTED_PROJECT_SUCCESS = "[Projects] LOAD_SELECTED_PROJECT_SUCCESS";


export class LoadSelectedProject implements Action {
  readonly type = LOAD_SELECTED_PROJECT;
  constructor(public payload: Project) {}
}

export class LoadSelectedProjectFail implements Action {
  readonly type = LOAD_SELECTED_PROJECT_FAIL;
  constructor(public payload: any) {}
}

export class LoadSelectedProjectSuccess implements Action {
  readonly type = LOAD_SELECTED_PROJECT_SUCCESS;
  constructor(public payload: Result<Project>) {}
}


// load projects
export const LOAD_PROJECTS = "[Projects] Load Projects";
export const LOAD_PROJECTS_FAIL = "[Projects] Load Projects Fail";
export const LOAD_PROJECTS_SUCCESS = "[Projects] Load Projects Success";

export class LoadProjects implements Action {
  readonly type = LOAD_PROJECTS;
}

export class LoadProjectsFail implements Action {
  readonly type = LOAD_PROJECTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProjectsSuccess implements Action {
  readonly type = LOAD_PROJECTS_SUCCESS;
  constructor(public payload: Result<Project>) {}
}

// load project buildings
export const LOAD_PROJECT_BUILDINGS = "[Projects] Load Project_buildings";
export const LOAD_PROJECT_BUILDINGS_FAIL = "[Projects] Load Project_buildings Fail";
export const LOAD_PROJECT_BUILDINGS_SUCCESS = "[Projects] Load Project_buildings Success";

export class LoadProjectBuildings implements Action {
  readonly type = LOAD_PROJECT_BUILDINGS;
  constructor(public payload: any) {}
}

export class LoadProjectBuildingsFail implements Action {
  readonly type = LOAD_PROJECT_BUILDINGS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProjectBuildingsSuccess implements Action {
  readonly type = LOAD_PROJECT_BUILDINGS_SUCCESS;
  constructor(public payload: Result<Project>) {}
}

// load project reports
export const LOAD_PROJECT_REPORTS = "[Projects] LOAD_PROJECT_REPORTS";
export const LOAD_PROJECT_REPORTS_FAIL = "[Projects] LOAD_PROJECT_REPORTS FAIL";
export const LOAD_PROJECT_REPORTS_SUCCESS = "[Projects] LOAD_PROJECT_REPORTS_SUCCESS";

export class LoadProjectReports implements Action {
  readonly type = LOAD_PROJECT_REPORTS;
  constructor(public payload: any) {}
}

export class LoadProjectReportsFail implements Action {
  readonly type = LOAD_PROJECT_REPORTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProjectReportsSuccess implements Action {
  readonly type = LOAD_PROJECT_REPORTS_SUCCESS;
  constructor(public payload: Result<Project>) {}
}

// load project employees
export const LOAD_PROJECT_EMPLOYEES = "[Projects] LOAD_PROJECT_EMPLOYEES";
export const LOAD_PROJECT_EMPLOYEES_FAIL = "[Projects] LOAD_PROJECT_EMPLOYEES_FAIL";
export const LOAD_PROJECT_EMPLOYEES_SUCCESS = "[Projects] LOAD_PROJECT_EMPLOYEES_SUCCESS";

export class LoadProjectEmployees implements Action {
  readonly type = LOAD_PROJECT_EMPLOYEES;
  constructor(public payload: any) {}
}

export class LoadProjectEmployeesFail implements Action {
  readonly type = LOAD_PROJECT_EMPLOYEES_FAIL;
  constructor(public payload: any) {}
}

export class LoadProjectEmployeesSuccess implements Action {
  readonly type = LOAD_PROJECT_EMPLOYEES_SUCCESS;
  constructor(public payload: Result<Project>) {}
}


// load report data
export const LOAD_REPORT_DATA = "[Projects] LOAD_REPORT_DATA";
export const LOAD_REPORT_DATA_FAIL = "[Projects] LOAD_REPORT_DATA_FAIL";
export const LOAD_REPORT_DATA_SUCCESS = "[Projects] LOAD_REPORT_DATA_SUCCESS";

export class LoadReportData implements Action {
  readonly type = LOAD_REPORT_DATA;
  constructor(public payload: any) {}
}

export class LoadReportDataFail implements Action {
  readonly type = LOAD_REPORT_DATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadReportDataSuccess implements Action {
  readonly type = LOAD_REPORT_DATA_SUCCESS;
  constructor(public payload: Result<Project>) {}
}


// create Project
export const CREATE_REPORT = "[Projects] CREATE_REPORT";
export const CREATE_REPORT_FAIL = "[Projects] CREATE_REPORT_FAIL";
export const CREATE_REPORT_SUCCESS = "[Projects] CREATE_REPORT_SUCCESS";

export class CreateReport implements Action {
  readonly type = CREATE_REPORT;
  constructor(public payload: any) {}
}

export class CreateReportFail implements Action {
  readonly type = CREATE_REPORT_FAIL;
  constructor(public payload: any) {}
}

export class CreateReportSuccess implements Action {
  readonly type = CREATE_REPORT_SUCCESS;
  constructor(public payload: any) {}
}


// create Project
export const CREATE_PROJECT = "[Projects] Create Project";
export const CREATE_PROJECT_FAIL = "[Projects] Create Project Fail";
export const CREATE_PROJECT_SUCCESS = "[Projects] Create Project Success";

export class CreateProject implements Action {
  readonly type = CREATE_PROJECT;
  constructor(public payload: Project) {}
}

export class CreateProjectFail implements Action {
  readonly type = CREATE_PROJECT_FAIL;
  constructor(public payload: any) {}
}

export class CreateProjectSuccess implements Action {
  readonly type = CREATE_PROJECT_SUCCESS;
  constructor(public payload: Result<Project>) {}
}

// update Project
export const UPDATE_PROJECT = "[Projects] Update Project";
export const UPDATE_PROJECT_FAIL = "[Projects] Update Project Fail";
export const UPDATE_PROJECT_SUCCESS = "[Projects] Update Project Success";

export class UpdateProject implements Action {
  readonly type = UPDATE_PROJECT;
  constructor(public payload: Project) {}
}

export class UpdateProjectFail implements Action {
  readonly type = UPDATE_PROJECT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateProjectSuccess implements Action {
  readonly type = UPDATE_PROJECT_SUCCESS;
  constructor(public payload: Result<Project>) {}
}

// remove Project
export const REMOVE_PROJECT = "[Projects] Remove Project";
export const REMOVE_PROJECT_FAIL = "[Projects] Remove Project Fail";
export const REMOVE_PROJECT_SUCCESS = "[Projects] Remove Project Success";

export class RemoveProject implements Action {
  readonly type = REMOVE_PROJECT;
  constructor(public payload: Project) {}
}

export class RemoveProjectFail implements Action {
  readonly type = REMOVE_PROJECT_FAIL;
  constructor(public payload: any) {}
}

export class RemoveProjectSuccess implements Action {
  readonly type = REMOVE_PROJECT_SUCCESS;
  constructor(public payload: Project) {}
}

// action types
export type ProjectsAction =
  | LoadProjects
  | LoadProjectsFail
  | LoadProjectsSuccess
  | CreateProject
  | CreateProjectFail
  | CreateProjectSuccess
  | UpdateProject
  | UpdateProjectFail
  | UpdateProjectSuccess
  | RemoveProject
  | RemoveProjectFail
  | RemoveProjectSuccess
  | LoadSelectedProject
  | LoadSelectedProjectSuccess
  | LoadSelectedProjectFail
  | LoadProjectBuildings
  | LoadProjectBuildingsFail
  | LoadProjectBuildingsSuccess
  | LoadProjectEmployees
  | LoadProjectEmployeesSuccess
  | LoadProjectEmployeesFail
  | LoadProjectReports
  | LoadProjectReportsFail
  | LoadProjectReportsSuccess
  | LoadReportData
  | LoadReportDataSuccess
  | LoadReportDataFail
  | CreateReport
  | CreateReportSuccess
  | CreateReportFail
  ;
