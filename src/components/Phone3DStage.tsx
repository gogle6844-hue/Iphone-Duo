import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  RotateCcw,
  Camera,
  Sliders,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { PhoneColorConfig, PhoneColorId } from '../types.ts';
import { IPhoneDuoCanvas, CameraPresetId } from './IPhoneDuoCanvas.tsx';

interface Phone3DStageProps {
  activeColor: PhoneColorConfig;
  onSelectColor: (colorId: PhoneColorId) => void;
  onOpenPreorder: () => void;
}

export const Phone3DStage: React.FC<Phone3DStageProps> = ({
  activeColor,
  onSelectColor,
}) => {
  // Stage mode: real-time 3D GLB model vs official concept render image
  const [stageMode, setStageMode] = useState<'3d' | 'concept'>('3d');

  // Fold angle: 0 (closed) .. 180 (flat open)
  const [foldAngle, setFoldAngle] = useState<number>(135);
  const [activeFoldPreset, setActiveFoldPreset] = useState<'official' | 'unfolded' | 'flex' | 'folded'>('official');

  // Camera & turntable state
  const [cameraPreset, setCameraPreset] = useState<CameraPresetId>('official');
  const [cameraPresetTick, setCameraPresetTick] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);

  // Hotspot state for Concept Render inspection mode
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const selectFoldPreset = (preset: 'official' | 'unfolded' | 'flex' | 'folded') => {
    setActiveFoldPreset(preset);
    if (preset === 'unfolded') {
      setFoldAngle(180);
      setCameraPreset('front');
    } else if (preset === 'official') {
      setFoldAngle(135);
      setCameraPreset('official');
    } else if (preset === 'flex') {
      setFoldAngle(105);
      setCameraPreset('official');
    } else {
      setFoldAngle(0);
      setCameraPreset('rear');
    }
    setCameraPresetTick((t) => t + 1);
  };

  const selectCameraPreset = (preset: CameraPresetId) => {
    setAutoRotate(false);
    if (preset === 'front' && foldAngle < 45) {
      setFoldAngle(180);
      setActiveFoldPreset('unfolded');
    }
    setCameraPreset(preset);
    setCameraPresetTick((t) => t + 1);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFoldAngle(val);
    if (val >= 170) setActiveFoldPreset('unfolded');
    else if (val >= 125 && val <= 145) setActiveFoldPreset('official');
    else if (val <= 15) setActiveFoldPreset('folded');
    else setActiveFoldPreset('flex');
  };

  const handleResetView = () => {
    setAutoRotate(false);
    setFoldAngle(135);
    setActiveFoldPreset('official');
    setCameraPreset('official');
    setCameraPresetTick((t) => t + 1);
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 pb-14 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
    >
      {/* Ambient Background Glow reflecting Night Sky / Star White */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] rounded-full blur-[180px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeColor.glowBg }}
      />

      {/* Top Kicker */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-semibold mb-4 tracking-wide">
        <Sparkles className="w-3.5 h-3.5" style={{ color: activeColor.accent }} />
        <span style={{ color: activeColor.accent }} className="transition-colors duration-500">
          실시간 3D 하드웨어 쇼케이스
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 max-w-5xl leading-[1.08] text-white">
        Two Screens.{' '}
        <span
          className="duo-gradient-text"
          style={{
            ['--theme-accent' as any]: activeColor.accent,
          }}
        >
          One Masterpiece.
        </span>
      </h1>

      <p className="text-sm sm:text-lg text-neutral-400 max-w-2xl font-normal mb-5 leading-relaxed">
        정밀 티타늄 힌지와 듀얼 48MP 카메라, 내·외부 Super Retina XDR 디스플레이까지.{' '}
        <span className="text-neutral-200 font-medium">나이트 스카이</span>와{' '}
        <span className="text-neutral-200 font-medium">스타 화이트</span> 리얼 3D 모델로 직접 확인하세요.
      </p>

      {/* Top Mode & Color Status Strip */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-5 z-20">
        <div
          className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors duration-500 ${activeColor.badgeBg} ${activeColor.badgeBorder}`}
        >
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/30"
            style={{ backgroundColor: activeColor.chassisBg }}
          />
          <span className={activeColor.badgeText}>
            마감: <strong className="font-semibold">{activeColor.name}</strong>
          </span>
        </div>

        <div className="inline-flex bg-neutral-900 p-1 rounded-full border border-neutral-800 text-xs">
          <button
            onClick={() => setStageMode('3d')}
            className={`px-3.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              stageMode === '3d'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            리얼 3D 모델
          </button>
          <button
            onClick={() => setStageMode('concept')}
            className={`px-3.5 py-1 rounded-full font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              stageMode === 'concept'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>공식 콘셉트 렌더</span>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MODE A: REAL-TIME THREE.JS GLB VIEWPORT WITH BOTTOM CONTROL DOCK */}
      {/* ================================================================ */}
      {stageMode === '3d' && (
        <div className="relative w-full max-w-6xl h-[520px] sm:h-[600px] md:h-[640px] rounded-[2rem] border border-neutral-800/90 bg-[#080a0f] overflow-hidden shadow-2xl">
          {/* Top-left unobtrusive hint */}
          <div className="absolute top-4 left-5 z-20 pointer-events-none text-left">
            <p className="text-[11px] font-medium text-neutral-400">
              드래그하여 360° 회전 · 스크롤하여 확대/축소
            </p>
          </div>

          {/* Top-right compact reset button */}
          <button
            onClick={handleResetView}
            className="absolute top-3.5 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121620]/90 border border-neutral-700/80 text-[11px] font-medium text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            title="기본 시점 초기화"
          >
            <RotateCcw className="w-3 h-3" />
            <span>시점 초기화</span>
          </button>

          {/* Isolated Three.js Canvas Mount (100% unobstructed center) */}
          <IPhoneDuoCanvas
            colorId={activeColor.id}
            foldAngle={foldAngle}
            cameraPreset={cameraPreset}
            cameraPresetTick={cameraPresetTick}
            autoRotate={autoRotate}
          />

          {/* Collapsible Bottom Control Dock (Zero backdrop-filter over WebGL!) */}
          <div
            className="absolute bottom-4 inset-x-0 mx-auto z-30 flex flex-col items-center transition-transform duration-300 ease-out"
            style={{
              width: 'min(900px, 94%)',
              transform: dockCollapsed
                ? 'translateY(calc(100% - 34px))'
                : 'translateY(0)',
            }}
          >
            {/* Collapse / Expand Handle */}
            <button
              onClick={() => setDockCollapsed(!dockCollapsed)}
              className="mb-1.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#121620] border border-neutral-700/80 text-[11px] font-medium text-neutral-300 hover:text-white transition-colors shadow-md"
            >
              {dockCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>컨트롤 펼치기</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>컨트롤 숨기기</span>
                </>
              )}
            </button>

            {/* Unified Horizontal Dock (solid dark surface, no backdrop-blur) */}
            <div className="w-full rounded-2xl bg-[#0e121b]/95 border border-neutral-800 px-4 py-3 shadow-2xl flex flex-col gap-2.5">
              {/* Row 1: Fold Angle Slider + Fold Presets */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Fold Angle Slider */}
                <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
                  <Sliders className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="text-[11px] font-medium text-neutral-300 shrink-0">
                    폴딩 각도
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={foldAngle}
                    onChange={handleSliderChange}
                    className="w-full accent-sky-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono tabular-nums text-xs font-semibold text-white w-9 text-right shrink-0">
                    {foldAngle}°
                  </span>
                </div>

                {/* Fold Presets */}
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                  {[
                    { id: 'unfolded' as const, label: '펼침 180°' },
                    { id: 'official' as const, label: '오피셜 135°' },
                    { id: 'flex' as const, label: '플렉스 105°' },
                    { id: 'folded' as const, label: '접힘 0°' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => selectFoldPreset(item.id)}
                      style={
                        activeFoldPreset === item.id
                          ? { backgroundColor: activeColor.accent, color: '#fff' }
                          : undefined
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                        activeFoldPreset === item.id
                          ? 'shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Color Finish Swatches + Camera View Presets + Turntable */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-neutral-800/80">
                {/* Color Selector (Night Sky & Star White) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-neutral-400 mr-1">색상</span>
                  <button
                    onClick={() => onSelectColor('nightsky')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors whitespace-nowrap ${
                      activeColor.id === 'nightsky'
                        ? 'border-sky-400 bg-sky-950/60 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0b0f19] border border-slate-500" />
                    <span>나이트 스카이</span>
                  </button>
                  <button
                    onClick={() => onSelectColor('starwhite')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors whitespace-nowrap ${
                      activeColor.id === 'starwhite'
                        ? 'border-white bg-neutral-800 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f8fafc] border border-slate-400" />
                    <span>스타 화이트</span>
                  </button>
                </div>

                {/* Camera Angles & Auto-Rotate */}
                <div className="flex flex-wrap items-center gap-1">
                  {[
                    { id: 'official' as CameraPresetId, label: '오피셜 뷰' },
                    { id: 'front' as CameraPresetId, label: '내부 스크린' },
                    { id: 'rear' as CameraPresetId, label: '후면 · 외부 화면' },
                    { id: 'hinge' as CameraPresetId, label: '힌지 측면' },
                  ].map((cam) => (
                    <button
                      key={cam.id}
                      onClick={() => selectCameraPreset(cam.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors whitespace-nowrap ${
                        cameraPreset === cam.id && !autoRotate
                          ? 'border-neutral-500 bg-neutral-800 text-white'
                          : 'border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cam.label}
                    </button>
                  ))}

                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors whitespace-nowrap ${
                      autoRotate
                        ? 'border-sky-400 bg-sky-950/60 text-sky-300'
                        : 'border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>{autoRotate ? '회전 중' : '360° 회전'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODE B: OFFICIAL CONCEPT RENDER VIEW (Reference Attachment) */}
      {/* ================================================================ */}
      {stageMode === 'concept' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl mx-auto my-2 relative flex flex-col items-center"
        >
          <div className="relative glass-card rounded-[2.5rem] p-4 sm:p-8 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col items-center w-full">
            <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden flex items-center justify-center py-4">
              <img
                src="/assets/aistudio/iphone_duo_concept_cutout.png"
                alt="iPhone Duo Official Reference Concept"
                className="max-h-[440px] sm:max-h-[500px] object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.85)]"
              />

              {[
                { id: 'camera', label: '1', top: '28%', left: '21%' },
                { id: 'logo', label: '2', top: '52%', left: '27%' },
                { id: 'hinge', label: '3', top: '24%', left: '61%' },
                { id: 'display', label: '4', top: '64%', left: '64%' },
              ].map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActiveHotspot(activeHotspot === pin.id ? null : pin.id)}
                  style={{ top: pin.top, left: pin.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-lg transition-transform z-30 ${
                    activeHotspot === pin.id
                      ? 'bg-white text-slate-900 scale-125'
                      : 'bg-sky-500 ring-4 ring-sky-400/30 hover:scale-110'
                  }`}
                >
                  {pin.label}
                </button>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-left w-full max-w-xl text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">디자인 세부 포인트 가이드</span>
                <span className="text-[11px] text-neutral-400">번호를 클릭해 확인하세요</span>
              </div>

              {activeHotspot === 'camera' && (
                <p className="text-neutral-300">
                  <strong className="text-white">1. 수평 듀얼 퓨전 카메라 캡슐:</strong> 상단 좌측 수평 타원형 아일랜드에 두 개의 48MP 대구경 렌즈와 LED 플래시를 일렬로 배치했습니다.
                </p>
              )}
              {activeHotspot === 'logo' && (
                <p className="text-neutral-300">
                  <strong className="text-white">2. 미러 에칭 애플 로고:</strong> 프로스트 티타늄 글래스 중앙에 정밀 에칭되어 일체감을 완성합니다.
                </p>
              )}
              {activeHotspot === 'hinge' && (
                <p className="text-neutral-300">
                  <strong className="text-white">3. 제로 갭 티타늄 드롭 힌지:</strong> 접힐 때 패널 내측 굴곡을 자연스럽게 흡수해 주름을 최소화하고 평평하게 맞물립니다.
                </p>
              )}
              {activeHotspot === 'display' && (
                <p className="text-neutral-300">
                  <strong className="text-white">4. 8.1인치 플렉시블 OLED:</strong> 3,000 nits 피크 밝기와 120Hz ProMotion을 지원하는 심리스 인폴딩 디스플레이입니다.
                </p>
              )}
              {!activeHotspot && (
                <p className="text-neutral-400">
                  이미지 위의 번호(1~4)를 클릭하면 수평 듀얼 카메라, 애플 로고, 힌지, 8.1" OLED 상세 설명을 확인할 수 있습니다.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Specs Under Hero */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl w-full text-center border-t border-neutral-800/80 pt-6">
        <div>
          <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">8.1" 인폴딩</p>
          <p className="text-xs text-neutral-400 mt-0.5">Super Retina XDR OLED</p>
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">수평 듀얼 48MP</p>
          <p className="text-xs text-neutral-400 mt-0.5">Fusion 캡슐 아일랜드</p>
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">A20 Chip</p>
          <p className="text-xs text-neutral-400 mt-0.5">독립 듀얼 NPU 엔진</p>
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">나이트 스카이 · 스타 화이트</p>
          <p className="text-xs text-neutral-400 mt-0.5">에어로스페이스 티타늄</p>
        </div>
      </div>
    </section>
  );
};
