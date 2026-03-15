import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von Salon Dueball in Hollenstedt gemäß DSGVO.',
}

export default function DatenschutzPage() {
  return (
    <>
      <div className="bg-salon-warm pt-32 pb-16 text-center">
        <h1 className="font-serif text-4xl text-salon-dark">Datenschutzerklärung</h1>
      </div>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-2xl mx-auto px-6 prose prose-sm prose-headings:font-serif prose-headings:font-normal prose-headings:text-salon-dark prose-p:text-salon-gray prose-li:text-salon-gray prose-a:text-salon-gold">

          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
            werden können.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Annika Dueball, Salon Dueball, Jahnstraße 3, 21279 Hollenstedt<br />
            E-Mail: salon.dueball@gmail.com
          </p>

          <h2>2. Hosting</h2>
          <p>
            Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 900, San Francisco,
            California 94104, USA gehostet. Details entnehmen Sie der Datenschutzerklärung
            von Vercel:{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              vercel.com/legal/privacy-policy
            </a>
          </p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Datenschutz</h3>
          <p>
            Der Betreiber dieser Seiten nimmt den Schutz Ihrer persönlichen Daten sehr ernst.
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den
            gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3>Ihre Rechte</h3>
          <p>Sie haben jederzeit das Recht:</p>
          <ul>
            <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
            <li>Die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
            <li>Die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
            <li>Die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
            <li>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
            <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
          </ul>

          <h2>4. Datenerfassung auf dieser Website</h2>
          <h3>Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
            Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
            Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL,
            Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
          </p>

          <h3>Terminbuchung (Shore)</h3>
          <p>
            Für die Online-Terminbuchung nutzen wir das Drittanbietersystem Shore
            (Shore GmbH, Sendlinger Str. 7, 80331 München). Bei der Nutzung des
            Buchungssystems werden Ihre Daten von Shore verarbeitet. Weitere Informationen
            finden Sie unter{' '}
            <a href="https://www.shore.com/de/datenschutz" target="_blank" rel="noopener noreferrer">
              shore.com/de/datenschutz
            </a>.
          </p>

          <h3>Google Maps</h3>
          <p>
            Diese Seite nutzt Google Maps zur Darstellung von Karten. Betreiber ist
            Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
            Zur Nutzung von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern.
            Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der
            Datenschutzerklärung von Google:{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>.
          </p>

          <p className="text-xs text-salon-gray/50 mt-8">
            Stand: Januar 2024 · Salon Dueball · Jahnstraße 3 · 21279 Hollenstedt
          </p>
        </div>
      </section>
    </>
  )
}
