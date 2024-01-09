"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

export default function AssigneeSelect({ issue }: { issue: Issue }) {
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
      <>
         <Select.Root
            defaultValue={issue.assignedToUserId || ""}
            onValueChange={async (userId) =>
               await axios
                  .patch(`/api/issues/${issue.id}`, {
                     assignedToUserId: userId || null,
                  })
                  .catch(() => toast.error("Changes could not be saved."))
            }
         >
            <Select.Trigger />
            <Select.Content>
               <Select.Group>
                  <Select.Label>Suggestions</Select.Label>
                  <Select.Item value="">Unassigned</Select.Item>
                  {users?.map((user) => (
                     <Select.Item key={user.id} value={user.id}>
                        {user.name}
                     </Select.Item>
                  ))}
               </Select.Group>
            </Select.Content>
         </Select.Root>
         <Toaster />
      </>
   );
}
