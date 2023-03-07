interface User {
  id: number;
  email: string;
  password_md5: string;
  name: string;
  logged: boolean;
}

export default User;