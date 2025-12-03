import React from 'react';
import { FaCrown, FaUserGraduate, FaUsers, FaUserFriends, FaCheckCircle } from 'react-icons/fa';

const plans = [
  {
    name: 'Individual',
    price: '20,90 PEN al mes',
    features: [
      '1 cuenta Premium',
      'Cancela cuando quieras',
      'Suscríbete o haz un solo pago',
      'Playlist con IA ilimitadas al mes',
    ],
    color: 'from-aurora-pink to-purple-500',
    button: 'Pasar a Premium Individual',
    link: '/settings/checkout?plan=individual',
    icon: <FaCrown className="text-aurora-pink text-2xl" />,
  },
  {
    name: 'Estudiantes',
    price: '11,90 PEN al mes',
    features: [
      '1 cuenta Premium verificada',
      'Descuento para estudiantes que cumplan los requisitos',
      'Cancela cuando quieras',
      'Suscríbete o haz un solo pago',
      'Playlist con IA ilimitadas al mes',
    ],
    color: 'from-purple-400 to-aurora-pink',
    button: 'Pasar a Premium para Estudiantes',
    link: '/settings/checkout?plan=estudiantes',
    icon: <FaUserGraduate className="text-purple-400 text-2xl" />,
  },
  {
    name: 'Duo',
    price: '26,90 PEN al mes',
    features: [
      '2 cuentas Premium',
      'Cancela cuando quieras',
      'Suscríbete o haz un solo pago',
      'Playlist con IA ilimitadas al mes',
    ],
    color: 'from-yellow-400 to-aurora-mint',
    button: 'Pasar a Premium Duo',
    link: '/settings/checkout?plan=duo',
    icon: <FaUserFriends className="text-yellow-400 text-2xl" />,
  },
  {
    name: 'Familiar',
    price: '32,90 PEN al mes',
    features: [
      'Hasta 4 cuentas Premium',
      'Controla el contenido etiquetado como explícito',
      'Posibilidad de comprar 1 o 2 cuentas Premium adicionales con una suscripción periódica',
      'Cancela cuando quieras',
      'Suscríbete o haz un solo pago',
      'Playlist con IA ilimitadas al mes',
    ],
    color: 'from-blue-400 to-aurora-mint',
    button: 'Pasar a Premium Familiar',
    link: '/settings/checkout?plan=familiar',
    icon: <FaUsers className="text-blue-400 text-2xl" />,
  },
];



const PlanesPremium: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-aurora-pink via-purple-900/40 to-blue-900 text-white pb-32">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubre nuestros planes</h1>
          <p className="text-lg text-gray-200 mb-6">Disfruta de música sin interrupciones con Premium. Cancela cuando quieras.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className="flex-1 bg-[#18181b] rounded-2xl shadow-lg p-6 flex flex-col border border-white/10 min-w-[260px] max-w-xs mx-auto">
              <div className="flex items-center gap-2 mb-2">{plan.icon}<span className="font-bold text-xl">{plan.name}</span></div>
              <div className="text-2xl font-bold mb-2">{plan.price}</div>
              <ul className="mb-6 space-y-1 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><FaCheckCircle className="text-green-400" />{f}</li>
                ))}
              </ul>
              <a href={plan.link} className={`mt-auto px-4 py-3 rounded-xl bg-linear-to-r ${plan.color} font-bold text-center hover:scale-105 transition-transform`}>{plan.button}</a>
            </div>
          ))}
        </div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Planes asequibles para cualquier situación</h2>
          <p className="text-gray-300 mb-4">Elige un plan Premium y escucha música sin anuncios y sin límites en teléfonos, altavoces y otros dispositivos. Paga de varias formas. Cancela cuando quieras.</p>
        </div>
        <div className="bg-[#111112] rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Todos los planes Premium incluyen lo siguiente:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left text-gray-200 text-base">
            <li>✓ Escucha tu música favorita sin anuncios</li>
            <li>✓ Descarga de canciones para disfrutarlas sin conexión</li>
            <li>✓ Escucha canciones en cualquier orden</li>
            <li>✓ Calidad del audio alta</li>
            <li>✓ Escucha lo que quieras con tus amigos, en tiempo real</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanesPremium;
