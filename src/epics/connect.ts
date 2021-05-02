import { ActionsObservable } from "redux-observable";
import { ContractAction } from "../reducers/actions";
import { map, filter, mergeMap } from "rxjs/operators";
import { ApiRx, WsProvider } from "@polkadot/api";

const connect = (action$: ActionsObservable<ContractAction>) =>
  action$.ofType("Connect").pipe(
    mergeMap(() => {
      const provider = new WsProvider("ws://127.0.0.1:9944");
      return ApiRx.create({ provider, types: {} });
    }),
    filter((api) => api.isConnected),
    map((api) => {
      return { type: "Deploy" };
    })
  );

export default connect;
