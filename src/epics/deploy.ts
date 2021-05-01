import { ActionsObservable } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap } from "rxjs/operators";
import { ApiRx, Keyring } from "@polkadot/api";
import { CodeRx, Abi, BlueprintRx } from "@polkadot/api-contract";
import type { AnyJson } from "@polkadot/types/types";
import { RawParams } from "./utils/types";
import { createValue, computeValues } from "./utils/values";

export const deploy = (action$: ActionsObservable<Action>, store: any) =>
  action$.ofType("Deploy").pipe(
    map((action) => {
      const api = (store as any).value.contract.api as ApiRx;
      const abi = (store as any).value.contract.abi as Abi;
      const wasm = abi.project.source.wasm;
      const { gas, endowment } = store.value.contract;
      const testgas = 155852802980;
      const testendow = 1300889614901161;
      const code = new CodeRx(api, abi, wasm);
      const blueprint = code.tx.new(
        { gasLimit: testgas, value: testendow, salt: null },
        []
      );
      return blueprint;
    }),
    mergeMap((blueprint) => {
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      console.log("alice: ", alice);
      return blueprint.signAndSend(alice, { tip: 0 });
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
