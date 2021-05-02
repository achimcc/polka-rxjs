import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { Observable, from } from "rxjs";

const uploadContract = (
  action$: ActionsObservable<Action>,
  store: any
): Observable<Action> =>
  action$.ofType("UploadContract").pipe(
    mergeMap((action) => {
      const promise = (action.payload as File).text();
      return from(promise);
    }),
    map((arrayBuffer) => JSON.parse(JSON.stringify(arrayBuffer))),
    map((abiJson) => {
      const api = (store as any).value.contract.api as ApiRx;
      const abi = new Abi(abiJson, api.registry.getChainProperties());
      console.log("abi: ", abi);
      return { type: "UploadContractSuccess", payload: abi };
    })
  );

export default uploadContract;
