import { getServerAuthSession } from "./auth";

export async function getCurrentUser() {
  const session = await getServerAuthSession();

  return session?.user!;
}
