import { useEffect, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

const EnsoDivider = () => (
  <svg width="40" height="20" viewBox="0 0 40 20" className="opacity-70">
    <path d="M35 6 A15 15 0 1 1 20 2" fill="none" style={{ stroke: '#B23A2E' }} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const EnsoBullet = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" className="mt-1 flex-shrink-0">
    <path d="M15 5 A7 7 0 1 1 6 3.5" fill="none" style={{ stroke: '#B23A2E' }} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Home = () => {
  const { accessToken } = useAuth();
  const rootRef = useRef(null);

  useEffect(() => {
    const els = rootRef.current.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (accessToken) return <Navigate to="/dashboard" replace />;

  return (
    <div ref={rootRef} className="relative bg-[#F6F1E7] w-full">
      <style>{`
        .enso-stroke{
          stroke-dasharray:864;
          stroke-dashoffset:864;
          animation:draw-enso 1.9s cubic-bezier(.65,.05,.36,1) forwards;
          animation-delay:.15s;
        }
        @keyframes draw-enso{
          from{ stroke-dashoffset:864; opacity:0; }
          to{ stroke-dashoffset:0; opacity:1; }
        }
        .hero-fade{ opacity:0; animation:fadeUp .9s ease-out forwards; }
        @keyframes fadeUp{
          from{ opacity:0; transform:translateY(16px); }
          to{ opacity:1; transform:translateY(0); }
        }
        .cursor-blink{ animation:blink 1s step-end infinite; }
        @keyframes blink{ 50%{ opacity:0; } }
        .reveal{
          opacity:0; transform:translateY(28px);
          transition:opacity .8s ease-out, transform .8s ease-out;
        }
        .reveal-in{ opacity:1; transform:translateY(0); }
        @media (prefers-reduced-motion: reduce){
          .enso-stroke, .hero-fade, .reveal, .cursor-blink{
            animation:none !important; transition:none !important;
            opacity:1 !important; transform:none !important; stroke-dashoffset:0 !important;
          }
        }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#F6F1E7]/90 backdrop-blur border-b border-[#16140F]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="text-xl md:text-3xl font-home tracking-wider">Satori</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C4A32] -translate-y-2.5"></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#16140F]/60 font-medium">
            <a href="#editor" className="hover:text-[#16140F] transition-colors">The editor</a>
            <a href="#philosophy" className="hover:text-[#16140F] transition-colors">Philosophy</a>
            <a href="#privacy" className="hover:text-[#16140F] transition-colors">Privacy</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/signin" className="hidden sm:inline text-sm font-medium text-[#16140F]/70 hover:text-[#16140F] transition-colors">Sign in</Link>
            <Link to="/signup" className="text-sm font-medium bg-[#8C4A32] text-[#F6F1E7] px-4 py-2 rounded-full hover:bg-[#A05A3F] transition-colors">Sign up</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[#432818] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[clamp(280px,50vw,560px)] aspect-square rounded-full"
            style={{ boxShadow: '0 0 140px 40px #653e27' }}
          ></div>
          <svg className="absolute w-[clamp(280px,50vw,560px)] aspect-square" viewBox="0 0 400 400">
            <defs>
              <filter id="ink-rough" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.045" numOctaves="2" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" />
              </filter>
            </defs>
            <g filter="url(#ink-rough)">
              <path
                d="M251.3 59.05 A150 150 0 1 1 173.97 52.28"
                fill="none"
                className="enso-stroke"
                style={{ stroke: '#8C4A32' }}
                strokeWidth="13"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        <div className="relative max-w-2xl mx-auto px-6 py-28 md:py-40 text-center">
          <p className="hero-fade font-mono text-[11px] tracking-[0.3em] uppercase text-[#F6F1E7] mb-6" style={{ animationDelay: '.4s' }}>
            A quiet place to write
          </p>
          <h1
            className="hero-fade font-serif font-medium text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight text-[#FFFFFF] [text-wrap:balance]"
            style={{ animationDelay: '.65s' }}
          >
            Write in the space between thoughts.
          </h1>
          <p className="hero-fade mt-6 text-base md:text-lg text-[#F6F1E7]/65 max-w-md mx-auto leading-relaxed" style={{ animationDelay: '.9s' }}>
            Satori is a distraction-free page for essays, fragments, and the ideas that arrive without warning — with nothing between you and the sentence.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '1.1s' }}>
            <Link to="/signup" className="bg-[#8C4A32] text-[#F6F1E7] font-medium px-7 py-3.5 rounded-full hover:bg-[#A05A3F] transition-colors">
              Begin writing
            </Link>
            <a href="#editor" className="border border-[#F6F1E7]/25 text-[#F6F1E7] font-medium px-7 py-3.5 rounded-full hover:border-[#F6F1E7]/50 transition-colors">
              See how it works
            </a>
          </div>
          <p className="hero-fade mt-8 font-mono text-[11px] tracking-[0.2em] uppercase text-[#F6F1E7]/35" style={{ animationDelay: '1.3s' }}>
            No feed · No followers · No noise
          </p>
        </div>
      </section>

      <div className="bg-[#F6F1E7] flex justify-center pt-14">
        <EnsoDivider />
      </div>

      {/* EDITOR */}
      <section id="editor" className="bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-14 md:gap-10 items-center">
          <div className="reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#432818] mb-4">The editor</p>
            <h2 className="font-serif font-medium text-3xl md:text-4xl leading-tight tracking-tight [text-wrap:balance]">
              A page that asks for nothing.
            </h2>
            <p className="mt-5 text-[#16140F]/65 leading-relaxed max-w-md">
              Markdown when you want structure, plain text when you don't. No toolbars, no popups, no cursor games — just your words, growing quietly down the page.
            </p>
          </div>

          <div
            className="reveal rounded-2xl bg-[#EDE6D6] border border-[#16140F]/10 shadow-[0_25px_70px_-20px_rgba(22,20,15,0.3)] overflow-hidden"
            style={{ transitionDelay: '.1s' }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#16140F]/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-[#16140F]/25"></span>
                <span className="w-2.5 h-2.5 rounded-full border border-[#16140F]/25"></span>
                <span className="w-2.5 h-2.5 rounded-full border border-[#16140F]/25"></span>
              </div>
              <span className="font-mono text-[11px] text-[#16140F]/35 tracking-wide">satori / untitled entry</span>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-2xl mb-4">Notes on stillness</h3>
              <p className="text-[#16140F]/70 leading-relaxed">
                Learning to sit still without feeling guilty is a skill worth relearning in a hyper-connected week. The page doesn't ask me to perform productivity — it just waits
                <span className="inline-block w-[2px] h-[1.1em] bg-[#16140F]/70 align-middle cursor-blink"></span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#F6F1E7] flex justify-center py-2">
        <EnsoDivider />
      </div>

      {/* CAPTURE */}
      <section id="capture" className="bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="reveal max-w-lg mb-16">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#432818] mb-4">Fleeting thoughts</p>
            <h2 className="font-serif font-medium text-3xl md:text-4xl leading-tight tracking-tight [text-wrap:balance]">
              Catch the spark before it's gone.
            </h2>
            <p className="mt-5 text-[#16140F]/65 leading-relaxed">
              A thought mid-shower. A line from a book. A question you can't shake. Save it in seconds — Satori keeps it safe until you're ready to return.
            </p>
          </div>

          <div className="reveal grid grid-cols-1 md:block md:relative md:h-[340px] gap-4 max-w-md md:max-w-none mx-auto">
            <div className="bg-[#F6F1E7] border border-[#16140F]/10 rounded-xl shadow-lg p-5 w-full md:w-72 md:absolute md:left-[6%] md:top-2 md:-rotate-6 relative">
              <span className="absolute -top-3 -right-3 w-11 h-11 rounded-full border-2 border-[#8C4A32]/70 bg-[#F6F1E7] flex items-center justify-center font-mono text-[9px] text-[#8C4A32] -rotate-6">
                MAY 03
              </span>
              <p className="text-[15px] leading-snug">Is a journal for who I am today, or who I'm hoping to become?</p>
            </div>
            <div className="bg-[#F6F1E7] border border-[#16140F]/10 rounded-xl shadow-lg p-5 w-full md:w-72 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-16 md:rotate-2 relative z-10">
              <span className="absolute -top-3 -right-3 w-11 h-11 rounded-full border-2 border-[#8C4A32]/70 bg-[#F6F1E7] flex items-center justify-center font-mono text-[9px] text-[#8C4A32] rotate-3">
                APR 28
              </span>
              <p className="text-[15px] leading-snug">We write to taste life twice — once in the living, once in the remembering.</p>
            </div>
            <div className="bg-[#F6F1E7] border border-[#16140F]/10 rounded-xl shadow-lg p-5 w-full md:w-72 md:absolute md:right-[6%] md:top-4 md:-rotate-2 relative">
              <span className="absolute -top-3 -right-3 w-11 h-11 rounded-full border-2 border-[#8C4A32]/70 bg-[#F6F1E7] flex items-center justify-center font-mono text-[9px] text-[#8C4A32] -rotate-3">
                APR 21
              </span>
              <p className="text-[15px] leading-snug">Move fast and break things? No. Move slow and notice things.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="bg-[#432818]">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="reveal flex justify-center mb-8">
            <EnsoDivider />
          </div>
          <p className="reveal font-mono text-[11px] tracking-[0.3em] uppercase text-[#432818] mb-6">Why Satori</p>
          <p className="reveal font-serif italic font-normal text-2xl md:text-4xl leading-snug text-[#F6F1E7] [text-wrap:balance]">
            Satori isn't a destination you write toward. It's the moment writing stops being effort — and starts being sight.
          </p>
          <p className="reveal mt-8 font-mono text-xs tracking-[0.15em] uppercase text-[#F6F1E7]/35">— the thinking behind the page</p>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-14 md:gap-10 items-center">
          <div className="reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#432818] mb-4">Private by default</p>
            <h2 className="font-serif font-medium text-3xl md:text-4xl leading-tight tracking-tight [text-wrap:balance]">
              No one reads over your shoulder.
            </h2>
            <p className="mt-5 text-[#16140F]/65 leading-relaxed max-w-md">
              There's no algorithm deciding what matters, no dashboard watching how long you paused. What you write stays exactly where you left it — with you.
            </p>
          </div>

          <div className="reveal relative overflow-hidden rounded-2xl bg-[#EDE6D6] border border-[#16140F]/10 p-8 md:p-10" style={{ transitionDelay: '.1s' }}>
            <svg className="absolute -right-8 -bottom-8 w-56 h-56 opacity-[0.06] pointer-events-none" viewBox="0 0 200 200">
              <rect x="10" y="10" width="180" height="180" rx="20" fill="none" style={{ stroke: '#16140F' }} strokeWidth="6" />
              <path d="M140 60 A50 50 0 1 1 95 52" fill="none" style={{ stroke: '#16140F' }} strokeWidth="6" strokeLinecap="round" />
            </svg>
            <ul className="space-y-5 relative">
              <li className="flex gap-3 items-start">
                <EnsoBullet />
                <span className="text-[#16140F]/80">End-to-end encryption, always on</span>
              </li>
              <li className="flex gap-3 items-start">
                <EnsoBullet />
                <span className="text-[#16140F]/80">Export everything, any time, any format</span>
              </li>
              <li className="flex gap-3 items-start">
                <EnsoBullet />
                <span className="text-[#16140F]/80">Delete means deleted — no backups, no trace</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#432818]">
        <div className="reveal max-w-xl mx-auto px-6 py-24 md:py-28 text-center">
          <h2 className="font-serif font-medium text-3xl md:text-5xl leading-tight tracking-tight text-[#F6F1E7] [text-wrap:balance]">
            Your next thought is waiting for a quiet page.
          </h2>
          <p className="mt-5 text-[#F6F1E7]/60">Start writing free — no credit card, no countdown, no pressure.</p>
          <Link to="/signup" className="inline-block mt-8 bg-[#8C4A32] text-[#F6F1E7] font-medium px-8 py-3.5 rounded-full hover:bg-[#A05A3F] transition-colors">
            Begin writing
          </Link>
          <p className="mt-4 font-mono text-[11px] tracking-[0.15em] uppercase text-[#F6F1E7]/30">Takes about ten seconds</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#432818] border-t border-[#F6F1E7]/10">
        <div className="max-w-6xl m-auto px-6 md:px-10 py-10">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="font-serif font-semibold text-[#F6F1E7]">&copy; 2026 Satori</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C4A32] -translate-y-2"></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;