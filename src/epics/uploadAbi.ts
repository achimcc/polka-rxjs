import { ActionsObservable } from 'redux-observable';
import { Action } from '../reducers/actions';
import { map, mergeMap } from 'rxjs/operators';
import { UploadChangeParam } from 'antd/lib/upload';
import { from } from 'rxjs';

export const uploadAbi = (action$: ActionsObservable<Action>, state$: any) =>
	action$.ofType('UploadAbi').pipe(
		mergeMap(action => {
			const promise = ((action as any)
				.payload as UploadChangeParam).file.originFileObj.text();
			return from(promise);
		}),
		map(arrayBuffer => JSON.parse(JSON.stringify(arrayBuffer))),
		map(wasm => ({ type: 'UploadAbiSuccess', payload: wasm }))
	);
