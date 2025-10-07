import { useQuery } from "@tanstack/react-query";
import { User } from "next-auth";
import axios from "axios";

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default useUsers;
