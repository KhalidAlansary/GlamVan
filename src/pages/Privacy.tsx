
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-playfair font-bold mb-8 text-salon-dark">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Last updated: April 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">1. What We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personal Info: Name, phone number, email, location.</li>
                <li>Service Details: Bookings, preferences, notes.</li>
                <li>Payment Info: Method (e.g. Vodafone Cash, Visa), never full card numbers.</li>
                <li>Location Access: Used only with your permission for GPS tracking of our van during service delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">2. How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To schedule and confirm appointments</li>
                <li>To offer location-based van tracking</li>
                <li>To send service reminders and promos (if opted in)</li>
                <li>To improve service quality and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">3. Who Has Access to Your Data</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Authorized team members (stylists/admin) only</li>
                <li>We do not sell or share your data with any third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-semibold mb-4 text-salon-purple">4. Your Rights</h2>
              <p className="text-gray-700 mb-4">You can request to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>View or edit your personal data</li>
                <li>Opt-out of promotional messages</li>
                <li>Delete your account/data at any time</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Contact: <a href="mailto:support@glamvan.com" className="text-salon-purple hover:underline">support@glamvan.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
