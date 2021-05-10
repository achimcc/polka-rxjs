import { useDispatch } from "../store/store";

const UploadFile = () => {
  const dispatch = useDispatch();
  const handleChange = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files && files[0];
    file && dispatch({ type: "UploadContract", payload: file });
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
    </>
  );
};

export default UploadFile;
