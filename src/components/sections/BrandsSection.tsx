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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-24">
          {/* L'Oréal Professionnel */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-24 h-24 bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="font-serif text-lg font-semibold text-salon-dark text-center leading-tight px-3">
                L&apos;Oréal<br />
                <span className="text-xs tracking-widest text-salon-gold font-sans font-normal uppercase">Professionnel</span>
              </span>
            </div>
            <p className="text-xs text-salon-gray text-center max-w-[120px]">
              Premium Pflege &amp; Farbe
            </p>
          </div>

          <div className="w-px h-12 bg-salon-gray-light hidden sm:block" />

          {/* Kevin Murphy */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-24 h-24 bg-salon-dark flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="font-sans text-base font-light text-white text-center leading-tight px-3 tracking-wider">
                KEVIN<br />
                <span className="text-salon-gold font-medium">MURPHY</span>
              </span>
            </div>
            <p className="text-xs text-salon-gray text-center max-w-[120px]">
              Vegane Haarpflege
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
