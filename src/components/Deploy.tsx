import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UploadAbi from "./UploadContract";

const Deploy = () => {
  const dispatch = useDispatch();
  const [gas, setGas] = useState<number>(0);
  const [endowment, setEndowment] = useState<number>(0);
  const onChangeGas = (e: any) => setGas(e.target.value);
  const onChangeEndowment = (e: any) => setEndowment(e.target.value);
  const onDeploy = () =>
    dispatch({ type: "Deploy", payload: { gas, endowment } });
  const { isAbiUploaded, isApiConnected, isWasmUploaded } = useSelector(
    (store: RootState) => store.ui
  );
  const isReadyToDeploy = isApiConnected && isAbiUploaded;
  return (
    <>
      <UploadAbi />
      <input onChange={onChangeGas} value={gas} />
      <input onChange={onChangeEndowment} value={endowment} />
      <Button disabled={!isReadyToDeploy} onClick={onDeploy}>
        Deploy
      </Button>
    </>
  );
};

export default Deploy;
