import Header from "@/components/Header";
import { Faq3 } from "@/components/Home/Accordion";
import { Features } from "@/components/Home/Features";
import Flow from "@/components/Home/Flow";
import { Footer7 } from "@/components/Home/Footer7";
import HeroSection from "@/components/Home/HeroSection";
import Satisfactions from "@/components/Home/Satisfactions";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black border border-stone-200/30">
      <Header />
      <HeroSection></HeroSection>
      <Features></Features>
      <Satisfactions></Satisfactions>
      <Flow></Flow>
      <Faq3></Faq3>
      <Footer7></Footer7>
    </div>
  );
}
