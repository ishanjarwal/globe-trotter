import Header from "@/components/Header";
import { Calendar } from "lucide-react";
import React from "react";

const page = () => {
 const trips = [
  {
    title: "Mumbai to Goa",
    price: 4000,
    days: 5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    description:
      "Experience the vibrant beaches, nightlife, and seafood delights on this scenic journey from Mumbai to Goa."
  },
  {
    title: "Kolkata to Darjeeling",
    price: 3500,
    days: 4,
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=ATKogpdRA0Q0GOcPupdA6969R7DQZWKlk8VXqSlznMpfRISw5xGrHAFsthv4VBZlJcAh6gOGJBSP-mgV2mEMVzO1bpZFqID8Hxzf8A4_605aKH-dIkQif8CD6Dw3B2c5NXIvc0cw2_GDriHLdqMXIPADkGQfuqym7voZF-xOX0439fQ0254dw0bK_RPsxshI9aVDPfCG9HAPIOORyaA2Ded2pJxIROnA9EomrdgGydKHCJNyyyiGBMNJ1Agiewim1xxpz2Y7mcqxi_ALkwMCuMlMNHeTJ4u1-BT1zg-cAye568BTEIrgElC6cnWDNl6--Hmc032DqqBXPpIWLPgiFDVKy0ozILCMGcDyip_iax_baxIXdCsk6rgsvYXxnho6QRKvkRkknaCCr6qlTmAfpDcOA3LQ7n4cDih-UMVjuSEhWAPQu3Nf&key=AIzaSyBs59zTkhKKl34zxF5sPZdiAtuRC2I6rdM",
    description:
      "Travel from the City of Joy to the serene hills of Darjeeling, famous for tea gardens and breathtaking sunrise views."
  },
  {
    title: "Bangalore to Coorg",
    price: 2800,
    days: 2,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    description:
      "Escape to the coffee capital of India, surrounded by lush green hills, waterfalls, and peaceful plantations."
  },
  {
    title: "Chennai to Pondicherry",
    price: 2200,
    days: 2,
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=ATKogpdRA0Q0GOcPupdA6969R7DQZWKlk8VXqSlznMpfRISw5xGrHAFsthv4VBZlJcAh6gOGJBSP-mgV2mEMVzO1bpZFqID8Hxzf8A4_605aKH-dIkQif8CD6Dw3B2c5NXIvc0cw2_GDriHLdqMXIPADkGQfuqym7voZF-xOX0439fQ0254dw0bK_RPsxshI9aVDPfCG9HAPIOORyaA2Ded2pJxIROnA9EomrdgGydKHCJNyyyiGBMNJ1Agiewim1xxpz2Y7mcqxi_ALkwMCuMlMNHeTJ4u1-BT1zg-cAye568BTEIrgElC6cnWDNl6--Hmc032DqqBXPpIWLPgiFDVKy0ozILCMGcDyip_iax_baxIXdCsk6rgsvYXxnho6QRKvkRkknaCCr6qlTmAfpDcOA3LQ7n4cDih-UMVjuSEhWAPQu3Nf&key=AIzaSyBs59zTkhKKl34zxF5sPZdiAtuRC2I6rdM",
    description:
      "Enjoy a short getaway from Chennai to the charming French town of Pondicherry with its colorful streets and beaches."
  }
];



  return (
    <div className="min-h-screen bg-black relative pt-25">
      <div className="wrapper grid grid-cols-5">
        <div className="left col-span-1 min-h-screen px-3 py-10 flex flex-col items-center border-r border-accent/30">
          <div className="image size-42 rounded-full flex items-center justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              className="rounded-full"
              alt=""
            />
          </div>
          <div className="bio text-center">
            <div className="name text-2xl text-accent">Shivam Sharma</div>
            <div className="bio mt-3 text-accent/70">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
              quam asperiores officiis sit nisi quae molestias voluptas ratione
              dolorem sunt rem expedita magnam vero, blanditiis deleniti alias
              maxime!
            </div>
          </div>
        </div>
        <div className="left col-span-4 px-10 pb-20">
          <div className="wrapper cursor-pointer">
            <div className="ongoing mt-5">
              <h1 className="text-3xl text-accent border-b-3 border-b-primary inline pb-3 px-7 font-semibold">Ongoing</h1>
              <div className="wrapper  w-full grid grid-cols-2 mt-15 shadow-2xl rounded-4xl">
                <div className="left col-span-1  h-[40vh] p-7 flex items-center justify-center">
                  <img
                    src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=ATKogpdRA0Q0GOcPupdA6969R7DQZWKlk8VXqSlznMpfRISw5xGrHAFsthv4VBZlJcAh6gOGJBSP-mgV2mEMVzO1bpZFqID8Hxzf8A4_605aKH-dIkQif8CD6Dw3B2c5NXIvc0cw2_GDriHLdqMXIPADkGQfuqym7voZF-xOX0439fQ0254dw0bK_RPsxshI9aVDPfCG9HAPIOORyaA2Ded2pJxIROnA9EomrdgGydKHCJNyyyiGBMNJ1Agiewim1xxpz2Y7mcqxi_ALkwMCuMlMNHeTJ4u1-BT1zg-cAye568BTEIrgElC6cnWDNl6--Hmc032DqqBXPpIWLPgiFDVKy0ozILCMGcDyip_iax_baxIXdCsk6rgsvYXxnho6QRKvkRkknaCCr6qlTmAfpDcOA3LQ7n4cDih-UMVjuSEhWAPQu3Nf&key=AIzaSyBs59zTkhKKl34zxF5sPZdiAtuRC2I6rdM"
                    className="size-full rounded-3xl object-cover"
                    alt=""
                  />
                </div>
                <div className="right col-span-1  py-7 px-5">
                  <h1 className="text-3xl text-primary">
                    Cultural Journey to Japan  90j


                                      </h1>
                  <p className="mt-4 max-w-3/4 text-xl text-muted-foreground">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                    distinctio, neque ullam doloremque quo laudantium laborum
                    aspernatur quos quas quaerat.
                  </p>
                  <div className="details flex justify-between w-3/5 mt-6 text-lg text-accent">
                    <div className="price">₹20,000</div>
                    <div className="days flex">
                      <span className="mr-3"><Calendar></Calendar></span>3 days
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrap mt-20 text-accent">
              <h1 className="text-3xl border-b-3 border-b-primary inline pb-3 px-7 font-semibold">Completed</h1>
            </div>
            {trips.map((e, id) => (
              <div key={id} className="wrapper w-full grid grid-cols-2 mt-20 shadow-2xl rounded-4xl cursor-pointer">
                <div className="left col-span-1  h-[40vh] p-7 flex items-center justify-center">
                  <img
                    src={e.image}
                    className="size-full rounded-3xl object-cover"
                    alt=""
                  />
                </div>
                <div className="right col-span-1  py-7 px-5">
                  <h1 className="text-3xl text-primary">
                    {e.title}
                  </h1>
                  <p className="mt-4 max-w-3/4 text-xl text-muted-foreground">
                    {e.description}
                  </p>
                  <div className="details flex justify-between w-3/5 mt-6 text-lg text-accent">
                    <div className="price">₹{e.price}</div>
                    <div className="days flex">
                      <span className="mr-3"><Calendar></Calendar></span>{e.days} days
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
