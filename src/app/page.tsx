"use client";

import { useState, useEffect } from "react";
import { Scissors, Sparkles, User, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { createBooking, Service } from "@/lib/bookings";

const SERVICES: Service[] = [
  { id: "1", name: "Coupe & Brushing", price: 45, duration: 60, description: "Coupe personnalisée et séchage professionnel." },
  { id: "2", name: "Soin Visage Éclat", price: 60, duration: 45, description: "Un soin revitalisant pour redonner de l'éclat à votre peau." },
  { id: "3", name: "Manucure Spa", price: 35, duration: 40, description: "Soin complet des mains et pose de vernis." },
  { id: "4", name: "Maquillage Soirée", price: 50, duration: 60, description: "Look sublime pour vos événements spéciaux." },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedSlot) return;
    
    setIsSubmitting(true);
    try {
      const bookingDateTime = new Date(`${selectedDate}T${selectedSlot}:00`);
      
      // Check for conflicts
      const { isSlotAvailable } = await import("@/lib/bookings");
      const available = await isSlotAvailable(bookingDateTime, selectedService.duration);
      
      if (!available) {
        alert("Désolé, ce créneau vient d'être réservé. Veuillez en choisir un autre.");
        setIsSubmitting(false);
        setStep(2); // Go back to slot selection
        return;
      }

      await createBooking({
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        dateTime: bookingDateTime,
        duration: selectedService.duration,
      });
      nextStep();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Une erreur est survenue lors de la réservation. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Elite By S</h1>
        <p className="text-gray-400">Votre parenthèse beauté d'exception</p>
      </header>

      {/* Progress Bar */}
      <div className="flex justify-between mb-8 px-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 mx-1 rounded ${step >= i ? 'bg-primary' : 'bg-gray-800'}`}
          />
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <section className="animate-fade-in">
          <h2 className="section-title text-xl mb-6 flex items-center justify-center gap-2">
            <Scissors size={20} /> Choisissez un service
          </h2>
          <div className="grid gap-4">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className={`glass-card cursor-pointer border-2 ${selectedService?.id === service.id ? 'border-primary' : 'border-transparent'}`}
                onClick={() => {
                  setSelectedService(service);
                  nextStep();
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg text-white font-medium">{service.name}</h3>
                  <span className="badge">{service.price}€</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={14} /> {service.duration} min
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Step 2: Date & Slot Selection */}
      {step === 2 && (
        <section className="animate-fade-in">
          <button onClick={prevStep} className="text-sm text-gray-400 mb-6 flex items-center gap-1">
            ← Retour aux services
          </button>
          <h2 className="section-title text-xl mb-6 flex items-center justify-center gap-2">
            <CalendarIcon size={20} /> Date & Créneau
          </h2>
          
          <div className="glass-card mb-6">
             <input 
              type="date" 
              className="w-full bg-transparent border-none text-white focus:ring-0" 
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((slot) => (
              <button 
                key={slot}
                className={`p-3 rounded-lg border ${selectedSlot === slot ? 'border-primary bg-primary/10 text-primary' : 'border-gray-800 text-gray-400'}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <button 
            disabled={!selectedDate || !selectedSlot}
            onClick={() => {
              console.log("Next step clicked", { selectedDate, selectedSlot });
              nextStep();
            }}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Continuer
          </button>
        </section>
      )}

      {/* Step 3: Customer Info */}
      {step === 3 && (
        <section className="animate-fade-in">
          <button onClick={prevStep} className="text-sm text-gray-400 mb-6 flex items-center gap-1">
            ← Retour au créneau
          </button>
          <h2 className="section-title text-xl mb-6 flex items-center justify-center gap-2">
            <User size={20} /> Vos informations
          </h2>
          
          <div className="glass-card mb-8 space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-1">Nom complet</label>
              <input 
                type="text" 
                placeholder="Ex: Jean Dupont"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-1">Téléphone</label>
              <input 
                type="tel" 
                placeholder="06 12 34 56 78"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-1">Email (facultatif)</label>
              <input 
                type="email" 
                placeholder="jean@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <button 
            disabled={!formData.name || !formData.phone || isSubmitting}
            onClick={handleBooking}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {isSubmitting ? "Traitement..." : "Confirmer la réservation"}
          </button>
        </section>
      )}

      {/* Success Step */}
      {step === 4 && (
        <section className="text-center py-10 animate-fade-in">
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-primary" strokeWidth={1} />
          </div>
          <h2 className="text-2xl font-bold mb-4">C'est réservé !</h2>
          <p className="text-gray-400 mb-8">
            Merci {formData.name}, votre rendez-vous pour <strong>{selectedService?.name}</strong> est confirmé le <strong>{selectedDate}</strong> à <strong>{selectedSlot}</strong>.
          </p>
          <div className="glass-card text-left mb-8">
            <p className="text-sm text-gray-500 mb-1">Rappel :</p>
            <p className="text-white">Elite By S - 123 Rue de la Beauté, Paris</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="btn-outline w-full"
          >
            Faire une autre réservation
          </button>
        </section>
      )}
    </div>
  );
}
