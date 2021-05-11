import { Epic } from "redux-observable";
import { map, mergeMap, takeUntil, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import BN from "bn.js";
import { ApiRx, Keyring } from "@polkadot/api";
import { Abi, ContractRx } from "@polkadot/api-contract";
import { ContractCallOutcome } from "@polkadot/api-contract/types";
import { RootState } from "../store/rootReducer";
import { Action, isType } from "../reducers/actions";
import { Instance, UIContract } from "../types";

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.pipe(
    filter(isType("CallRpc")),
    mergeMap((action) => {
      const { address, method } = action.payload;
      const api = store.value.contract.api as ApiRx;
      const { id } = store.value.ui.instances.find(
        (i) => i.address === address
      ) as Instance;
      const { json } = store.value.ui.contracts.find(
        (c) => c.id === id
      ) as UIContract;
      const abi = new Abi(json, api.registry.getChainProperties());
      const contract = new ContractRx(api, abi, address as string);
      const gas = new BN("800000000");
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      const adds = alice.address;
      const call = contract.query[method](adds, { gasLimit: gas });
      return call;
    }),
    takeUntil(action$.ofType("CancelCall")),
    map((response) => (response as unknown) as ContractCallOutcome),
    map((response) => {
      const message = {
        text: `RPC Call output: ${response.output}`,
        isError: false,
      };
      return {
        type: "CallResult",
        payload: message,
      };
    })
  );

export default deploy;
