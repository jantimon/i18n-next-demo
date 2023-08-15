"use client";

import { useState } from "react";
import { useTranslate } from "next-i18n/context";

export const Messages = () => {
  const [count, setCount] = useState(0);
  const { __ } = useTranslate();

  return (
    <>
      <p>{__("messages", { count })}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
};
