import { Epic } from "redux-observable";
import { map, mergeMap, takeUntil, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { CodeRx } from "@polkadot/api-contract";
import BN from "bn.js";
import { RootState } from "../store/rootReducer";
import { Action, isType } from "../reducers/actions";
import { obtainStatus } from "../utils/convertResults";
import { UIContract } from "../types";

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.pipe(
    filter(isType("Instantiate")),
    map((action) => {
      const api = store.value.contract.api as ApiRx;
      const { gas, endowment, id } = action.payload;
      const contract = store.value.ui.contracts.find(
        (c) => c.id === id
      ) as UIContract;
      const { wasm, json } = contract;
      const abi = new Abi(json, api.registry.getChainProperties());
      const Gas = new BN(gas);
      const Endowment = new BN(endowment);
      const fromCode = new CodeRx(api, abi, wasm).tx.new(Endowment, Gas, 0);
      return fromCode;
    }),
    mergeMap((instance) => {
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      return instance.signAndSend(alice);
    }),
    // takeWhile((response) => !response.dispatchError),
    takeUntil(action$.ofType("CancelDeploy")),
    map((result) => {
      const status = obtainStatus(result);
      return {
        type: "DeployMessage",
        payload: { result, status },
      };
    })
  );

export default deploy;
