"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus, User } from "lucide-react";

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SurpriseMeButton from "./SurpriseButton";
import { FaCrown } from "react-icons/fa";
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

const logo = {
  url: "/",
  src: "/logo_white.png",
  alt: "logo",
  title: "TripSage",
};
const navbar = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "features", link: "/" },
];
const auth = {
  login: { title: "Login", url: "/sign-in" },
  signup: { title: "Sign up", url: "sign-up" },
};

const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="py-4 px-4 sticky top-0 backdrop-blur-sm bg-black/80 z-[100] shadow-[0px_4px_22px_3px_var(--color-primary)]">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <div className="flex items-center space-x-2">
              {navbar.map((el: any, index: number) => (
                <Link className="text-accent" key={index} href={el.link}>
                  {el.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {isSignedIn ? (
              <div className="flex justify-end items-center space-x-4">
                <Button asChild>
                  <Link href={"/create"}>
                    <span>Create a New Trip</span>
                    <Plus />
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={"/mytrips"}>
                    <span>My Trips</span>
                    <User />
                  </Link>
                </Button>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "48px",
                        height: "48px",
                      },
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label={"My Dashboard"}
                      labelIcon={<User />}
                      href="/userdashboard"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm">
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
      </div>
    </section>
  );
};

export default Header;

// const MobileMenu = () => {
//   return (
//     <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//             </a>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="size-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent className="overflow-y-auto">
//                 <SheetHeader>
//                   <SheetTitle>
//                     <a href={logo.url} className="flex items-center gap-2">
//                       <img
//                         src={logo.src}
//                         className="max-h-8 dark:invert"
//                         alt={logo.alt}
//                       />
//                     </a>
//                   </SheetTitle>
//                 </SheetHeader>
//                 <div className="flex flex-col gap-6 p-4">
//                   <div className="flex flex-col gap-3">
//                     {isSignedIn ? (
//                       <div className="flex justify-end items-center space-x-4">
//                         <Button asChild>
//                           <Link href={"/create"}>
//                             <span>Create a New Trip</span>
//                             <Plus />
//                           </Link>
//                         </Button>
//                         <UserButton
//                           appearance={{
//                             elements: {
//                               userButtonAvatarBox: {
//                                 width: "48px",
//                                 height: "48px",
//                               },
//                             },
//                           }}
//                         />
//                       </div>
//                     ) : (
//                       <>
//                         <Button asChild variant="outline">
//                           <a href={auth.login.url}>{auth.login.title}</a>
//                         </Button>
//                         <Button asChild>
//                           <a href={auth.signup.url}>{auth.signup.title}</a>
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//   )
// }
