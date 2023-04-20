export namespace API {
  export type Params = {
    endpoint: string;
    method: "POST" | "GET" | "DELETE" | "PUT";
    data?: any;
    headers: Record<string, any>;
    params?: any;
  };

  export type LoginResponse = Readonly<{
    success: boolean;
    error: any;
    data: any;
  }>;
}
