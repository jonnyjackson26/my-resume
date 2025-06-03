import React from 'react';
import './TempleTracker.css';
import BackButton from '../../components/BackButton/BackButton';
const TempleTracker = () => {
    return (
        <>
        <div className="temple-tracker">
            <h1>Temple Tracker App</h1>
            <p className="description">
                This app helps members of The Church of Jesus Christ of Latter-day Saints track their worship in temples. 
                Set goals, see analytics, track which temples you've been to, and keep a record of ordinances you've completed.
            </p>

            <div className="store-buttons">
                <a 
                    href="https://play.google.com/store/apps/details?id=com.yourapp.templetracker" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="store-button google-play"
                >
                    Download on Google Play
                </a>
                <a 
                    href="https://apps.apple.com/app/idYOUR_APP_ID" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="store-button app-store"
                >
                    Download on the App Store
                </a>
            </div>

            <section className="privacy-policy">
                <h2>Privacy Policy</h2>
                <p>
                    Temple Tracker does not collect or share any personal data. All temple tracking information is stored securely 
                    on your device or optionally backed up to your account if you choose to log in. We respect your privacy and 
                    do not sell or use your data for advertising.
                </p>
            </section>
        </div>
        <BackButton />
        </>
    );
};

export default TempleTracker;
