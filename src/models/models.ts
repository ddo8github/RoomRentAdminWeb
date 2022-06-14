interface IGenericStateData<T> {
  data: T;
}

interface IUserLogin {
  username: string;
  password: string;
}

export type { IGenericStateData, IUserLogin };
