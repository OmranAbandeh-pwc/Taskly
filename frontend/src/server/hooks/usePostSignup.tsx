import { useMutation } from "@tanstack/react-query";
import UsersApis from "../APIs/UsersAPI.api";
import { queryClient } from "../utils/reactQuery";

export const getQueryKey = () => [""];

function usePostSignupQuery() {
  return useMutation({
    mutationKey: getQueryKey(),
    mutationFn: (data: {
      signal: AbortSignal;
      firstName: string;
      secondName: string;
      birthday: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => UsersApis.signup(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getQueryKey(),
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Sign-up failed:", error);
    },
  });
}

export default usePostSignupQuery;
