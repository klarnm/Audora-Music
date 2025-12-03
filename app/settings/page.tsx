'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import MusicPlayer from '@/components/MusicPlayer';
import BillingSection from '@/components/BillingSection';
import { FaUser, FaEnvelope, FaLock, FaBell, FaMusic, FaGlobe, FaSave, FaCheck } from 'react-icons/fa';

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Account settings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Preferences
  const [language, setLanguage] = useState('es');
  const [audioQuality, setAudioQuality] = useState('high');
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  // UI State
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [status, session, router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    setSaveSuccess(false);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.success) {
        setSaveSuccess(true);
        await update({ name, email }); // Update session
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(data.error || 'Error al guardar cambios');
      }
    } catch (err) {
      setError('Error al guardar cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setSaveSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(data.error || 'Error al cambiar contraseña');
      }
    } catch (err) {
      setError('Error al cambiar contraseña');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    // Mock save - en producción guardaría en la base de datos
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveSuccess(true);
    setSaving(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-aurora-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white pb-32 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <button
              onClick={() => router.push('/profile')}
              className="mb-6 text-gray-400 hover:text-white transition-colors"
            >
              ← Volver al perfil
            </button>
            <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-aurora-pink via-purple-400 to-aurora-mint bg-clip-text text-transparent">
              Configuración
            </h1>
            <p className="text-gray-400 text-lg">
              Administra tu cuenta y preferencias
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/settings')}
              className="px-4 py-2 rounded-xl font-bold bg-white/10 border border-white/20 text-white hover:bg-aurora-pink/30 transition-colors"
            >
              Preferencias
            </button>
            <button
              onClick={() => router.push('/settings/planes')}
              className="px-4 py-2 rounded-xl font-bold bg-linear-to-r from-aurora-pink to-purple-500 text-white border border-white/20 hover:scale-105 transition-transform"
            >
              Planes Premium
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center gap-3">
            <FaCheck className="text-green-400" />
            <p className="text-green-400">Cambios guardados exitosamente</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Account Information */}
        <div className="mb-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FaUser className="text-aurora-pink" />
              Información de la cuenta
            </h2>
          </div>
          
          <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Nombre de usuario</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white placeholder-gray-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Correo electrónico</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white placeholder-gray-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-aurora-pink to-purple-600 font-bold hover:shadow-[0_0_30px_rgba(255,78,136,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaSave />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="mb-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FaLock className="text-purple-400" />
              Cambiar contraseña
            </h2>
          </div>
          
          <form onSubmit={handleChangePassword} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Contraseña actual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Nueva contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confirmar nueva contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={saving || !currentPassword || !newPassword || !confirmPassword}
              className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-600 font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaLock />
              {saving ? 'Cambiando...' : 'Cambiar contraseña'}
            </button>
          </form>
        </div>

        {/* Facturación / Descubre nuestros planes */}
        <div className="mb-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-aurora-mint text-2xl">💳</span>
              <h2 className="text-2xl font-bold">Descubre nuestros planes</h2>
            </div>
            <button
              onClick={() => router.push('/settings/planes')}
              className="px-4 py-2 rounded-xl font-bold bg-linear-to-r from-aurora-mint to-aurora-pink text-white border border-white/20 hover:scale-105 transition-transform"
            >
              Ver catálogo de planes
            </button>
          </div>
          <div className="p-6 text-gray-300">
            Explora los diferentes planes Premium y elige el que mejor se adapte a ti. Puedes gestionar tu suscripción y ver tu historial de pagos aquí próximamente.
          </div>
        </div>

        {/* Facturación visual (BillingSection) */}
        <div>TEST FACTURACIÓN</div>
        <BillingSection
          billing={{
            plan: 'Premium',
            status: 'active',
            renewalDate: '2025-12-31',
            paymentMethod: 'Visa **** 4242',
            history: [
              { id: '1', date: '2025-11-30', amount: 99, status: 'paid' },
              { id: '2', date: '2025-10-30', amount: 99, status: 'paid' },
              { id: '3', date: '2025-09-30', amount: 99, status: 'paid' },
            ],
          }}
        />

        {/* Preferences */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FaMusic className="text-green-400" />
              Preferencias
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Language */}
            <div>
              <label className="flex items-center gap-3 text-sm font-semibold mb-2">
                <FaGlobe className="text-blue-400" />
                Idioma
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
            {/* Audio Quality */}
            <div>
              <label className="flex items-center gap-3 text-sm font-semibold mb-2">
                <FaMusic className="text-green-400" />
                Calidad de audio
              </label>
              <select
                value={audioQuality}
                onChange={(e) => setAudioQuality(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-aurora-pink/50 focus:outline-none text-white"
              >
                <option value="low">Baja (96 kbps)</option>
                <option value="normal">Normal (160 kbps)</option>
                <option value="high">Alta (320 kbps)</option>
              </select>
            </div>
            {/* Notifications */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <FaBell className="text-yellow-400" />
                <div>
                  <p className="font-semibold">Notificaciones</p>
                  <p className="text-sm text-gray-400">Recibir notificaciones sobre nuevas funciones</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications ? 'bg-aurora-pink' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            {/* Autoplay */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <FaMusic className="text-purple-400" />
                <div>
                  <p className="font-semibold">Reproducción automática</p>
                  <p className="text-sm text-gray-400">Continuar con canciones similares al finalizar</p>
                </div>
              </div>
              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  autoplay ? 'bg-aurora-pink' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
                    autoplay ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            <button
              onClick={handleSavePreferences}
              disabled={saving}
              className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 font-bold hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaSave />
              {saving ? 'Guardando...' : 'Guardar preferencias'}
            </button>
          </div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}
