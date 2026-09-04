import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  Code2,
  Megaphone,
  Github,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  MessageCircle,
  Award,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  Rocket,
  ArrowRight,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import projPortfolio from "@/assets/project-portfolio.jpg";
import projMarketing from "@/assets/project-marketing.jpg";
import projDesign from "@/assets/project-design.jpg";
import projDjango from "@/assets/project-django.jpg";
import projOne from "@/assets/project1.png";
import projTwo from "@/assets/project2.png";
import projThree from "@/assets/project3.png";
import certificateImg from "@/assets/certificate.svg";
import certificate1 from "@/assets/certificate1.png";
import certificate2 from "@/assets/certificate2.png";
import certificate3 from "@/assets/certificate3.png";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* ---------- helpers ---------- */

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <Reveal>
      <div className="mb-14 flex flex-col items-center text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--gold)]">
          <Sparkles className="h-3 w-3" /> {eyebrow}
        </span>
        <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          <span className="text-gradient-gold">{title}</span>
        </h2>
        {desc && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {desc}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ---------- animated counter ---------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Nav ---------- */

function Navbar({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all ${
            scrolled ? "glass-strong gold-ring" : "glass"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 pl-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-sm font-bold text-black shadow-[var(--shadow-glow)]">
              NM
            </span>
            <span className="hidden font-display text-sm font-semibold sm:block">
              Nicanor Madziko
            </span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-[color:var(--gold)]/10 hover:text-[color:var(--gold)]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-[image:var(--gradient-gold)] px-4 py-2 text-sm font-semibold text-black shadow-[var(--shadow-glow)] transition-transform hover:scale-105 md:inline-flex"
            >
              Hire me
            </a>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-border/60 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Open menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="glass-strong mt-2 rounded-3xl p-3 lg:hidden">
            <ul className="grid gap-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    onClick={() => setOpen(false)}
                    href={`#${n.id}`}
                    className="block rounded-2xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-[color:var(--gold)]/10 hover:text-[color:var(--gold)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-24 pt-36 sm:pt-44 lg:pb-32 lg:pt-48"
    >
      {/* backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "var(--gradient-radial-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,175,55,0.5), transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--gold)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-glow-pulse rounded-full bg-[color:var(--gold)]" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Nicanor <br className="hidden sm:block" />
            <span className="text-gradient-gold">Madziko</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-5 max-w-xl text-base font-medium text-foreground/80 sm:text-lg"
          >
            Digital Marketing Specialist
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Digital Marketing Specialist focused on creating engaging campaigns,
            improving online visibility, and helping businesses achieve measurable growth.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-sm font-semibold text-black shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
            >
              View My Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/cv/Nicanor_Madziko_CV.pdf"
              download
              className="inline-flex items-center justify-center rounded-full border border-border/70 bg-transparent px-6 py-3 text-sm font-semibold text-[color:var(--gold)] transition-colors hover:border-[color:var(--gold)]/40 hover:bg-[color:var(--gold)]/10"
            >
              Download CV
            </a>
          </motion.div>

        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="animate-float relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] opacity-70 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 120deg, rgba(212,175,55,0.5), transparent 40%, rgba(212,175,55,0.3) 70%, transparent)",
              }}
            />
            <div className="glass-strong relative overflow-hidden rounded-[2rem] p-2 gold-ring">
              <img
                src={profileImg}
                alt="Portrait of Nicanor Madziko"
                width={1024}
                height={1280}
                className="h-[520px] w-full rounded-[1.6rem] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[color:var(--gold)]/20" />
            </div>

            {/* floating chip */}
            <div className="glass absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[var(--shadow-elegant)]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                <Code2 className="h-4 w-4" />
              </span>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Currently</div>
                <div className="text-sm font-semibold">Digital Marketing + Growth Strategy</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 flex justify-center">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/30 text-[color:var(--gold)] transition-colors hover:bg-[color:var(--gold)]/10"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="About me"
          title="Crafts meets curiosity"
          desc="A digital marketing specialist obsessed with building thoughtful, useful, beautiful campaigns."
        />
        <div className="flex justify-center">
          <Reveal>
            <div className="glass w-full max-w-2xl rounded-3xl p-8 text-center lg:p-10">
              <h3 className="font-display text-2xl font-semibold">
                Hello, I'm <span className="text-gradient-gold">Nicanor</span>.
              </h3>
              <p className="mt-4 text-center text-muted-foreground">
                I'm a Digital Marketing Specialist who helps businesses grow their online
                presence through content marketing, SEO, social media management, and digital
                marketing strategies that convert audiences into customers.
              </p>
              <p className="mt-4 text-center text-muted-foreground">
                I care deeply about craft, continuous learning, and creating
                campaigns that feel considered from every angle: strategic, accessible,
                and results-driven.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["SEO", "Social Media", "Content Marketing", "Google Ads"].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-sm"
                  >
                    <span className="text-[color:var(--gold)]">◆</span> {t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */

function Skills() {
  const skills = [
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Content Marketing",
    "Google Ads",
  ];
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--gold)]">
            <Sparkles className="h-3 w-3" /> Skills
          </span>
          <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            <span className="text-gradient-gold">A Well-Rounded Marketing Toolkit</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Core digital marketing skills that help businesses grow, attract customers,
            and achieve measurable results.
          </p>
        </div>
        <div className="mx-auto max-w-2xl space-y-4">
          {skills.map((skill, i) => (
            <Reveal key={skill} delay={i * 0.05}>
              <div className="glass rounded-2xl p-5">
                <h3 className="font-display text-lg font-semibold text-center">{skill}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */

function Projects() {
  const projects = [
    {
      title: "Digital Marketing Campaign",
      desc: "Content strategy, ad creative, and analytics — a growth-focused campaign case study.",
      tags: ["Strategy", "Analytics", "Content"],
      img: projOne,
      github: "#",
      demo: "https://canva.link/smart-trading-system",
    },
    {
      title: "Marketing Campaign for Personal Branding Agencies",
      desc: "A strategic campaign designed to elevate personal branding agencies through compelling messaging and stronger audience engagement.",
      tags: ["Brand Strategy", "Campaign", "Growth"],
      img: projTwo,
      github: "#",
      demo: "https://canva.link/digital-marketing-campaign",
    },
    {
      title: "Social Media Campaign",
      desc: "A multi-channel social strategy designed to grow visibility, engagement, and audience connection across platforms.",
      tags: ["Social Media", "Strategy", "Growth"],
      img: projThree,
      github: "#",
      demo: "https://canva.link/forex-education-strategy",
    },
  ];
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects"
          desc="A snapshot of the products, tools, and campaigns I've been building."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-[color-mix(in_oklab,var(--card)_55%,transparent)] backdrop-blur-[20px] saturate-[140%] hover-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/5 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--gold)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {(p.github || p.demo) && (
                    <div className="mt-5 flex gap-2">
                      {p.github && (
                        <a
                          href={p.github}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border/70 px-3 py-2 text-xs font-semibold transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
                        >
                          <Github className="h-3.5 w-3.5" /> GitHub
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-gold)] px-3 py-2 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Certifications ---------- */

function Certifications() {
  const certs = [
    {
      title: "COURSERA: Digital Marketing SEO, PPC and Social Media",
      org: "Coursera",
      date: "2026",
      href: "https://www.coursera.org/account/accomplishments/verify/BK99F9F7OG6L",
    },
    {
      title: "COURSERA: Social Media and Digital Marketing Fundamentals",
      org: "Coursera",
      date: "2026",
      href: "#",
    },
    {
      title: "COURSERA: Foundations of Digital Marketing and E-commerce",
      org: "Coursera",
      date: "2026",
      href: "#",
    },
  ];
  return (
    <section id="certifications" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Certifications"
          title="Always learning"
          desc="A growing library of qualifications from trusted programs."
        />
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="glass hover-lift group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-4 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[color:var(--gold)]/10 via-transparent to-white/10">
                  <img
                    src={i === 0 ? certificate1 : i === 1 ? certificate2 : certificate3}
                    alt="Certificate preview"
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.18), transparent 60%)",
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold">
                    {c.title}
                  </h3>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {c.org} · {c.date}
                  </div>
                  <a
                    href={c.href}
                    target={c.href === "#" ? undefined : "_blank"}
                    rel={c.href === "#" ? undefined : "noopener noreferrer"}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[color:var(--gold)]/30 px-3 py-1.5 text-xs font-semibold text-[color:var(--gold)] transition-colors hover:bg-[color:var(--gold)]/10"
                  >
                    View Certificate <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */

function Experience() {
  const items = [
    {
      icon: GraduationCap,
      period: "2024",
      title: "O-Level Certificate",
      org: "Completed my O-Level studies",
      desc: "Graduated with my O-Level certificate in 2024.",
    },
    {
      icon: Award,
      period: "2026",
      title: "Student at Uncommon.org",
      org: "Currently studying",
      desc: "Pursuing growth and learning as a student at Uncommon.org in 2026.",
    },
  ];
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Journey"
          title="Experience & Education"
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-[color:var(--gold)]/25 sm:left-1/2" />
          <div className="space-y-8">
            {items.map((it, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div
                    className={`relative grid grid-cols-[32px_1fr] gap-4 sm:grid-cols-2 sm:gap-10 ${
                      left ? "" : "sm:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div
                      className={`hidden sm:block ${
                        left ? "text-right" : "text-left"
                      }`}
                    />
                    <div className="relative col-start-2 min-w-0 sm:col-start-auto">
                      <span className="absolute -left-[26px] top-4 grid h-8 w-8 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-background text-[color:var(--gold)] sm:left-auto sm:-translate-x-1/2 sm:right-full sm:mr-[-14px]">
                        <it.icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="glass hover-lift rounded-2xl p-5">
                        <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
                          {it.period}
                        </div>
                        <div className="mt-1 font-display text-lg font-semibold">
                          {it.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {it.org}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {it.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const items = [
    { icon: Mail, label: "Email", value: "tinayemadziko@gmail.com", href: "mailto:tinayemadziko@gmail.com" },
    { icon: Phone, label: "Phone", value: "+263 772 731 182", href: "tel:+263772731182" },
    { icon: Linkedin, label: "LinkedIn", value: "/in/nicanor-madziko", href: "https://www.linkedin.com/in/nicanor-madziko-5862043b7" },
    { icon: Github, label: "GitHub", value: "@nicanormadziko", href: "#" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with me", href: "https://wa.me/263772731182" },
    { icon: MapPin, label: "Location", value: "Harare, Zimbabwe", href: "#" },

  ];
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build together"
          desc="Have a project, role, or idea? I'd love to hear about it."
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setSent(false), 4000);
              }}
              className="glass rounded-3xl p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your full name" />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="mt-5">
                <Field label="Subject" name="subject" placeholder="Project inquiry" />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a bit about what you're working on…"
                  className="w-full resize-none rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--gold)]/50 focus:ring-2 focus:ring-[color:var(--gold)]/20"
                />
              </div>
              <button
                type="submit"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-sm font-semibold text-black shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
              >
                {sent ? "Message sent ✓" : "Send message"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="glass hover-lift group flex items-start gap-3 rounded-2xl p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--gold)]/12 text-[color:var(--gold)] transition-colors group-hover:bg-[color:var(--gold)]/25">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {it.label}
                    </div>
                    <div className="truncate font-medium">{it.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--gold)]/50 focus:ring-2 focus:ring-[color:var(--gold)]/20"
      />
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-sm font-bold text-black">
              NM
            </span>
            <span className="font-display text-base font-semibold">
              Nicanor Madziko
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Building digital marketing campaigns, user-centered brands, and
            strategic digital experiences that drive measurable results.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
            Navigate
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
            Elsewhere
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/nicanor-madziko-5862043b7", label: "LinkedIn" },
              { icon: Mail, href: "mailto:tinayemadziko@gmail.com", label: "Email" },
              { icon: MessageCircle, href: "#", label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-[color:var(--gold)]/40 hover:bg-[color:var(--gold)]/10 hover:text-[color:var(--gold)]"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-border/60 px-4 pt-6 text-xs text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Nicanor Madziko. All rights reserved.</div>
        <div>Designed & Developed by Nicanor Madziko</div>
      </div>
    </footer>
  );
}

/* ---------- Back to top + progress ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div
      style={{ scaleX: w, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-[image:var(--gradient-gold)]"
    />
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-black shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------- Root component ---------- */

function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);
  return (
    <div className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      <ScrollProgress />
      <Navbar
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
