"use client";
import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const planNames = {
  individual: 'Individual',
  estudiantes: 'Estudiantes',
  duo: 'Duo',
  familiar: 'Familiar',
};



export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'individual';
  const [studentCard, setStudentCard] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStudentCard(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-aurora-pink via-purple-900/40 to-blue-900 text-white flex items-center justify-center px-4 py-16">
      <div className="bg-[#18181b] rounded-2xl shadow-xl p-8 max-w-md w-full border border-white/10">
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="mb-6 text-gray-400 hover:text-white transition-colors text-sm"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-bold mb-4 text-center">Completa tu suscripción</h1>
        <p className="text-lg text-center mb-6">Plan seleccionado: <span className="font-bold text-aurora-mint">{planNames[plan as keyof typeof planNames] || 'Individual'}</span></p>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-aurora-mint border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-aurora-mint font-bold text-lg">Estamos procesando su pago...</p>
          </div>
        ) : submitted ? (
          <div className="text-center text-green-400 font-bold text-xl py-8">¡Datos enviados!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Nombre completo</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white placeholder-gray-500" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Correo electrónico</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white placeholder-gray-500" placeholder="tu@email.com" />
            </div>
            {plan === 'estudiantes' && (
              <div>
                <label className="block text-sm font-semibold mb-2">Foto de carnet universitario</label>
                <input type="file" accept="image/*" required onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-aurora-pink/20 file:text-aurora-pink hover:file:bg-aurora-pink/40" />
                {studentCard && <p className="text-xs text-green-400 mt-1">Archivo seleccionado: {studentCard.name}</p>}
              </div>
            )}
            {/* Campos fake de tarjeta */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Número de tarjeta</label>
                <input type="text" inputMode="numeric" pattern="[0-9 ]*" maxLength={19} placeholder="1234 5678 9012 3456" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-mint/50 focus:outline-none text-white placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Fecha de expiración</label>
                <input type="text" inputMode="numeric" pattern="[0-9/]*" maxLength={5} placeholder="MM/AA" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-mint/50 focus:outline-none text-white placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">CVC</label>
                <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4} placeholder="123" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-mint/50 focus:outline-none text-white placeholder-gray-500" />
              </div>
            </div>
            <button type="submit" className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-aurora-mint to-aurora-pink font-bold hover:scale-105 transition-transform mt-4">Finalizar suscripción</button>
          </form>
        )}
      </div>
    </div>
  );
}
