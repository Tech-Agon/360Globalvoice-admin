import { useRouter } from "@/routes/hooks";
import { MoveLeft } from "lucide-react";
import React from "react";
import NewsComponent from "./component/newsComponent";

const CreateNews: React.FC = () => {
  const router = useRouter();
  return (
    <section className="w-full h-full antialiased mx-auto max-md:py-14 max-w-screen-xl px-3 sm:px-6 lg:px-0 flex justify-center items-start flex-col min-h-screen">
      <span onClick={router.back} className="mb-3 cursor-pointer flex gap-3">
        <MoveLeft />
        Back
      </span>
      <h1 className="text-[#8725FE] max-lg:text-3xl text-5xl font-extrabold">
        Create News
      </h1>

      <div className="mt-10 w-full">
        <NewsComponent />
      </div>
    </section>
  );
};

export default CreateNews;
