import { ContentLayout } from "@/components/admin-panel/content-layout";
import BackButton from "@/components/back-button";
import Image from "next/image";

export default function Science() {
  return (
    <ContentLayout title="The Science">
      <BackButton />
      <article className="pt-8 prose prose-gray max-w-6xl mx-auto dark:prose-invert">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Unleashing Speed: Elevate Your Game with Targeted Training
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Authored by: Mateo Dixon, 2024
        </p>
        <h1>Principals</h1>
        <h2>The Importance of Periodization</h2>
        <p>
          Think of periodization as creating a smart game plan for your training
          year. It&apos;s about organizing your workouts so that you do the
          right types of training at the right times. For example, you might
          focus on getting stronger with basic strength training during the
          first part of the off-season. Then, as your season gets closer,
          you&apos;d switch to more power-focused exercises to help you explode
          into action faster. Right before your competitions start, you&apos;d
          work on perfecting your sprinting technique and speeding up your
          movements. This approach helps you peak at just the right time for
          your games.
        </p>
        <div className="flex justify-center">
          <Image
            src="/science/power.webp"
            alt="Periodization"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <h3>Training That Matches Your Needs: </h3>
        <p>
          Ever wondered if your training is as fast as you need to be on the ice
          or field? If you&apos;re just doing slow, heavy lifts like squats and
          deadlifts without a focus on speed, you might not be developing the
          quickness you need. Training for speed isn&apos;t just about lifting;
          it&apos;s about how quickly and explosively you can move. Think about
          it — training to sprint faster by only jogging doesn&apos;t quite make
          sense, does it?
        </p>
        <div className="flex justify-center">
          <Image
            src="/science/speed.webp"
            alt="Periodization"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <h2>Rate and Time of Maximum Force Production:</h2>
        <h3>Understand the Game&apos;s Demands:</h3>
        <p>
          In sports like hockey, intense actions like sprints or fast breaks
          last just a few seconds. Your training should mirror this reality.
          Long, slow exercises won&apos;t cut it; instead, you need workouts
          that build the ability to explode into action and sustain it just as
          quickly as the game demands, typically between 2 to 7 seconds.
        </p>
        <h3>Match Your Training:</h3>
        <p>
          Ensuring workouts develop quick, explosive strength and speed that you
          can tap into instantly during a game. This approach ensures
          you&apos;re not just training hard, but training smart — aligning your
          effort with how you actually play.
        </p>
        <div className="flex justify-center">
          <Image
            src="/science/skater.webp"
            alt="Periodization"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <h2>Strength to Speed Translation:</h2>
        <p>
          Usain Bolt, the fastest man on the planet, demonstrates the power of
          force application — pushing almost six times his body weight into the
          ground with each step. By enhancing your strength through fundamental
          exercises, and focusing on the speed of your movements, you too can
          harness this too.
        </p>
        <div className="flex justify-center">
          <Image
            src="/science/weight.jpg"
            alt="Periodization"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <h2>From Strength to Sprint:</h2>
        <p>
          It&apos;s not only about being strong but also about how rapidly you
          can utilize that strength when sprinting. This is where dynamic
          exercises like sprinting with a sled or engaging in jump training
          translate your strength into blazing speed.
        </p>
        <h2>What Actually Happens in Sport:</h2>
        <p>
          Newton&apos;s Insight: Sports boil down to action and reaction —
          pushing against the ground and utilizing the force it pushes back
          with. This interaction, dictated by Newton&apos;s Third Law of Motion,
          means your ability to push effectively against the ground determines
          how fast you move.
        </p>
        <p>
          Synergy of Body Mechanics: Your tendons, ligaments, and nervous system
          collaborate to optimize this force. The better they work together, the
          more effectively you can move and maintain optimal contact with the
          ground, crucial for any sport.
        </p>
        <h2>Rate of Force Development (RFD):</h2>
        <h3>Quick Force Application:</h3>
        <p>
          RFD is about how swiftly your body can handle and use force. While
          your tendons and ligaments are great at quickly loading and releasing
          force, the real test is whether they can maintain this under the
          stress of intense strength demands.
        </p>
        <p>
          Building Explosive Power: Focus on enhancing your elastic strength to
          utilize stored energy rapidly, starting strength to initiate movements
          powerfully, and acceleration strength to rapidly increase force output
          at the start of your movements.
        </p>
        <div className="flex justify-center">
          <Image
            src="/science/clock.webp"
            alt="Periodization"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <h3>Why This Matters:</h3>
        <p>
          This training isn&apos;t just about getting stronger — it&apos;s about
          becoming faster, more agile, and more powerful in the exact ways your
          sport requires. By aligning your training with the real demands of
          your sport, every session translates into better performance during
          games. Plus, it&apos;s all backed by science and the proven results of
          top athletes. So, when you train with us, you&apos;re not just lifting
          weights — you&apos;re gearing up to be faster and more competitive in
          your sport.
        </p>
      </article>
    </ContentLayout>
  );
}
