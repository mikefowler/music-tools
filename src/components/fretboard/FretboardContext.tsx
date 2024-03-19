import { Fretboard } from '@moonwave99/fretboard.js';
import merge from 'lodash/merge';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';

const defaultOptions = {
  fretCount: 22,
  bottomPadding: 0,
  dotText: ({ note }) => note,
  dotFill: '#BFC9DE',
  dotStrokeWidth: 0,
  dotSize: 24,
  leftPadding: 24,
  rightPadding: 24,
};

const createDefaultFretboard = () => {
  console.log('createDefaultFretboard');
  return new Fretboard(defaultOptions);
};

interface ContextInterface {
  fretboard: Fretboard;
  setOptions: (options: object) => void;
}

const FretboardContext = createContext<ContextInterface | null>(null);

export const useFretboard = () => {
  const ctx = useContext(FretboardContext);

  if (!ctx)
    throw new Error('useFretboard must be called inside of FretboardProvider');

  return ctx;
};

interface FreboardProviderProps {}

export const FretboardProvider: React.FC<
  PropsWithChildren<FreboardProviderProps>
> = ({ children }) => {
  const fretboard = useRef(createDefaultFretboard());
  const ref = useRef<HTMLElement | null>(null);

  const setOptions = useCallback((options) => {
    const nextOptions = merge(defaultOptions, options);
    console.log('setOptions', nextOptions);

    if (ref.current !== null) {
      ref.current.innerHTML = '';
    }

    fretboard.current;
    fretboard.current = new Fretboard(nextOptions);
    fretboard.current.render();
  }, []);

  useCallback(() => {
    console.log('rerender');
    fretboard.current.render();
  }, [fretboard.current]);

  const context = useMemo(
    () => ({
      fretboard: fretboard.current,
      setOptions,
    }),
    [fretboard.current],
  );

  return (
    <FretboardContext.Provider value={context}>
      {children}
    </FretboardContext.Provider>
  );
};
