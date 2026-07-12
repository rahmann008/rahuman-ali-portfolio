import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

const KB = [
  { keys: ["cloud", "aws", "azure", "platform"], a: "He works across both AWS and Azure at enterprise scale — EC2, IAM, RDS, CloudFront, Lambda on AWS, plus Azure DevOps and ARM templates on Azure. AWS SysOps Administrator certified." },
  { keys: ["kubernetes", "k8s", "eks", "aks", "container"], a: "Yes — he designs and manages both EKS and AKS clusters in production, including a large-scale NGINX-to-Gateway-API ingress migration across 150+ nodes." },
  { keys: ["terraform", "iac", "infrastructure as code", "cloudformation", "arm"], a: "He implements Infrastructure as Code using Terraform, ARM templates, and CloudFormation for repeatable, auditable deployments." },
  { keys: ["ci/cd", "cicd", "jenkins", "pipeline", "devops"], a: "He builds and standardises CI/CD pipelines with Jenkins and Azure DevOps, plus AWS CodeBuild/CodePipeline." },
  { keys: ["security", "devsecops", "sast", "secret"], a: "He drives DevSecOps improvements — SAST findings, secret management via Key Vault, container security — and has hands-on AD/LDAP identity experience." },
  { keys: ["experience", "years", "how long", "background"], a: "13+ years across 7 organisations — Bank of America, Wipro (AT&T project), and currently FWD Technology and Innovation — spanning banking, telecom, and insurance." },
  { keys: ["relocat", "visa", "location", "based", "available", "uae", "uk", "europe", "singapore", "middle east", "qatar", "australia"], a: "He's based in Kuala Lumpur, Malaysia and open to relocating for roles in the UAE, UK, Europe, Singapore, and the wider Middle East." },
  { keys: ["contact", "email", "phone", "reach", "hire"], a: `You can reach him at ${profile.email} or ${profile.phone} — or use the contact section on this page.` },
  { keys: ["certif", "aws sysops", "credential"], a: "He holds the AWS SysOps Administrator certification." },
  { keys: ["education", "degree", "university"], a: "Master of Computer Applications, B.S. Abdur Rahman University (2013)." },
  { keys: ["incident", "production issue", "escalation"], a: "He acts as a senior escalation point for complex production incidents, performing root cause analysis and driving long-term fixes." },
  { keys: ["resume", "cv", "download"], a: "Click 'Resume' in the top navigation — it opens a printable, downloadable view of his full CV." },
];
const FALLBACK = "Good question — I don't have a set answer for that, but you can email him directly and he'll get back to you.";
const SUGGESTIONS = ["What's your Kubernetes experience?", "What roles are you open to?", "Describe a production incident you handled"];

function findAnswer(q) {
  const lower = q.toLowerCase();
  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.a;
  }
  return FALLBACK;
}

// Point this at a deployed backend (see /ai-widget-backend in the project root) to enable real Claude-powered answers.
const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || "";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function openChat() {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "Hi! I'm Rahuman Ali's AI assistant. Ask me anything about his experience, skills, or projects — I'll answer instantly so you can pre-qualify him.",
        },
      ]);
    }
  }

  async function send(text) {
    const val = (text ?? input).trim();
    if (!val) return;
    setMessages((m) => [...m, { role: "user", text: val }]);
    setInput("");
    setLoading(true);

    let answer;
    try {
      if (CHAT_ENDPOINT) {
        const res = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: val }),
        });
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        answer = data.answer;
      } else {
        answer = findAnswer(val);
      }
    } catch {
      answer = findAnswer(val);
    }
    setLoading(false);
    setMessages((m) => [...m, { role: "bot", text: answer }]);
  }

  return (
    <>
      <button
        onClick={openChat}
        className="no-print fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-amber-500 text-base font-semibold px-5 py-3 rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
      >
        🤖 Ask AI
      </button>

      {open && (
        <div className="no-print fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[460px] flex flex-col rounded-2xl border border-white/10 bg-[#0F1A2E] shadow-2xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-sm">✨</span>
              <div>
                <p className="text-sm font-semibold">{profile.name}'s AI Assistant</p>
                <p className="text-[11px] text-gray-500">
                  {CHAT_ENDPOINT ? "Powered by Claude · answers from his profile" : "Powered by LLM · answers from his profile"}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] bg-amber-500 text-base text-sm rounded-2xl rounded-br-sm px-3 py-2"
                    : "max-w-[85%] bg-white/5 text-gray-200 text-sm rounded-2xl rounded-bl-sm px-3 py-2"
                }
              >
                {m.text}
              </div>
            ))}
            {loading && <div className="max-w-[85%] bg-white/5 text-gray-400 text-sm rounded-2xl rounded-bl-sm px-3 py-2">…</div>}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] border border-white/10 rounded-full px-3 py-1.5 text-gray-400 hover:border-amber-400 hover:text-amber-400 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about his experience..."
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500"
            />
            <button onClick={() => send()} className="px-4 text-amber-400">➤</button>
          </div>
        </div>
      )}
    </>
  );
}
