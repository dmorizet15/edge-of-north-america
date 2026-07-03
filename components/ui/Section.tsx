import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Background tone class for the section band. */
  className?: string;
  /** Full viewport height by default; set false for content-height bands. */
  full?: boolean;
  id?: string;
  /** Center content vertically. */
  center?: boolean;
}

/**
 * A section band. Handles vertical rhythm; every section composes its own
 * interior. Kept intentionally thin so each chapter stays handcrafted.
 */
export default function Section({
  children,
  className = "",
  full = false,
  id,
  center = false,
}: Props) {
  return (
    <section
      id={id}
      className={`relative w-full ${full ? "min-h-screen" : ""} ${
        center ? "flex flex-col items-center justify-center" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
