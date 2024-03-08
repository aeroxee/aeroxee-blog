type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  password: string;
  isActive: boolean;
  updatedAt: string | null;
  createdAt: string;
};

export { type User };
