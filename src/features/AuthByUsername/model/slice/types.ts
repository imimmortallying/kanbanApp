export type ILogin = {
  status: number | string;
  isLoading: boolean;
};

export interface IRegistration {
  status: number | string;
  isLoading: boolean;
  error: string;
}
