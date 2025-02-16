interface TListResponse {
  id: string;
  name: string;
  email: string;
  is_activated: boolean;
  role: "ADMIN" | "MANAGER" | "STANDARD";
  created_at: string;
  updated_at: string;
}

interface TAuthRequest {
  accessToken: string;
}

interface TUpdateUserRequest extends TAuthRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: File;
  role?: "ADMIN" | "MANAGER" | "STANDARD";
}

interface TDeleteUserRequest extends TAuthRequest {
  id: string;
}

interface TProfileUserRequest extends TAuthRequest {
  id: string;
}

interface TListUserRequest extends TAuthRequest {
  page: number;
  limit: number;
  search?: string;
  role?: "ADMIN" | "MANAGER" | "STANDARD";
}

interface TCreateUserRequest extends TAuthRequest {
  name: string;
  email: string;
  password: string;
  avatar?: File;
  role: "ADMIN" | "MANAGER" | "STANDARD";
}

interface TProfileResponse extends TListResponse {
  avatar?: string;
}

export type TUserService = {
  create(data: TCreateUserRequest): Promise<void>;
  list(data: TListUserRequest): Promise<[TListResponse[], number]>;
  delete(data: TDeleteUserRequest): Promise<void>;
  profile(data: TProfileUserRequest): Promise<TProfileResponse>;
  update(data: TUpdateUserRequest): Promise<void>;
};
