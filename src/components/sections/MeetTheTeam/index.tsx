"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BlurText } from "@/components";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  phone?: string;
  imageSrc?: string;
  accent?: "primary" | "secondary";
}

export interface MeetTheTeamProps extends React.ComponentPropsWithoutRef<"section"> {
  members?: TeamMember[];
}

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Kristin Watson",
    role: "CEO & Founder",
    bio: "Leads strategy and partnerships with a focus on trust and measurable outcomes.",
    email: "kristin@vipstudio.com",
    phone: "+1 (206) 555-0199",
    imageSrc: "/viplogocircle.png",
    accent: "primary",
  },
  {
    id: "2",
    name: "Annette Black",
    role: "Head of Strategy",
    bio: "Architects client roadmaps that align brand, growth, and compliance.",
    email: "annette@vipstudio.com",
    phone: "+1 (206) 555-0102",
    imageSrc: "/viplogocircle.png",
    accent: "secondary",
  },
  {
    id: "3",
    name: "Guy Hawkins",
    role: "Creative Director",
    bio: "Elevates concepts into refined multi-channel experiences.",
    email: "guy@vipstudio.com",
    phone: "+1 (206) 555-0177",
    imageSrc: "/viplogocircle.png",
    accent: "primary",
  },
  {
    id: "4",
    name: "Darlene Robertson",
    role: "Performance Lead",
    bio: "Drives acquisition and lifecycle programs with data-backed insight.",
    email: "darlene@vipstudio.com",
    phone: "+1 (206) 555-0144",
    imageSrc: "/viplogocircle.png",
    accent: "secondary",
  },
];

const MeetTheTeam: React.FC<MeetTheTeamProps> = ({ members = DEFAULT_TEAM, className = "", ...props }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`py-24 ${className}`} {...props}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="relative">
          <div className="pointer-events-none absolute -left-6 top-0 bottom-0 hidden lg:flex items-center">
            <span className="font-heading h1 text-primary/10 leading-none -rotate-90 select-none tracking-tight">
              TEAM
            </span>
          </div>

          <div className="mb-14 text-center">
            <BlurText
              as="h2"
              text="Meet the Team"
              className="h2 text-primary"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            <p className="body-default text-primary/70 max-w-2xl mx-auto mt-3">
              Our leadership brings refined execution, strategic thinking, and trustworthy delivery for financial brands.
            </p>
          </div>

          <ul className="space-y-10 lg:space-y-12">
            {members.map((m, idx) => {
              const isActive = activeId === m.id;
              const accentBg = m.accent === "secondary" ? "bg-accent-secondary" : "bg-accent-primary";

              return (
                <li key={m.id} className="grid grid-cols-1 lg:grid-cols-[minmax(0,480px)_1fr] gap-6 items-center">
                  <div className="relative rounded-[40px] overflow-hidden border border-standard shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
                    <div className="aspect-[4/3] w-full relative">
                      <Image
                        src={m.imageSrc || "/viplogocircle.png"}
                        alt={m.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className="object-cover"
                      />
                    </div>

                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`team-details-${m.id}`}
                      onClick={() => handleToggle(m.id)}
                      className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60"
                    >
                      <span className="sr-only">Toggle details for {m.name}</span>
                    </button>

                    <div
                      className={`absolute bottom-0 left-0 right-0 p-6 sm:p-8 transition-all duration-300 ${accentBg} text-primary ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
                      }`}
                      id={`team-details-${m.id}`}
                      role="region"
                      aria-label={`${m.name} details`}
                    >
                      <div className="flex flex-col gap-2">
                        <p className="body-default font-heading">{m.name}</p>
                        <p className="body-default text-primary/80 font-medium">{m.role}</p>
                        <p className="body-default text-primary/80 mt-2">{m.bio}</p>
                        <div className="mt-3 space-y-1">
                          {m.email && (
                            <a href={`mailto:${m.email}`} className="body-default underline decoration-primary/40 hover:decoration-primary">
                              {m.email}
                            </a>
                          )}
                          {m.phone && <p className="body-default">{m.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pl-2 lg:pl-6">
                    <p className="body-default text-primary/70 max-w-prose">
                      Our leadership team is driven by a clear vision and unwavering commitment to our mission.
                    </p>
                    <div className="mt-4">
                      <h3 className="h3 text-primary">{m.name}</h3>
                      <p className="body-default text-primary/70">{m.role}</p>
                    </div>
                    <div className="mt-6 h-px bg-border-standard" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
