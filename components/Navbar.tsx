import React from "react";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { BadgePlus, LogOut } from "lucide-react";
import { Button } from "./ui/button";

// Define server actions as top-level functions
async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}

async function handleSignIn() {
  "use server";
  await signIn("github");
}

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={50} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="max-sm:hidden text-20-medium">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <h2 className="text-20-medium">{session?.user?.name}</h2>
              <form action={handleSignOut}>
                <Button>
                  <LogOut className="size-4" color="white" />{" "}
                  <span className="text-white">Logout</span>
                </Button>
              </form>
            </>
          ) : (
            <form action={handleSignIn}>
              <Button type="submit" className="text-white">
                Login
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
