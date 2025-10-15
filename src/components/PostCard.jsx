import { X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { id, status, name, city, district, imageUrl, details } = post;

  return (
  <div className="group">
      <div className="w-64 h-96 perspective-1000">
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d border-2 border-gray-200 rounded-2xl
        ${isFlipped ? 'rotate-y-180' : '' }`}
        style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ön Yüz */}
          <div 
            className="absolute w-full h-full backface-hidden bg-transparent rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-4 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
             <span 
            className={`absolute top-4 right-4 inline-block px-3 py-1 text-sm font-semibold text-white rounded-full
              ${status === 'Kayıp' ? 'bg-red-500' : 'bg-green-500'}
            `}
          >
            {status}
          </span>

          <span className="absolute top-4 left-4 inline-block text-2xl font-semibold rounded-full cursor-pointer">
            {name || 'Evcil Hayvan'}
          </span>

              <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-48 object-cover rounded-2xl bg-gray-200 group-hover:scale-105 transition-all duration-300"
            onError={(e) => {
            e.target.onerror = null; // Sonsuz döngüyü önlemek için
            e.target.src = '/default.png'; // Hata durumunda varsayılan resme geç
            }}
          />
            <p className="text-gray-600 text-center underline cursor-pointer mt-10"
                      onClick={() => setIsFlipped(!isFlipped)}
>
              Detayları Gör!
            </p>
          </div>

          {/* Arka Yüz */}
          <div 
            className="absolute w-full h-full backface-hidden bg-transparent rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-start rotate-y-180 gap-4"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <span 
            className="absolute top-2 right-2 inline-block text-sm font-semibold rounded-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            >

            <X />
          </span>
           <div className="flex flex-row gap-2 items-center justify-center w-full">
            <img 
            src={imageUrl || '/default.png'} 
            alt={name || 'evcil hayvan'} 
            className="h-24 aspect-square object-cover rounded-full bg-gray-200"
            onError={(e) => {
            e.target.onerror = null; // Sonsuz döngüyü önlemek için
            e.target.src = '/default.png'; // Hata durumunda varsayılan resme geç
          }}
            />
            <div className="flex flex-col items-start justify-center w-full">
                <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
                <p>{city}/{district}</p>
            </div>
           </div>
           <div className="">
            <p>{details}</p>
           </div>
            <Link to={`/ilan/${id}`} className='absolute bottom-10 hover:text-blue-600 underline transition-colors duration-200' >
           <p className=''>İlanı incele!</p>
           </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
export default PostCard;