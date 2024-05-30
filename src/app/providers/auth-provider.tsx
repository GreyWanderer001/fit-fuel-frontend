import { useAuth } from "@/hooks/use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isPending } = useAuth();

  if (isPending) {
    return null;
  }

  return children;
}
