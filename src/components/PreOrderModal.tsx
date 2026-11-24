import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, CheckCircle2, Sparkles } from 'lucide-react';
import { PhoneColorConfig, PhoneColorId } from '../types.ts';
import { PHONE_COLORS } from '../data/colors.ts';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeColor: PhoneColorConfig;
  onSelectColor: (color: PhoneColorId) => void;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({
  isOpen,
  onClose,
  activeColor,
  onSelectColor,
}) => {
  const [email, setEmail] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('올바른 이메일 형식을 입력해 주세요.');
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
    setTimeout(() => {
      // auto close after delay if desired, or let user close
    }, 4000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card rounded-[2.5rem] max-w-lg w-full p-7 sm:p-9 relative border border-neutral-700/80 text-center shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-full transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border transition-colors duration-500"
              style={{
                backgroundColor: `${activeColor.accent}15`,
                borderColor: `${activeColor.accent}40`,
              }}
            >
              <Bell className="w-6 h-6" style={{ color: activeColor.accent }} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">iPhone Duo 출시 알림 신청</h3>
            <p className="text-xs text-neutral-400 mb-6">
              나이트 스카이 & 스타 화이트 컬러의 사전 예약 개시 소식 및 특별 혜택을 가장 먼저 받아보세요.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Color Selection: Only 2 options */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">선택 색상</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectColor('nightsky')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      activeColor.id === 'nightsky'
                        ? 'border-sky-400 bg-sky-950/40 text-white shadow-md'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#0b0f19] border border-slate-600" />
                      <span>나이트 스카이</span>
                    </div>
                    {activeColor.id === 'nightsky' && (
                      <span className="text-[10px] text-sky-400 font-normal">선택됨</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectColor('starwhite')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      activeColor.id === 'starwhite'
                        ? 'border-white bg-neutral-800/80 text-white shadow-md'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#f8fafc] border border-slate-300" />
                      <span>스타 화이트</span>
                    </div>
                    {activeColor.id === 'starwhite' && (
                      <span className="text-[10px] text-neutral-300 font-normal">선택됨</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Storage selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">저장 용량</label>
                <div className="grid grid-cols-3 gap-2">
                  {['256GB', '512GB', '1TB'].map((cap) => (
                    <button
                      key={cap}
                      type="button"
                      onClick={() => setSelectedStorage(cap)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                        selectedStorage === cap
                          ? 'border-white bg-white/10 text-white font-semibold'
                          : 'border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">이메일 주소</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-sky-400"
                />
                {errorMessage && <p className="text-xs text-rose-400 mt-1">{errorMessage}</p>}
              </div>

              <button
                type="submit"
                style={{ backgroundColor: activeColor.accent }}
                className="w-full text-white font-semibold py-3.5 rounded-2xl transition-all text-sm active:scale-98 shadow-xl hover:brightness-110"
              >
                사전 알림 등록 완료
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">사전 예약 알림 등록 완료</h3>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
              <strong>{email}</strong> 주소로 <br />
              <strong>
                iPhone Duo ({activeColor.name} · {selectedStorage})
              </strong>
              의 출시 및 사전 주문 안내가 발송될 예정입니다.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
