"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";

export default function AssigneeSelect() {
   const {
      data: users,
      error,
      isLoading,
   } = useQuery<User[]>({
      queryKey: ["users"],
      queryFn: () => axios.get("/api/users").then((res) => res.data),
      staleTime: 60_000,
      retry: 3,
   });

   if (error) return null;

   if (isLoading) return <Skeleton height={"2rem"} />;

   return (
      <Select.Root>
         <Select.Trigger placeholder="Assign issue..." />
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               {users?.map((user) => (
                  <Select.Item key={user.id} value={user.id}>
                     {user.name}
                  </Select.Item>
               ))}
            </Select.Group>
         </Select.Content>
      </Select.Root>
   );
}
