export default function HomeHero() {
  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/homepage.png')" // add later
      }}
    >
      {/* overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/20" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          {/* Logo placeholder */}
          <img src="/assets/logo.png" />

          <nav className="flex items-center gap-10 text-white">
            <a className="relative font-medium">
              Home
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded bg-sky-400" />
            </a>
            <a className="opacity-80 hover:opacity-100">Who we are</a>
            <a className="opacity-80 hover:opacity-100">Log in</a>
          </nav>
        </header>

        {/* Hero content */}
        <div className="mt-24 grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Left */}
          <div className="text-white">
            <h1 className="text-4xl font-light leading-tight md:text-5xl">
              Reach Real People <br />
              With Verified Ads
            </h1>

            <p className="mt-6 max-w-md text-lg opacity-90">
              No spam. No fake promises. Only real businesses and real ads
              approved through our verification system.
            </p>

            <button className="mt-10 rounded-full bg-white px-8 py-4 text-sm font-medium text-black hover:bg-gray-200 transition">
              Create Account
            </button>
          </div>

        
        </div>
      </div>
    </section>
  );
}
