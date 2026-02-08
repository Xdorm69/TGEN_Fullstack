"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LogoutButton from "@/components/ui/logoutButton";
import { capText } from "@/utils/text";

type Props = {
  isLoggedIn: boolean;
};

const navItems = ["test", "practice", "leaderboard"];

export default function MobileNav({ isLoggedIn }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64">
        <div className="flex flex-col gap-4 mt-6">
          {navItems.map((item) => (
            <Link key={item} href={`/${item}`}>
              <Button variant="ghost" className="w-full justify-start">
                {capText(item)}
              </Button>
            </Link>
          ))}

          <div className="pt-4 border-t">
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <Link href="/login">
                <Button variant="secondary" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
