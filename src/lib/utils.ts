import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to mathematically translate SVG absolute paths
export function translateSVGPath(d: string, offsetX: number, offsetY: number): string {
  if (offsetX === 0 && offsetY === 0) return d;

  const matches = d.match(/([a-zA-Z])([^a-zA-Z]*)/g);
  if (!matches) return d;

  let res = "";
  for (let chunk of matches) {
    let cmd = chunk[0];
    let argStr = chunk.substring(1);

    if (cmd.toUpperCase() === 'Z') {
      res += chunk;
      continue;
    }

    let args = argStr.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/ig);
    if (!args) {
      res += chunk;
      continue;
    }

    let isRel = cmd === cmd.toLowerCase();
    let newArgs = args.map(a => parseFloat(a));

    if (!isRel) {
      if (cmd.toUpperCase() === 'V') {
        for (let i = 0; i < newArgs.length; i++) newArgs[i] += offsetY;
      } else if (cmd.toUpperCase() === 'H') {
        for (let i = 0; i < newArgs.length; i++) newArgs[i] += offsetX;
      } else if (cmd.toUpperCase() === 'A') {
        for (let i = 0; i < newArgs.length; i += 7) {
          newArgs[i + 5] += offsetX;
          newArgs[i + 6] += offsetY;
        }
      } else {
        for (let i = 0; i < newArgs.length; i++) {
          if (i % 2 === 0) newArgs[i] += offsetX;
          else newArgs[i] += offsetY;
        }
      }
    }

    res += cmd + newArgs.map(n => parseFloat(n.toFixed(4)).toString()).join(' ');
  }
  return res;
}
