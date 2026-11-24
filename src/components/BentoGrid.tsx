import React from 'react';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, BatteryCharging, Zap, Maximize2, PenTool } from 'lucide-react';
import { PhoneColorConfig } from '../types.ts';

interface BentoGridProps {
  activeColor: PhoneColorConfig;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ activeColor }) => {
  return (
    <section id="bento-tech" className="py-28 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span
          className="text-xs font-bold uppercase tracking-widest transition-colors duration-500"
          style={{ color: activeColor.accent }}
        >
          HARDWARE INNOVATION
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-2 text-white">
          모든 혁신을 하나의 기기에
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base mt-3">
          티타늄 힌지부터 독립 듀얼 NPU까지, 엔지니어링의 한계를 뛰어넘은 설계.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: 8.1" Wide Smart Canvas (Col span 2) */}
        <motion.div
          whileHover={{ y: -4 }}
          className="md:col-span-2 glass-card rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between border border-neutral-800 relative overflow-hidden"
        >
          <div className="max-w-xl z-10">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: activeColor.accent }}
            >
              Dual Super Retina XDR
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold mt-3 mb-4 text-white">
              8.1인치 와이드 스마트 캔버스
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              제로 베젤 수준의 초미세 힌지로 두 화면이 하나의 광활한 디스플레이처럼 매끄럽게 연결됩니다. 3,000 nits 피크 밝기와 ProMotion 120Hz를 양 패널 모두에서 동시에 완벽 구동합니다.
            </p>
          </div>

          <div className="mt-8 flex justify-end z-10">
            <div className="w-full h-44 rounded-2xl bg-gradient-to-r from-sky-950/40 via-neutral-900 to-black border border-white/10 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">120Hz</p>
                  <p className="text-[11px] text-neutral-400">ProMotion 적응형</p>
                </div>
                <div className="w-px h-10 bg-neutral-700" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">3,000 nits</p>
                  <p className="text-[11px] text-neutral-400">야외 피크 밝기</p>
                </div>
                <div className="w-px h-10 bg-neutral-700" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">0.01ms</p>
                  <p className="text-[11px] text-neutral-400">좌우 패널 동기화</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: A20 Chip */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border border-neutral-800"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6" style={{ color: activeColor.accent }} />
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: activeColor.accent }}
            >
              A20 Chip
            </span>
            <h3 className="text-xl font-bold text-white mt-2 mb-3">독립 듀얼 NPU 아키텍처</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              두 스크린에서 각각 고성능 AI 프로세싱과 그래픽 렌더링을 딜레이 없이 병렬 처리하여 전력 소모를 35% 절감합니다.
            </p>
          </div>
          <div
            className="pt-6 border-t border-neutral-800 mt-6 flex justify-between items-center text-xs font-semibold"
            style={{ color: activeColor.accent }}
          >
            <span>멀티코어 성능 +75% 향상</span>
            <Zap className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Card 3: Titanium Hinge */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border border-neutral-800"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Zero-Gap Titanium Hinge
            </span>
            <h3 className="text-xl font-bold text-white mt-2 mb-3">100만 회 폴딩 내구성</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              초정밀 마이크로 기어가 적용된 티타늄 힌지는 틈새 없는 플랫 폴딩과 원하는 각도 고정 프리 스탑을 완벽 지원합니다.
            </p>
          </div>
          <div className="pt-6 border-t border-neutral-800 mt-6 flex justify-between items-center text-xs font-semibold text-indigo-400">
            <span>나이트 스카이 & 스타 화이트 컬러 코팅</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Card 4: Tandem Battery (Col span 2) */}
        <motion.div
          whileHover={{ y: -4 }}
          className="md:col-span-2 glass-card rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between border border-neutral-800"
        >
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Tandem Battery Technology
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
              하루 종일 지속되는 5,200mAh 분산 배터리
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              좌우 패널에 분산 탑재된 초박형 배터리가 최상의 무게 밸런스와 최대 32시간의 연속 영상 재생을 가능하게 합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center space-x-3.5">
              <BatteryCharging className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-neutral-400">연속 영상 재생 시간</p>
                <p className="text-base font-bold text-white">최대 32시간</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center space-x-3.5">
              <Zap className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-neutral-400">MagSafe 고속 무선 충전</p>
                <p className="text-base font-bold text-white">45W 지원 (30분 만에 65%)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
