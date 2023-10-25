import axios from "axios";
import env from "../env.json";
import { AuthInput } from "../constants/types";

export const createUser = ({ email, password }: AuthInput): Promise<string> => {
  // Send request to firebase
  return authenticate("signUp", { email, password });
};

export const login = ({ email, password }: AuthInput): Promise<string> => {
  return authenticate("signInWithPassword", { email, password });
};

type AuthMode = "signUp" | "signInWithPassword";

const authenticate = async (
  mode: AuthMode,
  { email, password }: AuthInput
): Promise<string> => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${env.AUTH_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  // console.log(response.data);
  return response.data.idToken;
};
