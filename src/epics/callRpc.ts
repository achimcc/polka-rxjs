import { Epic } from "redux-observable";
import { Action } from "../reducers/actions";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiRx, Keyring } from "@polkadot/api";
import { Abi, ContractRx } from "@polkadot/api-contract";
import { RootState } from "../reducers/rootReducer";
import BN from "bn.js";
import { ContractCallOutcome } from "@polkadot/api-contract/types";

const deploy: Epic<Action, Action, RootState> = (
  action$,
  store
): Observable<Action> =>
  action$.ofType("CallRpc").pipe(
    mergeMap((action) => {
      console.log("called!");
      const { address, method } = action.payload as any;
      const api = store.value.contract.api as ApiRx;
      const abi = store.value.contract.abi as Abi;
      const contract = new ContractRx(api, abi, address);
      const gas = new BN("800000000");
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      const adds = alice.address;
      const call = contract.query[method](adds, { gasLimit: gas });
      console.log("tx: ", contract.tx, call);
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
