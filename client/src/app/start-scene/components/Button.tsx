'use client';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      // className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}