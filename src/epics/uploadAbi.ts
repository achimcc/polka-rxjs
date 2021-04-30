import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { UploadChangeParam } from "antd/lib/upload";
import { ApiRx, Keyring } from "@polkadot/api";
import { CodeRx, Abi, BlueprintRx } from "@polkadot/api-contract";
import { from } from "rxjs";

export const uploadAbi = (action$: ActionsObservable<Action>, state$: any) =>
  action$.ofType("UploadAbi").pipe(
    mergeMap((action) => {
      const promise = ((action as any)
        .payload as UploadChangeParam).file.originFileObj.text();
      return from(promise);
    }),
    map((arrayBuffer) => JSON.parse(JSON.stringify(arrayBuffer))),
    map((abiJson) => {
      const api = (state$ as any).value.contract.api as ApiRx;
      const abi = new Abi(abiJson, api.registry.getChainProperties());
      console.log("abi: ", abi);
      return { type: "UploadAbiSuccess", payload: abi };
    })
  );
