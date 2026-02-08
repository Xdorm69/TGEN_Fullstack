"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useAuth } from "@/context/auth-context";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => {
        logout();
        router.push("/login");
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
