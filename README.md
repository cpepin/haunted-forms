# haunted-forms 👻

[![npm version](https://badge.fury.io/js/%40cpepin%2Fhaunted-forms.svg)](https://badge.fury.io/js/%40cpepin%2Fhaunted-forms)

A lightweight form library for haunted-js

## Installation

`npm install @cpepin/haunted-forms`

Examples below show components build with [haunted](https://github.com/matthewp/haunted) and [lit-html](https://github.com/Polymer/lit-html) for templating.

### IE11

This library requires the polyfills outlined in [here](https://github.com/matthewp/haunted#use), as well as a CustomEvent polyfill which you can find [here](https://github.com/kumarharsh/custom-event-polyfill#readme).

## Getting Started

In order to use the components exposed in this library, you will first need to register them using the `register` function.

```js
// your entry point
import { register } from '@cpepin/haunted-forms';

/*
 * 'defines' the custom elements in the DOM
 */
register();
```

## Components

### hf-form

`hf-form` creates a FormContext, which child form elements using `usField` will register with.

#### Usage

```html
<hf-form>
  <!-- Form Elements -->
</hf-form>
```

#### Attributes

- `dont-prevent-default`: (`boolean`) will trigger typical form submission behavior (refresh page)
- `on-submit`: (`(values) => void`) function invoked with the values from the form
- `on-value-change`: (`(values) => void`) function invoked with the form values, when a value has changed
- `api-ref`: (`{ current: any }`) accepts a ref provided by `useRef`, gives access to form api

#### Form API

- setValue: (`(field, value) => void`) updates a given form value
- getValue: (`(field) => value`) retrieves a form value
- getError: (`(field) => error`) retrieves a form error
- setError: (`(field, error) => void`) updates a given field's form error
- validate: (`() => void`) manually triggers form validation
- getState: (`() => formState`) retrieves the current state of the form

#### Form State

```
{
  hasError: boolean,
  fields: [
    {
      [field]: { value, error },
    },
  ],
}
```

### useField

Hook for creating form fields.

#### Usage

```js
import { useField } from '@cpepin/haunted-forms';

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
```

#### Params

- field: (`string`, required) name of the field (must be unique)
- initialValue: (`any`, default=`""`) initial value of the field
- onValueChange: (`(value) => void`, default=`() => {}`) invoked when value has changed
- validate: (`(value) => undefined | string`, default=`() => undefined`) validation function to be run against the input. Returns undefined if no error exists.
- validateOnBlur: (`boolean`, default=`false`) run field validation on blur
- validateOnChange: (`boolean`, default=`false`) run field validation on change
- validateOnRender: (`boolean`, default=`false`) run field validation on render

### useSubmitDispatcher

Hook used to dispatch a customer submit event from a form button. This is necessary, as normal `submit` events can not bubble up outside of the `shadowRoot`.

#### Usage

```js
import { useSubmitDispatcher } from '@cpepin/haunted-forms';

const MySubmitButton = () => {
  const { dispatch } = useSubmitDispatcher();

  const handleClick = e => dispatch(e);

  return html`
    <button @click=${handleClick}>Submit</button>
  `;
};
```
