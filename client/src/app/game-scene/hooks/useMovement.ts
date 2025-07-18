// app/three-3/hooks/useMovement.ts
import { useEffect, useRef } from 'react';

export function useMovement() {
  const movement = useRef({ up: false, down: false, left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') movement.current.up = true;
      if (e.key === 'ArrowDown') movement.current.down = true;
      if (e.key === 'ArrowLeft') movement.current.left = true;
      if (e.key === 'ArrowRight') movement.current.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') movement.current.up = false;
      if (e.key === 'ArrowDown') movement.current.down = false;
      if (e.key === 'ArrowLeft') movement.current.left = false;
      if (e.key === 'ArrowRight') movement.current.right = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement.current;
}