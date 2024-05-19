export type ILogin = {
  status: Number | string;
  isLoading: boolean;
};

export interface IRegistration {
  status: Number | string;
  isLoading: boolean;
  error: string;
}
