import type { TripDay, TripStop } from "@/lib/trip-types";
import EditorialImage from "@/components/ui/EditorialImage";
import DayMap from "@/components/DayMap";
import Reveal from "@/components/ui/Reveal";

/**
 * One day of a trip, rendered as a luxury expedition spread: a cinematic photo
 * band, an hour-by-hour timeline, a practical sidebar with the day's map, a
 * recurring "Tonight's Sky" dark-sky callout where it makes sense, and a
 * "Today's Memory" close. Registry-agnostic — any trip's <TripDay/> renders
 * here. National Geographic expedition guide, never a spreadsheet.
 */
export default function TripDayChapter({ day }: { day: TripDay }) {
  return (
    <section
      id={`day-${day.n}`}
      className="relative w-full border-t border-paper/10 bg-nearblack"
    >
      {day.photo ? (
        <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
          <EditorialImage photo={day.photo} fill drift />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nearblack via-black/30 to-black/40" />
          <div className="absolute inset-0 flex items-end p-[clamp(1.6rem,5vw,4.5rem)]">
            <Header day={day} />
          </div>
        </div>
      ) : (
        <div className="px-[clamp(1.6rem,5vw,4.5rem)] pt-[16vh]">
          <Header day={day} />
        </div>
      )}

      <div className="mx-auto max-w-6xl px-[clamp(1.4rem,5vw,4.5rem)] py-[9vh]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* The day, hour by hour */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-paper/55">The day</span>
            </Reveal>
            <ol className="mt-8">
              <Moment label="Morning" body={day.morningLocation} />
              <Moment label="Breakfast" body={day.breakfast} />
              <Moment label="Drive" body={day.drive} accent />
              {day.stops.map((s, i) => (
                <StopMoment key={i} stop={s} />
              ))}
              <Moment label="Lunch" body={day.lunch} />
              <Moment label="Afternoon" body={day.afternoon} />
              <Moment label="Dinner" body={day.dinner} />
              <Moment label="Evening" body={day.evening} last />
            </ol>
          </div>

          {/* Practical detail + map */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-sm border border-paper/10 bg-black/20 p-6">
                <DayMap points={day.map} />
                <dl className="mt-6 divide-y divide-paper/10">
                  <Detail label="Stay" value={day.hotel} />
                  <Detail label="Drive" value={day.drive} />
                  <Detail label="On foot" value={day.walking} />
                  <Detail label="Charging" value={day.charging} />
                  <Detail label="If it rains" value={day.rainy} />
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Tonight's Sky — the recurring dark-sky element, only where it fits */}
        {day.sky && (
          <Reveal>
            <figure className="mt-16 flex gap-5 rounded-sm border border-ice/20 bg-navy/25 p-6 sm:gap-6 sm:p-8">
              <StarMark />
              <div>
                <figcaption className="eyebrow text-ice" style={{ fontSize: "0.6rem" }}>
                  Tonight&rsquo;s sky
                </figcaption>
                <p className="mt-3 max-w-3xl font-sans text-[clamp(0.98rem,1.6vw,1.15rem)] font-light leading-relaxed text-paper/85">
                  {day.sky}
                </p>
              </div>
            </figure>
          </Reveal>
        )}

        {/* Today's Memory */}
        <Reveal>
          <figure className="mt-16 border-l-2 border-amber pl-6 sm:pl-10">
            <figcaption className="eyebrow text-amber" style={{ fontSize: "0.6rem" }}>
              Today&rsquo;s memory
            </figcaption>
            <blockquote className="mt-4 max-w-3xl font-serif text-[clamp(1.35rem,2.8vw,2.1rem)] font-normal italic leading-snug tracking-title text-paper/95">
              {day.memory}
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function Header({ day }: { day: TripDay }) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="eyebrow tabular-nums text-amber">Day {day.n}</span>
          <span className="h-px w-8 bg-paper/30" aria-hidden />
          <span className="eyebrow text-paper/70">{day.region}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h3 className="mt-5 font-serif text-[clamp(2rem,5vw,3.6rem)] font-normal leading-[1.02] tracking-title text-paper">
          {day.title}
        </h3>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-4 max-w-xl font-serif text-[clamp(1rem,1.8vw,1.35rem)] font-light italic leading-relaxed text-paper/75">
          {day.subtitle}
        </p>
      </Reveal>
      <Reveal delay={0.22}>
        <p className="eyebrow mt-6 text-paper/45" style={{ fontSize: "0.6rem" }}>
          {day.leg}
        </p>
      </Reveal>
    </div>
  );
}

function Moment({
  label,
  body,
  accent = false,
  last = false,
}: {
  label: string;
  body: string;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <Reveal>
      <li className="relative grid grid-cols-[7rem_1fr] gap-5 pb-8">
        <span
          className="absolute left-[7rem] top-2 h-full w-px -translate-x-1/2 bg-paper/12"
          aria-hidden
          style={last ? { display: "none" } : undefined}
        />
        <span className="pt-1 text-right">
          <span className="eyebrow text-paper/50">{label}</span>
        </span>
        <span className="relative">
          <span
            className={`absolute -left-[calc(1.25rem+1px)] top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
              accent ? "bg-amber" : "bg-paper/40"
            }`}
            aria-hidden
          />
          <p className="font-sans text-[clamp(0.95rem,1.4vw,1.05rem)] font-light leading-relaxed text-paper/80">
            {body}
          </p>
        </span>
      </li>
    </Reveal>
  );
}

function StopMoment({ stop }: { stop: TripStop }) {
  return (
    <Reveal>
      <li className="relative grid grid-cols-[7rem_1fr] gap-5 pb-8">
        <span
          className="absolute left-[7rem] top-2 h-full w-px -translate-x-1/2 bg-paper/12"
          aria-hidden
        />
        <span className="pt-1 text-right">
          <span className="eyebrow text-amber">{stop.ferry ? "Ferry" : "Stop"}</span>
          {stop.time && (
            <span className="mt-1 block font-sans text-[0.7rem] tabular-nums text-paper/45">
              {stop.time}
            </span>
          )}
        </span>
        <span className="relative">
          <span
            className="absolute -left-[calc(1.25rem+1px)] top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber"
            aria-hidden
          />
          <h4 className="font-serif text-[clamp(1.1rem,1.9vw,1.45rem)] font-normal leading-snug tracking-title text-paper">
            {stop.name}
          </h4>
          <p className="mt-2 font-sans text-[clamp(0.92rem,1.35vw,1.02rem)] font-light leading-relaxed text-paper/70">
            {stop.note}
          </p>
        </span>
      </li>
    </Reveal>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
      <dt className="eyebrow pt-0.5 text-amber/90" style={{ fontSize: "0.58rem" }}>
        {label}
      </dt>
      <dd className="font-sans text-[0.92rem] font-light leading-relaxed text-paper/75">
        {value}
      </dd>
    </div>
  );
}

function StarMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-1 h-5 w-5 shrink-0"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"
        fill="#C7D8DF"
        opacity="0.9"
      />
      <circle cx="18.5" cy="5.5" r="0.9" fill="#C7D8DF" opacity="0.7" />
      <circle cx="5" cy="16" r="0.7" fill="#C7D8DF" opacity="0.6" />
    </svg>
  );
}
