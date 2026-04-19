export type Operation = 'add' | 'sub' | 'mul' | 'div' | 'lcm';

export interface Question {
  text: string;
  answer: number;
  type: Operation;
  difficultyScale: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function generateQuestion(difficulty: number, forcedType?: Operation): Question {
  const types: Operation[] = forcedType ? [forcedType] : ['add', 'sub', 'mul', 'div', 'lcm'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  let a = 0, b = 0, answer = 0, text = '';

  // difficulty scales from 1 to 10+
  const maxVal = Math.floor(10 + difficulty * 5);
  const mulMax = Math.floor(5 + difficulty * 2);

  switch (type) {
    case 'add':
      a = Math.floor(Math.random() * maxVal) + 1;
      b = Math.floor(Math.random() * maxVal) + 1;
      answer = a + b;
      text = `${a} + ${b}`;
      break;
    case 'sub':
      answer = Math.floor(Math.random() * maxVal) + 1;
      b = Math.floor(Math.random() * maxVal) + 1;
      a = answer + b;
      text = `${a} - ${b}`;
      break;
    case 'mul':
      a = Math.floor(Math.random() * mulMax) + 2;
      b = Math.floor(Math.random() * mulMax) + 2;
      answer = a * b;
      text = `${a} × ${b}`;
      break;
    case 'div':
      b = Math.floor(Math.random() * mulMax) + 2;
      answer = Math.floor(Math.random() * mulMax) + 1;
      a = answer * b;
      text = `${a} ÷ ${b}`;
      break;
    case 'lcm':
      a = Math.floor(Math.random() * (5 + difficulty)) + 2;
      b = Math.floor(Math.random() * (5 + difficulty)) + 2;
      answer = lcm(a, b);
      text = `LCM of ${a} & ${b}`;
      break;
  }

  return { text, answer, type, difficultyScale: difficulty };
}
