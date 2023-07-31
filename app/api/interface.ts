type ApiStatus = "success" | "failed";

interface Response {
  status: ApiStatus;
  message: string;
  data: any;
}

export interface ApiResponse {
  statusCode: number;
  response: Response;
}
