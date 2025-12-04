'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-3 -ml-2 md:ml-0">
      <div className="w-20 h-20 md:w-16 md:h-16 relative flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="Merci Saint-Esprit Église"
          width={80}
          height={80}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base md:text-xs font-bold text-light leading-tight">Merci Saint-Esprit</span>
        <div className="flex justify-end">
          <span className="text-sm md:text-[9px] font-bold text-rose-500 mt-0.5">Église</span>
        </div>
      </div>
    </div>
  )
}
