import { hook, Hook, useMemo } from 'haunted';

const useSubmitDispatcher = hook(
  class extends Hook {
    constructor(id, state) {
      super(id, state);
    }

    update() {
      const dispatch = useMemo(
        () => e => {
          e.preventDefault();
          this.state.host.dispatchEvent(
            new CustomEvent('hf-submit', { bubbles: true, composed: true }),
          );
        },
        [],
      );

      return { dispatch };
    }
  },
);

export default useSubmitDispatcher;
