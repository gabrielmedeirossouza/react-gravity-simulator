import { useEffect, useRef, useState } from "react";

import { useGravity } from "../../hooks/useGravity";

import { Block } from "./Styles";

export const Main = () => {
  const block = useRef<HTMLDivElement>(null);
  // const [stop, setStop] = useState(false);

  useGravity({ ref: block });

  // console.log(stop);

  // useEffect(() => {
  //   window.addEventListener("click", () => {
  //     setStop((e: boolean) => !e);
  //   });
  // }, []);

  return <Block ref={block} />;
};
