import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface props {
  type: "Gas" | "Endowment";
}

const InputValue = ({ type }: props) => {
  const dispatch = useDispatch();
  const { [type]: current } = useSelector((store: RootState) => store.contract);
  const onChange = (e: any) =>
    dispatch({ type: `set${type}`, payload: e.target.value });
  return (
    <>
      <input onChange={onChange} value={current} placeholder={type} />
    </>
  );
};

export default InputValue;
