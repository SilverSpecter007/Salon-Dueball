export default function BrandsSection() {
  return (
    <section className="py-16 bg-salon-warm border-y border-salon-gray-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-2">Unsere Partner</p>
          <h3 className="font-serif text-2xl text-salon-dark">
            Wir arbeiten mit den besten Marken
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20">
          {/* Kérastase */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-28 h-24 bg-salon-dark flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="font-serif text-base font-light text-white text-center leading-tight px-3 tracking-widest uppercase">
                Kérastase
              </span>
            </div>
            <p className="text-xs text-salon-gray text-center max-w-[120px]">
              Premium Haarpflege
            </p>
          </div>

          <div className="w-px h-12 bg-salon-gray-light hidden sm:block" />

          {/* L'Oréal Professionnel */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-28 h-24 bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="font-serif text-base font-semibold text-salon-dark text-center leading-tight px-3">
                L&apos;Oréal<br />
                <span className="text-xs tracking-widest text-salon-gold font-sans font-normal uppercase">Professionnel</span>
              </span>
            </div>
            <p className="text-xs text-salon-gray text-center max-w-[120px]">
              Farbe &amp; Pflege
            </p>
          </div>

          <div className="w-px h-12 bg-salon-gray-light hidden sm:block" />

          {/* Carecut */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-28 h-24 bg-salon-gold flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="font-sans text-base font-semibold text-white text-center leading-tight px-3 tracking-wide">
                CARE<br />CUT
              </span>
            </div>
            <p className="text-xs text-salon-gray text-center max-w-[120px]">
              Innovative Haarpflege
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
