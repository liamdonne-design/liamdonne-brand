"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { Link } from "@/i18n/navigation";
import { contactEmail } from "@/content/about";
import { Button } from "@/components/ui/button";
import { FluidHoverHighlight } from "@/components/fluid-hover-highlight";
import { useFluidHover, useRegisterFluidHoverItem } from "@/hooks/use-fluid-hover";
import { useIcon } from "@/lib/icon-context";
import FluidLinkButton from "./FluidLinkButton";
import {
  chatEntries,
  chatFallback,
  chatUi,
  detectLang,
  matchEntry,
  type ChatLang,
} from "@/content/chat";

type Msg = { id: number; role: "user" | "bot"; text?: string; paras?: string[] };

const TYPING_MS = 650; // short "typing…" beat before a scripted answer appears

/* ------------------------------------------------------------- helpers */

const noop = () => () => {};
function useBrowserLang(): ChatLang {
  return useSyncExternalStore(
    noop,
    () => (navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en"),
    () => "en"
  );
}

/** Renders "[label](href)" links inside an answer paragraph. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <Fragment key={i}>{p}</Fragment>;
        const [, label, href] = m;
        const cls = "underline decoration-black/30 underline-offset-[3px] transition-colors hover:decoration-black";
        if (href.startsWith("/"))
          return (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          );
        return (
          <a
            key={i}
            href={href}
            className={cls}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        );
      })}
    </>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5C11.5 16.9 7.1 12.5 1.5 12 7.1 11.5 11.5 7.1 12 1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function SendButton({ active, label }: { active: boolean; label: string }) {
  const ArrowUp = useIcon("arrow-up");
  return (
    <Button type="submit" variant="primary" size="icon" aria-label={label} disabled={!active} leadingIcon={ArrowUp} />
  );
}

// horizontal chip rail: scrolls, no scrollbar, fades out on the right
const railCls =
  "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,#000_calc(100%-40px),transparent)]";

function Chip({
  index,
  registerItem,
  onClick,
  children,
}: {
  index: number;
  registerItem: (index: number, el: HTMLElement | null) => void;
  onClick: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useRegisterFluidHoverItem(registerItem, index, ref);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="relative z-[1] shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-[14px] text-ink md:text-[14.5px]"
    >
      {children}
    </button>
  );
}

/** Suggested questions as one strip: chips touch, and a single highlight
 *  glides from one to the next under the cursor (Fluid hover). */
function ChipRail({
  entries,
  lang,
  onAsk,
  className = "",
}: {
  entries: typeof chatEntries;
  lang: ChatLang;
  onAsk: (q: { entryId: string }) => void;
  className?: string;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const hover = useFluidHover(stripRef, { axis: "x" });
  return (
    <div className={`${railCls} ${className}`}>
      <div ref={stripRef} {...hover.handlers} className="relative flex w-max">
        <FluidHoverHighlight hover={hover} className="rounded-lg" />
        {entries.map((e, i) => (
          <Chip key={e.id} index={i} registerItem={hover.registerItem} onClick={() => onAsk({ entryId: e.id })}>
            {e.chip[lang]}
          </Chip>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- dock */

/**
 * Home-page chat. Collapsed, it's a dock pinned to the bottom of the screen:
 * suggested questions + an input. Asking anything opens the full chat.
 * All answers are scripted (content/chat.ts) — nothing is generated.
 */
export default function ChatDock() {
  const browserLang = useBrowserLang();
  const [typedLang, setTypedLang] = useState<ChatLang | null>(null);
  const lang = typedLang ?? browserLang;
  const ui = chatUi[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [dockDraft, setDockDraft] = useState("");
  const [draft, setDraft] = useState("");
  const nextId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const ask = useCallback(
    (q: { entryId: string } | { text: string }) => {
      let userText: string;
      let answerLang = lang;
      let entry = null as (typeof chatEntries)[number] | null;
      if ("entryId" in q) {
        entry = chatEntries.find((e) => e.id === q.entryId) ?? null;
        userText = entry?.chip[lang] ?? "";
      } else {
        userText = q.text.trim();
        if (!userText) return;
        answerLang = detectLang(userText, lang);
        setTypedLang(answerLang);
        entry = matchEntry(userText);
      }
      setOpen(true);
      setMessages((m) => [...m, { id: nextId.current++, role: "user", text: userText }]);
      setTyping(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          { id: nextId.current++, role: "bot", paras: entry ? entry.answer[answerLang] : chatFallback[answerLang] },
        ]);
        if (entry) setAsked((a) => (a.includes(entry.id) ? a : [...a, entry.id]));
      }, TYPING_MS);
    },
    [lang]
  );

  const remaining = chatEntries.filter((e) => !asked.includes(e.id));

  return (
    <>
      {/* collapsed dock */}
      <div className="fixed bottom-3 left-1/2 z-40 w-[min(720px,calc(100%-20px))] -translate-x-1/2 md:bottom-5">
        <div className="rounded-[22px] border border-black/[0.07] bg-white/90 p-2 shadow-[0_12px_40px_-14px_rgba(20,20,20,0.22)] backdrop-blur-md md:p-2.5">
          <ChipRail entries={chatEntries} lang={lang} onAsk={ask} />
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              ask({ text: dockDraft });
              setDockDraft("");
            }}
            className="mt-2 flex items-center gap-2 rounded-[14px] border border-black/[0.08] bg-[#F3F2EE] py-1.5 pl-3.5 pr-1.5 md:mt-2.5"
          >
            <Sparkle className="h-3.5 w-3.5 shrink-0 text-ink" />
            <input
              value={dockDraft}
              onChange={(e) => setDockDraft(e.target.value)}
              placeholder={ui.dockPlaceholder}
              aria-label={ui.dockPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] text-ink outline-none placeholder:text-[#9A9993]"
            />
            <SendButton active={!!dockDraft.trim()} label={ui.send} />
          </form>
        </div>
      </div>

      {open && (
        <ChatWindow
          lang={lang}
          messages={messages}
          typing={typing}
          remaining={remaining}
          draft={draft}
          setDraft={setDraft}
          onAsk={ask}
          onClosed={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* --------------------------------------------------------- full window */

function ChatWindow({
  lang,
  messages,
  typing,
  remaining,
  draft,
  setDraft,
  onAsk,
  onClosed,
}: {
  lang: ChatLang;
  messages: Msg[];
  typing: boolean;
  remaining: typeof chatEntries;
  draft: string;
  setDraft: (v: string) => void;
  onAsk: (q: { entryId: string } | { text: string }) => void;
  onClosed: () => void;
}) {
  const ui = chatUi[lang];
  const CloseIcon = useIcon("x");
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closing = useRef(false);

  useLayoutEffect(() => {
    gsap.fromTo(panelRef.current, { y: 28, scale: 0.98, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "expo.out" });
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    if (window.matchMedia("(hover: hover)").matches) inputRef.current?.focus({ preventScroll: true });
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
    gsap.to(panelRef.current, { y: 20, scale: 0.98, opacity: 0, duration: 0.25, ease: "power2.in", onComplete: onClosed });
  }, [onClosed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // keep the latest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 md:p-6" role="dialog" aria-modal="true" aria-label="Liam Donne — chat">
      <div ref={backdropRef} onClick={close} className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div
        ref={panelRef}
        className="relative flex h-[min(760px,100%)] w-[min(700px,100%)] flex-col overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_30px_80px_-20px_rgba(20,20,20,0.35)]"
      >
        {/* header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/[0.07] px-4 py-3.5 md:px-6 md:py-4">
          <span className="font-display text-[1.6rem] leading-none text-ink md:text-[1.9rem]">Liam Donne</span>
          <div className="flex items-center gap-2">
            <FluidLinkButton href={`mailto:${contactEmail}`} variant="tertiary" leadingIcon="mail">
              {ui.contact}
            </FluidLinkButton>
            <Button variant="ghost" size="icon" onClick={close} aria-label={ui.close} leadingIcon={CloseIcon} />
          </div>
        </div>

        {/* conversation */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 md:px-6">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="ml-auto w-fit max-w-[82%] rounded-[14px] bg-ink px-4 py-2.5 text-[14.5px] leading-snug text-paper">
                {m.text}
              </div>
            ) : (
              <div
                key={m.id}
                className="w-fit max-w-[88%] space-y-3 rounded-[14px] border border-black/[0.06] bg-[#F5F4F0] px-4 py-3.5 text-[14.5px] leading-relaxed text-ink"
              >
                {m.paras?.map((p, i) => (
                  <p key={i}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            )
          )}
          {typing && (
            <div className="flex w-fit gap-1 rounded-[14px] border border-black/[0.06] bg-[#F5F4F0] px-4 py-4" aria-label="…">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-grey-600" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
        </div>

        {/* follow-up suggestions + input */}
        <div className="shrink-0 border-t border-black/[0.07] px-3 pb-3 pt-3 md:px-4">
          {!typing && remaining.length > 0 && (
            <ChipRail entries={remaining} lang={lang} onAsk={onAsk} className="mb-2.5" />
          )}
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              onAsk({ text: draft });
              setDraft("");
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={ui.placeholder}
              aria-label={ui.placeholder}
              className="h-11 min-w-0 flex-1 rounded-[12px] border border-black/[0.12] bg-[#F5F4F0] px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-[#9A9993] focus:border-black/40"
            />
            <SendButton active={!!draft.trim()} label={ui.send} />
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
