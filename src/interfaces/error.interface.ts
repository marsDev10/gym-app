export interface IError {
    message?: string;
    route?: string;
    status: number;
    customMessage?: string;
    error: unknown;
  }
  export class GymAppError extends Error {
    status: number;
    source: string;
    message: string;
  
    constructor(errorValues: { status: number; name: string; message: string }) {
      super(errorValues.message);
      this.status = errorValues.status;
      this.source = errorValues.name;
      this.message = errorValues.message;
    }
  }
  