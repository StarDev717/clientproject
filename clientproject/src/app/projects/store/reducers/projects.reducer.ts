import * as fromProjects from "../actions/projects.action";
import { Project } from "../../models/project.model";
import {LoadingFailed} from '../../../shared/error-messages';
import {Builder} from 'selenium-webdriver';
import {Building} from '../../../buildings/models/building.model';
import {User} from '../../../users/models/user.model';

export interface ProjectState {
  entities: { [id: number]: Project };
  selectedProject: Project;
  loaded: boolean;
  loading: boolean;
  error: string;
}

export const initialState: ProjectState = {
  entities: {},
  selectedProject: {},
  loaded: false,
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: fromProjects.ProjectsAction
): ProjectState {
  switch (action.type) {
    case fromProjects.LOAD_PROJECTS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProjects.LOAD_PROJECTS_SUCCESS: {
      const projects = action.payload.result;
      console.log('projects entities', projects)

      const entities = projects.reduce(
        (entities: { [id: string]: Project }, project: Project) => {
          return {
            ...entities,
            [project.id]: project
          };
        },
        {
          ...state.entities
        }
      );

      console.log('entities', entities)

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromProjects.LOAD_PROJECTS_FAIL: {
      const error = action.payload;
      const newState = {
        ...state,
        loading: false,
        loaded: false,
        error: error
      };
      return newState
    }

    case fromProjects.LOAD_PROJECT_BUILDINGS: {
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          buildings: {
            ...state.selectedProject.buildings,
            loading: true,
            loaded: false,
            error: null
          }
        }
      };
    }

    case fromProjects.LOAD_PROJECT_BUILDINGS_SUCCESS: {
      const project = action.payload.result;
      const projectBuildings = project.buildings;
      const entities = projectBuildings.reduce(
        (entities: { [id: string]: Building }, building: Building) => {
          return {
            ...entities,
            [building.id]: building
          };
        },
        {
          ...state.selectedProject.buildings
        }
      );

      const newState = {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          buildings: {
            entities,
            error: null,
            loading: false,
            loaded: true
          }
        }
      }

      return newState;
    }

    case fromProjects.LOAD_PROJECT_BUILDINGS_FAIL: {
      const error = action.payload;
      const newState = {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          buildings: {
            entities : {},
            loading: false,
            loaded: true,
            error: error
          }
        }
      };
      return newState
    }

    case fromProjects.LOAD_PROJECT_EMPLOYEES: {
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          employees: {
            ...state.selectedProject.employees,
            loading: true,
            loaded: false,
            error: null
          }
        }
      };
    }

    case fromProjects.LOAD_PROJECT_EMPLOYEES_SUCCESS: {
      const project = action.payload.result;
      const projectEmployees = project.employees;
      const entities = projectEmployees.reduce(
        (entities: { [id: string]: User }, employee: User) => {
          return {
            ...entities,
            [employee.id]: employee
          };
        },
        {
          ...state.selectedProject.employees
        }
      );

      const newState = {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          employees: {
            entities,
            error: null,
            loading: false,
            loaded: true
          }
        }
      }
      console.log('newState', newState)
      return newState;
    }

    case fromProjects.LOAD_PROJECT_EMPLOYEES_FAIL: {
      const error = action.payload;
      const newState = {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          employees: {
            entities : {},
            loading: false,
            loaded: true,
            error: error
          }
        }
      };
      return newState
    }

    case fromProjects.LOAD_PROJECT_REPORTS: {
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reports: {
            ...state.selectedProject.reports,
            loading: true,
            loaded: false,
            error: null
          }
        }
      };
    }

    case fromProjects.LOAD_PROJECT_REPORTS_SUCCESS: {
      const project = action.payload.result;
      const projectReports = project.reports;
      const entities = projectReports.reduce(
        (entities: { [id: string]: any }, report: any) => {
          return {
            ...entities,
            [report.id]: report
          };
        },
        {
          ...state.selectedProject.reports
        }
      );

      const newState = {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reports: {
            entities,
            error: null,
            loading: false,
            loaded: true
          }
        }
      }
      console.log('newState', newState)
      return newState;
    }

    case fromProjects.LOAD_PROJECT_REPORTS_FAIL: {
      const error = action.payload;
      const newState = {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reports: {
            entities : {},
            loading: false,
            loaded: true,
            error: error
          }
        }
      };
      return newState
    }

    case fromProjects.LOAD_REPORT_DATA: {
      const {id} = action.payload;
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reportProjections:{
            ... state.selectedProject.reportProjections,
            [id] : {
              loading: true,
              loaded: false
            }
          }
        }
      };
    }

    case fromProjects.LOAD_REPORT_DATA_SUCCESS: {
      const {result} = action.payload;
      const {id, projections, buildings, employees} = result;
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          reportEmployees:{
            ... state.selectedProject.reportEmployees,
            [id] : employees
          },
          reportBuildings:{
            ... state.selectedProject.reportBuildings,
            [id] : buildings
          },
          reportProjections:{
            ... state.selectedProject.reportProjections,
            [id] : {
              loading: false,
              loaded: true,
              projections
            }
          }
        }
      };
    }

    case fromProjects.LOAD_SELECTED_PROJECT: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProjects.LOAD_SELECTED_PROJECT_SUCCESS: {
      const project = action.payload.result;
      const newState = {
        ...state,
        loading: false,
        loaded: true,
        selectedProject: {
          ...project
        }
      }
      return newState;
    }

    case fromProjects.LOAD_SELECTED_PROJECT_FAIL: {
      const error = action.payload;
      const newState = {
        ...state,
        loading: false,
        loaded: false,
        error: error
      };
      return newState
    }

    case fromProjects.UPDATE_PROJECT_SUCCESS:
    case fromProjects.CREATE_PROJECT_SUCCESS: {
      const project = action.payload.result;
      const entities = {
        ...state.entities,
        [project.id]: project
      };
      return {
        ...state,
        entities
      };
    }

    case fromProjects.REMOVE_PROJECT_SUCCESS: {
      const project = action.payload;
      const { [project.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getProjectsEntities = (state: ProjectState) => state.entities;
export const getProjectsLoading = (state: ProjectState) => state.loading;
export const getProjectsLoaded = (state: ProjectState) => state.loaded;
export const getProjectsLoadedError = (state: ProjectState) => state.error;

export const getSelectedProjectEntities = (state: ProjectState) => state.selectedProject;
export const getSelectedProjectLoading = (state: ProjectState) => state.loading;
export const getSelectedProjectLoaded = (state: ProjectState) => state.loaded;
export const getSelectedProjectLoadedError = (state: ProjectState) => state.error;

export const getProjectBuildingsEntities = (state: ProjectState) => state.selectedProject.buildings.entities;
export const getProjectBuildingsLoading = (state: ProjectState) => state.selectedProject.buildings.loading;
export const getProjectBuildingsLoaded = (state: ProjectState) => state.selectedProject.buildings.loaded;
export const getProjectBuildingsLoadedError = (state: ProjectState) => state.selectedProject.buildings.error;

export const getProjectEmployeesEntities = (state: ProjectState) => state.selectedProject.employees.entities;
export const getProjectEmployeesLoading = (state: ProjectState) => state.selectedProject.employees.loading;
export const getProjectEmployeesLoaded = (state: ProjectState) => state.selectedProject.employees.loaded;
export const getProjectEmployeesLoadedError = (state: ProjectState) => state.selectedProject.employees.error;

export const getProjectReportsEntities = (state: ProjectState) => state.selectedProject.reports.entities;
export const getProjectReportsLoading = (state: ProjectState) => state.selectedProject.reports.loading;
export const getProjectReportsLoaded = (state: ProjectState) => state.selectedProject.reports.loaded;
export const getProjectReportsLoadedError = (state: ProjectState) => state.selectedProject.reports.error;

export const getReportProjections = (state: ProjectState) => state.selectedProject.reportProjections;
export const getReportBuildings = (state: ProjectState) => state.selectedProject.reportBuildings;
export const getReportEmployees = (state: ProjectState) => state.selectedProject.reportEmployees;



