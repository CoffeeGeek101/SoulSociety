import HomepageForm from "@/components/homepage/HomepageForm";
import HomepageHero from "@/components/homepage/HomepageHero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-950">
      <div className="flex items-start justify-center w-full h-full p-3">
       <HomepageForm/>
       <HomepageHero/>
      </div>  
    </div>
  );
}
