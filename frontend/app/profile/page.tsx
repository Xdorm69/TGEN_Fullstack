"use client";

import { useAuth } from "@/context/auth-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import LogoutButton from "@/components/ui/logoutButton";

const page = () => {
  const { user } = useAuth();
  return (
    <section>
      <MaxWidthWrapper>
        <Card>
          <CardHeader>User Profile</CardHeader>
          <CardContent>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
            <p>Created: {new Date(user?.createdAt!).toLocaleDateString()}</p>
            <p>Updated: {new Date(user?.updatedAt!).toLocaleDateString()}</p>
          </CardContent>
          <CardFooter>
            <LogoutButton />
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
