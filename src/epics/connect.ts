import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, filter, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, WsProvider } from "@polkadot/api";
import { RootState } from "../reducers/rootReducer";

const connect: Epic<Action, Action, RootState> = (
  action$
): Observable<Action> =>
  action$.ofType("Connect").pipe(
    switchMap(() => {
      const provider = new WsProvider("ws://127.0.0.1:9944");
      return ApiRx.create({ provider, types: {} });
    }),
    filter((api) => api.isConnected),
    map((api) => {
      return { type: "Connected", payload: api };
    })
  );

export default connect;
