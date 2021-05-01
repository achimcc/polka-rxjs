import { UploadChangeParam } from "antd/lib/upload";
import { useDispatch } from "react-redux";
import InputFile from "./InputFile";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as React from "react";

const UploadAbi = () => {
  const dispatch = useDispatch();
  const onUpload = (file: UploadChangeParam): void => {
    dispatch({ type: "UploadContract", payload: file });
  };
  const { isAbiUploaded, isApiConnected, isWasmUploaded } = useSelector(
    (store: RootState) => store.ui
  );
  const isReadyToDeploy = isAbiUploaded && isWasmUploaded;
  return (
    <>
      <Upload onChange={onUpload}>
        <Button icon={<UploadOutlined />}>Upload Contract</Button>
      </Upload>
      <InputFile action={onUpload} label={"Upload Contract"} />
    </>
  );
};

export default UploadAbi;
