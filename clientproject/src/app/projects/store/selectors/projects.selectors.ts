import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../store";
import * as fromFeature from "../reducers";
import * as fromProjects from "../reducers/projects.reducer";

import { Project } from "../../models/project.model";

export const getProjectState = createSelector(
  fromFeature.getProjectsState,
  (state: fromFeature.ProjectsState) => state.projects
);

export const getProjectsEntities = createSelector(
  getProjectState,
  fromProjects.getProjectsEntities
);

export const getAllProjects = createSelector(getProjectsEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getProjectsLoaded = createSelector(
  getProjectState,
  fromProjects.getProjectsLoaded
);
export const getProjectsLoading = createSelector(
  getProjectState,
  fromProjects.getProjectsLoading
);

export const getProjectsLoadedError = createSelector(
  getProjectState,
  fromProjects.getProjectsLoadedError
);


export const getSelectedProject = createSelector(
  getProjectState,
  fromProjects.getSelectedProjectEntities
);


export const getSelectedProjectLoaded = createSelector(
  getProjectState,
  fromProjects.getSelectedProjectLoaded
);
export const getSelectedProjectLoading = createSelector(
  getProjectState,
  fromProjects.getSelectedProjectLoading
);

export const getSelectedProjectLoadedError = createSelector(
  getProjectState,
  fromProjects.getSelectedProjectLoadedError
);


// project buildings
export const getProjectBuildings = createSelector(
  getProjectState,
  fromProjects.getProjectBuildingsEntities
);

export const getProjectBuildingsLoaded = createSelector(
  getProjectState,
  fromProjects.getProjectBuildingsLoaded
);

export const getProjectBuildingsLoading = createSelector(
  getProjectState,
  fromProjects.getProjectBuildingsLoading
);

export const getProjectBuildingsLoadedError = createSelector(
  getProjectState,
  fromProjects.getProjectBuildingsLoadedError
);


// project employees
export const getProjectEmployees = createSelector(
  getProjectState,
  fromProjects.getProjectEmployeesEntities
);

export const getProjectEmployeesLoaded = createSelector(
  getProjectState,
  fromProjects.getProjectEmployeesLoaded
);

export const getProjectEmployeesLoading = createSelector(
  getProjectState,
  fromProjects.getProjectEmployeesLoading
);

export const getProjectEmployeesLoadedError = createSelector(
  getProjectState,
  fromProjects.getProjectEmployeesLoadedError
);

// project reports
export const getProjectReports = createSelector(
  getProjectState,
  fromProjects.getProjectReportsEntities
);

export const getProjectReportsLoaded = createSelector(
  getProjectState,
  fromProjects.getProjectReportsLoaded
);

export const getProjectReportsLoading = createSelector(
  getProjectState,
  fromProjects.getProjectReportsLoading
);

export const getProjectReportsLoadedError = createSelector(
  getProjectState,
  fromProjects.getProjectReportsLoadedError
);

export const getReportProjections = createSelector(
  getProjectState,
  fromProjects.getReportProjections
);


export const getReportBuildings = createSelector(
  getProjectState,
  fromProjects.getReportBuildings
);

export const getReportEmployees = createSelector(
  getProjectState,
  fromProjects.getReportEmployees
);
