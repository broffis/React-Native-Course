import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthInput } from "../constants/types";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

const SignupScreen = () => {
  const { authenticate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signupHandler = async ({ email, password }: AuthInput) => {
    setIsLoading(true);
    try {
      const token = await createUser({ email, password });
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Unable to create user. Please check your input and try again later"
      );
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
