import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, filter, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, WsProvider } from "@polkadot/api";
import { RootState } from "../reducers/rootReducer";

const connect: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.ofType("Connect").pipe(
    switchMap(() => {
      const url = store.value.ui.Address;
      const provider = new WsProvider(url);
      return ApiRx.create({ provider, types: {} });
    }),
    filter((api) => api.isConnected),
    map((api) => {
      return { type: "Connected", payload: api };
    })
  );

export default connect;
