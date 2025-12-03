import React from 'react';
import { FaCreditCard, FaHistory, FaCrown } from 'react-icons/fa';

export type BillingInfo = {
  plan: string;
  status: 'active' | 'inactive' | 'canceled';
  renewalDate?: string;
  paymentMethod?: string;
  history: Array<{
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
  }>;
};

interface BillingSectionProps {
  billing?: BillingInfo;
}

const BillingSection: React.FC<BillingSectionProps> = ({ billing }) => {
  return (
    <div className="mb-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <FaCreditCard className="text-aurora-mint text-2xl" />
        <h2 className="text-2xl font-bold">Facturación</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Estado de la suscripción */}
        <div className="flex items-center gap-4">
          <FaCrown className="text-yellow-400 text-3xl" />
          <div>
            <p className="font-semibold text-lg">
              {billing?.plan ? `Plan ${billing.plan}` : 'Sin suscripción activa'}
            </p>
            <p className={`text-sm ${billing?.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
              {billing?.status === 'active' ? 'Activa' : 'Inactiva'}
              {billing?.renewalDate && billing.status === 'active' && (
                <span className="ml-2 text-gray-400">(Renueva: {billing.renewalDate})</span>
              )}
            </p>
          </div>
        </div>
        {/* Método de pago */}
        <div>
          <p className="font-semibold mb-1">Método de pago</p>
          <p className="text-gray-300 text-sm">
            {billing?.paymentMethod || 'No hay método de pago registrado'}
          </p>
        </div>
        {/* Historial de pagos */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaHistory className="text-aurora-pink" />
            <span className="font-semibold">Historial de pagos</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-400">
                  <th className="px-2 py-1 text-left">Fecha</th>
                  <th className="px-2 py-1 text-left">Monto</th>
                  <th className="px-2 py-1 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {billing?.history?.length ? (
                  billing.history.map((item) => (
                    <tr key={item.id}>
                      <td className="px-2 py-1">{item.date}</td>
                      <td className="px-2 py-1">${item.amount.toFixed(2)}</td>
                      <td className={`px-2 py-1 ${item.status === 'paid' ? 'text-green-400' : item.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>{item.status === 'paid' ? 'Pagado' : item.status === 'pending' ? 'Pendiente' : 'Fallido'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-gray-400 py-2">No hay pagos registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Opciones de gestión si hay plan activo */}
        {billing?.status === 'active' ? (
          <div className="pt-2 flex flex-col gap-3">
            <button
              className="px-6 py-3 rounded-xl bg-linear-to-r from-aurora-mint to-aurora-pink font-bold hover:shadow-[0_0_30px_rgba(0,255,200,0.3)] transition-all w-full"
              onClick={() => window.location.href = '/settings/gestionar'}
            >
              Gestionar tarjeta y facturación
            </button>
            <button
              className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-400 to-aurora-pink font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all w-full"
              onClick={() => window.location.href = '/settings/gestionar?accion=cambiar-plan'}
            >
              Cambiar de plan
            </button>
            <button
              className="px-6 py-3 rounded-xl bg-linear-to-r from-red-500 to-aurora-pink font-bold hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all w-full"
              onClick={() => window.location.href = '/settings/gestionar?accion=cancelar'}
            >
              Cancelar suscripción
            </button>
          </div>
        ) : (
          <div className="pt-2">
            <button className="px-6 py-3 rounded-xl bg-linear-to-r from-aurora-mint to-aurora-pink font-bold hover:shadow-[0_0_30px_rgba(0,255,200,0.3)] transition-all w-full">
              Gestionar facturación
            </button>
            <p className="text-xs text-gray-400 mt-2 text-center">(Próximamente integración con Stripe)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingSection;
