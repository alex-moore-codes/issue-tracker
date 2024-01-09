"use client";
import { Select } from "@radix-ui/themes";

export default function AssigneeSelect() {
   return (
      <Select.Root>
         <Select.Trigger placeholder="Assign issue..." />
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               <Select.Item value="0">Alex Moore</Select.Item>
            </Select.Group>
         </Select.Content>
      </Select.Root>
   );
}
