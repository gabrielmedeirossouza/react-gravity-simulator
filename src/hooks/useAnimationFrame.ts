import { useCallback, useEffect, useRef } from "react";
import { useScene } from "../contexts/useScene";

export interface INextAnimationFrameHandler {
  firstFrameTime: number;
  deltaTime: number;
  fps: number;
  time: number;
}

type TNextAnimationFrameHandler = ({ firstFrameTime, deltaTime, fps, time }: INextAnimationFrameHandler) => void;

export const useAnimationFrame = (nextAnimationFrameHandler: TNextAnimationFrameHandler) => {
  const scene = useScene();

  const previousTime = useRef(0);
  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());

  const animate = useCallback(
    (currentTime: number) => {
      const deltaTime = (currentTime - previousTime.current) / 1000;
      const fps = 1 / deltaTime;

      nextAnimationFrameHandler({
        firstFrameTime: firstFrameTime.current,
        deltaTime,
        fps,
        time: currentTime,
      });

      previousTime.current = currentTime;

      frame.current = requestAnimationFrame(animate);
    },
    [nextAnimationFrameHandler]
  );

  useEffect(() => {
    firstFrameTime.current = performance.now();
    frame.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame.current);
  }, [scene.elements, animate]);
};
