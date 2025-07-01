import React from "react";

// tiny, dependency-free colour scale (0 → light, 1 → dark)
const lerpOrange = (t) => {
  //   light  : #FFA96B  (H = 27°, S = 100%, L = 70%)
  //   dark   : #FF4B12  (H = 15°, S = 100%, L = 53%)
  const h  = 27  - 12 * t;            // hue 27→15
  const s  = 100;                     // full sat
  const l  = 70  - 17 * t;            // lightness 70→53
  return `hsl(${h}deg ${s}% ${l}%)`;  // CSS hsl string
};

/**
 * @param {Object[]} days   – one object per day
 * @param {number}   days[].value – expense for that day
 *
 * e.g. [{day:1,value:1200},{day:2,value:340},…]
 */
export default function MonthHeatMap({ days }) {
  /* ------------------------------------------------------------------ */
  const max = Math.max(...days.map((d) => d.value || 0)) || 1; // avoid /0
  const shade = (v) => lerpOrange(v / max);                    // 0-1 → hsl
  const cols = 7;                                              // 7 = week
  /* ------------------------------------------------------------------ */

  return (
    <div
      className="grid gap-1"
      style={{
        // rows = ceil(days/7). gridAutoFlow="row dense" packs neatly
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridAutoRows: "1fr",
        gridAutoFlow: "row dense",
      }}
    >
      {days.map(({ day, value }) => (
        <div
          key={day}
          className="rounded-sm"
          title={`Day ${day}: ₹${value.toLocaleString()}`}
          style={{
            background: shade(value),
            aspectRatio: "1/1",         // make each cell a square
          }}
        />
      ))}
    </div>
  );
}
