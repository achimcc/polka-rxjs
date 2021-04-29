import { UploadChangeParam } from "antd/lib/upload";
import { useDispatch } from "react-redux";
import InputFile from "./InputFile";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UploadAbi = () => {
  const dispatch = useDispatch();
  const onUploadAbi = (file: UploadChangeParam): void => {
    dispatch({ type: "UploadAbi", payload: file });
  };
  const { isAbiUploaded, isApiConnected, isWasmUploaded } = useSelector(
    (store: RootState) => store.ui
  );
  const isReadyToDeploy = isAbiUploaded && isWasmUploaded;
  return (
    <>
      <InputFile action={onUploadAbi} label={"Upload Abi"} />
    </>
  );
};

export default UploadAbi;
