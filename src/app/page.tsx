"use client";

import { useState, useEffect } from "react";
import { Scissors, Sparkles, User, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { createBooking, Service } from "@/lib/bookings";

const SERVICES: Service[] = [
  { id: "1", name: "Onglerie complète", price: 5000, duration: 60, description: "Soin complet des ongles avec pose de vernis ou résine." },
  { id: "2", name: "Extensions de cils", price: 5000, duration: 90, description: "Pose cil à cil pour un regard intense et naturel." },
  { id: "3", name: "Lash / Brow Lift", price: 5000, duration: 45, description: "Rehaussement des cils ou des sourcils pour un effet structuré." },
  { id: "4", name: "Coiffure & Brushing", price: 5000, duration: 60, description: "Soin capillaire professionnel et brushing sur mesure." },
  { id: "5", name: "Épilation complète", price: 5000, duration: 45, description: "Épilation professionnelle pour une peau douce et soignée." },
  { id: "6", name: "Soin Visage Hydrafacial", price: 5000, duration: 45, description: "Nettoyage en profondeur et hydratation intense du visage." },
  { id: "7", name: "Soins Mains & Pieds", price: 5000, duration: 60, description: "Rituel de soin complet pour la beauté de vos mains et pieds." },
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

  // Auto-redirect to WhatsApp on success
  useEffect(() => {
    if (step === 4 && selectedService && selectedDate && selectedSlot) {
      const message = encodeURIComponent(`Bonjour Elite By S, une nouvelle réservation a été faite :\n\n- Service : ${selectedService.name}\n- Date : ${selectedDate}\n- Heure : ${selectedSlot}\n- Client : ${formData.name}\n- Tél : ${formData.phone}\n\nLien : https://elite-by-s-booking.vercel.app/admin\n\nMerci !`);
      const waLink = `https://wa.me/213770945042?text=${message}`;
      
      // Delay slightly to let the success UI show
      const timer = setTimeout(() => {
        window.open(waLink, '_blank');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [step]);

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
                  <span className="badge">{service.price} DA</span>
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
            type="button"
            onClick={() => {
              if (!selectedDate) {
                alert("Erreur: La date est vide. Veuillez en choisir une valide.");
                return;
              }
              if (!selectedSlot) {
                alert("Erreur: Le créneau est vide. Veuillez en choisir un.");
                return;
              }
              nextStep();
            }}
            className="btn-primary w-full justify-center mt-4"
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
            Merci {formData.name}, votre rendez-vous pour <strong>{selectedService?.name}</strong> ({selectedService?.price} DA) est confirmé le <strong>{selectedDate}</strong> à <strong>{selectedSlot}</strong>.
          </p>
          <div className="glass-card text-left mb-8">
            <p className="text-sm text-gray-500 mb-1">Rappel :</p>
            <p className="text-white">Elite By S - 123 Rue de la Beauté, Paris</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8 text-sm text-green-400">
            ✅ Un message de confirmation WhatsApp a été préparé pour le salon.
          </div>
          
          <button 
            onClick={() => {
              const message = encodeURIComponent(`Bonjour Elite By S, une nouvelle réservation a été faite :\n\n- Service : ${selectedService?.name}\n- Date : ${selectedDate}\n- Heure : ${selectedSlot}\n- Client : ${formData.name}\n- Tél : ${formData.phone}\n\nMerci !`);
              window.open(`https://wa.me/213770945042?text=${message}`, '_blank');
            }}
            className="btn-primary w-full justify-center mb-4 flex items-center gap-2"
          >
            Envoyer la confirmation WhatsApp
          </button>

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
