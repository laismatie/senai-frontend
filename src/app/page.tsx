import Image from "next/image";
import { Header } from "./components/Header";

export default function Home() {

  return (
    <main>
      <Header />
      <Image
        src="/images/banner.png"
        alt="Banner"
        layout="responsive"
        width={1920}
        height={600} 
      />

    </main>
  );
}
