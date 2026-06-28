import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const values = [
  { title: "Ship fast", desc: "We scope tight and ship in weeks, not quarters." },
  { title: "Measure everything", desc: "Every campaign and build ties back to a number that matters." },
  { title: "No black boxes", desc: "You get access to your code, your data, your accounts. Always." },
];

const timeline = [
  { year: "2022", text: "BlitzX founded — first three client websites delivered." },
  { year: "2023", text: "Expanded into SEO and paid marketing; first e-commerce build." },
  { year: "2024", text: "Crossed 100 projects shipped across web, SEO, and commerce." },
  { year: "2026", text: "Building the next chapter — bigger clients, bigger systems." },
];

export default function AboutPage() {
  return (
    <main className="bg-void">
      <Navbar />
      <PageHero
        eyebrow="About BlitzX"
        title="We build the digital side of growing businesses."
        desc="BlitzX is a small, senior team that handles your website, your search visibility, your marketing, and your storefront — so you don't have to coordinate four different vendors."
      />

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 font-display text-2xl font-extrabold text-chrome-100">
            What we hold ourselves to
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-sm border border-white/10 bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-bolt-gradient bg-clip-text">
                  <span className="text-bolt-gradient">{v.title}</span>
                </h3>
                <p className="mt-2 font-body text-sm text-chrome-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-extrabold text-chrome-100">
            How we got here
          </h2>
          <div className="space-y-6 border-l border-white/10 pl-6">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 bg-bolt-gradient" />
                <p className="font-mono text-xs text-bolt-gold">{t.year}</p>
                <p className="mt-1 font-body text-sm text-chrome-300">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
