import { useMutation } from "@tanstack/react-query";
import UsersApis from "../APIs/UsersAPI.api";
import { queryClient } from "../utils/reactQuery";

export const getQueryKey = () => [""];

function usePostSigninQuery() {
  return useMutation({
    mutationKey: getQueryKey(),
    mutationFn: (data: {
      signal: AbortSignal;
      email: string;
      password: string;
    }) => UsersApis.signin(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getQueryKey(),
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Sign-in failed:", error);
    },
  });
}

export default usePostSigninQuery;
