// Free-Space/frontend/app/home/maps/map-pin/DirectionPad.tsx

"use client";

type Direction = "up" | "down" | "left" | "right";

type Props = {
    onMove: (direction: Direction) => void;
};

const baseButtonClass =
    "w-12 h-12 rounded-lg bg-blue-500 text-white font-semibold " +
    "hover:bg-blue-600 active:bg-blue-700 transition-colors flex items-center justify-center";

export default function DirectionPad({ onMove }: Props) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {/* 上 */}
            <div />
            <button onClick={() => onMove("up")} className={baseButtonClass}>
                ↑
            </button>
            <div />

            {/* 左・下・右 */}
            <button onClick={() => onMove("left")} className={baseButtonClass}>
                ←
            </button>
            <button onClick={() => onMove("down")} className={baseButtonClass}>
                ↓
            </button>
            <button onClick={() => onMove("right")} className={baseButtonClass}>
                →
            </button>
        </div>
    );
}
