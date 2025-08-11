import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="min-h-screen w-full bg-background flex justify-center items-center">
      <SignUp />
    </div>
  );
};

export default page;
