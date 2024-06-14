import { about } from "@/config/about";
import Image from "next/image";
export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-[100vh]">
      <div className="container flex flex-col gap-y-24 w-full items-center mt-8">
        <article className="prose flex flex-col items-center dark:text-white">
          <h1 className="dark:text-white">{about.title}</h1>

          <Image src={about.image} alt={about.title} width={800} height={400} />

          <p>{about.line1}</p>

          <p>{about.line2}</p>

          <p>{about.line3}</p>

          <p>{about.line4}</p>

          <p>{about.line5}</p>

          <p>{about.line6}</p>

          <p>{about.line7}</p>

          <section>
            <h2 className="dark:text-white">{about.accomplishments.title}</h2>
            <ul>
              {about.accomplishments.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
