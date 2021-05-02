import { ChangeEventHandler } from "react";
import { useDispatch } from "../reducers/actions";
import { useSelector } from "../store/store";

interface props {
  type: "Gas" | "Endowment";
}

const InputValue = ({ type }: props) => {
  const dispatch = useDispatch();
  const { [type]: current } = useSelector((store) => store.contract);
  const onChange = (e: any) => {
    const payload = e.target.value;
    dispatch({ type, payload });
  };

  return (
    <>
      <input onChange={onChange} value={current} placeholder={type} />
    </>
  );
};

export default InputValue;
