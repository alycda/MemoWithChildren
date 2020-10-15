import React, { useState, memo, useCallback } from "react";
import { DeepCompositeSymbol } from "tuplerone";

const makeFoo = () => {
  let renders = 0;
  const Foo = ({ children }) => {
    renders += 1;

    return (
      <div className="App">
        <p>{children}</p>
        <p>renders: {renders}</p>
        <hr />
      </div>
    );
  };

  return Foo;
};

const keyFilter = ([key]) => !key.startsWith("_");
const valueCompare = (prev, curr) =>
  DeepCompositeSymbol(prev, keyFilter) === DeepCompositeSymbol(curr, keyFilter);
const valueMemo = component => memo(component, valueCompare);

const MemoFoo1 = memo(makeFoo());
const MemoFoo2 = memo(makeFoo());
const MemoFoo3 = memo(makeFoo());
const ValueFoo = valueMemo(makeFoo());

const App = () => {
  const [count, setCount] = useState(0);
  const callback = useCallback(() => void setCount(count + 1), [count]);

  return (
    <>
      <MemoFoo1>
        <strong>complex children</strong>
      </MemoFoo1>
      <MemoFoo2>only text</MemoFoo2>
      <MemoFoo3>
        <strong>memoized complex children</strong>
      </MemoFoo3>
      <ValueFoo>
        <strong>value memoized complex children</strong>
      </ValueFoo>
      <button onClick={callback}>rerender parent</button>
      <p>
        <a href="https://github.com/slikts/tuplerone">
          https://github.com/slikts/tuplerone
        </a>{" "}
        (explanation of how this works)
      </p>
    </>
  );
};

export default App;
