import { RefObject, useCallback, useEffect, useRef } from "react";
import { METER_TO_PIXEL_FACTOR } from "../../constants";

import { Vector2 } from "../../core/Vector2";

import { useScene } from "../contexts/useScene";
import { INextAnimationFrameHandler, useAnimationFrame } from "./useAnimationFrame";

export interface ISceneObject {
  mass: number;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
}

type TUseSceneObjectResult = [RefObject<HTMLDivElement>, ISceneObject];

export const useSceneObject = (...args: ((loop: INextAnimationFrameHandler, physicsBody: ISceneObject) => void)[]) => {
  const scene = useScene();
  const elementRef = useRef<HTMLDivElement>(null);

  const mass = useRef(1);
  const position = useRef(new Vector2(0, 0));
  const velocity = useRef(new Vector2(0, 0));
  const acceleration = useRef(new Vector2(0, 0));

  const updateElementWithSceneObject = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.top = `${position.current.y * METER_TO_PIXEL_FACTOR}px`;
      elementRef.current.style.left = `${position.current.x * METER_TO_PIXEL_FACTOR}px`;
    }
  }, []);

  useAnimationFrame((loopProps) => {
    args.forEach((arg) =>
      arg(loopProps, {
        mass: mass.current,
        position: position.current,
        velocity: velocity.current,
        acceleration: acceleration.current,
      })
    );

    updateElementWithSceneObject();
  });

  useEffect(() => {
    scene.subscribeElement(elementRef);
  }, []);

  const result: TUseSceneObjectResult = [
    elementRef,
    {
      mass: mass.current,
      position: position.current,
      velocity: velocity.current,
      acceleration: acceleration.current,
    },
  ];

  return result;
};
