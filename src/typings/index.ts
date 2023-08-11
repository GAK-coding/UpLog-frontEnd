export class CustomError<T> extends Error {
  response?: {
    data: T;
  };

  constructor(message: string, responseData: T) {
    super(message);
    this.response = {
      data: responseData,
    };
  }
}
