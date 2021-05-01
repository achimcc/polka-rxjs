import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { UploadChangeParam } from "antd/lib/upload";
import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { from } from "rxjs";

export const uploadContract = (
  action$: ActionsObservable<Action>,
  store: any
) =>
  action$.ofType("UploadContract").pipe(
    mergeMap((action) => {
      console.log("step1");
      const promise = ((action as any)
        .payload as UploadChangeParam).file.originFileObj.text();
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
