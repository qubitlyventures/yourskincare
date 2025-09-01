import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy for Your Skin Care Application</h2>
            <p className="text-sm text-gray-500 mb-6">Version: September 4, 2025</p>
            
            <p className="mb-6 leading-relaxed">
              This Privacy Policy explains how Qubitly Ventures (referred to as "we," "us," or "our") collects, stores, uses, and protects your Personal Data in connection with the usage of our Your Skin Care application and associated website (together referred to as the "Services"). This policy also explains your personal data protection rights. We are committed to protecting your privacy and ensuring its security.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">1. What Data We Collect and Why</h3>
            <p className="mb-4 leading-relaxed">
              When you use our Services, we may collect the following data:
            </p>

            {/* Data Collection Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Data Category</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Collection Means</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Purpose of Collection & Processing</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Legal Basis (GDPR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 align-top">Device Information (hardware model, device type, unique identifiers, OS, IP address)</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Collected automatically</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To enable you to use the Services seamlessly and to prevent or address service errors or technical issues.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (b) - performance of a contract<br/>Art. 6.1 (f) - legitimate interest in product & security improvement.</td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 align-top">Application Use Data</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Collected automatically</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To analyze feature interaction, build analytics, and improve our product.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (b) - performance of a contract<br/>Art. 6.1 (f) - legitimate interest in product improvement.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 align-top">Your Name and Email</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">You provide it to us</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To manage your account and provide you with customer support.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (b) - performance of a contract<br/>Art. 6.1 (f) - legitimate interest in providing a seamless user experience.</td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 align-top">Your Email (for marketing)</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">You provide it to us</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To send you information about our updates, special offers, and promotions. You can unsubscribe at any time.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (a) - you give your consent (for EU users)<br/>Art. 6.1 (f) - legitimate interest in app promotion (for non-EU users).</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 align-top">Your Age and Gender</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">You provide it to us</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To help tailor your skincare plan and ensure your experience is safe and relevant.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (f) - legitimate interest in user safety and personalization.</td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 align-top">Skincare Data (goals, issues, habits, physical characteristics, including Face Data)</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">You provide it to us</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To customize your experience by adjusting the content of the Services and providing routines tailored to you.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (a) - you give your consent.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 align-top">Photos of Cosmetic Products</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">You provide it to us</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To provide you with our cosmetic scanner feature and to anonymize the data for analytics and AI model fine-tuning. You can opt-out by contacting us.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (b) - performance of a contract<br/>Art. 6.1 (f) - legitimate interest in product improvement.</td>
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-300 px-4 py-3 align-top">AI Chatbot Data (questions, conversations, skin info)</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">You provide it to us</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">To provide you with the AI chatbot service and to anonymize the data for analytics and AI model fine-tuning. You can opt-out by contacting us.</td>
                    <td className="border border-gray-300 px-4 py-3 align-top">Art. 6.1 (b) - performance of a contract<br/>Art. 6.1 (f) - legitimate interest in product improvement.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Face Data</h3>
            <p className="mb-4 leading-relaxed">
              Photos of your face ("Face Data") are sensitive, and we handle them with special care.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-3">
              <li><strong>2.1. Collection and Use of Face Data:</strong> We collect photos of your face only when you choose to upload them. This is done to personalize your skincare programs based on a visual analysis of your skin conditions. Each time a photo is required, the application will explicitly request your consent.</li>
              <li><strong>2.2. Disclosure and Sharing of Face Data:</strong> We do not disclose or share your Face Data with any third parties. Only our automated analysis systems have access to your Face Data, and only for the duration of the analysis. It is technically impossible for our developers to access your Face Data at any moment.</li>
              <li><strong>2.3. Storage of Face Data:</strong> As a general rule, your Face Data is only stored on your device. We store your Face Data on our servers only during the analysis stage. After the analysis is complete, your Face Data is deleted from our servers. If you uninstall the GlowAI application, the Face Data is deleted from your device.</li>
              <li><strong>2.4. Using Face Data for GlowAI Improvement:</strong> If you provide your explicit prior consent, we will use your Face Data to improve our AI models. In this case, we will store your anonymized Face Data for up to three years. You can withdraw your consent at any time by contacting us, and we will promptly delete your Face Data.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-4">3. How Long We Retain Your Personal Data</h3>
            <p className="mb-6 leading-relaxed">
              We retain your Personal Data for no longer than is necessary for the purposes for which it was collected, unless we are required to retain it for a longer period due to legal requirements, dispute resolution, or to enforce our agreements.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">4. Your Data Protection Rights (GDPR)</h3>
            <p className="mb-4 leading-relaxed">
              You are entitled to the following rights regarding your data:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>The right to access:</strong> You can ask us for a copy of your Personal Data.</li>
              <li><strong>The right to data portability:</strong> You can ask us to transfer your Personal Data to another organization, or to you, in a structured, machine-readable format.</li>
              <li><strong>The right to correction:</strong> You can ask us to correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You can ask us to erase your Personal Data under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You can ask us to restrict the processing of your Personal Data under certain conditions.</li>
              <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your Personal Data under certain conditions.</li>
              <li><strong>The right to lodge a complaint:</strong> You have the right to lodge a complaint with your local data protection authority if you believe our data processing activities are not compliant with regulations.</li>
            </ul>
            <p className="mb-6 leading-relaxed">
              To exercise any of these rights, please contact us at [Your Contact Email]. We have one month to respond to your request. We may ask you to verify your identity to ensure the security of your data.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">5. Security Measures</h3>
            <p className="mb-6 leading-relaxed">
              We take the protection of your Personal Data seriously and use appropriate technical and organizational measures to protect it from loss, misuse, and unauthorized access or disclosure. However, no security system is perfect, and we cannot guarantee absolute security.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">6. Children's Privacy</h3>
            <p className="mb-6 leading-relaxed">
              We do not knowingly collect Personal Data from anyone under the age of 13 (or 16 for residents of the European Union). If you are aware that a child has provided us with Personal Data in violation of this policy, please contact us.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">7. Sharing of Your Personal Data</h3>
            <p className="mb-4 leading-relaxed">
              We may use external service providers to process your Personal Data on our behalf. When we do, we have appropriate agreements in place. In the case of international transfers, we ensure additional safeguards are in place, such as Standard Contractual Clauses.
            </p>
            <p className="mb-4 leading-relaxed">
              We may share your Personal Data with the following types of service providers:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Cloud Hosting Providers</strong> To host our Services and your data.</li>
              <li><strong>Analytics and Attribution Providers</strong> to understand how our Services are used.</li>
              <li><strong>Infrastructure and Performance Monitoring Services.</strong></li>
              <li><strong>Subscription and Payment Management Services.</strong></li>
              <li><strong>Email Delivery Services.</strong></li>
              <li><strong>Marketing and Advertising Partners.</strong></li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-4">8. Cookie Policy</h3>
            <p className="mb-6 leading-relaxed">
              Our website may use cookies (small text files stored in your browser) to enable certain functions, provide analytics, store your preferences, and enable ad delivery. We will ask for your consent to use non-essential cookies.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">9. Changes to Our Privacy Policy</h3>
            <p className="mb-6 leading-relaxed">
              We may update this Privacy Policy from time to time. The most current version will always be available on our website, with the "Last Updated" date at the top.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">10. Contact Us</h3>
            <p className="mb-4 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or your data, you can contact us at:
            </p>
            <p className="mb-2 leading-relaxed">
              <strong>General Inquiries:</strong> care@yourskincaredotcom
            </p>
            <p className="mb-6 leading-relaxed">
              <strong>Data Protection Officer:</strong> privacy@yourskincaredotcom (Please indicate that you are a Your Skin Care user)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
