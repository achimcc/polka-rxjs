import { UploadChangeParam } from 'antd/lib/upload';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputFile from './InputFile';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Deploy = () => {
	const dispatch = useDispatch();
	const [gas, setGas] = useState<number>(0);
	const [endowment, setEndowment] = useState<number>(0);
	const onChangeGas = (e: any) => setGas(e.target.value);
	const onChangeEndowment = (e: any) => setEndowment(e.target.value);
	const onDeploy = () =>
		dispatch({ type: 'Deploy', payload: { gas: gas, endowment: endowment } });
	const onUploadWasm = (file: UploadChangeParam): void => {
		dispatch({ type: 'UploadWasm', payload: file });
	};
	const onUploadAbi = (file: UploadChangeParam): void => {
		dispatch({ type: 'UploadAbi', payload: file });
	};
	const { isAbiUploaded, isApiConnected, isWasmUploaded } = useSelector(
		(store: RootState) => store.ui
	);
	const isReadyToDeploy = isAbiUploaded && isWasmUploaded;
	return (
		<>
			<InputFile action={onUploadWasm} label={'Upload Wasm'} />
			<InputFile action={onUploadAbi} label={'Upload Abi'} />
			<input onChange={onChangeGas} value={gas} />
			<input onChange={onChangeEndowment} value={endowment} />
			<Button disabled={!isReadyToDeploy} onClick={onDeploy}>
				Deploy
			</Button>
			{isAbiUploaded && 'check1'} {isApiConnected && 'check2'}{' '}
			{isWasmUploaded && 'check3'}
		</>
	);
};

export default Deploy;
