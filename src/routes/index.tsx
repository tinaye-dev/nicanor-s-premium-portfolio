import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  Code2,
  Palette,
  Megaphone,
  Wrench,
  Github,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  MessageCircle,
  Download,
  Award,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Rocket,
  ArrowRight,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import projForex from "@/assets/project-forex.jpg";

import projDesign from "@/assets/project-design.jpg";
import projPortfolio from "@/assets/project-portfolio.jpg";
import projMarketing from "@/assets/project-marketing.jpg";

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
  { id: "resume", label: "Resume" },
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
            Product Designer{" "}
            <span className="text-[color:var(--gold)]">·</span> Digital Marketing
            Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            User-centered digital products and solutions that solve real-world
            problems.
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
              href="https://www.canva.com/design/DAHQFyAq00Q/3I7M7QrHo2BC9Q_wWtLy0w/edit?ui=e30"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-[color:var(--gold)]/10"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-6"
          >
            {[
              { n: 15, s: "+", l: "Projects" },
              { n: 100, s: "%", l: "Dedication" },

            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-bold text-gradient-gold sm:text-4xl">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
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
                <div className="text-sm font-semibold">Django + Design</div>
              </div>
            </div>
            <div className="glass absolute -right-4 top-8 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
              Awwwards-inspired
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
  const timeline = [
    {
      year: "2023",
      title: "Product Design",
      desc: "Picked up UI/UX in Figma and started designing thoughtful interfaces.",
    },
    {
      year: "2024",
      title: "Digital Marketing & Automation",
      desc: "Google Digital Marketing certification and Forex trading bot in MQL5.",
    },
  ];

  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="About me"
          title="Craft meets curiosity"
          desc="A developer and designer obsessed with building thoughtful, useful, beautiful things."
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="glass rounded-3xl p-8 lg:p-10">
              <h3 className="font-display text-2xl font-semibold">
                Hello, I'm <span className="text-gradient-gold">Nicanor</span>.
              </h3>
              <p className="mt-4 text-muted-foreground">
                I'm a software developer and product designer with a passion for
                building modern web applications, elegant interfaces, and
                digital solutions that matter. My work sits at the intersection
                of engineering, design, and marketing — because great products
                need all three.
              </p>
              <p className="mt-4 text-muted-foreground">
                I care deeply about craft, continuous learning, and shipping
                work that feels considered from every angle: fast, accessible,
                beautiful, and honest.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Python", "Django", "Figma", "UI/UX"].map((t) => (
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

          <Reveal delay={0.1}>
            <ol className="relative border-l border-[color:var(--gold)]/25 pl-6">
              {timeline.map((t, i) => (
                <li key={i} className="mb-8 last:mb-0">
                  <span className="absolute -left-[7px] mt-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[image:var(--gradient-gold)] shadow-[0_0_0_4px_var(--background)]" />
                  <div className="glass hover-lift rounded-2xl p-5">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
                      {t.year}
                    </div>
                    <div className="font-display text-lg font-semibold">
                      {t.title}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */

function Skills() {
  const groups = [
    {
      icon: Palette,
      title: "Design",
      items: [
        { name: "Figma", level: 88 },
        { name: "Canva", level: 92 },
        { name: "UI/UX Design", level: 85 },
        { name: "Product Design", level: 80 },
      ],
    },
    {
      icon: Megaphone,
      title: "Marketing",
      items: [
        { name: "Digital Marketing", level: 82 },
        { name: "Content Strategy", level: 78 },
        { name: "Prompt Engineering", level: 88 },
      ],
    },
    {
      icon: Wrench,
      title: "Tools",
      items: [
        { name: "Canva", level: 92 },
        { name: "ChatGPT", level: 90 },
        { name: "Figma", level: 90 },
      ],

    },
  ];
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Skills"
          title="A well-rounded toolkit"
          desc="Curated skills across engineering, design, and growth."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.05}>
              <div className="glass hover-lift group h-full rounded-3xl p-7">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--gold)]/12 text-[color:var(--gold)] transition-colors group-hover:bg-[color:var(--gold)]/20">
                    <g.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">
                    {g.title}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {g.items.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <li ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary/70">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full rounded-full bg-[image:var(--gradient-gold)]"
          style={{ boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
        />
      </div>
    </li>
  );
}

/* ---------- Projects ---------- */

function Projects() {
  const projects = [
    {
      title: "Forex Trading Bot",
      desc: "Automated trading strategy engineered in MQL5 with risk management, entry logic, and back-tested performance.",
      tags: ["MQL5", "Automation", "Trading"],
      img: projForex,
      github: "#",
      demo: "#",
    },
    {
      title: "Product Design Case Study",
      desc: "End-to-end product design in Figma — research, wireframes, high-fidelity UI, and interaction prototypes.",
      tags: ["Figma", "UI/UX", "Prototyping"],
      img: projDesign,
      github: "#",
      demo: "#",
    },
    {
      title: "Portfolio Website",
      desc: "Premium personal portfolio with glassmorphism, motion, and a focused design system.",
      tags: ["React", "Tailwind", "Motion"],
      img: projPortfolio,
      github: "#",
      demo: "#",
    },
    {
      title: "Digital Marketing Campaign",
      desc: "Content strategy, ad creative, and analytics — a growth-focused campaign case study.",
      tags: ["Strategy", "Analytics", "Content"],
      img: projMarketing,
      github: "#",
      demo: "#",
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
              <article className="glass hover-lift group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                  <div className="mt-5 flex gap-2">
                    <a
                      href={p.github}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border/70 px-3 py-2 text-xs font-semibold transition-colors hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                    <a
                      href={p.demo}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-gold)] px-3 py-2 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  </div>
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
    { title: "Product Design Certificate", org: "Design Program", date: "2024" },
    {
      title: "Fundamentals of Digital Marketing",
      org: "Google Digital Garage",
      date: "2024",
    },
    { title: "Future Certifications", org: "Continuous learner", date: "Ongoing" },
  ];
  return (
    <section id="certifications" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Certifications"
          title="Always learning"
          desc="A growing library of qualifications from trusted programs."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="glass hover-lift group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[color:var(--gold)]/12 via-transparent to-black/40">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.5), transparent 60%)",
                    }}
                  />
                  <Award className="relative h-14 w-14 text-[color:var(--gold)] transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-6 bottom-6 rounded-xl border border-[color:var(--gold)]/25 bg-black/50 px-3 py-2 text-center text-[11px] uppercase tracking-widest text-[color:var(--gold)] backdrop-blur">
                    Certificate
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold">
                    {c.title}
                  </h3>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {c.org} · {c.date}
                  </div>
                  <a
                    href="#"
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
      period: "2023 — Present",
      title: "Studied at Uncommon.org",
      org: "Uncommon.org",
      desc: "Skills-based learning program focused on design, digital, and career readiness.",
    },
    {
      icon: GraduationCap,
      period: "2023 — Present",
      title: "Self-directed Learning",
      org: "UI/UX & Digital Marketing",
      desc: "Continuous, project-based learning across design and growth.",
    },
    {
      icon: Award,
      period: "2024",
      title: "Google Digital Marketing",
      org: "Certification",
      desc: "Fundamentals of Digital Marketing — strategy, SEO, content, analytics.",
    },
    {
      icon: Rocket,
      period: "2024",
      title: "Forex Trading Bot",
      org: "Personal Project",
      desc: "Designed and shipped an MQL5 automated trading strategy.",
    },
    {
      icon: Briefcase,
      period: "2024 — Present",
      title: "Freelance Design Work",
      org: "Independent",
      desc: "Delivering product and brand design work for real clients.",
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
                    <div className="relative">
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

/* ---------- Resume ---------- */

function Resume() {
  return (
    <section id="resume" className="relative py-28">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-10 lg:p-14 gold-ring">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.6), transparent)",
              }}
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[color:var(--gold)]">
              Resume
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              A snapshot of my <span className="text-gradient-gold">professional story</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Python & Django developer, product designer, and digital marketing
              enthusiast. I combine engineering rigor, design sensibility, and
              growth thinking to build products that are useful, usable, and
              delightful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.canva.com/design/DAHQFyAq00Q/3I7M7QrHo2BC9Q_wWtLy0w/edit?ui=e30"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-sm font-semibold text-black shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[color:var(--gold)]/10"
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
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
            Building modern web apps, user-centered products, and digital
            solutions that solve real-world problems.
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
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
