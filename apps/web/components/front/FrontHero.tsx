"use client";

/**
 * FrontHero — agent-first primary surface for Marsalforn Home.
 * Per skill v1.18 ref 37: home `/` first viewport IS the concierge.
 * Mateo: the founder, on the chat. Long technical answers when needed.
 */

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/components/analytics/TrackingPixel";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Mateo here. Tell me what you're looking for — a sauté pan, a sheet set, a wedding gift, a return — and I'll find it. Or scroll to the four collections below.",
};

const PROMPTS = [
  "Wedding gift for my brother — €200",
  "Difference between the 24cm and 28cm copper pans?",
  "Linen sheets — what size for a double bed?",
  "Hardwiring a pendant — anything I should ask my electrician?",
];

export function FrontHero() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [opened, setOpened] = useState(false);
  const transcriptIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (opened) messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, opened]);

  function pick(text: string) {
    trackEvent("prompt_click", { label: text, source: "hero" });
    void send(text);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    if (!opened) {
      setOpened(true);
      trackEvent("front_open", { source: "hero" });
    }
    if (!transcriptIdRef.current) transcriptIdRef.current = crypto.randomUUID();
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== WELCOME), transcript_id: transcriptIdRef.current }),
      });
      const j = (await res.json()) as { ok?: boolean; content?: string };
      const reply = j.content || "I'm slower than usual — give me a moment, or send your details to portfolio@concierge.studio.";
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
      const lo = reply.toLowerCase();
      const escalated = /(hand off|portfolio@concierge|reach out|i don't know|custom quote|book_consult|wholesale)/.test(lo);
      const hadAnswer = j.ok !== false && reply.length > 0 && !escalated;
      trackEvent("front_question", { text: trimmed.slice(0, 200), had_answer: hadAnswer ? 1 : 0, source: "hero" });
      if (!hadAnswer) trackEvent("front_no_answer", { text: trimmed.slice(0, 200), source: "hero", fallback_kind: escalated ? "escalation" : "empty" });
    } catch (e) {
      setMessages((p) => [...p, { role: "assistant", content: "I couldn't reach the model. Send your details to portfolio@concierge.studio." }]);
      trackEvent("front_question", { text: trimmed.slice(0, 200), had_answer: 0, source: "hero" });
      trackEvent("front_no_answer", { text: trimmed.slice(0, 200), source: "hero", fallback_kind: "fetch_error" });
    } finally { setBusy(false); }
  }

  return (
    <section id="concierge" aria-label="Talk to Mateo, the Marsalforn Home concierge" className="front-hero">
      <div className="front-hero-inner">
        <p className="eyebrow">Marsalforn Home · Gozo</p>
        <h1 className="front-hero-headline">
          Ask Mateo anything.
          <span className="front-hero-sub">
            Modern Mediterranean home goods — kitchen, bath, linen,
            lighting. Designed in Gozo, made in small runs by partner
            workshops in the Pyrenees, Lithuania, Tuscany, and Florence.
            32 SKUs in stock and made-to-order. Ask for a recommendation,
            a gift, a lead time, or a return — Mateo runs the chat.
          </span>
        </h1>

        <div className="front-hero-thread" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`front-hero-msg ${m.role === "user" ? "is-user" : "is-asst"}`}>{m.content}</div>
          ))}
          {busy && <div className="front-hero-msg is-asst is-busy">…</div>}
          <div ref={messagesEndRef} />
        </div>

        {!opened && (
          <div className="front-hero-prompts" role="list">
            {PROMPTS.map((p) => (
              <button key={p} type="button" className="front-hero-chip" onClick={() => pick(p)}>{p}</button>
            ))}
          </div>
        )}

        <form className="front-hero-form" onSubmit={(e) => { e.preventDefault(); void send(input); }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Mateo about products, materials, lead times, returns…"
            disabled={busy} aria-label="Message Mateo" className="front-hero-input" autoComplete="off" />
          <button type="submit" disabled={busy || !input.trim()} className="btn btn-primary">Send →</button>
        </form>

        <div className="front-hero-foot">
          <a href="#collections" className="front-hero-browse">Or browse the four collections ↓</a>
          <span className="front-hero-foot-sep">·</span>
          <span className="front-hero-foot-note">
            Concept site by <a href="https://concierge.studio" target="_blank" rel="noreferrer">concierge.studio</a> · checkout disabled
          </span>
        </div>
      </div>
    </section>
  );
}
