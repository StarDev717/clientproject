import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';

export interface ProjectsState {
  projects: any;
}

export const reducers: ActionReducerMap<ProjectsState> = {
  projects: fromProjects.reducer
};

export const getProjectsState = createFeatureSelector<ProjectsState>(
  'projects'
);
