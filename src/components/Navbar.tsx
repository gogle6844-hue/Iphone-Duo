import React, { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { PhoneColorConfig } from '../types.ts';
import { AppleLogo } from './AppleLogo.tsx';

interface NavbarProps {
  activeColor: PhoneColorConfig;
  onOpenPreorder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeColor, onOpenPreorder }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-neutral-800/80 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs sm:text-sm">
        {/* Zone 1: Clean Brand Wordmark */}
        <a href="#hero" className="flex items-center space-x-2 tracking-tight group whitespace-nowrap shrink-0">
          <AppleLogo className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold tracking-wide text-white">
            iPhone <span style={{ color: activeColor.accent }} className="font-bold transition-colors duration-500">Duo</span>
          </span>
        </a>

        {/* Zone 2: 4-5 Concise Single-line Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-neutral-400 font-medium text-xs tracking-wide">
          <a href="#hero" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            3D 듀얼 힌지
          </a>
          <a href="#color-picker" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            색상: {activeColor.name}
          </a>
          <a href="#duo-os" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            DuoOS 멀티태스킹
          </a>
          <a href="#bento-tech" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            하드웨어 기술
          </a>
          <a href="#specs" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            기술 사양
          </a>
        </div>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onOpenPreorder}
            style={{ backgroundColor: activeColor.accent }}
            className="inline-flex items-center space-x-1.5 text-white font-medium px-3.5 py-1.5 rounded-full transition-all text-xs shadow-md hover:brightness-110 active:scale-95 whitespace-nowrap"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>사전 예약 알림</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-400 hover:text-white p-1"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-3 pb-6 space-y-3 bg-neutral-950/95 border-b border-neutral-800 text-sm">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1 font-medium"
          >
            3D 듀얼 힌지
          </a>
          <a
            href="#color-picker"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1 font-medium"
          >
            색상 ({activeColor.name})
          </a>
          <a
            href="#duo-os"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1 font-medium"
          >
            DuoOS 멀티태스킹
          </a>
          <a
            href="#bento-tech"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1 font-medium"
          >
            하드웨어 기술
          </a>
          <a
            href="#specs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-white py-1 font-medium"
          >
            기술 사양
          </a>
        </div>
      )}
    </nav>
  );
};
