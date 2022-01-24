import { createContext, MutableRefObject, ReactNode, RefObject, useCallback, useContext, useMemo, useRef } from "react";

interface Context {
  elements: MutableRefObject<RefObject<HTMLElement>[]>;
  subscribeElement: (element: RefObject<HTMLElement>) => void;
}

interface Props {
  children: ReactNode;
}

export interface IContextResult {
  elements: MutableRefObject<RefObject<HTMLElement>[]>;
  subscribeElement: (element: RefObject<HTMLElement>) => void;
}

const SceneContext = createContext<Context>({} as Context);

export const SceneProvider = ({ children }: Props) => {
  // const [elements, setElements] = useState<RefObject<HTMLElement>[]>([]);
  const elements = useRef<RefObject<HTMLElement>[]>([]);

  const subscribeElement = useCallback(
    (element: RefObject<HTMLElement>) => {
      elements.current = [...elements.current, element];
    },
    [elements]
  );

  const memoizedValue = useMemo(
    () => ({
      elements,
      subscribeElement,
    }),
    [elements, subscribeElement]
  );

  return <SceneContext.Provider value={memoizedValue}>{children}</SceneContext.Provider>;
};

export const useScene = () => {
  const context = useContext(SceneContext);

  return context;
};
