import { hook, Hook, useEffect } from 'haunted';

const useSubmitListener = hook(
  class extends Hook {
    constructor(id, state) {
      super(id, state);
    }

    update() {
      useEffect(() => {
        const handleSubmit = () => {
          const form = this.state.host.shadowRoot.querySelector('form');
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        };

        this.state.host.addEventListener('hf-submit', handleSubmit);

        return () => this.state.host.removeEventListener('hf-submit', handleSubmit);
      }, []);
    }
  },
);

export default useSubmitListener;
