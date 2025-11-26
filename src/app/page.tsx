"use client";

import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const Page = () => {
  // await requireAuth();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <h1>Home</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <LogoutButton />
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
    </div>
  );
};

export default Page;