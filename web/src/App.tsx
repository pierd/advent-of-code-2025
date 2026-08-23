import { useCallback, useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import init from "aoc";
import {
  DAY_COUNT,
  clampDay,
  dayFromHash,
  inputKey,
  puzzleInputUrl,
  puzzleUrl,
} from "./config";
import { getDay } from "./days";
import type { VizProps } from "./days/types";
import { initLib } from "./libProvider";

function PartSection<Extra>({
  headingId,
  title,
  Viz,
  day,
  input,
  answer,
  extra,
}: {
  headingId: string;
  title: string;
  Viz: ComponentType<VizProps<Extra>> | undefined;
  day: number;
  input: string;
  answer: string | undefined;
  extra: Extra | undefined;
}) {
  return (
    <section className="part" aria-labelledby={headingId}>
      <h2 id={headingId}>
        <a
          className="puzzle-link"
          href={puzzleUrl(day, title === "Part 2")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h2>
      <div className="viz" data-viz={title === "Part 1" ? "1" : "2"}>
        {Viz && extra ? (
          <Viz day={day} input={input} answer={answer} extra={extra} />
        ) : (
          <p className="viz-placeholder">Visualization</p>
        )}
      </div>
      <p className="answer">
        Answer:{" "}
        <code data-answer={title === "Part 1" ? "1" : "2"}>
          {answer ?? "—"}
        </code>
      </p>
    </section>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init().then((initialized) => {
      initLib(initialized);
      setReady(true);
    });
  }, []);

  const [selectedDay, setSelectedDay] = useState(() => dayFromHash());
  const [inputs, setInputs] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    for (let d = 1; d <= DAY_COUNT; d++) {
      initial[d] = localStorage.getItem(inputKey(d)) ?? "";
    }
    return initial;
  });

  useEffect(() => {
    const onHashChange = () => setSelectedDay(clampDay(dayFromHash()));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectDay = useCallback((day: number) => {
    const next = clampDay(day);
    setSelectedDay(next);
    if (location.hash !== `#${next}`) {
      history.replaceState(null, "", `#${next}`);
    }
  }, []);

  useEffect(() => {
    document.title = `Day ${selectedDay} - Advent of Code 2025`;
  }, [selectedDay]);

  const input = inputs[selectedDay] ?? "";
  const setInput = useCallback(
    (value: string) => {
      setInputs((prev) => ({ ...prev, [selectedDay]: value }));
      localStorage.setItem(inputKey(selectedDay), value);
    },
    [selectedDay]
  );

  const puzzle = getDay(selectedDay);

  const solution1 = useMemo(() => {
    if (!ready || !input.trim()) return undefined;
    try {
      return puzzle.solvePart1(input);
    } catch {
      return undefined;
    }
  }, [ready, input, puzzle.solvePart1]);

  const solution2 = useMemo(() => {
    if (!ready || !input.trim()) return undefined;
    try {
      return puzzle.solvePart2(input);
    } catch {
      return undefined;
    }
  }, [ready, input, puzzle.solvePart2]);

  if (!ready) {
    return <div className="shell" />;
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <p className="eyebrow">Advent of Code 2025</p>
        <h1>Puzzles</h1>
        <nav className="days" aria-label="Puzzle days">
          {Array.from({ length: DAY_COUNT }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              type="button"
              className={`day${day === selectedDay ? " is-selected" : ""}`}
              aria-current={day === selectedDay ? "page" : "false"}
              onClick={() => selectDay(day)}
            >
              Day {day}
            </button>
          ))}
        </nav>
      </aside>

      <main className="puzzle">
        <a
          className="puzzle-link"
          href={puzzleUrl(selectedDay)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Day {selectedDay}
        </a>

        <label htmlFor="puzzle-input">
          <a
            className="puzzle-link"
            href={puzzleInputUrl(selectedDay)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Puzzle input
          </a>
        </label>
        <textarea
          id="puzzle-input"
          rows={10}
          spellCheck={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <PartSection
          headingId="part-1-heading"
          title="Part 1"
          Viz={puzzle.Part1}
          day={selectedDay}
          input={input}
          answer={solution1?.answer}
          extra={solution1?.extra}
        />

        <PartSection
          headingId="part-2-heading"
          title="Part 2"
          Viz={puzzle.Part2}
          day={selectedDay}
          input={input}
          answer={solution2?.answer}
          extra={solution2?.extra}
        />
      </main>
    </div>
  );
}
