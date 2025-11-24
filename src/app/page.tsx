import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
const Page = async () => {
  await requireAuth();

  const data = await caller.getUsers()

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <h1>Home</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <LogoutButton />

    </div>
  );
};

export default Page;