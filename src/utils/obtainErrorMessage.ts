import { ISubmittableResult } from "@polkadot/types/types";
import { UIMessage, ContractStatus } from "../types";

export const obtainErrorMessage = ({
  dispatchError,
}: ISubmittableResult): string => {
  if (!dispatchError) return "no Error";

  if (dispatchError.isModule) {
    try {
      const mod = dispatchError.asModule;
      const error = dispatchError.registry.findMetaError(mod);

      return `${error.section}.${error.name}`;
    } catch (error) {
      // swallow
    }
  } else if (dispatchError.isToken) {
    return `${dispatchError.type}.${dispatchError.asToken.type}`;
  }
  return "unknown error";
};

export const obtainMessage = (result: ISubmittableResult): UIMessage => {
  const { status, dispatchError } = result;
  const text = dispatchError ? obtainErrorMessage(result) : status.type;
  const isError = !!dispatchError;

  return {
    text,
    isError,
  };
};

export const obtainStatus = (result: ISubmittableResult): ContractStatus => {
  if (result.dispatchError) return "Error";
  else if (result.isFinalized) return "Deployed";
  else return "Deploying";
};
