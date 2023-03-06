import User from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
}

export const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}

export const createUser = async (user: User): Promise<User> => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}

export const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(`/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}

export const deleteUser = async (id: string): Promise<void> => {
  await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
}

export const login = async (email: string, password: string): Promise<User> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export const logout = async (): Promise<void> => {
  await fetch("/api/logout");
}

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetch("/api/logged-in-user");
  const data = await response.json();
  return data;
}

