"use client";

import { useCallback, useEffect, useState } from "react";

type Tab = "invoice" | "link" | "history";
type Created = { id: string; shortUrl: string; status: string; amount: number; expireBy?: number };
type Row = {
  kind: "invoice" | "link";
  id: string;
  status: string;
  amount: number;
  shortUrl?: string;
  who?: string;
  createdAt?: number;
  expireBy?: number;
};

const EXPIRY = [
  { label: "15 minutes", value: 15 },
  { label: "30 minutes", value: 30 },
  { label: "1 hour", value: 60 },
  { label: "24 hours", value: 1440 },
  { label: "7 days", value: 10080 },
];

const inr = (paise: number) => `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const when = (s?: number) => (s ? new Date(s * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—");

const input =
  "mt-1.5 w-full rounded-xl border border-fg/10 bg-white px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none";
const label = "text-sm font-medium";

async function post<T>(url: string, body: unknown): Promise<{ data?: T; error?: string }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => null);
  if (!res) return { error: "Could not reach the server." };
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    window.location.href = "/admin/login";
    return { error: "Signed out." };
  }
  return res.ok ? { data } : { error: data.error ?? "Something went wrong." };
}

function Result({ created, onNew }: { created: Created; onNew: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="glass p-6">
      <p className="eyebrow">Link ready</p>
      <p className="mt-3 break-all rounded-xl border border-fg/10 bg-white p-3 font-mono text-sm">{created.shortUrl}</p>
      <p className="mt-3 text-sm text-fg/65">
        {inr(created.amount)} · expires {when(created.expireBy)}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-primary !py-2"
          onClick={() => {
            navigator.clipboard.writeText(created.shortUrl).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        <a href={created.shortUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2">
          Open
        </a>
        <button type="button" className="btn-secondary !py-2" onClick={onNew}>
          Create another
        </button>
      </div>
    </div>
  );
}

function Expiry({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <label className={label} htmlFor="expiry">
        Link expires after
      </label>
      <select id="expiry" value={value} onChange={(e) => onChange(Number(e.target.value))} className={input}>
        {EXPIRY.map((e) => (
          <option key={e.value} value={e.value}>
            {e.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function InvoiceForm() {
  const [cust, setCust] = useState({ name: "", email: "", contact: "" });
  const [items, setItems] = useState([{ name: "", quantity: 1, amount: "" }]);
  const [description, setDescription] = useState("");
  const [expiresInMinutes, setExpiry] = useState(60);
  const [notify, setNotify] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<Created | null>(null);

  const total = items.reduce((s, i) => s + (Number(i.amount) || 0) * (Number(i.quantity) || 0), 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { data, error } = await post<Created>("/api/admin/invoices", {
      customer: cust,
      description,
      expiresInMinutes,
      notify,
      items: items.map((i) => ({ name: i.name, quantity: Number(i.quantity), amount: Number(i.amount) })),
    });
    setBusy(false);
    if (error) setError(error);
    else if (data) setCreated(data);
  };

  if (created) return <Result created={created} onNew={() => setCreated(null)} />;

  return (
    <form onSubmit={submit} className="glass space-y-5 p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="c-name">Customer name *</label>
          <input id="c-name" className={input} value={cust.name} onChange={(e) => setCust({ ...cust, name: e.target.value })} />
        </div>
        <div>
          <label className={label} htmlFor="c-email">Email</label>
          <input id="c-email" type="email" className={input} value={cust.email} onChange={(e) => setCust({ ...cust, email: e.target.value })} />
        </div>
        <div>
          <label className={label} htmlFor="c-phone">Phone</label>
          <input id="c-phone" className={input} placeholder="+91…" value={cust.contact} onChange={(e) => setCust({ ...cust, contact: e.target.value })} />
        </div>
      </div>

      <div>
        <p className={label}>Items</p>
        <div className="mt-2 space-y-2">
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-[1fr_5rem_7rem_2rem] gap-2">
              <input aria-label="Item name" placeholder="Item or service" className={input.replace("mt-1.5 ", "")} value={it.name} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
              <input aria-label="Quantity" type="number" min={1} className={input.replace("mt-1.5 ", "")} value={it.quantity} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, quantity: Number(e.target.value) } : x)))} />
              <input aria-label="Amount in rupees" type="number" min={1} step="0.01" placeholder="₹ each" className={input.replace("mt-1.5 ", "")} value={it.amount} onChange={(e) => setItems(items.map((x, j) => (j === i ? { ...x, amount: e.target.value } : x)))} />
              <button type="button" aria-label="Remove item" disabled={items.length === 1} onClick={() => setItems(items.filter((_, j) => j !== i))} className="rounded-lg text-fg/40 hover:text-red-700 disabled:opacity-30">✕</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setItems([...items, { name: "", quantity: 1, amount: "" }])} className="mt-3 text-sm font-semibold text-accent hover:underline">
          + Add item
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="desc">Note on the invoice</label>
          <input id="desc" className={input} placeholder="e.g. Website development, milestone 1" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <Expiry value={expiresInMinutes} onChange={setExpiry} />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="accent-[#047857]" />
        Email / SMS the invoice to the customer (needs their email or phone)
      </label>

      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex items-center justify-between gap-4 border-t border-fg/10 pt-4">
        <p className="font-grotesk text-lg font-bold">Total {inr(Math.round(total * 100))}</p>
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? "Creating…" : "Create invoice"}
        </button>
      </div>
    </form>
  );
}

function LinkForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [cust, setCust] = useState({ name: "", email: "", contact: "" });
  const [expiresInMinutes, setExpiry] = useState(15);
  const [notify, setNotify] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<Created | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { data, error } = await post<Created>("/api/admin/payment-links", {
      amount: Number(amount),
      description,
      customer: cust,
      expiresInMinutes,
      notify,
    });
    setBusy(false);
    if (error) setError(error);
    else if (data) setCreated(data);
  };

  if (created) return <Result created={created} onNew={() => setCreated(null)} />;

  return (
    <form onSubmit={submit} className="glass space-y-5 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="l-amt">Amount (₹) *</label>
          <input id="l-amt" type="number" min={1} step="0.01" className={input} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <Expiry value={expiresInMinutes} onChange={setExpiry} />
      </div>
      <div>
        <label className={label} htmlFor="l-desc">What is it for? *</label>
        <input id="l-desc" className={input} placeholder="e.g. Advance for landing page" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="lc-name">Customer name</label>
          <input id="lc-name" className={input} value={cust.name} onChange={(e) => setCust({ ...cust, name: e.target.value })} />
        </div>
        <div>
          <label className={label} htmlFor="lc-email">Email</label>
          <input id="lc-email" type="email" className={input} value={cust.email} onChange={(e) => setCust({ ...cust, email: e.target.value })} />
        </div>
        <div>
          <label className={label} htmlFor="lc-phone">Phone</label>
          <input id="lc-phone" className={input} placeholder="+91…" value={cust.contact} onChange={(e) => setCust({ ...cust, contact: e.target.value })} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="accent-[#047857]" />
        Email / SMS the link to the customer
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
        {busy ? "Creating…" : "Create payment link"}
      </button>
    </form>
  );
}

function History() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const load = useCallback(async () => {
    setRows(null);
    const res = await fetch("/api/admin/history").catch(() => null);
    if (res?.status === 401) return void (window.location.href = "/admin/login");
    const data = res ? await res.json().catch(() => null) : null;
    setRows(data?.rows ?? []);
    setErrors(data?.errors ?? (res ? [] : ["Could not reach the server."]));
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const cancel = async (r: Row) => {
    if (!confirm(`Cancel this ${r.kind}? The link will stop working.`)) return;
    const { error } = await post("/api/admin/cancel", { kind: r.kind, id: r.id });
    if (error) alert(error);
    else load();
  };

  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center justify-between border-b border-fg/10 px-5 py-3">
        <p className="font-grotesk font-bold">Recent invoices and links</p>
        <button onClick={load} className="text-sm font-semibold text-accent hover:underline">Refresh</button>
      </div>
      {errors.length > 0 && <p className="px-5 py-3 text-sm text-red-700">{errors.join(" · ")}</p>}
      {rows === null ? (
        <p className="px-5 py-8 text-sm text-fg/50">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="px-5 py-8 text-sm text-fg/50">Nothing yet.</p>
      ) : (
        <ul className="divide-y divide-fg/10">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm">
              <div className="min-w-0">
                <p className="font-semibold">
                  {inr(r.amount)} <span className="font-normal text-fg/50">· {r.kind === "invoice" ? "Invoice" : "Link"} · {r.who ?? "—"}</span>
                </p>
                <p className="font-mono text-xs text-fg/45">{when(r.createdAt)} → expires {when(r.expireBy)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${r.status === "paid" ? "border-accent/40 bg-accent/10 text-accent" : "border-fg/15 text-fg/60"}`}>{r.status}</span>
                {r.shortUrl && <a href={r.shortUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent">Open</a>}
                {["issued", "created", "partially_paid"].includes(r.status) && (
                  <button onClick={() => cancel(r)} className="font-semibold text-red-700 hover:underline">Cancel</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("invoice");
  const tabs: { id: Tab; name: string }[] = [
    { id: "invoice", name: "New invoice" },
    { id: "link", name: "Payment link" },
    { id: "history", name: "History" },
  ];

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <main className="container-page max-w-3xl py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Owner only</p>
          <h1 className="mt-2 font-grotesk text-3xl font-bold">Invoices & payment links</h1>
        </div>
        <button onClick={logout} className="btn-secondary !py-2">Sign out</button>
      </div>

      <div role="tablist" className="mt-8 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === t.id ? "bg-fg text-white" : "border border-fg/15 bg-white hover:border-fg/40"}`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "invoice" && <InvoiceForm />}
        {tab === "link" && <LinkForm />}
        {tab === "history" && <History />}
      </div>
    </main>
  );
}
