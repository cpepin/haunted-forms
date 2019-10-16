import { component } from 'haunted';
import { html } from 'lit-html';

import { useField } from '../lib';

const MyTextInput = ({
  field,
  initialValue = '',
  validate,
  validateOnBlur,
  validateOnChange,
  validateOnRender,
}) => {
  const { error, handleBlur, handleChange, render } = useField({
    field,
    initialValue,
    validate,
    validateOnBlur,
    validateOnChange,
    validateOnRender,
  });

  return render(html`
    <input
      id="my-input"
      type="text"
      value=${initialValue}
      @input=${handleChange}
      @blur=${handleBlur}
    ></input>
    <div>${error}</div>
  `);
};

MyTextInput.observedAttributes = [
  'field',
  'initial-value',
  'validate',
  'validate-on-blur',
  'validate-on-change',
  'validate-on-render',
];

customElements.define('my-text-input', component(MyTextInput));
