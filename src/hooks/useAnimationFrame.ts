import { useEffect, useRef } from "react";

export interface INextAnimationFrameHandler {
  firstFrameTime: number;
  deltaTime: number;
  fps: number;
}

type TNextAnimationFrameHandler = ({
  // eslint-disable-next-line no-unused-vars
  firstFrameTime,
  // eslint-disable-next-line no-unused-vars
  deltaTime,
  // eslint-disable-next-line no-unused-vars
  fps,
}: INextAnimationFrameHandler) => void;

interface IUseAnimationFrameProps {
  nextAnimationFrameHandler: TNextAnimationFrameHandler;
  stop?: boolean;
}

let previousTime = 0;

export const useAnimationFrame = ({
  nextAnimationFrameHandler,
  stop = false,
}: IUseAnimationFrameProps) => {
  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());

  const animate = (currentTime: number) => {
    const deltaTime = (currentTime - previousTime) / 1000;
    const fps = 1 / deltaTime;

    nextAnimationFrameHandler({
      firstFrameTime: firstFrameTime.current,
      deltaTime,
      fps,
    });

    previousTime = currentTime;

    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!stop) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame.current);
    }

    return () => cancelAnimationFrame(frame.current);
  }, [stop]);
};
