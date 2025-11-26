"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { User } from "lucide-react";
import BlurText from "@/components/shared/BlurText";
import { urlFor } from "@/lib/sanity/image";

interface TeamMemberCard {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  email: string;
  phone: string;
  portrait: string;
  employeeId: string;
}

const teamMembers: TeamMemberCard[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    role: "Creative Director",
    department: "Creative",
    bio: "Visionary leader with 15+ years crafting brand narratives that resonate. Transforms complex ideas into compelling visual stories.",
    email: "a.chen@vipcreative.com",
    phone: "+1 (555) 123-4001",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    employeeId: "VIP-CD001"
  },
  {
    id: "2",
    name: "Marcus Rivera",
    role: "Data Strategist",
    department: "Analytics",
    bio: "Numbers whisperer who turns metrics into actionable insights. Specializes in predictive analytics and performance optimization.",
    email: "m.rivera@vipcreative.com",
    phone: "+1 (555) 123-4002",
    portrait: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=500&fit=crop",
    employeeId: "VIP-DS002"
  },
  {
    id: "3",
    name: "Sarah Mitchell",
    role: "Brand Consultant",
    department: "Strategy",
    bio: "Strategic thinker with a passion for building authentic brand connections. Expert in market positioning and consumer psychology.",
    email: "s.mitchell@vipcreative.com",
    phone: "+1 (555) 123-4003",
    portrait: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    employeeId: "VIP-BC003"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Digital Marketing Lead",
    department: "Marketing",
    bio: "Growth hacker who drives results through innovative campaigns. Expertise in SEO, SEM, and conversion rate optimization.",
    email: "d.kim@vipcreative.com",
    phone: "+1 (555) 123-4004",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    employeeId: "VIP-DM004"
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    role: "UX Design Principal",
    department: "Design",
    bio: "User advocate who creates intuitive digital experiences. Bridges the gap between aesthetics and functionality with human-centered design.",
    email: "e.rodriguez@vipcreative.com",
    phone: "+1 (555) 123-4005",
    portrait: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop",
    employeeId: "VIP-UX005"
  }
];

interface TeamIDCardsProps extends React.ComponentPropsWithoutRef<'section'> {
  sanityMembers?: any[];
}

const TeamIDCards: React.FC<TeamIDCardsProps> = ({
  className = "",
  sanityMembers,
  ...props
}) => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const resolvedMembers: TeamMemberCard[] =
    sanityMembers && Array.isArray(sanityMembers) && sanityMembers.length > 0
      ? sanityMembers.map((doc: any, index: number) => {
          const fallback = teamMembers[index] ?? teamMembers[0];
          const portraitFromSanity = doc?.photo ? urlFor(doc.photo).url() : undefined;

          return {
            id: doc._id || fallback.id,
            name: doc.name ?? fallback.name,
            role: doc.role ?? fallback.role,
            department: fallback.department,
            bio: doc.bio ?? fallback.bio,
            email: "",
            phone: "",
            portrait: portraitFromSanity ?? fallback.portrait,
            employeeId: fallback.employeeId,
          };
        })
      : teamMembers;

  const handleCardClick = (id: string) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section className={`py-24 px-4 relative overflow-hidden ${className}`} {...props}>
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="h2 text-primary max-w-3xl mx-auto">
            <BlurText
              as="span"
              text="Meet Your"
              className="inline"
              textClassName="text-primary"
              delay={30}
              animateBy="words"
              direction="top"
            />
            {" "}
            <BlurText
              as="span"
              text="Fractional Partners"
              className="inline"
              textClassName="text-accent-primary font-black"
              delay={40}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="subtext-large text-primary/60 max-w-2xl mx-auto">
            The creative minds and strategic thinkers behind your success
          </p>
        </div>

        {/* Subtle brand background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-accent-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-accent-secondary/10 rounded-full blur-3xl" />
        </div>

        {/* ID Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {resolvedMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group perspective-1000"
            >
              {/* Lanyard Hook */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 z-20">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-linear-to-b from-border-standard to-text-primary/60 rounded-full" />
                  <div className="absolute inset-[3px] bg-linear-to-b from-border-standard to-text-primary/50 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-6 bg-linear-to-b from-text-primary/70 to-text-primary rounded-sm" />
                </div>
              </div>

              {/* ID Card Container */}
              <div
                className="relative cursor-pointer transform-style-3d transition-transform duration-700"
                style={{
                  transform: flippedCard === member.id ? "rotateY(180deg)" : "rotateY(0)",
                  transformStyle: "preserve-3d"
                }}
                onClick={() => handleCardClick(member.id)}
                role="button"
                tabIndex={0}
                aria-expanded={flippedCard === member.id}
                aria-controls={`member-back-${member.id}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(member.id);
                  }
                }}
              >
                {/* Front of Card */}
                <div 
                  className="relative bg-white rounded-xl overflow-hidden border-2 border-standard backface-hidden h-[400px] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Portrait - Fills entire card */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={member.portrait}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-text-primary/70 z-10" />

                  {/* VIP Logo Watermark */}
                  <div className="absolute top-3 right-3 w-16 h-16 md:w-20 md:h-20 opacity-60 z-20">
                    <Image
                      src="/viplogotransparentblack.png"
                      alt="VIP Logo"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Bottom Info Strip */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-accent-primary via-accent-primary to-accent-secondary p-4 z-20">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg text-white leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-sm text-white/95 leading-tight">
                          {member.role}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`View details for ${member.name}`}
                        aria-expanded={flippedCard === member.id}
                        aria-controls={`member-back-${member.id}`}
                        onClick={(e) => { e.stopPropagation(); handleCardClick(member.id); }}
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-accent-secondary text-accent-primary text-xs font-semibold px-3 py-1 hover:bg-accent-secondary/90 focus:outline-none focus:ring-2 focus:ring-accent-secondary/60"
                      >
                        <User className="w-3 h-3 text-accent-primary" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div 
                  id={`member-back-${member.id}`}
                  className="absolute inset-0 bg-linear-to-br from-primary via-primary/95 to-accent-primary rounded-xl overflow-hidden border-2 border-accent-primary/30 backface-hidden p-4 h-[400px] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  {/* VIP Logo Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <div className="relative w-48 h-48">
                      <Image
                        src="/viplogotransparentblack.png"
                        alt="VIP Logo"
                        fill
                        className="object-contain filter invert"
                      />
                    </div>
                  </div>

                  {/* Back Content */}
                  <div className="relative h-full flex flex-col justify-between text-white">
                    <div>
                      <h4 className="font-heading font-bold text-lg mb-3">
                        About
                      </h4>
                      <p className="text-sm leading-relaxed opacity-90">
                        {member.bio}
                      </p>
                    </div>

                    {/* Contact details intentionally omitted per design preferences */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamIDCards;
