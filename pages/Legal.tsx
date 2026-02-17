
import React from 'react';

const Legal = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold font-serif mb-12">Legal Information</h1>
        
        <div className="prose prose-slate max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Privacy Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              At Good Platters, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information when you use our website and reservation services.
            </p>
            <h3 className="text-lg font-bold mt-6 mb-2">1. Information We Collect</h3>
            <p className="text-slate-600">We collect information that you provide directly to us, such as your name, email address, and phone number when making a reservation or sending an inquiry.</p>
            <h3 className="text-lg font-bold mt-6 mb-2">2. Use of Information</h3>
            <p className="text-slate-600">We use your information to manage reservations, respond to inquiries, and send occasional marketing communications if you have opted in.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Terms of Service</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h3 className="text-lg font-bold mt-6 mb-2">1. Reservation Policy</h3>
            <p className="text-slate-600">Tables are held for a maximum of 15 minutes past the scheduled time. We reserve the right to release the table thereafter.</p>
            <h3 className="text-lg font-bold mt-6 mb-2">2. Limitation of Liability</h3>
            <p className="text-slate-600">Good Platters shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legal;
