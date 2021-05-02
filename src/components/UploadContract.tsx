import { UploadChangeParam } from "antd/lib/upload";
import { useDispatch } from "../reducers/actions";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadAbi = () => {
  const dispatch = useDispatch();
  const onUpload = (file: UploadChangeParam): void => {
    //   dispatch({ type: "UploadContract", payload: file });
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
