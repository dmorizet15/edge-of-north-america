import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";

/**
 * Melissa's Questions. The worries, answered in a single calm sentence each,
 * with a great deal of quiet around them. Never argue, never defend — just
 * meet each hesitation and let it settle.
 */
const QA = [
  {
    q: "Isn't it a lot of driving?",
    a: "Less than it looks. The biggest distances are handled by the two ferries, and the island is crossed in one direction — never twice.",
  },
  {
    q: "The ferry sounds like a whole ordeal.",
    a: "It's the easy part. A cabin, dinner, a deck full of stars, and you sleep across the water instead of driving it.",
  },
  {
    q: "Won't charging the car be stressful?",
    a: "It's planned around meals and viewpoints — the car tops up while we're already stopped somewhere worth stopping.",
  },
  {
    q: "Is it too remote?",
    a: "That's the point, and it's also comfortable — real inns, real dinners, warm rooms. Remote in feeling, not in hardship.",
  },
  {
    q: "Will we come home exhausted?",
    a: "Fogo is two nights of doing nothing, built in on purpose. We come home rested, not wrung out.",
  },
  {
    q: "Is it worth going this far?",
    a: "Very few places in North America still feel this undiscovered. That's the whole reason to choose it.",
  },
];

export default function MelissasQuestions() {
  return (
    <section className="w-full bg-navy px-[clamp(1.4rem,5vw,5rem)] py-[16vh]">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <ChapterLabel index="23" label="The Quiet Questions" align="center" />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-reading text-center font-serif text-[clamp(1.5rem,3.2vw,2.4rem)] font-light italic leading-relaxed text-paper/85">
            Every real trip has a few. Here are ours, already answered.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col divide-y divide-paper/12">
          {QA.map((item, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="grid grid-cols-1 gap-3 py-10 md:grid-cols-12 md:gap-8">
                <h3 className="font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] font-normal leading-snug tracking-title text-paper md:col-span-5">
                  {item.q}
                </h3>
                <p className="font-sans text-[clamp(0.98rem,1.5vw,1.1rem)] font-light leading-relaxed text-paper/65 md:col-span-7">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
