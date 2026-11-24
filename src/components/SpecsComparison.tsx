import React from 'react';
import {
  Smartphone,
  Cpu,
  Layers,
  Battery,
  Shield,
  Palette,
  Camera,
  PenTool,
  Tag,
  Check,
} from 'lucide-react';
import { PhoneColorConfig } from '../types.ts';

interface SpecsComparisonProps {
  activeColor: PhoneColorConfig;
}

export const SpecsComparison: React.FC<SpecsComparisonProps> = ({ activeColor }) => {
  const specCategories = [
    {
      category: '디스플레이',
      icon: Smartphone,
      highlight: '듀얼 6.3" Super Retina XDR (펼쳤을 때 8.1" 대화면)',
      details: [
        '해상도: 2,796 x 2,556 픽셀 (펼침 기준 460 ppi)',
        '1~120Hz ProMotion 적응형 재생률',
        '야외 피크 밝기 3,000 nits / HDR 피크 밝기 2,000 nits',
        'Dynamic Island 및 양면 True Tone 디스플레이',
      ],
    },
    {
      category: '색상 및 마감',
      icon: Palette,
      highlight: '나이트 스카이 (Night Sky) · 스타 화이트 (Star White)',
      details: [
        '나이트 스카이: 심연의 미드나이트 인디고 티타늄 & 스타더스트 글래스',
        '스타 화이트: 순백의 펄 세라믹 & 다이아몬드 커팅 스타 실버 티타늄',
        '항공우주 등급 티타늄 합금 프레임',
      ],
    },
    {
      category: '칩셋 및 AI',
      icon: Cpu,
      highlight: 'A20 Chip (독립 듀얼 NPU 아키텍처)',
      details: [
        '6코어 CPU (성능 코어 2개 및 효율 코어 4개)',
        '6코어 차세대 GPU (하드웨어 가속 레이 트레이싱)',
        '독립 32코어 듀얼 Neural Engine (병렬 AI 연산 전용)',
      ],
    },
    {
      category: '힌지 및 내구성',
      icon: Shield,
      highlight: '초정밀 제로 갭 티타늄 힌지 (100만 회 폴딩 내구성)',
      details: [
        '자유로운 각도 고정이 가능한 프리 스탑 메커니즘 (0° ~ 180°)',
        '세라믹 실드 2세대 전후면 글래스 보호',
        'IP68 방수 방진 등급 (최대 수심 6m에서 최대 30분)',
      ],
    },
    {
      category: '운영체제 & 멀티태스킹',
      icon: Layers,
      highlight: 'DuoOS 1.0 (하드웨어 동기화 멀티태스킹)',
      details: [
        '두 화면 간 실시간 드래그 앤 드롭 파일 공유',
        '탠덤 랩톱 모드: 상단 디스플레이 + 하단 가상 햅틱 트랙패드/키보드',
        '스마트 클립보드 및 동시 멀티미디어 스트리밍',
      ],
    },
    {
      category: '카메라 시스템',
      icon: Camera,
      highlight: '48MP Fusion 듀얼 메인 카메라 시스템',
      details: [
        '48MP 메인: 24mm, ƒ/1.78 조리개, 센서 시프트 광학 이미지 흔들림 보정',
        '48MP 초광각: 13mm, ƒ/2.2 조리개 및 120° 시야각, 매크로 촬영 지원',
        '4K 60fps Dolby Vision HDR 비디오 및 실시간 듀얼 스크린 뷰파인더',
      ],
    },
    {
      category: '배터리 및 충전',
      icon: Battery,
      highlight: '5,200mAh 분산형 탠덤 배터리 (최대 32시간 영상 재생)',
      details: [
        '좌우 패널 분산 탑재로 최적의 밸런스 유지',
        'MagSafe 45W 초고속 무선 충전 (30분 만에 최대 65% 충전)',
        'USB-C 커넥터 (USB 3 최대 10Gb/s 데이터 전송)',
      ],
    },
    {
      category: '펜 및 전용 입력',
      icon: PenTool,
      highlight: 'Apple Pencil Duo 지원',
      details: [
        '0.01ms 초저지연 감압 반응 및 틸트 인식',
        '측면 양방향 마그네틱 흡착 및 무선 급속 충전',
        '듀얼 스크린 간 자유로운 캔버스 스케치 및 메모 확장',
      ],
    },
    {
      category: '규격 및 무게',
      icon: Smartphone,
      highlight: '두께: 펼침 4.6mm / 접힘 9.5mm · 무게: 198g',
      details: [
        '가로: 접힘 76.5mm / 펼침 148.2mm',
        '세로: 158.5mm',
        '초경량 티타늄 복합 바디로 한 손 조작 최적화',
      ],
    },
    {
      category: '출시 가격 및 용량',
      icon: Tag,
      highlight: '₩3,290,000 부터 (256GB / 512GB / 1TB)',
      details: [
        '256GB: ₩3,290,000',
        '512GB: ₩3,690,000',
        '1TB: ₩4,090,000',
        'Apple Care+ 2년 듀얼 힌지 및 디스플레이 무상 보증 포함 프로모션',
      ],
    },
  ];

  return (
    <section id="specs" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest transition-colors duration-500"
            style={{ color: activeColor.accent }}
          >
            IPHONE DUO SPECIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3 text-white">iPhone Duo 상세 기술 사양</h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            차세대 듀얼 스크린과 티타늄 힌지로 완성된 플래그십 하드웨어의 모든 사양을 확인하세요.
          </p>
        </div>

        {/* Specifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {specCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 border border-neutral-800/80 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="p-2 rounded-xl transition-colors duration-500"
                      style={{
                        backgroundColor: `${activeColor.accent}15`,
                        color: activeColor.accent,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-neutral-100 transition-colors">
                    {item.highlight}
                  </h3>

                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2 leading-relaxed">
                        <Check
                          className="w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors duration-500"
                          style={{ color: activeColor.accent }}
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-10 p-6 rounded-3xl glass-card border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-bold text-white">
              나이트 스카이 & 스타 화이트 에디션 정식 출시
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              기본 구성품: iPhone Duo, USB-C 충전 케이블(1m), 보증 안내서
            </p>
          </div>
          <div className="flex items-center space-x-2 font-mono text-sm font-semibold text-white">
            <span className="text-xs text-neutral-400">시작 가격</span>
            <span
              className="text-lg font-bold transition-colors duration-500"
              style={{ color: activeColor.accent }}
            >
              ₩3,290,000~
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
