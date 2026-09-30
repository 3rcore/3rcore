"use client";
import { useState } from 'react';

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const max = 24;

  const images = Array.from({ length: max }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );

  const col1 = images.slice(0, 8);
  const col2 = images.slice(8, 16);
  const col3 = images.slice(16, 24);

  // Añadimos isPaused a las propiedades del componente
  const Column = ({ imgs, direction, isPaused }: { imgs: string[], direction: 'up' | 'down', isPaused: boolean }) => {
    const animationName = direction === 'up' ? 'scroll-up' : 'scroll-down';

    return (
      <div className="relative h-[80vh] md:h-screen w-full overflow-hidden rounded-sm">
        <div 
          // Mantenemos la pausa al pasar el ratón (hover), y agregamos la pausa por estado
          className="flex flex-col gap-2 w-full absolute top-0 left-0 hover:[animation-play-state:paused]"
          style={{ 
            animation: `${animationName} 25s linear infinite`,
            // Aquí controlamos que se detenga cuando isPaused es true
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {[...imgs, ...imgs].map((name, index) => (
            <div 
              key={`${name}-${index}`}
              className="relative overflow-hidden group cursor-pointer shadow-lg bg-black flex-shrink-0"
              onClick={() => setSelectedImg(name)}
            >
              <img
                src={`/images/galeriaNosotros/${name}.webp`}
                alt={`Imagen ${name}`}
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm group-hover:opacity-60"
              />

              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <img 
                  src="/icons/LOGO3R.webp" 
                  alt="Logo"
                  className="w-20 h-20 object-contain opacity-0 scale-0 -translate-y-20 rotate-[30deg] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0 transition-all duration-500 ease-out"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="p-4 xl:p-2 bg-[#050109]">
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Pasamos el estado de pausa evaluando si hay una imagen seleccionada */}
      <div className="grid grid-cols-3 gap-2">
        <Column imgs={col1} direction="down" isPaused={selectedImg !== null} />
        <Column imgs={col2} direction="up" isPaused={selectedImg !== null} />
        <Column imgs={col3} direction="down" isPaused={selectedImg !== null} />
      </div>

      {selectedImg && (
        <div 
          /* Corrección aplicada aquí: bg-black/95 y backdrop-blur-3xl para evitar el efecto doble */
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/images/galeriaNosotros/${selectedImg}.webp`}
              className="max-h-[85vh] w-auto shadow-2xl rounded-sm"
              alt="Vista ampliada"
            />
            <button 
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}