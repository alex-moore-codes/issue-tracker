import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

export default function IssueActions() {
   return (
      <Flex mb="5" justify={"between"}>
         <IssueStatusFilter />
         <Button mb={"4"}>
            <Link href={"/issues/new"}>Create New Issue</Link>
         </Button>
      </Flex>
   );
}
