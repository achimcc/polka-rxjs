import { UploadChangeParam } from "antd/lib/upload";
import { useDispatch } from "react-redux";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { actions } from "../reducers/contractSlice";

const UploadAbi = () => {
  const dispatch = useDispatch();
  const onUpload = (file: UploadChangeParam): void => {
    dispatch(actions.uploadContract(file));
  };

  return (
    <>
      <Upload onChange={onUpload}>
        <Button icon={<UploadOutlined />}>Upload Contract</Button>
      </Upload>
    </>
  );
};

export default UploadAbi;
