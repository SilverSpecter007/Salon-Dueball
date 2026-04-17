import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von Salon Dueball – Annika Dueball, Jahnstraße 3, 21279 Hollenstedt.',
}

export default function ImpressumPage() {
  return (
    <>
      <div className="bg-salon-warm pt-32 pb-16 text-center">
        <h1 className="font-serif text-4xl text-salon-dark">Impressum</h1>
      </div>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-2xl mx-auto px-6 prose prose-sm prose-headings:font-serif prose-headings:font-normal prose-headings:text-salon-dark prose-p:text-salon-gray prose-a:text-salon-gold">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>Annika Dueball</strong><br />
            Salon Dueball<br />
            Jahnstraße 3<br />
            21279 Hollenstedt
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: <a href="tel:+4941658833">04165 8833</a><br />
            Fax: 04165 8898<br />
            E-Mail: <a href="mailto:salon.dueball@gmail.com">salon.dueball@gmail.com</a>
          </p>

          <h2>Umsatzsteuer-Identifikationsnummer</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            <strong>DE 11/647/21/62</strong>
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            <strong>Berufsbezeichnung:</strong> Friseurmeisterin<br />
            <strong>Zuständige Kammer:</strong> Handwerkskammer Hamburg<br />
            <strong>Verliehen in:</strong> Deutschland<br />
          </p>
          <p>
            Es gelten folgende berufsrechtliche Regelungen:<br />
            Handwerksordnung (HwO) – einsehbar unter{' '}
            <a href="https://www.gesetze-im-internet.de/hwo/" target="_blank" rel="noopener noreferrer">
              www.gesetze-im-internet.de/hwo
            </a>
          </p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a><br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
            Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </section>
    </>
  )
}
