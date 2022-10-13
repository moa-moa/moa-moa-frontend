class CustomError {
  public status: number | null = null;
  public message: string | null = null;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export default CustomError;
