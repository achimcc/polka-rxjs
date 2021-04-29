import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, switchMap, mapTo, filter, mergeMap } from "rxjs/operators";
import { from, of } from "rxjs";
import { ApiRx, WsProvider } from "@polkadot/api";

export const connect = (action$: ActionsObservable<Action>) =>
  action$.ofType("Connect").pipe(
    mergeMap(() => {
      const provider = new WsProvider("ws://127.0.0.1:9944");
      return ApiRx.create({ provider, types: {} });
    }),
    filter((api) => api.isConnected),
    map((api) => {
      return { type: "Connected", payload: api };
    })
  );

/*
mergeMap(async api => {
			console.log('connect? ', api);
			await api.connect();
			return api;
		}),
		mergeMap(async api => {
			await api.isReady;
			return api;
		}),
*/
