import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  ArrowRight,
  FileCheck,
  Video,
  FileText,
  Camera,
  Play,
  Pause,
  Sparkles,
  RotateCcw,
  Check,
  Plus,
  Send,
} from 'lucide-react';
import { PhoneColorConfig, DuoOSTask } from '../types.ts';

interface DuoOSSimulatorProps {
  activeColor: PhoneColorConfig;
}

export const DuoOSSimulator: React.FC<DuoOSSimulatorProps> = ({ activeColor }) => {
  const [activeTask, setActiveTask] = useState<DuoOSTask>('multitask');

  // Mode 1 state: Video & Notes
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [notes, setNotes] = useState<string[]>([
    '• 나이트 스카이 & 스타 화이트 컬러 매칭 검토 완료',
    '• A20 Chip 듀얼 NPU로 4K 실시간 렌더링 확인',
  ]);
  const [newNoteInput, setNewNoteInput] = useState<string>('');

  // Mode 2 state: Drag and Drop
  const [transferredFiles, setTransferredFiles] = useState<string[]>([]);
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const availableFiles = [
    { id: 'file-1', name: '나이트스카이_렌더링_v4.raw', size: '48.2 MB', type: 'image' },
    { id: 'file-2', name: '티타늄_힌지_테스트.mov', size: '124.8 MB', type: 'video' },
  ];

  // Mode 3 state: Laptop virtual typing
  const [documentContent, setDocumentContent] = useState<string>(
    'iPhone Duo는 두 개의 혁신적인 Super Retina XDR 디스플레이를 완벽하게 동기화합니다. '
  );
  const [typedChar, setTypedChar] = useState<string>('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setNotes((prev) => [...prev, `• ${newNoteInput.trim()}`]);
    setNewNoteInput('');
  };

  const handleTransfer = (fileName: string) => {
    if (transferredFiles.includes(fileName) || isTransferring) return;
    setIsTransferring(true);
    setTimeout(() => {
      setTransferredFiles((prev) => [...prev, fileName]);
      setIsTransferring(false);
    }, 850);
  };

  const handleResetTransfer = () => {
    setTransferredFiles([]);
  };

  const handleKeyPress = (key: string) => {
    setTypedChar(key);
    setDocumentContent((prev) => prev + key);
    setTimeout(() => setTypedChar(''), 200);
  };

  const handleBackspace = () => {
    setDocumentContent((prev) => prev.slice(0, -1));
  };

  return (
    <section id="duo-os" className="py-28 bg-neutral-950/80 border-y border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold uppercase tracking-widest transition-colors duration-500"
            style={{ color: activeColor.accent }}
          >
            DuoOS WORKSPACE SIMULATOR
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-2 text-white">
            앱과 앱 사이의 경계가 사라지다
          </h2>
          <p className="text-neutral-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            독립적인 두 개의 디스플레이에서 병렬 작업을 수행하거나, 데이터를 실시간으로 자연스럽게 전달하세요.
          </p>
        </div>

        {/* Task Controller Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1 bg-neutral-900 p-1.5 rounded-full border border-neutral-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTask('multitask')}
              style={activeTask === 'multitask' ? { backgroundColor: activeColor.accent, color: '#fff' } : {}}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeTask === 'multitask' ? 'shadow-lg' : 'text-neutral-400 hover:text-white'
              }`}
            >
              독립 듀얼 앱 실행
            </button>
            <button
              onClick={() => setActiveTask('dragdrop')}
              style={activeTask === 'dragdrop' ? { backgroundColor: activeColor.accent, color: '#fff' } : {}}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeTask === 'dragdrop' ? 'shadow-lg' : 'text-neutral-400 hover:text-white'
              }`}
            >
              실시간 드래그 앤 드롭
            </button>
            <button
              onClick={() => setActiveTask('laptop')}
              style={activeTask === 'laptop' ? { backgroundColor: activeColor.accent, color: '#fff' } : {}}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeTask === 'laptop' ? 'shadow-lg' : 'text-neutral-400 hover:text-white'
              }`}
            >
              노트북 탠덤 키보드
            </button>
          </div>
        </div>

        {/* Simulated OS Workspace */}
        <div className="glass-card rounded-[2.5rem] p-4 sm:p-7 border border-neutral-800 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-full min-h-[430px] sm:min-h-[460px] bg-black rounded-3xl p-3 sm:p-4 flex flex-col md:flex-row gap-3 relative">
            
            {/* SCREEN A (LEFT PANEL) */}
            <div className="w-full md:w-1/2 h-full min-h-[380px] bg-neutral-950 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-neutral-800/90 relative overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-neutral-400 pb-2 border-b border-neutral-900">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeColor.accent }}
                  />
                  Screen A: {activeTask === 'multitask' ? '미디어 스튜디오' : activeTask === 'dragdrop' ? '파일 & 갤러리' : 'Pages 실시간 문서'}
                </span>
                <span className="font-mono text-neutral-500">Super Retina XDR</span>
              </div>

              {/* Task 1: Media Studio (Video Canvas) */}
              {activeTask === 'multitask' && (
                <div className="my-auto space-y-4 py-2">
                  <div className="h-44 sm:h-48 rounded-2xl bg-gradient-to-tr from-slate-900 via-neutral-900 to-black border border-neutral-800 p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-center z-10">
                      <span className="text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                        A20 Chip 4K 60fps 재생 중
                      </span>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all shadow-md active:scale-95"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                      </button>
                    </div>

                    {/* Animated Cinematic Graphic */}
                    <div className="flex items-center justify-center my-auto">
                      <div className="relative">
                        <motion.div
                          animate={isPlaying ? { rotate: 360 } : {}}
                          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                          className="w-20 h-20 rounded-full border-2 border-dashed opacity-40"
                          style={{ borderColor: activeColor.accent }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white tracking-widest">
                          DUO 4K
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 z-10">
                      <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                        <span>01:42</span>
                        <span>04:18</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          animate={isPlaying ? { width: ['20%', '80%'] } : { width: '45%' }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: activeColor.accent }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Task 2: Drag & Drop Origin */}
              {activeTask === 'dragdrop' && (
                <div className="my-auto space-y-3 py-2">
                  <p className="text-xs text-neutral-400">
                    전송할 파일을 클릭하면 우측 스크린의 드롭 존으로 즉시 이동합니다:
                  </p>
                  {availableFiles.map((file) => {
                    const isSent = transferredFiles.includes(file.name);
                    return (
                      <motion.div
                        key={file.id}
                        whileHover={!isSent ? { scale: 1.02 } : {}}
                        whileTap={!isSent ? { scale: 0.98 } : {}}
                        onClick={() => handleTransfer(file.name)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSent
                            ? 'bg-neutral-900/40 border-neutral-800/60 opacity-50 cursor-default'
                            : 'bg-neutral-900 border-neutral-700 hover:border-sky-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{file.name}</p>
                              <p className="text-[10px] text-neutral-400">{file.size}</p>
                            </div>
                          </div>
                          {isSent ? (
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                              <Check className="w-3.5 h-3.5" /> 전송됨
                            </span>
                          ) : (
                            <span
                              className="text-[10px] font-semibold flex items-center gap-1"
                              style={{ color: activeColor.accent }}
                            >
                              클릭 전송 <ArrowRight className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Task 3: Laptop Display Top */}
              {activeTask === 'laptop' && (
                <div className="my-auto space-y-3 py-2 text-left">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                    <span>기획 문서 작성 중</span>
                    <span className="text-[10px] text-emerald-400">자동 저장됨</span>
                  </div>
                  <div className="h-44 p-3.5 bg-neutral-900/90 rounded-2xl border border-neutral-800 font-mono text-xs text-neutral-200 leading-relaxed overflow-y-auto">
                    {documentContent}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1.5 h-3.5 ml-0.5 align-middle"
                      style={{ backgroundColor: activeColor.accent }}
                    />
                  </div>
                </div>
              )}

              <div className="text-[9px] text-neutral-600 text-center pt-2">Screen A (Primary)</div>
            </div>

            {/* INTERACTIVE HINGE SPINE SEPARATOR */}
            <div className="hidden md:flex flex-col items-center justify-center w-2.5 my-auto h-72">
              <div
                className="w-1.5 h-full rounded-full transition-colors duration-500"
                style={{ background: activeColor.hingeBg }}
              />
            </div>

            {/* SCREEN B (RIGHT PANEL) */}
            <div className="w-full md:w-1/2 h-full min-h-[380px] bg-neutral-950 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-neutral-800/90 relative overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-neutral-400 pb-2 border-b border-neutral-900">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Screen B: {activeTask === 'multitask' ? '스마트 메모 & 클립보드' : activeTask === 'dragdrop' ? '메일 / 드롭 수신 존' : '가상 햅틱 키보드'}
                </span>
                <span className="font-mono text-neutral-500">0.01ms Low Latency</span>
              </div>

              {/* Task 1: Notes & Real-time typing */}
              {activeTask === 'multitask' && (
                <div className="my-auto space-y-3 py-2 text-left">
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-200"
                      >
                        {note}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newNoteInput}
                      onChange={(e) => setNewNoteInput(e.target.value)}
                      placeholder="새 메모 추가..."
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-sky-400"
                    />
                    <button
                      type="submit"
                      style={{ backgroundColor: activeColor.accent }}
                      className="px-3 py-2 rounded-xl text-white font-medium text-xs hover:brightness-110 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Task 2: Drag and Drop Dropzone Receiver */}
              {activeTask === 'dragdrop' && (
                <div className="my-auto space-y-3 py-2 text-center">
                  <div className="h-44 border-2 border-dashed border-sky-400/40 rounded-2xl flex flex-col items-center justify-center p-4 bg-sky-950/10">
                    <AnimatePresence>
                      {transferredFiles.length > 0 ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-2 w-full"
                        >
                          <FileCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                          <p className="text-xs font-bold text-white">파일 첨부 완료 ({transferredFiles.length}개)</p>
                          <div className="space-y-1">
                            {transferredFiles.map((fn) => (
                              <p key={fn} className="text-[10px] text-sky-300 font-mono">
                                ✓ {fn}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="space-y-1">
                          <Layers className="w-7 h-7 text-neutral-500 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-neutral-300">Duo Drop Zone</p>
                          <p className="text-[10px] text-neutral-500">좌측 화면에서 파일을 선택해 드롭하세요</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {transferredFiles.length > 0 && (
                    <button
                      onClick={handleResetTransfer}
                      className="text-[10px] text-neutral-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
                    >
                      <RotateCcw className="w-3 h-3" /> 초기화
                    </button>
                  )}
                </div>
              )}

              {/* Task 3: Interactive Laptop Keyboard */}
              {activeTask === 'laptop' && (
                <div className="my-auto space-y-2 py-2">
                  <div className="grid grid-cols-6 gap-1.5 text-center font-mono text-xs">
                    {['Q', 'W', 'E', 'R', 'T', 'Y'].map((k) => (
                      <motion.button
                        key={k}
                        whileTap={{ scale: 0.92, backgroundColor: '#38bdf8' }}
                        onClick={() => handleKeyPress(k)}
                        className="py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors border border-neutral-700 shadow-sm"
                      >
                        {k}
                      </motion.button>
                    ))}
                    {['A', 'S', 'D', 'F', 'G', 'H'].map((k) => (
                      <motion.button
                        key={k}
                        whileTap={{ scale: 0.92, backgroundColor: '#38bdf8' }}
                        onClick={() => handleKeyPress(k)}
                        className="py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors border border-neutral-700 shadow-sm"
                      >
                        {k}
                      </motion.button>
                    ))}
                    {['Z', 'X', 'C', 'V', 'B', 'N'].map((k) => (
                      <motion.button
                        key={k}
                        whileTap={{ scale: 0.92, backgroundColor: '#38bdf8' }}
                        onClick={() => handleKeyPress(k)}
                        className="py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors border border-neutral-700 shadow-sm"
                      >
                        {k}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleKeyPress(' ')}
                      className="w-4/5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-mono border border-neutral-700"
                    >
                      스페이스 (Space)
                    </button>
                    <button
                      onClick={handleBackspace}
                      className="w-1/5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-mono border border-neutral-700"
                    >
                      ⌫
                    </button>
                  </div>
                </div>
              )}

              <div className="text-[9px] text-neutral-600 text-center pt-2">Screen B (Secondary)</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
