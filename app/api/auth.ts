export type userCredential = {
  email: string;
  password: string;
};

export async function logIn(credential: userCredential) {
  const response = await fetch("");
  return response.json();
}

export async function register(credential: userCredential) {
  const response = await fetch("");
  return response.json();
}
