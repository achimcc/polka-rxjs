import { UploadChangeParam } from "antd/lib/upload";
import { useDispatch } from "react-redux";
import InputFile from "./InputFile";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UploadWasm = () => {
  const dispatch = useDispatch();
  const onUploadWasm = (file: UploadChangeParam): void => {
    dispatch({ type: "UploadWasm", payload: file });
  };
  const { isAbiUploaded, isApiConnected, isWasmUploaded } = useSelector(
    (store: RootState) => store.ui
  );
  return (
    <>
      <InputFile action={onUploadWasm} label={"Upload Wasm"} />
    </>
  );
};

export default UploadWasm;
