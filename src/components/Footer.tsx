import React from 'react';
import { Bell } from 'lucide-react';
import { PhoneColorConfig } from '../types.ts';
import { AppleLogo } from './AppleLogo.tsx';

interface FooterProps {
  activeColor: PhoneColorConfig;
  onOpenPreorder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ activeColor, onOpenPreorder }) => {
  return (
    <footer className="bg-black text-neutral-500 text-xs py-16 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-neutral-900">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-1">
              <AppleLogo className="w-5 h-5 text-white" />
              <span>iPhone Duo</span>
            </div>
            <p className="text-xs text-neutral-400">
              나이트 스카이와 스타 화이트 컬러로 선보이는 차세대 듀얼 스크린의 모든 것.
            </p>
          </div>
          <button
            onClick={onOpenPreorder}
            style={{ backgroundColor: activeColor.accent }}
            className="inline-flex items-center space-x-2 text-white font-semibold px-6 py-2.5 rounded-full transition-all text-xs hover:brightness-110 active:scale-95 shadow-lg whitespace-nowrap"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>사전 알림 등록하기</span>
          </button>
        </div>

        {/* Links & Disclaimer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-neutral-500 text-[11px] space-y-4 sm:space-y-0">
          <p>© 2026 Apple Inc. 모든 권리 보유. (인터랙티브 웹 쇼케이스 콘셉트 프로토타입)</p>
          <div className="flex space-x-6">
            <span className="text-neutral-400">나이트 스카이 & 스타 화이트 에디션</span>
            <a href="#hero" className="hover:text-neutral-300 transition-colors">
              맨 위로 가기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
