
import { useEffect, useMemo, useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formType, setFormType] = useState<"homeowner" | "contractor">("homeowner");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { id: "how", label: "How it Works" },
    { id: "services", label: "Projects" },
    { id: "why", label: "Why Us" },
    { id: "pricing", label: "Fees" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Get Started" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} nav={nav} />
      <main>
        <Hero setFormType={setFormType} />
        <TrustBar />
        <HowItWorks />
        <Services />
        <WhyUs />
        <ValueBlocks />
        <Pricing />
        <CTA setFormType={setFormType} />
        <Contact
          formType={formType}
          submitting={submitting}
          setSubmitting={setSubmitting}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
        <FAQ />
        <Footer year={year} />
      </main>
      <StructuredData />
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, nav }: any) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <Logo />
            <span className="font-semibold tracking-tight text-xl">Keystone Connect</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n: any) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm text-neutral-700 hover:text-neutral-900">
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center rounded-2xl border border-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-900 hover:text-white transition"
            >
              Get a Quote
            </a>
          </nav>
          <button
            onClick={() => setMenuOpen((v: boolean) => !v)}
            aria-label="Toggle Menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-300"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-6">
            <div className="grid gap-2">
              {nav.map((n: any) => (
                <a key={n.id} href={`#${n.id}`} className="block rounded-xl px-3 py-2 text-neutral-700 hover:bg-neutral-100">
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-1 inline-flex items-center justify-center rounded-2xl border border-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-900 hover:text-white transition"
              >
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero({ setFormType }: { setFormType: (t: "homeowner" | "contractor") => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(0,0,0,0.06),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-4 py-2 text-xs">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Premium Contractor Matchmaking
            </div>
            <h1 className="mt-6 text-4xl lg:text-6xl font-semibold leading-tight tracking-tight">Build big, without the headache.</h1>
            <p className="mt-4 text-neutral-700 text-lg leading-relaxed">
              Keystone Connect pairs homeowners with elite, vetted contractors for high-ticket projects—ADUs, pools, whole-home remodels, luxury kitchens, HVAC systems, and more. A concierge from first call to final walkthrough.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" onClick={() => setFormType("homeowner")} className="inline-flex items-center rounded-2xl bg-neutral-900 text-white px-5 py-3 font-medium hover:opacity-90">
                Get a Quote
              </a>
              <a href="#contact" onClick={() => setFormType("contractor")} className="inline-flex items-center rounded-2xl border border-neutral-900 px-5 py-3 font-medium hover:bg-neutral-900 hover:text-white">
                Join as Contractor
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 text-center">
              <Stat k="$50k+" v="Typical project" />
              <Stat k="<48h" v="Matchmaking speed" />
              <Stat k="97%" v="Client satisfaction" />
            </dl>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-neutral-200 shadow-2xl overflow-hidden">
              <HeroGraphic />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 grid place-items-center">🏗️</div>
              <div>
                <p className="text-sm font-medium">Vetted & Insured</p>
                <p className="text-xs text-neutral-600">License & background checks verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="py-8 border-y border-neutral-200 bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8">
        {["Licensed & Insured","Project Concierge","No Side-Deal Policy","Transparent Bids","Milestone Oversight"].map((t) => (
          <div key={t} className="text-sm text-neutral-700 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-900" /> {t}
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Tell us about your project", body: "Share scope, budget range, timeline, and must‑haves in 3 minutes." },
    { title: "Get matched in under 48 hours", body: "We shortlist 1–3 elite contractors aligned to your scope and style." },
    { title: "We shepherd the build", body: "From proposal to punch list—milestones, payments, and quality checks." },
  ];
  return (
    <section id="how" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderBlock eyebrow="How it works" title="Concierge from day one" subtitle="A guided process that protects your time and your budget." />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
              <div className="h-12 w-12 rounded-2xl bg-neutral-900 text-white grid place-items-center text-lg font-semibold">{i + 1}</div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { title: "Accessory Dwelling Units (ADUs)", body: "Design‑build teams for backyard homes and income units." },
    { title: "Pools & Outdoor Living", body: "Resort‑level pools, hardscape, and landscaping." },
    { title: "Whole‑Home Remodels", body: "Structural changes, additions, and code‑compliant upgrades." },
    { title: "Luxury Kitchens & Baths", body: "Custom cabinetry, stonework, premium fixtures." },
    { title: "HVAC Systems", body: "High‑efficiency installs, ducting, and smart controls." },
    { title: "Solar & Energy", body: "Rooftop solar, batteries, and panel upgrades." },
  ];
  return (
    <section id="services" className="py-20 bg-neutral-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderBlock eyebrow="Projects" title="High‑ticket work done right" subtitle="We focus on scopes typically $25k–$500k+. Smaller jobs? We can still advise." />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i) => (
            <div key={i.title} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
              <div className="h-12 w-12 rounded-2xl bg-neutral-900 text-white grid place-items-center">🏆</div>
              <h3 className="mt-4 font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const bullets = [
    { h: "Vetted network", p: "Licenses, insurance, background checks, and past work verified." },
    { h: "Quality assurance", p: "Milestone oversight and optional third‑party inspections." },
    { h: "No side‑deal policy", p: "We prohibit and monitor end‑runs that cut out Keystone." },
    { h: "Transparent bids", p: "Comparable proposals with apples‑to‑apples scope." },
    { h: "Concierge comms", p: "One point of contact from discovery to final payout." },
  ];
  return (
    <section id="why" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderBlock eyebrow="Why Keystone" title="The keystone that holds it all together" subtitle="Less chaos. Fewer callbacks. Higher finish quality." />
        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <ul className="grid gap-4">
              {bullets.map((b) => (
                <li key={b.h} className="flex gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-neutral-900" />
                  <div>
                    <h4 className="font-semibold">{b.h}</h4>
                    <p className="text-sm text-neutral-700">{b.p}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-neutral-100 aspect-[4/3] border border-neutral-200 shadow-inner grid place-items-center text-neutral-500">
            <span className="text-sm">Project gallery placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueBlocks() {
  const blocks = [
    { h: "Homeowners", p: "Save weeks of shopping. Avoid dud bids. Gain a pro advocate." },
    { h: "Contractors", p: "High‑intent projects, fewer tire‑kickers, concierge client management." },
    { h: "Developers", p: "Scalable pipeline for multi‑lot and infill work with oversight." },
  ];
  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <div key={b.h} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
              <h4 className="font-semibold">{b.h}</h4>
              <p className="text-sm text-neutral-700 mt-1">{b.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderBlock eyebrow="Fees" title="Aligned incentives, simple fees" subtitle="We charge contractors a success fee on won projects. No junk fees." />
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold">Contractor Success Fee</h3>
            <p className="text-sm text-neutral-700 mt-2">
              Typical range <span className="font-medium">5–7%</span> of contract value, due at client sign‑off. Tiered pricing available for volume partners.
            </p>
            <ul className="mt-4 text-sm text-neutral-700 list-disc pl-5">
              <li>Clear payment milestones</li>
              <li>Anti‑circumvention & non‑solicit agreements</li>
              <li>Performance transparency</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold">Homeowner Pricing</h3>
            <p className="text-sm text-neutral-700 mt-2">Free matchmaking. Optional premium concierge for white‑glove oversight and third‑party inspections.</p>
            <ul className="mt-4 text-sm text-neutral-700 list-disc pl-5">
              <li>Includes bid comparison & scope alignment</li>
              <li>Transparent change‑order management</li>
              <li>Weekly progress check‑ins</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ setFormType }: { setFormType: (t: "homeowner" | "contractor") => void }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 text-white p-10 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">Ready to start your project?</h3>
              <p className="mt-2 text-white/80">Tell us your vision—we’ll handle the hard part.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#contact" onClick={() => setFormType("homeowner")} className="inline-flex items-center rounded-2xl bg-white text-neutral-900 px-5 py-3 font-medium hover:opacity-90">
                Get a Quote
              </a>
              <a href="#contact" onClick={() => setFormType("contractor")} className="inline-flex items-center rounded-2xl border border-white px-5 py-3 font-medium hover:bg-white hover:text-neutral-900">
                Partner with Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ formType, submitting, setSubmitting, submitted, setSubmitted }: any) {
  const [data, setData] = useState<any>({
    role: formType,
    name: "",
    email: "",
    phone: "",
    location: "",
    budget: "",
    timeline: "",
    description: "",
  });

  useEffect(() => {
    setData((d: any) => ({ ...d, role: formType }));
  }, [formType]);

  function onSubmit(e: any) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      console.log("Form submission", data);
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      alert("Thanks! We'll reach out shortly.");
    }, 600);
  }

  return (
    <section id="contact" className="py-20 bg-neutral-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderBlock
          eyebrow="Get started"
          title={formType === "homeowner" ? "Request your short list" : "Apply to our network"}
          subtitle={formType === "homeowner" ? "We’ll match you with elite contractors within 48 hours." : "Join our vetted roster for high‑intent projects."}
        />
        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setData((d: any) => ({ ...d, role: "homeowner" }))}
                className={`rounded-xl px-4 py-2 text-sm border ${data.role === "homeowner" ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300"}`}
              >
                Homeowner
              </button>
              <button
                type="button"
                onClick={() => setData((d: any) => ({ ...d, role: "contractor" }))}
                className={`rounded-xl px-4 py-2 text-sm border ${data.role === "contractor" ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300"}`}
              >
                Contractor
              </button>
            </div>
            <Input label="Full name" value={data.name} onChange={(v: string) => setData({ ...data, name: v })} required />
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Email" type="email" value={data.email} onChange={(v: string) => setData({ ...data, email: v })} required />
              <Input label="Phone" type="tel" value={data.phone} onChange={(v: string) => setData({ ...data, phone: v })} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="City / ZIP" value={data.location} onChange={(v: string) => setData({ ...data, location: v })} />
              <Input label="Budget range" placeholder="$50k–$300k" value={data.budget} onChange={(v: string) => setData({ ...data, budget: v })} />
            </div>
            <Input label="Timeline" placeholder="e.g., Start within 2–3 months" value={data.timeline} onChange={(v: string) => setData({ ...data, timeline: v })} />
            <TextArea
              label={data.role === "homeowner" ? "Project description" : "Trade & service area"}
              placeholder={data.role === "homeowner" ? "Scope, style, must‑haves…" : "e.g., GC in LA County; ADUs, remodels, pools; CSLB #…"}
              value={data.description}
              onChange={(v: string) => setData({ ...data, description: v })}
            />
            <button disabled={submitting} className="mt-2 inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-5 py-3 font-medium hover:opacity-90 disabled:opacity-50">
              {submitting ? "Submitting…" : data.role === "homeowner" ? "Get my matches" : "Apply now"}
            </button>
            <p className="text-xs text-neutral-500">
              By submitting, you agree to our Terms and acknowledge our Privacy Policy. Anti‑circumvention and non‑solicit apply to all introductions made by Keystone Connect.
            </p>
          </form>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <h4 className="font-semibold">What we verify</h4>
            <ul className="mt-3 text-sm text-neutral-700 list-disc pl-5">
              <li>Active licenses & insurance</li>
              <li>Background & reference checks</li>
              <li>Past project portfolio quality</li>
              <li>Financial stability & lien history</li>
            </ul>
            <div className="mt-8 rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
              <p className="text-sm">
                <span className="font-medium">Fast‑track:</span> Have drawings or an RFP ready? Email
                <a href="mailto:projects@keystoneconnect.co" className="underline"> projects@keystoneconnect.co</a> and we’ll prioritize your shortlist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "What project sizes do you take?", a: "We specialize in scopes typically $25k–$500k+, including ADUs, remodels, pools, and HVAC systems." },
    { q: "How fast is the match?", a: "Most homeowners receive 1–3 curated matches within 48 hours after discovery." },
    { q: "Do you manage the project?", a: "Baseline: we coordinate bids and alignment. Premium Concierge adds inspections, milestone oversight, and weekly reporting." },
    { q: "How do you get paid?", a: "We charge contractors a success fee (typically 5–7%) on won jobs. Homeowner matchmaking is free." },
    { q: "What’s your anti‑circumvention policy?", a: "Introductions are protected for a period (e.g., 24 months). Side‑deals that bypass Keystone violate our terms." },
  ];
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeaderBlock eyebrow="FAQ" title="Common questions" />
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-neutral-200 bg-white p-5">
              <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
                {f.q}
                <span className="ml-4 text-neutral-500 group-open:rotate-45 transition-transform">＋</span>
              </summary>
              <p className="mt-3 text-sm text-neutral-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-semibold tracking-tight text-lg">Keystone Connect</span>
          </div>
          <p className="mt-3 text-sm text-neutral-700 max-w-sm">
            Premium matchmaking for high‑ticket home projects. Quality, transparency, and peace of mind from first call to final walkthrough.
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Company</h5>
          <ul className="mt-3 text-sm text-neutral-700 space-y-2">
            <li><a href="#how" className="hover:underline">How it works</a></li>
            <li><a href="#services" className="hover:underline">Projects</a></li>
            <li><a href="#pricing" className="hover:underline">Fees</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Legal</h5>
          <ul className="mt-3 text-sm text-neutral-700 space-y-2">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Contractor Agreement</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        © {year} Keystone Connect. All rights reserved.
      </div>
    </footer>
  );
}

// ---------- Shared UI ----------
function HeaderBlock({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-200 text-neutral-800 px-3 py-1 text-xs">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-800" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl lg:text-4xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-neutral-700">{subtitle}</p>}
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-4">
      <div className="text-2xl font-semibold">{k}</div>
      <div className="text-xs text-neutral-600">{v}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "", required = false }: any) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900/20"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder = "" }: any) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={6}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900/20"
      />
    </label>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="text-neutral-900">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#111111" />
          <stop offset="100%" stopColor="#444444" />
        </linearGradient>
      </defs>
      <rect x="8" y="20" width="48" height="28" rx="6" fill="url(#g)" />
      <path d="M20 20 L32 8 L44 20" stroke="#111111" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <rect x="26" y="30" width="12" height="18" rx="2" fill="#ffffff" />
    </svg>
  );
}

function HeroGraphic() {
  return (
    <svg viewBox="0 0 600 450" className="w-full h-full">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(#bg)" />
      <g opacity="0.85">
        <rect x="50" y="60" width="220" height="150" rx="16" fill="#fff" stroke="#bbb" />
        <rect x="70" y="85" width="180" height="12" rx="6" fill="#111" />
        <rect x="70" y="110" width="140" height="10" rx="5" fill="#888" />
        <rect x="70" y="130" width="160" height="10" rx="5" fill="#aaa" />
        <rect x="70" y="155" width="90" height="10" rx="5" fill="#bbb" />
      </g>
      <g opacity="0.85">
        <rect x="330" y="100" width="220" height="220" rx="16" fill="#fff" stroke="#bbb" />
        <rect x="350" y="125" width="180" height="12" rx="6" fill="#111" />
        <rect x="350" y="150" width="160" height="10" rx="5" fill="#888" />
        <rect x="350" y="170" width="120" height="10" rx="5" fill="#aaa" />
        <rect x="350" y="200" width="150" height="10" rx="5" fill="#bbb" />
        <rect x="350" y="230" width="100" height="10" rx="5" fill="#ccc" />
      </g>
      <g>
        <circle cx="220" cy="350" r="8" fill="#111" />
        <circle cx="250" cy="350" r="8" fill="#111" />
        <rect x="200" y="340" width="220" height="20" rx="10" fill="#111" opacity="0.12" />
      </g>
    </svg>
  );
}

function StructuredData() {
  const json = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Keystone Connect",
    url: "https://keystoneconnect.co",
    description: "Premium contractor matchmaking and concierge for high-ticket residential projects.",
    areaServed: "United States",
    sameAs: [
      "https://www.instagram.com/keystoneconnect",
      "https://www.linkedin.com/company/keystone-connect"
    ],
    serviceArea: { "@type": "AdministrativeArea", name: "United States" },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Homeowner Matchmaking" }, price: "0", priceCurrency: "USD" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Premium Concierge" }, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" } }
    ],
    faq: [
      { q: "Project sizes", a: "$25k–$500k+" },
      { q: "Match speed", a: "Under 48 hours after discovery" },
    ]
  }), []);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
