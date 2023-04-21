import { Method } from "@/constants/auth";

export namespace API {
  export type Params = {
    endpoint: string;
    method: Method;
    data?: any;
    headers: Record<string, any>;
    params?: any;
  };

  export type Response<T> = Readonly<{
    error: null | Record<string, any>;
    success: boolean;
    data: Readonly<T>;
  }>;

  export type LoginData = Readonly<{
    tokens: {
      access: Token;
      refresh: Token;
    };
    user: User;
  }>;

  export type Meta = {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };

  export type Permission = {
    id: string;
    metadata: any;
    permission: {
      createdAt: string;
      createdBy: string;
      description: string;
      metaData: any;
      method: "GET" | "POST" | "PUT" | "DELETE";
      name: string;
      path: string;
      status: boolean;
      updatedAt: string;
      updatedBy: string;
    };
  };

  export type Token = {
    expires: string;
    token: string;
  };

  export type User = {
    code: string;
    createdAt: string;
    createdBy: string;
    email: string;
    id: string;
    isActive: boolean;
    isDelete: boolean;
    isSuperAdmin: boolean;
    isVerify: boolean;
    name: string;
    partner: string | null;
    phoneNumber: string;
    roleId: string;
    uid: string;
    updatedAt: string;
    updatedBy: string;
    username: string;
  };

  export type Role = {
    createdAt: string;
    createdBy: string;
    description: string | null;
    id: string;
    isDelete: boolean;
    name: string;
    status: boolean;
    nameCreateUser: string;
    nameUpdateUser: string;
    updatedAt: string;
    updatedBy: string;
    usernameCreateUser: string;
    usernameUpdateUser: string;
    permissions: Array<Permission>;
  };

  export type PaymentHistory = {
    dateTime: string;
    description: string;
    feeAmount: number | null;
    ftFeeId: string;
    ftPaymentId: string;
    id: string;
    isActive: boolean;
    isDelete: boolean;
    mgId: string;
    nameCreateUser: string;
    nameUpdateUser: string;
    partner: string | null;
    partnerId: string | null;
    payAmount: number;
    paymentAmount: number;
    reconFee: number;
    requestId: string;
    status: string;
    timeRequest: string;
    refNum: string;
    timeResponse: string;
    usernameCreateUser: string;
    usernameUpdateUser: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export type TableFilter = {
  options: Record<string, any>;
  filter: Record<string, any>;
};
