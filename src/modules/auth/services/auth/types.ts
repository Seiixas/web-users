type TSignInRequest = {
  email: string;
  password: string;
};

type TSignInResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MANAGER" | "STANDARD";
  };
};

export type TAuthService = {
  signIn({ email, password }: TSignInRequest): Promise<TSignInResponse>;
};
