import { ActionsObservable } from 'redux-observable';
import { Action } from '../reducers/actions';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { ApiRx, Keyring, ApiPromise, WsProvider } from '@polkadot/api';
import {
	CodeRx,
	CodePromise,
	ContractRx,
	BlueprintRx,
} from '@polkadot/api-contract';
import type { AnyJson, ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

export const deploy = (action$: ActionsObservable<Action>, state$: any) =>
	action$.ofType('Deploy').pipe(
		mergeMap(async action => {
			const abi = (state$ as any).value.contract.abi as AnyJson;
			const wasm = (state$ as any).value.contract.wasm as Uint8Array;
			const provider = new WsProvider('ws://127.0.0.1:9944');
			console.log('instantiate api!');
			const api = await ApiPromise.create({ provider });
			console.log('api is ready: ', api);
			const contract = api.tx.contracts.instantiateWithCode(
				(action.payload as any).endowment,
				(action.payload as any).gas,
				wasm,
				JSON.stringify(abi),
				''
			);
			const keyring = new Keyring({ type: 'sr25519' });
			const alice = keyring.addFromUri('//Alice');
			return contract.signAndSend(alice);
		}),
		map(tx => {
			console.log('nextStep: ', tx);
			return { type: 'Any', payload: {} };
		})
	);

/*
const api = (state$ as any).value.contract.api as ApiRx;
const code = new CodeRx(api, abi, wasm);
const blueprintRx = new BlueprintRx(api, abi, (abi as any).source.hash);
const blueprint = code.tx.createBlueprint({});	
const result = blueprint.signAndSend();
const test = blueprint.tx.new(0,0,0).signAndSend(alice)
mergeMap(submittable => {
			const keyring = new Keyring({ type: 'sr25519' });
			const alice = keyring.addFromUri('//Alice');
			return submittable;
		}),
		filter(res => res.isCompleted),
		*/
