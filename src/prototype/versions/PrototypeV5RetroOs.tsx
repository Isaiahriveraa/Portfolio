"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useDragControls, useReducedMotion } from "framer-motion";
import { FileText, Folder, Github, Linkedin, Mail, Minus, User, X } from "lucide-react";
import {
  prototypeActivities,
  prototypeProfile as p,
  prototypeProjects,
  prototypeSkillGroups,
} from "../prototype-content";
import { usePrototypeCopy } from "../prototype-shared";

const pixel = "font-[family-name:var(--prototype-pixelify)]";
const mono = "font-[family-name:var(--prototype-plex-mono)]";
const grotesk = "font-[family-name:var(--prototype-space-grotesk)]";

type PrototypeV5WindowId = "welcome" | "projects" | "about" | "contact";

const prototypeV5Windows: Record<
  PrototypeV5WindowId,
  { title: string; x: string; y: string; w: string; h?: string }
> = {
  welcome: { title: "welcome.exe", x: "max(150px, 9vw)", y: "34px", w: "min(600px, 43vw)" },
  projects: { title: "C:\\Yonie\\Projects", x: "calc(100% - min(620px, 44vw) - 40px)", y: "56px", w: "min(620px, 44vw)", h: "520px" },
  about: { title: "about_me.txt", x: "max(120px, 7vw)", y: "468px", w: "min(560px, 40vw)", h: "330px" },
  contact: { title: "Contact", x: "calc(100% - min(560px, 40vw) - 90px)", y: "604px", w: "min(560px, 40vw)" },
};

function usePrototypeIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

function PrototypeV5Button({
  children,
  onClick,
  href,
  className = "",
  newTab = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  newTab?: boolean;
}) {
  const cls = `prototype-v5-raised inline-flex items-center justify-center gap-2 px-4 py-1.5 text-[14px] text-[#0a0a0a] active:translate-x-px active:translate-y-px focus-visible:outline-dotted focus-visible:outline-1 focus-visible:-outline-offset-4 ${className}`;
  if (href)
    return (
      <a href={href} className={cls} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function PrototypeV5Window({
  id,
  active,
  z,
  desktop,
  constraints,
  onFocus,
  onClose,
  onMinimize,
  children,
}: {
  id: PrototypeV5WindowId;
  active: boolean;
  z: number;
  desktop: boolean;
  constraints: React.RefObject<HTMLDivElement | null>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
}) {
  const controls = useDragControls();
  const reduce = useReducedMotion();
  const cfg = prototypeV5Windows[id];
  return (
    <motion.section
      id={`prototype-v5-${id}`}
      aria-label={cfg.title}
      drag={desktop}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={constraints}
      dragElastic={0}
      onPointerDown={onFocus}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18 }}
      className="prototype-v5-raised relative flex w-full scroll-mt-4 flex-col p-[3px] lg:absolute lg:left-[var(--prototype-x)] lg:top-[var(--prototype-y)] lg:h-[var(--prototype-h)] lg:w-[var(--prototype-w)]"
      style={
        {
          zIndex: z,
          "--prototype-x": cfg.x,
          "--prototype-y": cfg.y,
          "--prototype-w": cfg.w,
          "--prototype-h": cfg.h ?? "auto",
        } as React.CSSProperties
      }
    >
      <div
        onPointerDown={(e) => desktop && controls.start(e)}
        className={`${active ? "prototype-v5-title" : "prototype-v5-title-idle"} flex h-7 shrink-0 select-none items-center justify-between pl-2 pr-[3px] text-white ${desktop ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        <span className={`${pixel} truncate text-[14px] tracking-wide`}>{cfg.title}</span>
        <span className="flex gap-[2px]">
          <button type="button" aria-label={`Minimize ${cfg.title}`} onClick={onMinimize} className="prototype-v5-raised flex h-[20px] w-[22px] items-center justify-center text-[#0a0a0a]">
            <Minus size={12} strokeWidth={3} />
          </button>
          <button type="button" aria-label={`Close ${cfg.title}`} onClick={onClose} className="prototype-v5-raised flex h-[20px] w-[22px] items-center justify-center text-[#0a0a0a]">
            <X size={12} strokeWidth={3} />
          </button>
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.section>
  );
}

function PrototypeV5Projects() {
  const [selected, setSelected] = useState(0);
  const project = prototypeProjects[selected];
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className={`${mono} flex items-center gap-2 border-b border-[#808080] px-2 py-1.5 text-[12px] text-[#0a0a0a]`}>
        <span className="text-[#404040]">Address</span>
        <span className="prototype-v5-sunken flex-1 truncate px-2 py-0.5">C:\Yonie\Projects\{project.title}</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-[3px] p-[3px] sm:grid-cols-[180px_1fr]">
        <ul className="prototype-v5-sunken overflow-auto p-1" role="listbox" aria-label="Projects">
          {prototypeProjects.map((pr, i) => (
            <li key={pr.id}>
              <button
                type="button"
                role="option"
                aria-selected={i === selected}
                onClick={() => setSelected(i)}
                className={`${mono} flex w-full items-center gap-2 px-1.5 py-1 text-left text-[13px] ${
                  i === selected ? "bg-[#1b1bb3] text-white" : "text-[#0a0a0a] hover:bg-[#dcdcf5]"
                }`}
              >
                <Folder size={16} className={i === selected ? "text-[#ffe16b]" : "text-[#d4a400]"} fill="currentColor" />
                <span className="truncate">{pr.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="prototype-v5-sunken flex min-h-0 flex-col overflow-auto p-3 text-[#0a0a0a]">
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border border-[#808080] bg-[#0a0a0a]">
            <Image key={project.id} src={project.image} alt={`${project.title} screenshot`} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover object-top" />
          </div>
          <p className={`${pixel} mt-3 text-[13px] text-[#1b1bb3]`}>{project.context}</p>
          <h3 className={`${grotesk} text-[22px] font-bold leading-tight`}>{project.title}</h3>
          <p className={`${mono} mt-1.5 text-[13px] leading-relaxed`}>{project.description}</p>
          <p className={`${mono} mt-2 text-[12px] text-[#404040]`}>Built with: {project.stack.join(", ")}</p>
          <div className="mt-3">
            <PrototypeV5Button href={project.url} newTab className={pixel}>
              Visit {project.displayUrl}
            </PrototypeV5Button>
          </div>
        </div>
      </div>
      <div className={`${mono} flex gap-[3px] px-[3px] pb-[1px] text-[12px] text-[#0a0a0a]`}>
        <span className="prototype-v5-sunken !bg-[#c3c3c3] flex-1 px-2 py-0.5">{prototypeProjects.length} object(s)</span>
        <span className="prototype-v5-sunken !bg-[#c3c3c3] px-2 py-0.5">{project.stack.length} tools</span>
      </div>
    </div>
  );
}

export function PrototypeV5RetroOs() {
  const desktop = usePrototypeIsDesktop();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Record<PrototypeV5WindowId, boolean>>({ welcome: true, projects: true, about: true, contact: true });
  const [minimized, setMinimized] = useState<Record<PrototypeV5WindowId, boolean>>({ welcome: false, projects: false, about: false, contact: false });
  const [order, setOrder] = useState<PrototypeV5WindowId[]>(["about", "contact", "projects", "welcome"]);
  const [startOpen, setStartOpen] = useState(false);
  const { state, copy } = usePrototypeCopy(p.email);

  const focus = (id: PrototypeV5WindowId) => setOrder((o) => [...o.filter((w) => w !== id), id]);
  const show = (id: PrototypeV5WindowId) => {
      setOpen((s) => ({ ...s, [id]: true }));
      setMinimized((s) => ({ ...s, [id]: false }));
      focus(id);
      setStartOpen(false);
      requestAnimationFrame(() => {
        const el = document.getElementById(`prototype-v5-${id}`);
        if (el && !window.matchMedia("(min-width: 1024px)").matches) el.scrollIntoView({ behavior: "smooth" });
      });
  };
  const top = order[order.length - 1];
  const visible = (id: PrototypeV5WindowId) => open[id] && !minimized[id];

  const icons: { label: string; Icon: typeof Folder; tint: string; action: () => void; href?: string }[] = [
    { label: "Résumé.pdf", Icon: FileText, tint: "#ffffff", action: () => undefined, href: p.resume },
    { label: "Contact", Icon: Mail, tint: "#ffffff", action: () => show("contact") },
    { label: "Projects", Icon: Folder, tint: "#ffe16b", action: () => show("projects") },
    { label: "About me", Icon: User, tint: "#ffffff", action: () => show("about") },
    { label: "GitHub", Icon: Github, tint: "#ffffff", action: () => undefined, href: p.github },
    { label: "LinkedIn", Icon: Linkedin, tint: "#ffffff", action: () => undefined, href: p.linkedin },
  ];

  const windowProps = (id: PrototypeV5WindowId) => ({
    id,
    active: top === id,
    z: 10 + order.indexOf(id),
    desktop,
    constraints: desktopRef,
    onFocus: () => focus(id),
    onClose: () => setOpen((s) => ({ ...s, [id]: false })),
    onMinimize: () => setMinimized((s) => ({ ...s, [id]: true })),
  });

  return (
    <div className={`${mono} prototype-v5-wallpaper prototype-v5-grain relative min-h-[100dvh] text-[#0a0a0a] lg:h-[100dvh] lg:overflow-hidden`}>
      <a
        href="#prototype-v5-projects"
        onClick={() => show("projects")}
        className="prototype-v5-raised absolute left-3 top-3 z-[90] -translate-y-20 px-3 py-1.5 text-[13px] focus:translate-y-0"
      >
        Skip to projects
      </a>

      <div ref={desktopRef} className="relative px-3 pb-20 pt-4 lg:absolute lg:inset-0 lg:bottom-10 lg:p-0">
        {/* Desktop icons: always visible */}
        <nav aria-label="Desktop" className="mb-4 grid grid-cols-3 gap-1 sm:grid-cols-6 lg:absolute lg:left-4 lg:top-4 lg:z-[5] lg:mb-0 lg:flex lg:w-[92px] lg:flex-col lg:gap-3">
          {icons.map(({ label, Icon, tint, action, href }) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.45)]">
                  <Icon size={38} strokeWidth={1.6} color="#0a0a0a" fill={tint} />
                </span>
                <span className={`${pixel} px-1 text-center text-[13px] leading-tight text-white [text-shadow:1px_1px_0_#000] group-hover:bg-[#1b1bb3] group-focus-visible:bg-[#1b1bb3]`}>
                  {label}
                </span>
              </>
            );
            const cls = "group flex flex-col items-center gap-1 p-1 outline-none focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-white";
            return href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <button key={label} type="button" onClick={action} className={cls}>
                {inner}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 lg:block">
          {visible("welcome") && (
            <PrototypeV5Window {...windowProps("welcome")}>
              <div className="flex flex-col gap-5 bg-[#c3c3c3] p-5 sm:flex-row sm:p-6">
                <div className="prototype-v5-sunken h-fit w-fit shrink-0 p-1">
                  <Image src={p.photo} alt="Portrait of Yonie Rivera-Aguilar" width={112} height={112} priority className="block" />
                </div>
                <div>
                  <h1 className={`${grotesk} text-[34px] font-bold uppercase leading-[1.02] tracking-[-0.02em] underline decoration-[3px] underline-offset-[6px] sm:text-[40px]`}>
                    Yonie
                    <br />
                    Rivera-Aguilar
                  </h1>
                  <p className="mt-4 text-[14px] leading-relaxed">
                    Software engineer, UW Informatics class of {p.classOf}. {p.short.replace("I build", "I build")}
                  </p>
                  <div className={`${pixel} mt-5 flex flex-wrap gap-2`}>
                    <PrototypeV5Button onClick={() => show("projects")} className="font-bold">
                      <Folder size={15} fill="#ffe16b" /> Open projects
                    </PrototypeV5Button>
                    <PrototypeV5Button href={p.resume} newTab>
                      <FileText size={15} /> Résumé.pdf
                    </PrototypeV5Button>
                    <PrototypeV5Button href={p.emailHref}>
                      <Mail size={15} /> Email me
                    </PrototypeV5Button>
                  </div>
                </div>
              </div>
            </PrototypeV5Window>
          )}

          {visible("projects") && (
            <PrototypeV5Window {...windowProps("projects")}>
              <PrototypeV5Projects />
            </PrototypeV5Window>
          )}

          {visible("about") && (
            <PrototypeV5Window {...windowProps("about")}>
              <div className="prototype-v5-sunken m-[3px] min-h-0 flex-1 overflow-auto p-4 text-[13px] leading-relaxed lg:max-h-none">
                <p>{p.pitch}</p>
                <p className="mt-3">{p.now}</p>
                <p className={`${pixel} mt-4 text-[14px] text-[#1b1bb3]`}>[education]</p>
                <p>
                  {p.school}, {p.degree} ({p.schoolDates}), GPA {p.gpa}
                </p>
                <p className={`${pixel} mt-4 text-[14px] text-[#1b1bb3]`}>[clubs]</p>
                {prototypeActivities.map((a) => (
                  <p key={a.title}>
                    {a.title}, {a.period}: {a.detail}
                  </p>
                ))}
                <p className={`${pixel} mt-4 text-[14px] text-[#1b1bb3]`}>[skills]</p>
                {prototypeSkillGroups.map((g) => (
                  <p key={g.label}>
                    {g.label}: {g.skills.join(", ")}
                  </p>
                ))}
              </div>
            </PrototypeV5Window>
          )}

          {visible("contact") && (
            <PrototypeV5Window {...windowProps("contact")}>
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start">
                <Mail size={34} strokeWidth={1.5} fill="#ffe16b" className="hidden shrink-0 sm:block" />
                <div className="flex-1 space-y-2 text-[13px]">
                  <p>Hiring for an internship or new-grad role? Reach me here:</p>
                  <div className="flex items-center gap-2">
                    <span className="w-20 shrink-0">Email:</span>
                    <span className="prototype-v5-sunken flex-1 truncate px-2 py-1">{p.email}</span>
                    <PrototypeV5Button onClick={copy} className={`${pixel} !px-2.5 !py-1 text-[13px]`}>
                      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Failed" : "Copy"}</span>
                    </PrototypeV5Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 shrink-0">LinkedIn:</span>
                    <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#1b1bb3] underline">
                      in/{p.linkedinHandle}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 shrink-0">GitHub:</span>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[#1b1bb3] underline">
                      @{p.githubHandle}
                    </a>
                  </div>
                </div>
                <PrototypeV5Button href={p.emailHref} className={`${pixel} font-bold sm:self-end`}>
                  Send email
                </PrototypeV5Button>
              </div>
            </PrototypeV5Window>
          )}
        </div>
      </div>

      {/* Taskbar */}
      <div className="prototype-v5-raised fixed inset-x-0 bottom-0 z-[80] flex h-11 items-center gap-1.5 px-1.5 lg:h-10">
        <div className="relative">
          <button
            type="button"
            onClick={() => setStartOpen((s) => !s)}
            aria-expanded={startOpen}
            className={`${startOpen ? "prototype-v5-pressed" : "prototype-v5-raised"} ${pixel} flex h-8 items-center gap-1.5 px-2.5 text-[15px] font-bold`}
          >
            <span className="flex h-5 w-5 items-center justify-center bg-[#1b1bb3] text-[12px] text-white">Y</span>
            Start
          </button>
          {startOpen && (
            <div className="prototype-v5-raised absolute bottom-10 left-0 flex w-56 p-[3px]">
              <div className="prototype-v5-title flex w-7 items-end justify-center pb-2">
                <span className={`${pixel} -rotate-180 text-[14px] text-white [writing-mode:vertical-rl]`}>YonieOS</span>
              </div>
              <ul className={`${pixel} flex-1 py-1 text-[15px]`}>
                {(["projects", "about", "contact", "welcome"] as PrototypeV5WindowId[]).map((id) => (
                  <li key={id}>
                    <button type="button" onClick={() => show(id)} className="w-full px-3 py-1.5 text-left hover:bg-[#1b1bb3] hover:text-white">
                      {prototypeV5Windows[id].title}
                    </button>
                  </li>
                ))}
                <li className="mx-2 my-1 border-t border-[#808080] border-b-white" />
                <li>
                  <a href={p.resume} target="_blank" rel="noopener noreferrer" className="block px-3 py-1.5 hover:bg-[#1b1bb3] hover:text-white">
                    Résumé.pdf
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 gap-1 overflow-hidden">
          {(Object.keys(prototypeV5Windows) as PrototypeV5WindowId[])
            .filter((id) => open[id])
            .map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => (minimized[id] || top !== id ? show(id) : setMinimized((s) => ({ ...s, [id]: true })))}
                className={`${top === id && !minimized[id] ? "prototype-v5-pressed bg-[#dcdcdc]" : "prototype-v5-raised"} ${pixel} hidden h-8 min-w-0 max-w-[170px] flex-1 truncate px-2 text-left text-[13px] md:block`}
              >
                {prototypeV5Windows[id].title}
              </button>
            ))}
        </div>
        <div className="prototype-v5-sunken !bg-[#c3c3c3] flex h-8 items-center gap-1 px-1">
          <a href={p.resume} target="_blank" rel="noopener noreferrer" className={`${pixel} prototype-v5-raised flex h-6 items-center gap-1 px-2 text-[13px]`}>
            <FileText size={13} /> Résumé
          </a>
          <a href={p.emailHref} className={`${pixel} prototype-v5-raised flex h-6 items-center gap-1 px-2 text-[13px]`}>
            <Mail size={13} /> Email
          </a>
        </div>
      </div>
    </div>
  );
}
