export class Session {
  token: string;
  scope: string[];
  userId: string;
  userEmail: string;
}

export class User{
  uid: string;
  email: string;
  password: string;
  confirmed: boolean;
  type: string;
}
