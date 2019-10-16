import { component, useRef } from 'haunted';
import { render, html } from 'lit-html';

import { register } from '../lib';

register();

import './MyTextInput';
import './MySubmitButton';

const App = () => {
  const apiRef = useRef();
  const validate = input => (input.length < 2 ? 'Input is too short!' : undefined);

  const setField2 = () => {
    console.log('setting field 2...');
    apiRef.current.setValue('field2', 'youdidit');
  };

  const getField2 = () => {
    console.log(apiRef.current.getValue('field2'));
  };

  const getField2Error = () => {
    console.log(apiRef.current.getError('field2'));
  };

  const setField2Error = () => {
    console.log('setting field 2 error');
    apiRef.current.setError('field2', 'youdidit');
  };

  const triggerValidation = () => {
    apiRef.current.validate();
  };

  const getState = () => {
    console.log(apiRef.current.getState());
  };

  const handleSubmit = values => console.log('submitting values', values);

  const handleValueChange = values => console.log(values);

  return html`
    <hf-form .onSubmit=${handleSubmit} .onValueChange=${handleValueChange} .apiRef=${apiRef}>
      <my-text-input
        field="field1"
        initial-value="f"
        .validate=${validate}
        validate-on-blur
      ></my-text-input>

      <my-text-input
        field="field2"
        initial-value="f"
        .validate=${validate}
        validate-on-blur
      ></my-text-input>

      <my-text-input
        field="field3"
        initial-value="f"
        .validate=${validate}
        validate-on-render
        validate-on-blur
      ></my-text-input>

      <my-submit-button></my-submit-button>
    </hf-form>

    <button @click=${setField2}>Set field 2</button>
    <button @click=${getField2}>Get field 2</button>
    <button @click=${getField2Error}>Get field 2 Error</button>
    <button @click=${setField2Error}>Set field 2 Error</button>
    <button @click=${triggerValidation}>Trigger validation</button>
    <button @click=${getState}>get state</button>
  `;
};

customElements.define('my-app', component(App));

render(
  html`
    <my-app></my-app>
  `,
  document.body,
);
