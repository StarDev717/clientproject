import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { timer } from 'rxjs/observable/timer';
import { mergeMap, finalize } from 'rxjs/operators';
import * as projectActions from '../../projects/store/actions/projects.action';
import {of} from 'rxjs/observable/of';
import {LoadProjectsFail} from '../../projects/store/actions';
import { Store } from "@ngrx/store";
import * as fromStore from "src/app/projects/store";

export const genericRetryStrategy = ({
                                       maxRetryAttempts = 3,
                                       scalingDuration = 1000,
                                       excludedStatusCodes = [401],
                                       dispatch = null
}: any = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      console.log("checking", dispatch)
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return _throw(error);
      }
      return of(retryAttempt);
      // return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  )
  .map((data) => {
    const message = `Attempt ${data} failed: retrying`
    return dispatch(message)
  });
};

