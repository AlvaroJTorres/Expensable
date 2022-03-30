import { BASE_URL } from "../app/config";

export async function userSignUp(userData) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return await res.json();
}

export async function getUserData(token) {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });
  return await res.json();
}
