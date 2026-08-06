"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

const QUICK_PROMPTS = [
  "Best food in Taal?",
  "What festivals are on?",
  "Tell me about the heritage walk",
  "How do I get to Taal?",
];

const INTENTS: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    reply:
      "Hello! I'm your Taal travel assistant. Ask me about the heritage trails, must-eat food, festivals, or getting here — or tap a suggestion below.",
  },
  {
    keywords: ["basilica", "church", "cathedral"],
    reply:
      "The Taal Basilica (St. Martin of Tours) is the largest Catholic church in Asia — a neoclassical landmark from 1878 on the plaza. It opens daily, usually 6 AM–6 PM, and entry is free. Just dress modestly.",
  },
  {
    keywords: ["food", "eat", "restaurant", "cafe", "coffee", "tapa", "adobo", "empanada"],
    reply:
      "Don't miss Taal's foodie icons: Empanadas, Tapa de Taal, Adobo sa Dilaw, and Kape Taal. Try Cella's, Sol Y Vino, or the roadside empanada stalls by the plaza. Head to /food for our full guide.",
  },
  {
    keywords: ["festival", "event", "pasubat", "happen", "calendar", "feast"],
    reply:
      "The big one is Parada ng mga Puso every April, plus the Feast of St. Martin on Nov 11. The 'What's Happening' calendar on the home page lists the latest events each month.",
  },
  {
    keywords: ["trail", "walk", "tour", "heritage walk", "route"],
    reply:
      "We have five self-guided trails: the Heritage Walk, Food Trail, Faith Trail, Cultural Trail, and Festival Trail. Open 'Heritage Trails' on the home page to browse routes and stops.",
  },
  {
    keywords: ["map", "where", "directions", "get here", "come", "transport", "bus"],
    reply:
      "Taal is about 90 km south of Manila (roughly 2 hours). From Taft Ave, ride a bus to Lemery or Batangas City and alight at Taal. The interactive map on our home page pinpoints every attraction.",
  },
  {
    keywords: ["museum", "ancestral", "house", "gallery", "villa"],
    reply:
      "Villa Tortuga, Casa Villavicencio, and Gliceria Marella's house are the top ancestral homes — many are museums with Spanish-era interiors. Check our Attractions page for hours and fees.",
  },
  {
    keywords: ["hours", "open", "close", "time", "schedule"],
    reply:
      "Most museums and shops open around 8 AM–9 AM and close by 5 PM–6 PM. The Basilica opens earlier. For exact hours, tap any attraction pin on our home-page map.",
  },
  {
    keywords: ["book", "reserve", "price", "cost", "fee", "how much", "entrance"],
    reply:
      "Most heritage houses charge a small entrance fee (about ₱50–₱100). Guided tours can be arranged on the spot. We don't process bookings yet — but I can point you to the right trail to start.",
  },
  {
    keywords: ["souvenir", "balisong", "buy", "shop", "market"],
    reply:
      "Taal is the balisong (butterfly knife) capital — the market by the plaza is great for knives, buri hats, and handwoven crafts. Haggle politely and you'll get a fair price.",
  },
  {
    keywords: ["thank", "thanks", "great", "awesome", "nice"],
    reply:
      "You're welcome! Enjoy Taal — take the slow streets, stop for coffee, and say hi to the tricycle drivers for me. Anything else you'd like to know?",
  },
  {
    keywords: ["bye", "goodbye", "later", "see you"],
    reply: "Bye for now! If you need anything while you're in Taal, I'm one tap away. Safe travels!",
  },
  {
    keywords: ["who are you", "what are you", "help"],
    reply:
      "I'm the Taal guide bot — a little AI concierge for this town. I can answer quick questions about food, trails, festivals, and getting around.",
  },
];

function getReply(input: string): string {
  const text = input.toLowerCase();
  for (const intent of INTENTS) {
    if (intent.keywords.some((k) => text.includes(k))) {
      return intent.reply;
    }
  }
  return "Good question — I don't have a great answer for that yet. Try asking about food, festivals, the heritage walk, or how to get to Taal.";
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi there! I'm the Taal guide. Ask me anything about the town — or pick a prompt below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: idRef.current++, role: "user", text }]);
    setInput("");
    setTyping(true);
    setUnread(false);
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, role: "bot", text: getReply(text) }]);
      setTyping(false);
      setUnread(true);
    }, 900);
  };

  const toggle = () => {
    setUnread(false);
    setOpen((o) => !o);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close Taal guide chat" : "Open Taal guide chat"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-rust text-ivory shadow-xl ring-4 ring-rust/20 transition-colors duration-300 hover:bg-[#17407f]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && unread && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d64541] text-[10px] font-bold text-white ring-2 ring-white">
            1
          </span>
        )}
      </button>

      <div
        className={`fixed right-6 bottom-24 z-[100] flex h-[520px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-2xl transition-all duration-300 ease-out ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 bg-rust px-5 py-4 text-ivory">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold tracking-wide">Taal Guide</div>
            <div className="flex items-center gap-1.5 text-[11px] text-ivory/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7fd1a4]" />
              AI travel assistant · online
            </div>
          </div>
          <Sparkles className="h-4 w-4 text-ivory/70" />
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-ivory/50 px-4 py-4">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-xl rounded-tr-sm bg-rust px-3.5 py-2.5 text-sm text-ivory">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-end gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rust/15">
                  <Bot className="h-3.5 w-3.5 text-rust" />
                </div>
                <div className="max-w-[80%] rounded-xl rounded-tl-sm border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink">
                  {m.text}
                </div>
              </div>
            )
          )}
          {typing && (
            <div className="flex items-end gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rust/15">
                <Bot className="h-3.5 w-3.5 text-rust" />
              </div>
              <div className="flex items-center gap-1 rounded-xl rounded-tl-sm border border-hairline bg-white px-3.5 py-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust/40" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust/40 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust/40 [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-hairline bg-white px-4 pt-3 pb-4">
          {messages.length <= 1 && (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-hairline bg-ivory/60 px-3 py-1.5 text-xs text-ink transition-colors duration-200 hover:border-rust hover:bg-rust/10"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask about Taal…"
              className="h-11 flex-1 rounded-xl border border-hairline bg-ivory/40 px-4 text-sm text-ink placeholder:text-ink/40 focus:border-rust focus:outline-none focus:ring-1 focus:ring-rust"
            />
            <button
              type="button"
              onClick={() => send()}
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rust text-ivory transition-colors duration-200 hover:bg-[#17407f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
