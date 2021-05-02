import { ActionsObservable } from "redux-observable";
import { ContractAction } from "../reducers/actions";
import { map, mergeMap, filter } from "rxjs/operators";
import { UploadChangeParam } from "antd/lib/upload";
import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { from } from "rxjs";

const uploadContract = (
  action$: ActionsObservable<ContractAction>,
  store: any
) =>
  action$.ofType("UploadContract").pipe(
    mergeMap((action) => {
      action.payload;
      const promise = (action.payload as UploadChangeParam).file.originFileObj.text();
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
