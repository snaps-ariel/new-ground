'use client';

import useBearStore from '@/store/bearStore';
export default function BearCounter() {
  const { bears, increasePopulation, removeAllBears } = useBearStore();
  return (
    <section>
      <h1>{bears} around here ...</h1>
      <button
        className="w-10 bg-amber-200 border-2 border-black block"
        onClick={() => increasePopulation(2)}
      >
        up
      </button>
      <button
        className="bg-amber-600 mt-2 border-black block"
        onClick={removeAllBears}
      >
        remove All Bears
      </button>
    </section>
  );
}
