import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { METER_TO_PIXEL_FACTOR } from "../../constants";

import { Vector2 } from "../../core/Vector2";

import { useScene, IContextResult as IUseSceneProviderValues } from "../contexts/useScene";
import { INextAnimationFrameHandler, useAnimationFrame } from "./useAnimationFrame";

export interface IUseSceneObject {
  mass?: number;
  position?: Vector2;
  velocity?: Vector2;
  acceleration?: Vector2;
}

export interface IWithScripts {
  loop: INextAnimationFrameHandler;
  scene: IUseSceneProviderValues;
  sceneObject: {
    mass: number;
    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2;
  };
  element: RefObject<HTMLDivElement>;
}

export interface IUseSceneObjectProps extends IUseSceneObject {
  scripts: (((argProps: IWithScripts) => void) | boolean)[];
}

export const useSceneObject = ({
  mass: massProp,
  position: positionProp,
  velocity: velocityProp,
  acceleration: accelerationProp,
  scripts,
}: IUseSceneObjectProps = {
    mass: 1,
    position: new Vector2(0, 0),
    velocity: new Vector2(0, 0),
    acceleration: new Vector2(0, 0),
    scripts: [],
  }) => {
  const scene = useScene();
  const elementRef = useRef<HTMLDivElement>(null);

  const initialPosition = useMemo(() => {
    if (positionProp) {
      return new Vector2(
        positionProp.x / METER_TO_PIXEL_FACTOR,
        positionProp.y / METER_TO_PIXEL_FACTOR * -1,
      )
    };
    return new Vector2(0, 0);
  }, [positionProp])

  const initialVelocity = useMemo(() => {
    if (velocityProp) {
      return velocityProp;
    }
    return new Vector2(0, 0);
  }, [velocityProp])

  const initialAcceleration = useMemo(() => {
    if (accelerationProp) {
      return accelerationProp;
    }
    return new Vector2(0, 0);
  }, [accelerationProp])

  const mass = useRef(massProp || 1);
  const position = useRef(initialPosition);
  const velocity = useRef(initialVelocity);
  const acceleration = useRef(initialAcceleration);

  const updateElementWithSceneObject = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.left = `${position.current.x * METER_TO_PIXEL_FACTOR}px`;
      elementRef.current.style.top = `${position.current.y * METER_TO_PIXEL_FACTOR * -1}px`;
    }
  }, []);

  useAnimationFrame((loopProps) => {
    scripts.forEach((arg) => typeof arg === 'function' && arg({
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
    updateElementWithSceneObject();
  }, []);

  return elementRef;
};
