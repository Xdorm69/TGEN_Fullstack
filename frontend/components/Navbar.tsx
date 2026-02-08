"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { capText } from "@/utils/text";
import MobileNav from "@/components/ui/mobilenav";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";

export const HeroLink = () => {
  return (
    <Link href="/" className="flex gap-1">
      <Image src="/logo.png" alt="Logo" width={30} height={20} />
      <h1 className="font-mono font-bold text-xl">TGEN</h1>
    </Link>
  );
};

const Navbar = () => {
  const navbarItems = ["test", "practice", "leaderboard", "competitive"];
  const { user } = useAuth();

  return (
    <nav className="mx-auto w-full fixed top-0 z-50 backdrop-blur-lg bg-white/5">
      <MaxWidthWrapper className="py-3">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <HeroLink />

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-2 font-sans">
            {navbarItems.map((item) => (
              <Link href={`/${item}`} key={item}>
                <Button variant="ghost">{capText(item)}</Button>
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/profile">
                <Badge className="rounded-full size-8 bg-muted-foreground">
                  <User className="size-4" />
                </Badge>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
            )}
          </div>

          {/* MOBILE NAV */}
          <div className="md:hidden">
            <MobileNav isLoggedIn={!!user} />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
