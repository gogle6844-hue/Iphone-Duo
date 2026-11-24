import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Shield, Compass, Layers } from 'lucide-react';
import { PhoneColorConfig, PhoneColorId } from '../types.ts';
import { PHONE_COLORS } from '../data/colors.ts';
import { AppleLogo } from './AppleLogo.tsx';

interface ColorShowcaseProps {
  activeColor: PhoneColorConfig;
  onSelectColor: (colorId: PhoneColorId) => void;
}

export const ColorShowcase: React.FC<ColorShowcaseProps> = ({ activeColor, onSelectColor }) => {
  const isLight = activeColor.id === 'starwhite';

  return (
    <section id="color-picker" className="py-24 px-4 max-w-6xl mx-auto text-center border-t border-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="text-xs font-bold uppercase tracking-widest transition-colors duration-500"
          style={{ color: activeColor.accent }}
        >
          TITANIUM & CERAMIC FINISHES
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mt-2 mb-3 text-white">
          나이트 스카이 & 스타 화이트
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base mb-12">
          빛과 어둠의 정점에서 탄생한 두 가지 시그니처 마감. 선택 시 상단 3D 모델 및 전체 인터페이스에 즉시 반영됩니다.
        </p>
      </motion.div>

      {/* Two Color Switcher Cards Side-by-Side (or Hero Display) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14 text-left">
        {/* Night Sky Card */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectColor('nightsky')}
          className={`relative rounded-3xl p-7 cursor-pointer transition-all duration-500 border-2 overflow-hidden ${
            activeColor.id === 'nightsky'
              ? 'border-sky-400/80 shadow-2xl shadow-sky-950/40 bg-gradient-to-b from-slate-900/90 to-neutral-950 ring-2 ring-sky-500/20'
              : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 opacity-75'
          }`}
        >
          {/* Subtle cosmic starlight glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-slate-700 bg-[#0b0f19] flex items-center justify-center shadow-inner">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  나이트 스카이
                  <span className="text-xs font-normal text-neutral-400">Night Sky</span>
                </h3>
                <p className="text-xs text-sky-400">심연의 미드나이트 인디고</p>
              </div>
            </div>

            {activeColor.id === 'nightsky' && (
              <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed mb-6">
            {PHONE_COLORS.nightsky.description}
          </p>

          <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              미드나이트 티타늄 섀시
            </span>
            <span className="font-mono text-neutral-300">198g</span>
          </div>
        </motion.div>

        {/* Star White Card */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectColor('starwhite')}
          className={`relative rounded-3xl p-7 cursor-pointer transition-all duration-500 border-2 overflow-hidden ${
            activeColor.id === 'starwhite'
              ? 'border-white/80 shadow-2xl shadow-white/10 bg-gradient-to-b from-neutral-900/90 to-neutral-950 ring-2 ring-white/20'
              : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 opacity-75'
          }`}
        >
          {/* Subtle star white starlight glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-slate-300 bg-[#f8fafc] flex items-center justify-center shadow-inner">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-white via-slate-100 to-sky-200" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  스타 화이트
                  <span className="text-xs font-normal text-neutral-400">Star White</span>
                </h3>
                <p className="text-xs text-slate-300">순백의 루미너스 세라믹</p>
              </div>
            </div>

            {activeColor.id === 'starwhite' && (
              <div className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed mb-6">
            {PHONE_COLORS.starwhite.description}
          </p>

          <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              다이아몬드 커팅 스타 티타늄
            </span>
            <span className="font-mono text-neutral-300">198g</span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Material Inspection Showcase */}
      <motion.div
        layout
        className="max-w-xl mx-auto rounded-[2.5rem] p-8 transition-all duration-700 flex flex-col items-center justify-between shadow-2xl border-4 relative overflow-hidden"
        style={{
          backgroundColor: activeColor.chassisBg,
          borderColor: activeColor.chassisBorder,
        }}
      >
        {/* Specular glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[2.3rem] opacity-60 transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${activeColor.glareColor} 0%, transparent 65%)`,
          }}
        />

        <div className="w-full flex justify-between items-center text-[10px] font-semibold tracking-wider text-neutral-400 z-10">
          <span className="uppercase">PRECISION AEROSPACE CHASSIS</span>
          <span
            className="w-2.5 h-2.5 rounded-full shadow-sm"
            style={{ backgroundColor: activeColor.accent }}
          />
        </div>

        {/* Chassis Centerpiece: Modeled after reference render */}
        <div className="my-6 text-center z-10 w-full flex flex-col items-center">
          <motion.div
            key={activeColor.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`w-44 h-64 rounded-[2rem] p-3 border-4 shadow-2xl flex flex-col justify-between items-center transition-all duration-500 relative ${
              isLight ? 'bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] border-slate-300' : 'bg-gradient-to-b from-[#0b0f19] to-[#030712] border-slate-700'
            }`}
          >
            {/* Horizontal Dual Camera Pill */}
            <div className="w-full flex justify-start">
              <div
                className={`rounded-full px-2 py-1 flex items-center space-x-1.5 shadow-md border ${
                  isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700'
                }`}
                style={{ width: '70px', height: '32px' }}
              >
                <div className="w-5 h-5 rounded-full bg-black border border-slate-400 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-950 border border-blue-400/40" />
                </div>
                <div className="w-5 h-5 rounded-full bg-black border border-slate-400 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-950 border border-indigo-400/40" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              </div>
            </div>

            {/* Apple Logo in Center */}
            <AppleLogo className="w-9 h-9 opacity-85" fill={isLight ? '#64748b' : '#cbd5e1'} />

            <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-400">
              Titanium Glass
            </span>
          </motion.div>

          <h3
            className={`text-2xl font-bold mt-4 mb-1 transition-colors duration-500 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {activeColor.name}
          </h3>
          <p
            className={`text-xs max-w-sm mx-auto transition-colors duration-500 ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            {activeColor.tagline}
          </p>
        </div>

        {/* Material Specs */}
        <div
          className={`w-full pt-4 border-t flex justify-between items-center text-xs z-10 transition-colors duration-500 ${
            isLight ? 'border-slate-300 text-slate-700' : 'border-neutral-800 text-neutral-400'
          }`}
        >
          <span>두께: 4.6mm (펼침) / 9.5mm (접힘)</span>
          <span className="font-semibold">IP68 방수 방진 등급</span>
        </div>
      </motion.div>

      {/* Swatch Quick Selection Bar */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={() => onSelectColor('nightsky')}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all ${
            activeColor.id === 'nightsky'
              ? 'border-sky-400 bg-sky-950/40 text-white ring-2 ring-sky-500/30'
              : 'border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-[#0b0f19] border border-slate-600" />
          <span className="text-xs font-medium">나이트 스카이</span>
        </button>

        <button
          onClick={() => onSelectColor('starwhite')}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all ${
            activeColor.id === 'starwhite'
              ? 'border-white bg-neutral-800/60 text-white ring-2 ring-white/30'
              : 'border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-[#f8fafc] border border-slate-300" />
          <span className="text-xs font-medium">스타 화이트</span>
        </button>
      </div>
    </section>
  );
};
