import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/counter/counterSlice.js";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="counter">
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className="btn--increment"
        >
          Increment
        </button>
        <span className="count--num">{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="btn--decrement"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
