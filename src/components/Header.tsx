"use client";
import Link from "next/link";
import { motion } from "framer-motion";
const Header = () => {
  const navbar = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "features", link: "/" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.5 }}
      className="w-full text-white  border-b  py-4 z-50 px-14 justify-between  fixed    left-1/2 -translate-x-1/2 bg-black/10 border border-white/20 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center gap-x-10  top-0"
    >
      <a href="" className="logo text-2xl">
        Odoo
      </a>
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-x-10 px-10 py-3 rounded-2xl">
        <Link
          href={"/"}
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          Home
        </Link>
        <Link
          href={"/about"}
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          About
        </Link>
        <Link
          href={"/"}
          onClick={() => {
            const features = document.querySelector("#features");
            features?.scrollIntoView();
          }}
        >
          Features
        </Link>
      </nav>
      <div className="login-signup flex items-center gap-x-10">
        <Link href={"/login"} className="">
          Login
        </Link>
        <Link href={"/signup"} className="px-4 py-1 rounded-lg bg-stone-800/90">
          Sign Up
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
