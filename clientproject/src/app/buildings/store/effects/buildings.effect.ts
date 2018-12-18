import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError } from "rxjs/operators";

import * as fromRoot from "../../../store";
import * as buildingActions from "../actions/buildings.action";
import * as fromServices from "../../services";
import {LoadBuildingProjectionsSuccess} from '../actions/buildings.action';
import {Result} from '../../../shared/models/result.model';

@Injectable()
export class BuildingsEffects {
  constructor(
    private actions$: Actions,
    private buildingService: fromServices.BuildingsService
  ) {}

  @Effect()
  loadBuildings$ = this.actions$.ofType(buildingActions.LOAD_BUILDINGS).pipe(
    switchMap(() => {
      return this.buildingService
        .getBuildings()
        .pipe(
          map(buildings => new buildingActions.LoadBuildingsSuccess(buildings)),
          catchError(error => of(new buildingActions.LoadBuildingsFail(error)))
        );
    })
  );

  @Effect()
  loadBuildingProjections$ = this.actions$.ofType(buildingActions.LOAD_BUILDING_PROJECTIONS).pipe(
    map((action: buildingActions.LoadBuildingProjections) => action.payload),
    mergeMap(building => {
      return this.buildingService
        .getBuildingProjections(building)
        .pipe(
          map(projectionData => new buildingActions.LoadBuildingProjectionsSuccess(projectionData)),
          catchError(error => of(new buildingActions.LoadBuildingsFail(error)))
        );
    })
  );

  @Effect()
  createBuilding$ = this.actions$.ofType(buildingActions.CREATE_BUILDING).pipe(
    map((action: buildingActions.CreateBuilding) => action.payload),
    switchMap(building => {
      return this.buildingService
        .createBuilding(building)
        .pipe(
          map(result => new buildingActions.CreateBuildingSuccess(result)),
          catchError(error => of(new buildingActions.CreateBuildingFail(error)))
        );
    })
  );

  @Effect()
  createBuildingSuccess$ = this.actions$
    .ofType(buildingActions.CREATE_BUILDING_SUCCESS)
    .pipe(
      map((action: buildingActions.CreateBuildingSuccess) => action.payload),
      map(building => {
        return new fromRoot.Go({
          path: ["/buildings"]
        });
      })
    );

  @Effect()
  updateBuilding$ = this.actions$.ofType(buildingActions.UPDATE_BUILDING).pipe(
    map((action: buildingActions.UpdateBuilding) => action.payload),
    switchMap(building => {
      return this.buildingService
        .updateBuilding(building)
        .pipe(
          map(building => new buildingActions.UpdateBuildingSuccess(building)),
          catchError(error => of(new buildingActions.UpdateBuildingFail(error)))
        );
    })
  );

  @Effect()
  removeBuilding$ = this.actions$.ofType(buildingActions.REMOVE_BUILDING).pipe(
    map((action: buildingActions.RemoveBuilding) => action.payload),
    switchMap(building => {
      return this.buildingService
        .removeBuilding(building)
        .pipe(
          map(() => new buildingActions.RemoveBuildingSuccess(building)),
          catchError(error => of(new buildingActions.RemoveBuildingFail(error)))
        );
    })
  );

  @Effect()
  handleBuildingSuccess$ = this.actions$
    .ofType(buildingActions.UPDATE_BUILDING_SUCCESS)
    .pipe(
      map(building => {
        return new fromRoot.Go({
          path: ["/buildings"]
        });
      })
    );
}
