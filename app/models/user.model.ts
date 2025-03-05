export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type AuthUser = Pick<User, 'id' | 'username'>
