import { FunctionComponent, useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { AuthInput } from "../constants/types";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

const LoginScreen: FunctionComponent = () => {
  const { authenticate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginHandler = async ({ email, password }: AuthInput) => {
    setIsLoading(true);
    try {
      const token = await login({ email, password });
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Unable to sign you in. Please check your credentials or try again later"
      );
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
