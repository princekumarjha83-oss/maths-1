/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Settings as SettingsIcon, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Zap, 
  Clock, 
  ShieldAlert, 
  Target, 
  Calendar,
  X,
  Share2,
  List
} from 'lucide-react';
import { useGameLogic, GameState, GameMode } from './hooks/useGameLogic';
import { THEMES, Theme } from './lib/themes';
import { cn, formatTime, getRank } from './lib/utils';
import useSound from 'use-sound';
import { SOUND_URLS } from './lib/sounds';

// --- Shared Components ---

const Button = ({ children, onClick, className, variant = 'primary' }: any) => {
  const variants: any = {
    primary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    accent: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20',
    danger: 'bg-rose-500 hover:bg-rose-400 text-white font-bold',
    ghost: 'bg-transparent hover:bg-white/10 text-white/70 hover:text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'px-6 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// --- Main App ---

export default function App() {
  const {
    gameState,
    setGameState,
    gameMode,
    question,
    score,
    timeLeft,
    level,
    streak,
    maxStreak,
    xp,
    settings,
    setSettings,
    startGame,
    submitAnswer,
    endGame,
    playClick
  } = useGameLogic();

  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const currentTheme = THEMES.find(t => t.id === settings.theme) || THEMES[0];

  const [playBgm, { stop: stopBgm }] = useSound(SOUND_URLS.bgm, { 
    volume: settings.sound ? 0.2 : 0,
    loop: true 
  });

  useEffect(() => {
    if (gameState === 'playing' && settings.sound) {
      playBgm();
    } else {
      stopBgm();
    }
  }, [gameState, settings.sound, playBgm, stopBgm]);

  const LEADERBOARD_DATA = [
    { name: 'Alex_Math', score: 2450, rank: 'Math King 👑' },
    { name: 'SpeedySolve', score: 1820, rank: 'Genius' },
    { name: 'Brainiac99', score: 1450, rank: 'Genius' },
    { name: 'User_482', score: 1120, rank: 'Smart' },
    { name: 'MathWizard', score: 980, rank: 'Smart' },
  ];

  const handleNumClick = (val: string) => {
    playClick();
    if (val === 'C') {
      setInput('');
    } else if (val === 'DEL') {
      setInput(prev => prev.slice(0, -1));
    } else {
      if (input.length < 5) setInput(prev => prev + val);
    }
  };

  useEffect(() => {
    if (input && question && parseInt(input) === question.answer) {
      submitAnswer(parseInt(input));
      setInput('');
    }
  }, [input, question, submitAnswer]);

  const handleManualSubmit = () => {
    if (input === '') return;
    submitAnswer(parseInt(input));
    setInput('');
  };

  return (
    <div className={cn('h-screen max-h-screen w-screen flex flex-col items-center justify-center p-2 sm:p-4 transition-colors duration-500 overflow-hidden relative selection:bg-none', currentTheme.bg, currentTheme.font, currentTheme.text)}>
      {/* Sleek Theme Radial Gradient */}
      {settings.theme === 'sleek' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1E1B4B_0%,#0F172A_60%)] pointer-events-none" />
      )}
      
      <AnimatePresence mode="wait">
        {/* --- MENU SCREEN --- */}
        {gameState === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md text-center z-10 p-4"
          >
            <div className="mb-6 sm:mb-8 space-y-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="inline-block"
              >
                 <Zap className={cn("w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4", currentTheme.accent)} />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter">MATH RUSH</h1>
              <p className={cn("text-xs sm:text-sm opacity-70", currentTheme.secondaryText)}>Brain Speed Challenge</p>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <Button onClick={() => startGame('classic')} variant="accent" className="w-full py-3 sm:py-4 text-base sm:text-lg">
                <Play className="w-5 h-5 fill-current" /> CLASSIC MODE
              </Button>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button onClick={() => startGame('timeattack')} className="py-3 sm:py-4">
                  <Clock className="w-4 h-4" /> Time Attack
                </Button>
                <Button onClick={() => startGame('survival')} className="py-3 sm:py-4">
                  <ShieldAlert className="w-4 h-4" /> Survival
                </Button>
                <Button onClick={() => startGame('lcm')} className="py-3 sm:py-4">
                  <Target className="w-4 h-4" /> LCM Master
                </Button>
                <Button onClick={() => startGame('daily')} className="py-3 sm:py-4">
                  <Calendar className="w-4 h-4" /> Daily
                </Button>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={() => setShowSettings(true)} variant="ghost" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0">
                <SettingsIcon className="w-5 h-5" />
              </Button>
              <Button onClick={() => setShowLeaderboard(true)} variant="ghost" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0">
                <Trophy className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-1 opacity-50 text-[10px] sm:text-xs uppercase tracking-widest">
              <span>Current Rank</span>
              <span className="font-bold text-xs sm:text-sm tracking-normal">{getRank(xp)}</span>
              <div className="w-24 sm:w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: `${(xp % 500) / 5}%` }}></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PLAYING SCREEN --- */}
        {gameState === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl h-full flex flex-col gap-4 sm:gap-8 z-10 py-2"
          >
            {/* TOP HUD */}
            <header className={cn("flex justify-between items-center h-16 sm:h-20 px-4 sm:px-8 rounded-[20px] backdrop-blur-md border border-white/10 shrink-0", currentTheme.card)}>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest opacity-50">Score</span>
                <span className={cn("text-2xl font-extrabold", settings.theme === 'sleek' ? "text-[#38BDF8]" : "text-white")}>{score.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest opacity-50">Current Rank</span>
                <span className="bg-gradient-to-br from-amber-400 to-amber-600 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase shadow-lg">
                  {getRank(xp)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest opacity-50">Streak</span>
                <span className={cn("text-2xl font-extrabold", settings.theme === 'sleek' ? "text-[#4ADE80]" : "text-amber-400")}>{streak}</span>
              </div>
            </header>

            {/* MAIN DISPLAY */}
            <main className="flex-1 flex flex-col justify-center items-center relative text-center min-h-0">
              {/* Timer Bar */}
              <div className="w-full max-w-2xl h-2 sm:h-3 bg-white/10 rounded-full mb-6 sm:mb-10 overflow-hidden shrink-0">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8] shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  animate={{ width: `${(timeLeft / (gameMode === 'timeattack' ? 60 : 30)) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={question?.text}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="relative px-4"
                >
                  <h2 className="text-6xl sm:text-8xl md:text-[120px] font-black tracking-tighter drop-shadow-[0_0_20px_rgba(56,189,248,0.2)] leading-none">
                    {question?.text.replace('×', '×').replace('÷', '÷')}
                  </h2>
                  
                  {/* Floating Streak indicator */}
                  <div className="absolute -right-12 sm:-right-24 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center">
                    <span className="text-[10px] uppercase opacity-40 font-bold">Streak</span>
                    <span className="text-3xl sm:text-5xl font-black italic text-[#4ADE80]">x{streak}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Input Display Area (Preserved functionality) */}
              <div className="mt-6 sm:mt-12 h-12 sm:h-16 flex items-center justify-center shrink-0">
                <span className="text-3xl sm:text-4xl font-black tracking-widest opacity-80">
                  {input === '' ? <span className="opacity-20">?</span> : input}
                </span>
              </div>
            </main>

            {/* ANSWERS / NUMPAD */}
            <section className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 max-w-3xl mx-auto w-full shrink-0 px-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'DEL'].map((val) => (
                <motion.button
                  key={val}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNumClick(val.toString())}
                  className={cn(
                    "h-12 sm:h-14 lg:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center text-xl sm:text-2xl font-bold transition-all border border-white/5 shadow-sm",
                    typeof val === 'number' || val === '0' 
                      ? cn(currentTheme.card, "hover:bg-white/10") 
                      : "bg-white/10 hover:bg-white/20 text-rose-400"
                  )}
                >
                  {val === 'DEL' ? <RotateCcw className="w-5 h-5 rotate-180" /> : val}
                </motion.button>
              ))}
              <Button onClick={handleManualSubmit} variant="accent" className="col-span-3 md:col-span-4 h-12 sm:h-14 lg:h-16 rounded-2xl sm:rounded-3xl text-lg sm:text-xl font-black transition-all">
                SUBMIT ANSWER
              </Button>
            </section>

            {/* FOOTER NAVIGATION */}
            <footer className="flex justify-center items-center gap-4 sm:gap-10 h-10 pb-4 shrink-0">
               <button onClick={() => setGameState('paused')} className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white/5 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                 <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
               </button>
               <div className="text-[10px] sm:text-sm font-semibold uppercase tracking-[1px] sm:tracking-[2px] opacity-60 whitespace-nowrap">
                 {gameMode === 'timeattack' ? "Time Attack" : "Classic Mode"}: <span className="text-[#818CF8] font-extrabold">2.5x</span>
               </div>
               <button 
                 onClick={() => setSettings(s => ({ ...s, sound: !s.sound }))}
                 className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white/5 rounded-xl opacity-60 hover:opacity-100 transition-opacity"
               >
                 {settings.sound ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
               </button>
            </footer>
          </motion.div>
        )}

        {/* --- GAMEOVER SCREEN --- */}
        {gameState === 'gameover' && (
          <motion.div 
            key="gameover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-slate-950/40"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={cn("w-full max-w-sm sm:max-w-md border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl shadow-black/50 mx-2", currentTheme.card)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500" />
              
              <div className="bg-rose-500/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-rose-500/20">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 sm:mb-2 uppercase tracking-tighter">GAME OVER</h2>
              <p className={cn("mb-6 sm:mb-8 text-xs sm:text-sm font-medium", currentTheme.secondaryText)}>Amazing effort! You're getting faster.</p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/5">
                  <span className="text-[8px] sm:text-[10px] uppercase opacity-40 font-bold block mb-1 tracking-widest">Final Score</span>
                  <span className="text-2xl sm:text-3xl font-black">{score.toLocaleString()}</span>
                </div>
                <div className="bg-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/5">
                  <span className="text-[8px] sm:text-[10px] uppercase opacity-40 font-bold block mb-1 tracking-widest">Best Streak</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-500">x{maxStreak}</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <Button onClick={() => startGame(gameMode)} variant="accent" className="w-full py-3 sm:py-4 text-lg sm:text-xl h-14 sm:h-16 rounded-2xl sm:rounded-3xl">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" /> PLAY AGAIN
                </Button>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <Button onClick={() => setGameState('menu')} className="py-3 sm:py-4 rounded-xl sm:rounded-2xl">
                    <List className="w-4 h-4" /> MENU
                  </Button>
                  <Button onClick={() => {}} variant="ghost" className="py-3 sm:py-4 border border-white/5 rounded-xl sm:rounded-2xl">
                    <Share2 className="w-4 h-4" /> SHARE
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* --- PAUSE OVERLAY --- */}
        {gameState === 'paused' && (
          <motion.div 
            key="paused"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          >
            <div className="text-center">
              <h2 className="text-4xl font-black mb-8">PAUSED</h2>
              <div className="space-y-4 min-w-[200px]">
                <Button onClick={() => setGameState('playing')} variant="accent" className="w-full py-4">
                  RESUME
                </Button>
                <Button onClick={() => setGameState('menu')} className="w-full py-4">
                  QUIT GAME
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LEADERBOARD MODAL --- */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div 
            key="leaderboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-slate-900 rounded-[2.5rem] p-8 border border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" /> Global Ranking
                </h3>
                <button onClick={() => setShowLeaderboard(false)} className="p-2 bg-white/5 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {LEADERBOARD_DATA.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black opacity-20 w-6">#{i + 1}</span>
                      <div>
                        <p className="font-bold">{entry.name}</p>
                        <p className="text-[10px] uppercase opacity-40">{entry.rank}</p>
                      </div>
                    </div>
                    <span className="text-xl font-black text-cyan-400">{entry.score}</span>
                  </div>
                ))}
              </div>

              <Button onClick={() => setShowLeaderboard(false)} variant="accent" className="w-full mt-8">
                CLOSE
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SETTINGS MODAL --- */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full max-w-md bg-slate-900 rounded-t-[2.5rem] sm:rounded-b-[2.5rem] p-8 border-t border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 bg-white/5 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      {settings.sound ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                    </div>
                    <div>
                      <p className="font-bold">Sound Effects</p>
                      <p className="text-xs text-slate-500">Buttons, Correct/Wrong</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, sound: !s.sound }))}
                    className={cn("w-12 h-6 rounded-full transition-colors relative", settings.sound ? "bg-cyan-500" : "bg-slate-700")}
                  >
                    <motion.div 
                      animate={{ x: settings.sound ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-bold">Haptic Feedback</p>
                      <p className="text-xs text-slate-500">Vibrate on mistakes</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, vibration: !s.vibration }))}
                    className={cn("w-12 h-6 rounded-full transition-colors relative", settings.vibration ? "bg-cyan-500" : "bg-slate-700")}
                  >
                    <motion.div 
                      animate={{ x: settings.vibration ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-sm uppercase opacity-50 tracking-wider">Visual Themes</p>
                  <div className="grid grid-cols-2 gap-2">
                    {THEMES.map(theme => (
                      <button 
                        key={theme.id}
                        onClick={() => setSettings(s => ({ ...s, theme: theme.id }))}
                        className={cn(
                          "px-4 py-3 rounded-xl border transition-all text-xs font-bold",
                          settings.theme === theme.id ? "bg-white/10 border-cyan-500 text-cyan-400" : "bg-white/5 border-transparent opacity-60"
                        )}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                 <p className="text-[10px] uppercase tracking-[0.2em] opacity-30">Math Rush v1.0.0</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative BG Elements */}
      {settings.theme !== 'sleek' && (
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-12 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
        </div>
      )}
    </div>
  );
}
