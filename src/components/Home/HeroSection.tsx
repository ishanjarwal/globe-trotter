import { AnimatedShinyTextDemo } from "../../components/effects/ShineyText";
import ParticlesEffect from "../effects/Particles";
import { FaArrowRightLong } from "react-icons/fa6";
import { BorderBeam } from "../../components/magicui/border-beam";
import { motion } from "framer-motion";
import heroimg from "../../assets/hero.png";
import BgShape from "../BgShape";
const HeroSection = () => {
  return (
    <div className="w-full text-white px-30 py-14 pb-25 flex flex-col items-center relative min-h-screen mt-30 overflow-x-hidden">
    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-black via-black/80 to-black blur-2xl aspect-square z-30" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg absolute w-full h-full top-0 left-0 z-10"
      >
        <ParticlesEffect></ParticlesEffect>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-64 relative z-20"
      >
        <AnimatedShinyTextDemo></AnimatedShinyTextDemo>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-5 text-8xl max-w-7xl text-center tracking-tighter"
      >
        Magic UI is the new way way to make landing pages
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg mt-7 text-center max-w-2xl"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illum ad
        facere dignissimos iusto obcaecati aspernatur consequuntur iste.
      </motion.h2>
      <motion.button
        initial={{ opacity: 0, y: -30 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-8 px-4 rounded-lg py-1 relative z-40 bg-white text-black flex items-center gap-x-2"
      >
        <span>Get Started for free</span>{" "}
        <span className="flex items-center">
          <FaArrowRightLong />
        </span>
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="container w-full rounded-4xl relative z-20 bg-black h-[80vh] mt-25 border border-yellow-100/70"
      >
        <BgShape top="-100px" width="115%" left="-8%" height="90%"></BgShape>
        <BorderBeam duration={10} />
        <img src={heroimg} alt="Hero" className="size-full object-cover rounded-4xl" />

        {/* Black fade at bottom to hide glow */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/80 to-black blur-2xl aspect-square z-30" />
      </motion.div>
    </div>
  );
};

export default HeroSection;
