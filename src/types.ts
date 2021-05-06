export type ContractStatus =
  | "Endpoint"
  | "Upload"
  | "Settings"
  | "Deployed"
  | "Deploying"
  | "Error";

export interface UIMessage {
  text: string;
  isError: boolean;
}

export interface UIContract {
  name: string;
  address: string;
  methods?: Array<string>;
}
