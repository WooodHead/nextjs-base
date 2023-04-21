export enum SessionStatus {
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
}

export enum Method {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

export enum ApiPath {
  PaymentHistory = "/payment-history",
  Users = "/users",
  Role = "/role",
  Permission = "/permission",
}
