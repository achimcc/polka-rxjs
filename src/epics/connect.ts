import { Epic } from "redux-observable";
import { Action, isType } from "../reducers/actions";
import { map, filter, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, WsProvider } from "@polkadot/api";
import { RootState } from "../reducers/rootReducer";

const connect: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.pipe(
    filter(isType("Connect")),
    switchMap(() => {
      const url = store.value.ui.instantiate.Address;
      const provider = new WsProvider(url);
      return ApiRx.create({ provider, types: {} });
    }),
    filter((api) => api.isConnected),
    map((api) => {
      return { type: "Connected", payload: api };
    })
  );

export default connect;
