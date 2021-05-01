import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, filter, mergeMap } from "rxjs/operators";
import { ApiRx, WsProvider } from "@polkadot/api";
import { actions } from "../reducers/contractSlice";

export const connectEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter(actions.connect.match),
    mergeMap(() => {
      const provider = new WsProvider("ws://127.0.0.1:9944");
      return ApiRx.create({ provider, types: {} });
    }),
    filter((api) => api.isConnected),
    map((api) => {
      return actions.connected(api);
    })
  );
