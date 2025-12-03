"use client";
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';


export default function GestionarPage() {
  return (
    <Suspense>
      <GestionarContent />
    </Suspense>
  );
}

function GestionarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accion = searchParams.get('accion');

  let content = null;
  if (accion === 'cambiar-plan') {
    content = (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Cambiar de plan</h2>
        <p className="text-gray-300 mb-4">Selecciona un nuevo plan para tu suscripción. (Solo visual, no funcional)</p>
        <button onClick={() => router.push('/settings/planes')} className="px-6 py-3 rounded-xl bg-linear-to-r from-aurora-mint to-aurora-pink font-bold w-full">Ver catálogo de planes</button>
      </div>
    );
  } else if (accion === 'cancelar') {
    content = (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2 text-red-400">Cancelar suscripción</h2>
        <p className="text-gray-300 mb-4">¿Estás seguro de que deseas cancelar tu suscripción? (Solo visual, no funcional)</p>
        <button onClick={() => alert('Suscripción cancelada (prototipo)')} className="px-6 py-3 rounded-xl bg-linear-to-r from-red-500 to-aurora-pink font-bold w-full">Confirmar cancelación</button>
      </div>
    );
  } else {
    content = (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Gestionar tarjeta y facturación</h2>
        <p className="text-gray-300 mb-4">Aquí podrás cambiar los datos de tu tarjeta o actualizar tu método de pago. (Solo visual, no funcional)</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Número de tarjeta</label>
            <input type="text" inputMode="numeric" pattern="[0-9 ]*" maxLength={19} placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-mint/50 focus:outline-none text-white placeholder-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Fecha de expiración</label>
              <input type="text" inputMode="numeric" pattern="[0-9/]*" maxLength={5} placeholder="MM/AA" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-mint/50 focus:outline-none text-white placeholder-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">CVC</label>
              <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4} placeholder="123" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-mint/50 focus:outline-none text-white placeholder-gray-500" />
            </div>
          </div>
          <button type="button" onClick={() => alert('Tarjeta actualizada (prototipo)')} className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-aurora-mint to-aurora-pink font-bold hover:scale-105 transition-transform mt-2">Actualizar tarjeta</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-aurora-pink via-purple-900/40 to-blue-900 text-white flex items-center justify-center px-4 py-16">
      <div className="bg-[#18181b] rounded-2xl shadow-xl p-8 max-w-md w-full border border-white/10">
        <button
          type="button"
          onClick={() => router.push('/settings')}
          className="mb-6 text-gray-400 hover:text-white transition-colors text-sm"
        >
          ← Volver a configuración
        </button>
        {content}
      </div>
    </div>
  );
}
