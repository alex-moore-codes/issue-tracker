import { authOptions } from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import {
   AssigneeSelect,
   DeleteIssueButton,
   EditIssueButton,
   IssueDetails,
} from "./index";
import delay from "delay";

export default async function page({ params }: { params: { id: string } }) {
   await delay(3000);

   const session = await getServerSession(authOptions);

   const issue = await prisma.issue.findUnique({
      where: {
         id: parseInt(params.id),
      },
   });

   if (!issue) notFound();

   return (
      <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
         <Box className="md:col-span-4">
            <IssueDetails issue={issue} />
         </Box>
         {session && (
            <Box>
               <Flex direction={"column"} gap={"2"}>
                  <AssigneeSelect issue={issue} />
                  <EditIssueButton issueId={issue.id} />
                  <DeleteIssueButton issueId={issue.id} />
               </Flex>
            </Box>
         )}
      </Grid>
   );
}
