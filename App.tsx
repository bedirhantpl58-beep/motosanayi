import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PerformanceSection } from './components/PerformanceSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ModelsExpertise } from './components/ModelsExpertise';
import { TransparencySection } from './components/TransparencySection';
import { BookingSection } from './components/BookingSection';
import { InstagramGarage } from './components/InstagramGarage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TrackAppointmentModal } from './components/TrackAppointmentModal';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedModel, setSelectedModel] = useState<string | undefined>();

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Scroll to booking section smoothly and optionally set service/model
  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const el = document.getElementById('randevu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectModelGroup = (brand: string, model: string) => {
    setSelectedBrand(brand);
    setSelectedModel(model);
    const el = document.getElementById('randevu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* 3-Zone Compliant Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Flow per Conversion Strategy */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Services Grid */}
        <ServicesSection onSelectService={(serviceId) => handleOpenBooking(serviceId)} />

        {/* 3. Performance & CVT Engineering */}
        <PerformanceSection onOpenBooking={(serviceId) => handleOpenBooking(serviceId)} />

        {/* 4. Before / After Interactive Projects */}
        <BeforeAfterSection onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Brand & Model Expertise */}
        <ModelsExpertise onSelectModelGroup={handleSelectModelGroup} />

        {/* 6. Transparency & Customer Service Promises */}
        <TransparencySection />

        {/* 7. Conversion Core: Online Booking System */}
        <BookingSection
          initialServiceId={selectedServiceId}
          initialBrand={selectedBrand}
          initialModel={selectedModel}
        />

        {/* 8. Instagram Reels & Daily Garage Feed */}
        <InstagramGarage />

        {/* 9. Contact, Workshop Location & Maps */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Persistent Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Modals */}
      <TrackAppointmentModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
