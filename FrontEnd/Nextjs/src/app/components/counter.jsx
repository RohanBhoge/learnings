"use client";

import {
  decrement,
  increment,
  incrementByAmount,
} from "@/store/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Counter() {
  // 1. Read state from the store
  const count = useAppSelector((state) => state.counter.value);

  // 2. Get the dispatch function
  const dispatch = useAppDispatch();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <h2>Count: {count}</h2>

      {/* 3. Dispatch actions on user events */}
      <button className="btn btn-primary" onClick={() => dispatch(increment())}>
        +
      </button>
      <button className="btn btn-primary" onClick={() => dispatch(decrement())}>
        -
      </button>

      <input
        type="number"
        onChange={(e) => dispatch(incrementByAmount(e.target.value))}
      />
      <button className="btn btn-primary">Submit</button>
    </div>
  );
}
