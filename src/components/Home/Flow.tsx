import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";
import BgShape from "../BgShape";
import { AnimatedBeamDemo } from "../effects/Beam";
import { OrbitingCirclesDemo } from "../effects/Orbit";
import { Globe } from "../magicui/globe";
{
  /* <HiMiniArrowLongRight /> */
}
{
  /* <HiMiniArrowLongLeft /> */
}
const Flow = () => {
  return (
    <div className="w-full relative z-10 flex flex-col items-center py-3">
      <BgShape top="0px" left="0px" width="100%"></BgShape>

      {/* Heading */}

      <div className="box w-full px-32 flex justify-center text-center text-accent">
        <div className="heading max-w-4/5 ">
          <h1 className="text-7xl font-semibold">
            Simple Structure for everyone.
          </h1>
          <p className="m-7 text-xl text-center text-[#CCCCCC]">
            Choose an affordable plan that's packed with the best features for
            engaging your audience, creating customer loyalty, and driving
            sales.
          </p>
        </div>
      </div>

      {/* Flow */}

      <div className="flow w-full mt-55 px-15">
        <div className="container grid grid-cols-2 px-10 ">
          <div className="left  col-span-1 py-20  relative">
            <div className="con  max-w-3/4 border-l border-l-gray-400/80 pl-15 py-8">
              <h1 className="text-4xl">Get A Custom Workflow With Ease</h1>
              <div className="description mt-8 text-lg text-[#CCCCCC] mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                consequuntur iure distinctio quaerat? Ipsam optio, est repellat
                nostrum fugit dicta dolorum quasi neque corrupti blanditiis.
              </div>
              <span className="">
                <HiMiniArrowLongRight size={42} fill="#CCCCCC" />
              </span>
            </div>
          </div>
          <div className="left col-span-1 h-[60vh] p-10 px-15 rounded-4xl border border-[#AAAAAA]/40  bg-[#1C1C1C]/40">
            <AnimatedBeamDemo></AnimatedBeamDemo>
          </div>
        </div>
        <div className="container grid grid-cols-2 mt-40 px-10 relative z-10">
          <BgShape right="100px" height="350px" width="350px"></BgShape>
          <div className="left col-span-1 h-[60vh] p-10 px-1 relative  rounded-4xl border border-[#AAAAAA]/40  bg-[#1C1C1C]/40">
            <Globe />
          </div>
          <div className="left col-span-1 flex py-15 pl-15 pr-10">
            <div className="con max-w-[90%] relative border-r border-r-gray-400/80 pr-12 pt-15 flex flex-col ml-20">
              <h1 className="text-4xl">Get A Custom Workflow With Ease</h1>
              <div className="description mt-8 text-lg text-[#CCCCCC] mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                consequuntur iure distinctio quaerat? Ipsam optio, est repellat
                nostrum fugit dicta dolorum quasi neque corrupti blanditiis.
              </div>
              <span>
                <HiMiniArrowLongLeft size={42} fill="#CCCCCC" />
              </span>
            </div>
          </div>
        </div>

        <div className="container grid grid-cols-2 mt-40 px-10">
          <div className="left  col-span-1 py-20 px-15 relative overflow-hidden">
            <BgShape left="150px" height="350px" width="350px"></BgShape>
            <div className="con  max-w-3/4 border-l border-l-gray-400/80 pl-15 py-8">
              <h1 className="text-4xl">Get A Custom Workflow With Ease</h1>
              <div className="description mt-8 text-lg text-[#CCCCCC] mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                consequuntur iure distinctio quaerat? Ipsam optio, est repellat
                nostrum fugit dicta dolorum quasi neque corrupti blanditiis.
              </div>
              <span className="">
                <HiMiniArrowLongRight size={42} fill="#CCCCCC" />
              </span>
            </div>
          </div>
          <div className="left col-span-1 h-[60vh] p-10 px-15 bg-[#1C1C1C]/40 rounded-4xl border border-[#AAAAAA]/40">
            <OrbitingCirclesDemo></OrbitingCirclesDemo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flow;
