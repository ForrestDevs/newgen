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
          year. It's about organizing your workouts so that you do the right
          types of training at the right times. For example, you might focus on
          getting stronger with basic strength training during the first part of
          the off-season. Then, as your season gets closer, you'd switch to more
          power-focused exercises to help you explode into action faster. Right
          before your competitions start, you'd work on perfecting your
          sprinting technique and speeding up your movements. This approach
          helps you peak at just the right time for your games.
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

        <h2>Dynamic (Speed) of Effort:</h2>
        <h3>Training That Matches Your Needs: </h3>
        <p>
          Ever wondered if your training is as fast as you need to be on the ice
          or field? If you're just doing slow, heavy lifts like squats and
          deadlifts without a focus on speed, you might not be developing the
          quickness you need. Training for speed isn't just about lifting;
          it&apos;s about how quickly and explosively you can move. Think about
          it — training to sprint faster by only jogging doesn't quite make
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
        <h3>Understand the Game's Demands:</h3>
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
          how fast you move. Synergy of Body Mechanics: Your tendons, ligaments,
          and nervous system collaborate to optimize this force. The better they
          work together, the more effectively you can move and maintain optimal
          contact with the ground, crucial for any sport.
        </p>
        <h2>Rate of Force Development (RFD):</h2>
        <h3>Quick Force Application:</h3>
        <p>
          RFD is about how swiftly your body can handle and use force. While
          your tendons and ligaments are great at quickly loading and releasing
          force, the real test is whether they can maintain this under the
          stress of intense strength demands. Building Explosive Power: Focus on
          enhancing your elastic strength to utilize stored energy rapidly,
          starting strength to initiate movements powerfully, and acceleration
          strength to rapidly increase force output at the start of your
          movements.
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
          top athletes. So, when you train with us, you're not just lifting
          weights — you're gearing up to be faster and more competitive in your
          sport.
        </p>
      </article>
    </ContentLayout>
  );
}

function Foo() {
  return (
    <article className="prose prose-gray max-w-6xl mx-auto dark:prose-invert">
      <div>
        {/* Introduction */}
        <section>
          <h1>Welcome to Rocket Fuel Speed Development Plan</h1>
          <p>
            Embrace a science-based approach to enhance your speed and explosive
            power.
          </p>
        </section>

        {/* Overview */}
        <section>
          <h2>Overview</h2>
          <p>
            This plan includes comprehensive workouts, essential principles, key
            insights, and instructional videos.
          </p>
        </section>

        {/* Principles of Speed Development */}
        <section>
          <h2>Principles of Speed Development</h2>
          <h3>Periodization</h3>
          <p>
            Periodization organizes your training into phases to maximize
            efficiency and results. For example, focus on strength during the
            off-season, power during pre-season, and speed as competitions
            approach.
          </p>
          {/* Visual timeline could be added here */}

          <h3>Dynamic Effort and Rate of Force Production</h3>
          <p>
            Training should include fast, explosive movements to match the
            demands of your sport. Long slow exercises won’t cut it; instead,
            focus on building quick explosive strength and
            speed&#8203;:citation[oaicite:12]&#8203;.
          </p>
          {/* Example exercises could be added here */}
        </section>

        {/* Workouts */}
        <section>
          <h2>Workouts</h2>
          <h3>Warmup Routines</h3>
          <p>Warmup exercises prepare your body for the main workout.</p>
          <ul>
            <li>Skipping + Hip isometrics</li>
            <li>Vertical Pogos + Toes elevated squat</li>
            <li>Hurdles + Wall Ankle Pumps</li>
            <li>Half Kneeling ankle leans + Lateral Pogos</li>
            {/* Add more warmup routines here */}
          </ul>
          {/* Add video clips here */}

          <h3>Plyometric Exercises</h3>
          <p>Plyometric exercises enhance explosive power and speed.</p>
          <ul>
            <li>Broad jump (5 reps)</li>
            <li>Double Knee to Broad jump (5 reps)</li>
            <li>Triple Broad Jump (4 reps)</li>
            <li>SL double broad jump (2 reps each leg)</li>
            {/* Add more plyometric exercises here */}
          </ul>
          {/* Add video clips here */}

          <h3>Speed Exercises</h3>
          <p>Speed exercises focus on improving your sprinting and agility.</p>
          <ul>
            <li>Fall forward sprint (2 reps each leg)</li>
            <li>Push up sprint (2 reps each leg)</li>
            <li>Crossover Sprint (2 reps each side)</li>
            <li>Shuffle - stop - sprint (2 reps each leg)</li>
            {/* Add more speed exercises here */}
          </ul>
          {/* Add video clips here */}

          <h3>Workout Examples</h3>
          <p>Here are some sample weekly workout plans:</p>
          <div>
            <h4>Day 1</h4>
            <p>Warmup: Skipping + Hip isometrics</p>
            <p>
              Plyos: Broad jump (5 reps), Double Knee to Broad jump (5 reps)
            </p>
            <p>
              Speed: Fall forward sprint (2 reps each leg), Push up sprint (2
              reps each leg)
            </p>

            <h4>Day 2</h4>
            <p>Warmup: Vertical Pogos + Toes elevated squat</p>
            <p>
              Plyos: Triple Broad Jump (4 reps), SL double broad jump (2 reps
              each leg)
            </p>
            <p>
              Speed: Crossover Sprint (2 reps each side), Shuffle - stop -
              sprint (2 reps each leg)
            </p>
            {/* Add more days here */}
          </div>
          {/* Add visual schedule here */}
        </section>

        {/* Detailed Breakdown of Exercises */}
        <section>
          <h2>Detailed Breakdown of Exercises</h2>
          <h3>Strength Method</h3>
          <p>Heavy and explosive lifting techniques:</p>
          <ul>
            <li>
              Lifting heavy weights (75-85% of max) for fewer
              repetitions&#8203;:citation[oaicite:11]&#8203;
            </li>
            <li>
              Explosive lifting like power cleans, snatches, and push
              press&#8203;:citation[oaicite:10]&#8203;
            </li>
          </ul>
          {/* Add video clips here */}

          <h3>Velocity-Acceleration Method</h3>
          <p>Max effort sprints and jumps to improve speed:</p>
          <ul>
            <li>Max-effort sprints</li>
            <li>Vertical jumps</li>
            <li>Broad jumps</li>
            <li>
              Plyometrics like jump squats and box
              jumps&#8203;:citation[oaicite:9]&#8203;
            </li>
          </ul>
          {/* Add video clips here */}

          <h3>Power (Speed-Strength) Method</h3>
          <p>Combining speed with resistance training:</p>
          <ul>
            <li>Apply resistance to speed movements</li>
            <li>
              Use lower percentages of 1RM (55-70%) and move them as fast as
              possible&#8203;:citation[oaicite:8]&#8203;
            </li>
          </ul>
          {/* Add video demonstrations here */}
        </section>

        {/* Key Insights */}
        <section>
          <h2>Key Insights</h2>
          <h3>Training Tips</h3>
          <p>Enhance your training with these quick tips:</p>
          <ul>
            <li>
              Add a real-time component like dropping a foam roller to improve
              reaction time&#8203;:citation[oaicite:7]&#8203;
            </li>
            <li>
              Body composition affects performance; optimize muscle and fat
              ratios&#8203;:citation[oaicite:6]&#8203;
            </li>
            <li>
              Mimic sport-specific movements and
              conditions&#8203;:citation[oaicite:5]&#8203;
            </li>
          </ul>
          {/* Add short videos or infographics here */}

          <h3>Nutrition and Recovery</h3>
          <p>
            Focus on proper nutrition and recovery to maximize your performance:
          </p>
          <ul>
            <li>Protein for muscle repair and growth</li>
            <li>Carbohydrates for energy before and after training</li>
            <li>
              Hydration for optimal muscle
              function&#8203;:citation[oaicite:4]&#8203;
            </li>
          </ul>

          <h3>Mental Aspect of Speed</h3>
          <p>Visualization and mental training techniques to boost speed:</p>
          <ul>
            <li>Visualization to improve actual performance</li>
            <li>
              Intensity and focus during
              training&#8203;:citation[oaicite:3]&#8203;
            </li>
          </ul>
        </section>

        {/* Implementation Strategy */}
        <section>
          <h2>Implementation Strategy</h2>
          <h3>Creating Your Plan</h3>
          <p>Follow this guide to build a personalized 3-month speed plan:</p>
          <ul>
            <li>Strength focus in the first month</li>
            <li>Power focus in the second month</li>
            <li>
              Raw speed focus in the third
              month&#8203;:citation[oaicite:2]&#8203;
            </li>
          </ul>
          {/* Add interactive tools here */}

          <h3>Tracking Progress</h3>
          <p>Methods for measuring and monitoring your progress:</p>
          <ul>
            <li>
              Use video to record and measure sprint times and jump lengths
            </li>
            <li>
              Baseline performance assessment and ongoing
              tracking&#8203;:citation[oaicite:1]&#8203;
            </li>
          </ul>
          {/* Add tools for recording results here */}

          <h3>Coach Collaboration</h3>
          <p>Tips for integrating your training with on-ice practice:</p>
          <ul>
            <li>
              Work closely with coaching staff to tailor
              workouts&#8203;:citation[oaicite:0]&#8203;
            </li>
          </ul>
        </section>

        {/* Additional Resources */}
        <section>
          <h2>Additional Resources</h2>
          <h3>Extra Reading</h3>
          <p>
            Additional reading materials to deepen your understanding of speed
            training:
          </p>
          <ul>
            <li>
              <a href="https://www.youtube.com/watch?v=_guIwQw5oD4">
                Mechanics and exercises
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=kilhHNBt0X0">
                Best exercises for speed
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=ST4v197AMq8">
                Hockey optimal mechanics
              </a>
            </li>
          </ul>

          <h3>External Videos</h3>
          <p>Links to external video resources for further learning:</p>
          {/* Add external links here */}
        </section>
      </div>
    </article>
  );
}
