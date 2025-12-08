
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

export const validateSession = () => {
  const router = useRouter();

  // Handle auth client-side
  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (!session) router.push("/auth/login");
    }
    checkAuth();
  }, []);
};
