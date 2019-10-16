import { component } from 'haunted';
import { html } from 'lit-html';

import { useSubmitDispatcher } from '../lib';

const MySubmitButton = () => {
  const { dispatch } = useSubmitDispatcher();

  const handleClick = e => dispatch(e);

  return html`
    <button @click=${handleClick}>Submit</button>
  `;
};

customElements.define('my-submit-button', component(MySubmitButton));
