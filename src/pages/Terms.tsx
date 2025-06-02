
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-playfair font-bold mb-8 text-salon-dark">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: April 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">1. Bookings & Services</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Services are offered by appointment only and are subject to availability.</li>
                <li>All services are performed inside our sanitized, mobile van.</li>
                <li>Service areas currently include: New Cairo, El Rehab, Tagamo, and Sheikh Zayed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">2. Payments</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Accepted payment methods: Cash, Vodafone Cash, InstaPay, Visa/MasterCard.</li>
                <li>All services must be paid upon completion unless pre-payment is required.</li>
                <li>Bridal packages require a 50% non-refundable deposit to confirm.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">3. Cancellations & Refunds</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You may cancel or reschedule a regular appointment up to 3 days in advance with no penalty.</li>
                <li>Cancellations made within 72 hours of the appointment may result in a 30% late fee.</li>
                <li>Bridal appointments may be rescheduled once with at least 5 days notice, but deposits are non-refundable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">4. Right to Refuse Service</h2>
              <p className="text-gray-700 mb-4">We reserve the right to cancel or refuse service in the case of:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Inappropriate behavior or unsafe conditions</li>
                <li>Repeated late cancellations or no-shows</li>
                <li>Locations outside of our service areas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">5. Health & Safety Disclaimer</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All vans and tools are sterilized between clients.</li>
                <li>All staff are female-only and trained for client safety and professionalism.</li>
                <li>We are not responsible for any allergic reaction unless ingredients were requested in advance.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
