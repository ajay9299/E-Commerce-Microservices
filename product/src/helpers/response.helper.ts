/** ControllerResponse is used to define the return type of all controller's methods. */
export interface ControllerResponse {
  success: boolean;
  status: number;
  data?: object | null;
  errors?: string;
}
