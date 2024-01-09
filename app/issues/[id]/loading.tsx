import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";

export default function LoadingIssueDetailsPage() {
   const gapY = "mb-3";
   return (
      <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
         <Box className="md:col-span-4">
            <Skeleton className={gapY} width={"16rem"} height={"1.75rem"} />
            <Flex gap={"4"} mb={"5"}>
               <Skeleton width={"3rem"} height={"1.25rem"} />
               <Skeleton width={"10rem"} height={"1.25rem"} />
            </Flex>
            <Card>
               <Skeleton count={4} />
               <Skeleton width={"12rem"} />
            </Card>
         </Box>
         <Box>
            <Flex direction={"column"} gap={"2"}>
               <Skeleton height={"1.8rem"} />
               <Skeleton height={"1.8rem"} />
               <Skeleton height={"1.8rem"} />
            </Flex>
         </Box>
      </Grid>
   );
}
