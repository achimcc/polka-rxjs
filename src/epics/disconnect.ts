import { Epic } from "redux-observable";
import { map, mergeMap, filter } from "rxjs/operators";
import { Observable, from } from "rxjs";
import { ApiRx } from "@polkadot/api";
import { RootState } from "../store/rootReducer";
import { Action, isType } from "../reducers/actions";

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.pipe(
    filter(isType("Disconnect")),
    map(() => {
      const api = store.value.contract.api as ApiRx;
      return api;
    }),
    mergeMap((api) => {
      const promise = api.disconnect();
      return from(promise);
    }),
    map((result) => {
      return {
        type: "Disconnected",
      };
    })
  );

export default deploy;
