import { useState, useEffect, useCallback, useRef } from 'react';
import { generateQuestion, Question, Operation } from '../lib/mathEngine';
import useSound from 'use-sound';
import { SOUND_URLS } from '../lib/sounds';
import confetti from 'canvas-confetti';

export type GameState = 'menu' | 'playing' | 'paused' | 'gameover';
export type GameMode = 'classic' | 'timeattack' | 'survival' | 'lcm' | 'daily';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [xp, setXp] = useState(0);
  
  const [settings, setSettings] = useState({
    sound: true,
    vibration: true,
    theme: 'sleek'
  });

  const [playCorrect] = useSound(SOUND_URLS.correct, { volume: settings.sound ? 0.5 : 0 });
  const [playWrong] = useSound(SOUND_URLS.wrong, { volume: settings.sound ? 0.5 : 0 });
  const [playGameOver] = useSound(SOUND_URLS.gameOver, { volume: settings.sound ? 0.5 : 0 });
  const [playLevelUp] = useSound(SOUND_URLS.levelUp, { volume: settings.sound ? 0.5 : 0 });
  const [playClick] = useSound(SOUND_URLS.click, { volume: settings.sound ? 0.5 : 0 });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const spawnQuestion = useCallback(() => {
    const difficulty = Math.floor(score / 50) + 1;
    const forcedType = gameMode === 'lcm' ? 'lcm' : undefined;
    setQuestion(generateQuestion(difficulty, forcedType));
  }, [score, gameMode]);

  const startGame = (mode: GameMode) => {
    playClick();
    setGameMode(mode);
    setScore(0);
    setStreak(0);
    setLevel(1);
    setGameState('playing');
    
    if (mode === 'classic') setTimeLeft(30);
    else if (mode === 'timeattack') setTimeLeft(60);
    else if (mode === 'survival') setTimeLeft(10);
    else if (mode === 'lcm') setTimeLeft(45);
    else if (mode === 'daily') setTimeLeft(40);
    else setTimeLeft(30);

    spawnQuestion();
  };

  const endGame = useCallback(() => {
    setGameState('gameover');
    playGameOver();
    if (timerRef.current) clearInterval(timerRef.current);
  }, [playGameOver]);

  const submitAnswer = (userAnswer: number) => {
    if (!question) return;

    if (userAnswer === question.answer) {
      playCorrect();
      const points = 10 + (streak * 2);
      setScore(s => s + points);
      setStreak(s => {
        const next = s + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
      setXp(x => x + 5);

      // Time bonus
      if (gameMode !== 'survival') {
        setTimeLeft(t => Math.min(t + 3, 60));
      } else {
        setTimeLeft(10); // Reset for survival
      }

      if (score > 0 && score % 100 === 0) {
        setLevel(l => l + 1);
        playLevelUp();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      spawnQuestion();
    } else {
      playWrong();
      if (settings.vibration && navigator.vibrate) {
        navigator.vibrate(200);
      }
      setStreak(0);
      
      if (gameMode === 'survival') {
        endGame();
      } else {
        setTimeLeft(t => Math.max(t - 5, 0));
        spawnQuestion();
      }
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            endGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timeLeft, endGame]);

  return {
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
  };
}
