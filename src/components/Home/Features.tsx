"use client";
import { useState } from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";
import BgShape from "../BgShape";
import clsx from "clsx";
import { BorderBeam } from "../magicui/border-beam";
export const Features = () => {
  const [idx, setIdx] = useState(0);
  const data = [
    {
      title: "Secure Transactions",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illum ad facere dignissimos iusto obcaecati aspernatur consequuntur iste.",
      img: "https://images.pexels.com/photos/39624/padlock-lock-chain-key-39624.jpeg",
      icon: <RiSecurePaymentLine />,
    },
    {
      title: "Low Fees",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illum ad facere dignissimos iusto obcaecati aspernatur consequuntur iste.",
      img: "https://images.pexels.com/photos/17893115/pexels-photo-17893115.jpeg",
      icon: <RiMoneyRupeeCircleLine />,
    },
    {
      title: "Community-driven",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illum ad facere dignissimos iusto obcaecati aspernatur consequuntur iste.",
      img: "https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg",
      icon: <TiGroupOutline />,
    },
  ];

  return (
    <div
      id="features"
      className="min-h-screen mt-20  overflow-hidden pb-20 relative  bg-stone-900/20"
    >
      <h1 className="text-5xl font-medium text-white pl-20 mt-10">Featurs</h1>
      <div className="container relative w-full z-40 pt-5 mt-5 pb-15 px-20">
        <BgShape
          bottom="-50px"
          right="-60px"
          height="650px"
          width="550px"
        ></BgShape>
        <div className="features grid bg-black grid-cols-2 mt-10 relative rounded-4xl">
          <BorderBeam
            duration={6}
            size={400}
            className="from-transparent via-[#a38f7f] to-transparent"
          />
          <BorderBeam
            duration={6}
            delay={3}
            size={400}
            borderWidth={2}
            className="from-transparent via-blue-500 to-transparent"
          />
          <div className="left col-span-1 pl-10 py-12 rounded-tl-4xl rounded-bl-4xl border border-r-0 border-stone-200/30">
            <div className="title text-lg transition-all duration-300">
              {data.map((e, id) => (
                <div
                  key={id}
                  onClick={() => setIdx(id)}
                  className={clsx(
                    "mt-3 text-lg cursor-pointer text-[#a38f7f] font-medium relative transition-all duration-300 w-fit px-2 pr-6 py-1 rounded-tr-2xl rounded-br-2xl",
                    idx === id ? "text-white translate-x-5" : "text-gray-300/80"
                  )}
                >
                  {e.title}
                  <div
                    className={clsx(
                      "size-2 rounded-full -left-5 absolute bg-[#a38f7f] top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300",
                      idx === id ? "opacity-100" : "hidden"
                    )}
                  ></div>
                </div>
              ))}
            </div>
            <div className="context mt-14">
              <span className="text-6xl text-[#a38f7f]">{data[idx].icon}</span>
              <h1 className="text-6xl max-w-8/12  h-32 text-[#f5f0e6]">
                {data[idx].title}
              </h1>
              <div className="description mt-8 max-w-3/4">
                <p className="text-[1.1rem]">{data[idx].description}</p>
              </div>
            </div>
          </div>
          <div className="right col-span-1 py-12 px-15 border border-l-0 rounded-tr-4xl rounded-br-4xl border-stone-200/30">
            <div className="image border-3xl h-[70vh] w-full relative rounded-4xl">
              <img
                src={data[idx].img}
                alt=""
                className="w-full h-full rounded-4xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
