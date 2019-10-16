import { hook, Hook, useMemo, useState, useRef } from 'haunted';

const useStateWithGetter = hook(
  class extends Hook {
    constructor(id, state) {
      super(id, state);
    }

    update(initial) {
      const ref = useRef();
      const [state, setState] = useState(initial);

      ref.current = state;

      const set = useMemo(
        () => value => {
          ref.current = value;
          setState(value);
        },
        [setState],
      );

      const get = useMemo(
        () => () => {
          return ref.current;
        },
        [],
      );

      return [state, set, get];
    }
  },
);

export default useStateWithGetter;
