import { useSelector } from "../store/store";
import Message from "./Message";

const CallResults = () => {
  const { callResults } = useSelector((store) => store.ui);
  return (
    <>
      {callResults.map((message) => (
        <Message message={message} />
      ))}
    </>
  );
};

export default CallResults;
