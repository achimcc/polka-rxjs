import { Epic } from "redux-observable";
import { Action, isType } from "../reducers/actions";
import { map, mergeMap, takeUntil, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { Abi, ContractRx } from "@polkadot/api-contract";
import { RootState } from "../store/rootReducer";
import { obtainMessage } from "../utils/convertResults";
import BN from "bn.js";
import { Instance, UIContract } from "../types";

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.pipe(
    filter(isType("Call")),
    map((action) => {
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
      const call = contract.tx[method]({ gasLimit: gas });
      return call;
    }),
    mergeMap((call) => {
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      const observable = call.signAndSend(alice);
      return observable;
    }),
    takeUntil(action$.ofType("CancelCall")),
    map((response) => {
      const message = obtainMessage(response);
      return {
        type: "CallResult",
        payload: { message },
      };
    })
  );

export default deploy;
