import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    cycle: "one-time",
    features: ["5-page website", "Responsive design", "Basic on-page SEO", "1 round of revisions", "2 weeks delivery"],
    popular: false,
  },
  {
    name: "Growth",
    price: "₹45,000",
    cycle: "one-time",
    features: [
      "Full website or storefront",
      "Custom UI + animations",
      "Technical SEO setup",
      "Admin dashboard",
      "3 rounds of revisions",
      "4 weeks delivery",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cycle: "talk to us",
    features: [
      "Multi-page platform / app",
      "Dedicated backend (FastAPI)",
      "SEO + paid marketing retainer",
      "Priority support",
      "Unlimited revisions",
      "Timeline scoped to project",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-void">
      <Navbar />
      <PageHero
        eyebrow="Pricing"
        title="Plans that scale with your project."
        desc="Pick a starting point — every plan can be customized once we scope your actual requirements."
      />

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-sm border p-8 ${
                p.popular
                  ? "border-bolt-orange/50 bg-surface shadow-bolt-glow"
                  : "border-white/10 bg-surface"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-8 rounded-sm bg-bolt-gradient px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-void">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-chrome-100">{p.name}</h3>
              <p className="mt-4">
                <span className="font-display text-3xl font-extrabold text-chrome-gradient">
                  {p.price}
                </span>
                <span className="ml-2 font-body text-xs text-chrome-600">{p.cycle}</span>
              </p>

              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-body text-sm text-chrome-300">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-bolt-gradient" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={`/order/new?plan=${p.name.toLowerCase()}`}
                className={`mt-8 block rounded-sm px-6 py-3 text-center font-body text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  p.popular
                    ? "bg-bolt-gradient text-void"
                    : "border border-white/15 text-chrome-100"
                }`}
              >
                Choose {p.name}
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
