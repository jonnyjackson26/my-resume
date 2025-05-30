import React from 'react';

const OnBelayPrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-base leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: May 30, 2025</p>

      <p className="mb-4">
        OnBelay ("we", "our", or "us") operates the OnBelay mobile app, a social climbing platform that connects climbers, shares routes, and tracks progress. This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-2"><strong>Account Info:</strong> Name, email, profile photo, and climbing preferences.</p>
      <p className="mb-2"><strong>Location Data:</strong> We use your device’s location to help you find nearby climbs and friends (with your permission).</p>
      <p className="mb-2"><strong>Activity Data:</strong> Route logs, photos, notes, and shared climbs.</p>
      <p className="mb-2"><strong>Device Info:</strong> Basic diagnostic data and app usage stats for debugging and improvements.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To personalize your app experience</li>
        <li>To connect you with other climbers</li>
        <li>To recommend routes and events based on your activity</li>
        <li>To ensure app performance and fix bugs</li>
        <li>To send optional notifications or updates</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">We do not sell your personal data. We only share information with:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Other users (with your consent, e.g., profile and shared climbs)</li>
        <li>Service providers (like analytics and hosting partners)</li>
        <li>Law enforcement if legally required</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Your Choices</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You can edit or delete your profile at any time</li>
        <li>You can revoke location access from your device settings</li>
        <li>You can request a copy of your data by contacting us</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Security</h2>
      <p className="mb-4">We use encryption and secure databases to protect your information, but no system is 100% secure. We recommend using a strong password and keeping your app updated.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Children's Privacy</h2>
      <p className="mb-4">OnBelay is not intended for users under the age of 13. If we become aware that we’ve collected information from a child, we will delete it.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">We may update this policy to reflect app changes or legal updates. We'll notify you in the app or via email if changes are significant.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, email us at <a href="mailto:support@onbelay.pro" className="text-blue-600 underline">support@onbelay.pro</a>.</p>
    </div>
  );
};

export default OnBelayPrivacyPolicy;
