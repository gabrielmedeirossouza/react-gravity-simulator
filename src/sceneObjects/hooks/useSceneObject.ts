import { Context, RefObject, useCallback, useEffect, useRef } from "react";
import { METER_TO_PIXEL_FACTOR } from "../../constants";

import { Vector2 } from "../../core/Vector2";

import { useScene, IContextResult as IUseSceneProviderValues } from "../contexts/useScene";
import { INextAnimationFrameHandler, useAnimationFrame } from "./useAnimationFrame";

interface ISceneObject {
  mass: number;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
}

export interface IArgProps {
  loop: INextAnimationFrameHandler;
  scene: IUseSceneProviderValues;
  sceneObject: ISceneObject;
  element: RefObject<HTMLDivElement>;
}

export const useSceneObject = (...args: ((argProps: IArgProps) => void)[]) => {
  const scene = useScene();
  const elementRef = useRef<HTMLDivElement>(null);

  const mass = useRef(1);
  const position = useRef(new Vector2(0, 0));
  const velocity = useRef(new Vector2(0, 0));
  const acceleration = useRef(new Vector2(0, 0));

  const updateElementWithSceneObject = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.top = `${position.current.y * METER_TO_PIXEL_FACTOR * -1}px`;
      elementRef.current.style.left = `${position.current.x * METER_TO_PIXEL_FACTOR}px`;
    }
  }, []);

  useAnimationFrame((loopProps) => {
    args.forEach((arg) => arg({
        loop: loopProps,
        scene,
        sceneObject: {
          mass: mass.current,
          position: position.current,
          velocity: velocity.current,
          acceleration: acceleration.current,
        },
        element: elementRef,
      })
    );

    updateElementWithSceneObject();
  });

  useEffect(() => {
    scene.subscribeElement(elementRef);
  }, []);

  const result: [RefObject<HTMLDivElement>, ISceneObject] = [
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
