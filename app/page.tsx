
import Link from 'next/link';
import Image from 'next/image';

import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-aurora-text-primary flex items-center relative overflow-hidden">
      {/* Fondo de video en bucle con overlay aurora */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.7 }}
      >
        <source src="/aurora-bg.mp4" type="video/mp4" />
      </video>
      {/* Overlay de colores aurora */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 20% 30%, #FF4E88 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, #7FDBCA 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, #8A2BE2 0%, transparent 70%)',
        opacity: 0.45
      }} />
      {/* Animación de puntos flotantes */}
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-6 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: main copy */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-2xl overflow-hidden drop-shadow-2xl shrink-0">
                  <Image src="/logo.png" alt="Audora" fill className="object-contain" priority />
                </div>
                <h1
                  style={{ fontFamily: 'var(--font-sans, Arial, Helvetica, sans-serif)' }}
                  className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-2 bg-clip-text text-transparent bg-linear-to-r from-aurora-pink via-aurora-purple to-aurora-mint"
                >
                  AUDORA
                </h1>
              </div>
              <p className="text-white text-lg sm:text-xl font-medium mt-2">Un reproductor para todos tus sentimientos</p>
            </div>

            <div className="mb-10">
              <p className="text-white text-xl sm:text-2xl font-semibold mb-4 max-w-2xl">Descubre música nueva y crea playlists personalizadas con ayuda de IA.</p>
              <p className="text-white text-base sm:text-lg mb-4 max-w-2xl">Regístrate para guardar tus favoritos y escuchar en cualquier dispositivo.</p>
            </div>

            <div className="flex gap-4 mb-10">
              <Link href="/register" className="inline-block bg-aurora-mint text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
                Regístrate
              </Link>
              <Link href="/login" className="inline-block border border-white/20 px-6 py-3 rounded-full text-white hover:bg-white/5 transition">
                Iniciar sesión
              </Link>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white text-base max-w-xl mb-2">
              <li>• Listas curadas y recomendaciones personalizadas</li>
              <li>• Reproductor con ecualizador y colas inteligentes</li>
              <li>• Sincroniza tu biblioteca en todos los dispositivos</li>
            </ul>
          </div>

          {/* RIGHT: large gradient mockup card + overflowing oval PNG */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-96 lg:h-[520px] rounded-2xl shadow-2xl bg-transparent">
              {/* Center small floating label inside mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 text-center">
                  <p className="text-xl font-semibold text-black">Aurora Music</p>
                  <p className="text-xs text-black/60">Tu música, en todas partes</p>
                </div>
              </div>
            </div>

            {/* Overflow oval PNG — positioned to the right and vertically centered */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none">
              <div className="relative w-64 sm:w-80 md:w-96 lg:w-[480px] xl:w-[560px] -mr-12">
                <div className="rounded-full overflow-hidden drop-shadow-2xl">
                  <Image
                    src="/F_LP.png"
                    alt="Fondo Audora"
                    width={1200}
                    height={1200}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
