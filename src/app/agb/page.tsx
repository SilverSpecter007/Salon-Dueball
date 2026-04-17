import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGB',
  description: 'Allgemeine Geschäftsbedingungen von Salon Dueball in Hollenstedt.',
}

export default function AGBPage() {
  return (
    <>
      <div className="bg-salon-warm pt-32 pb-16 text-center">
        <h1 className="font-serif text-4xl text-salon-dark">Allgemeine Geschäftsbedingungen</h1>
      </div>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-2xl mx-auto px-6 prose prose-sm prose-headings:font-serif prose-headings:font-normal prose-headings:text-salon-dark prose-p:text-salon-gray prose-li:text-salon-gray prose-a:text-salon-gold">

          <h2>§ 1 Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen und
            Dienstleistungen des Salon Dueball, Inhaberin Annika Dueball,
            Jahnstraße 3, 21279 Hollenstedt (nachfolgend „Salon").
          </p>

          <h2>§ 2 Leistungen</h2>
          <p>
            Der Salon erbringt Friseurdienstleistungen im Rahmen des vereinbarten Termins.
            Die angebotenen Leistungen ergeben sich aus der jeweiligen aktuellen Preisliste.
          </p>

          <h2>§ 3 Terminvereinbarung</h2>
          <p>
            Der Salon arbeitet hauptsächlich auf Terminbasis. Termine können persönlich,
            telefonisch (04165 8833) oder online unter www.friseur-hollenstedt.de vereinbart werden.
          </p>
          <p>
            Bei einer Terminabsage oder -änderung bitten wir um eine rechtzeitige Vorabsage
            von mindestens <strong>24 Stunden vor dem vereinbarten Termin</strong>. Bei
            rechtzeitiger Absage entstehen keine zusätzlichen Kosten.
          </p>
          <p>
            Bei Nichterscheinen ohne rechtzeitige Absage (No-Show) oder sehr kurzfristiger
            Absage behält sich der Salon vor, einen Ausfallbetrag in Rechnung zu stellen.
          </p>

          <h2>§ 4 Preise und Zahlung</h2>
          <p>
            Die Preise für Dienstleistungen sind inklusive der jeweiligen gesetzlichen
            Mehrwertsteuer. Die Preise des Salons können jederzeit öffentlich auf der
            Website www.friseur-hollenstedt.de eingesehen werden.
          </p>
          <p>
            Die angegebenen Preise sind <strong>Mindestpreise</strong> und können sich
            durch Mehraufwand (z. B. besonders langes oder dickes Haar) oder spontanes
            Hinzubuchen von weiteren Dienstleistungen erhöhen. Für Dienstleistungen,
            die nicht in der Preisliste beschrieben sind, erteilt der Salon gerne im Voraus Auskunft.
          </p>
          <p>
            Rechnungsbeträge sind sofort nach Leistungserfüllung fällig und ausschließlich
            in folgenden Zahlungsarten zu begleichen:
          </p>
          <ul>
            <li>Bar</li>
            <li>EC-Cash</li>
            <li>Visa</li>
            <li>Mastercard</li>
            <li>Gutschein</li>
          </ul>

          <h2>§ 5 Gutscheine</h2>
          <p>
            Gutscheine sind übertragbar und können auf alle Dienstleistungen des Salons
            angerechnet werden. Eine Barauszahlung ist ausgeschlossen. Gutscheine sind
            bis zum aufgedruckten Datum gültig.
          </p>

          <h2>§ 6 Reklamationen</h2>
          <p>
            Beanstandungen bezüglich einer erbrachten Leistung sind unmittelbar im Salon
            oder spätestens innerhalb von 7 Tagen nach der Behandlung mitzuteilen.
            Der Salon wird sich bemühen, etwaige Mängel zeitnah zu beheben.
          </p>

          <h2>§ 7 Haftung</h2>
          <p>
            Der Salon haftet für Schäden, die durch grobe Fahrlässigkeit oder vorsätzliches
            Handeln entstanden sind. Bei leichter Fahrlässigkeit haftet der Salon nur bei
            der Verletzung wesentlicher Vertragspflichten. Für mitgebrachte Gegenstände
            und Wertgegenstände übernimmt der Salon keine Haftung.
          </p>

          <h2>§ 8 Datenschutz</h2>
          <p>
            Der Salon erhebt und verarbeitet personenbezogene Daten ausschließlich im
            Rahmen der geltenden Datenschutzgesetze (DSGVO). Näheres entnehmen Sie
            bitte unserer Datenschutzerklärung.
          </p>

          <h2>§ 9 Salvatorische Klausel</h2>
          <p>
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
            berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.

          </p>

          <h2>§ 10 Gerichtsstand</h2>
          <p>
            Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig,
            der Sitz des Salons.
          </p>

          <p className="text-xs text-salon-gray/50 mt-8">
            Stand: April 2025 · Salon Dueball · Jahnstraße 3 · 21279 Hollenstedt
          </p>
        </div>
      </section>
    </>
  )
}
