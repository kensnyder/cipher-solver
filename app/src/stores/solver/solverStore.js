import { useCallback } from 'react';
import createStore from '../../libs/createStore/createStore.js';

const { StoreProvider, useStore } = createStore({
  highlighted: null,
  selected: null,
  progress: [],
  map: {},
});

export const SolverStoreProvider = StoreProvider;

export function useHighlight() {
  const [state, setState] = useStore();
  const setter = useCallback(
    highlighted => {
      setState(old => ({ ...old, highlighted }));
    },
    [setState]
  );
  return [state.highlighted, setter];
}

export function useSelection() {
  const [state, setState] = useStore();
  const setter = useCallback(
    selected => {
      setState(old => ({ ...old, selected }));
    },
    [setState]
  );
  return [state.selected, setter];
}

export function useSolution() {
  const [state, setState] = useStore();
  return {
    map: state.map,
    progress: state.progress,
    reset: () => setState(old => ({ ...old, map: [] })),
    updateMap: (ciphertext, plaintext) => {
      const progress = [...state.progress];
      const map = { ...state.map };
      progress.push({ ciphertext, plaintext });
      map[ciphertext] = plaintext;
      setState(old => ({ ...old, progress, map }));
    },
    undo: () => {
      const progress = [...state.progress];
      progress.pop();
      const map = {};
      progress.forEach(character => {
        map[character.ciphertext] = character.plaintext;
      });
      setState(old => ({ ...old, progress, map }));
    },
  };
}

export function useFrequency() {}
