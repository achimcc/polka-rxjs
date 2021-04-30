import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { ApiRx, Keyring } from "@polkadot/api";
import { CodeRx, Abi, BlueprintRx } from "@polkadot/api-contract";
import type { AnyJson } from "@polkadot/types/types";
import { RawParams } from "./utils/types";
import { createValue, computeValues } from "./utils/values";

export const deploy = (action$: ActionsObservable<Action>, state$: any) =>
  action$.ofType("Deploy").pipe(
    mergeMap((action) => {
      const api = (state$ as any).value.contract.api as ApiRx;
      const abi = (state$ as any).value.contract.abi as Abi;
      const wasm = abi.project.source.wasm;
      const { gas, endowment } = action.payload as any;
      const code = new CodeRx(api, abi, wasm);
      const blueprint = code.tx.new(
        { gasLimit: undefined, value: undefined, salt: null },
        []
      );
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      return blueprint.signAndSend(alice);
    }),
    map((response) => {
      console.log("DeployMessage: ", JSON.stringify(response));
      return { type: "DeployMessage", payload: response };
    })
  );

/*
const params = abi.constructors[0].args;
const registry = api.registry;
const values = computeValues(params, registry);
const contract = code.createContract(0, { gasLimit: 0, value: 0 }, []);
*/
