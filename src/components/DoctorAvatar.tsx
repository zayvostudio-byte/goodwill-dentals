import React, { useState } from 'react';
import { User, AlertCircle } from 'lucide-react';
import { DoctorProfile } from '../types';

interface DoctorAvatarProps {
  doctor: DoctorProfile;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const DoctorAvatar: React.FC<DoctorAvatarProps> = ({
  doctor,
  className = '',
  size = 'md',
  showBadge = false,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // Derive size classes if custom className does not override width/height
  const sizeClasses = {
    sm: 'w-12 h-12 rounded-xl text-xs',
    md: 'w-16 h-16 rounded-2xl text-sm',
    lg: 'h-48 w-full rounded-2xl text-base',
    xl: 'h-72 w-full rounded-3xl text-lg',
  }[size];

  if (imageFailed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-slate-100 border border-slate-200 text-slate-500 overflow-hidden p-3 text-center ${sizeClasses} ${className}`}
        title={`Missing asset: ${doctor.sourceFilename}`}
      >
        <User className="w-8 h-8 text-slate-400 mb-1" />
        <span className="font-heading font-bold text-slate-700 text-xs">
          {doctor.name}
        </span>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span className="truncate max-w-[140px] font-mono">{doctor.sourceFilename}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${sizeClasses} ${className}`}>
      <img
        src={doctor.imagePath}
        alt={`Portrait of ${doctor.name}, ${doctor.specialty}`}
        onError={() => setImageFailed(true)}
        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-103"
      />
      {showBadge && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xs border border-slate-100 text-[11px] font-bold text-[#142D3D]">
          {doctor.specialty}
        </div>
      )}
    </div>
  );
};
