import { component, useEffect, useMemo } from 'haunted';
import { html } from 'lit-html';

import useSubmitListener from './useSubmitListener';
import useStateWithGetter from './useStateWithGetter';

const Form = ({
  dontPreventDefault = false,
  onSubmit = () => {},
  onValueChange = () => {},
  apiRef,
}) => {
  const [fieldMap, setFieldMap, getFieldMap] = useStateWithGetter({});
  useSubmitListener();

  const setValue = useMemo(
    () => (field, value) => {
      getFieldMap()[field].setValue(value);
    },
    [getFieldMap],
  );

  const getValue = useMemo(
    () => field => {
      return getFieldMap()[field].getValue();
    },
    [getFieldMap],
  );

  const setError = useMemo(
    () => (field, error) => {
      getFieldMap()[field].setError(error);
    },
    [getFieldMap],
  );

  const getError = useMemo(
    () => field => {
      return getFieldMap()[field].getError();
    },
    [getFieldMap],
  );

  const getState = useMemo(
    () => () => {
      const currentFieldMap = getFieldMap();
      return Object.keys(currentFieldMap).reduce(
        (state, field) => {
          state.fields[field] = {
            value: currentFieldMap[field].getValue(),
            error: currentFieldMap[field].getError(),
          };

          return state;
        },
        { hasError: hasError(), fields: {} },
      );
    },
    [getFieldMap],
  );

  const triggerValidation = () =>
    Object.keys(fieldMap).forEach(field => fieldMap[field].validate());

  const hasError = () =>
    Object.keys(getFieldMap()).some(field => !!getFieldMap()[field].getError());

  const getValues = () =>
    Object.keys(fieldMap).reduce((values, field) => {
      values[field] = fieldMap[field].getValue();
      return values;
    }, {});

  const register = useMemo(
    () => ({ field, getValue, getError, setError, setValue, validate }) =>
      setFieldMap(currMap =>
        Object.assign({}, currMap, {
          [field]: { getValue, getError, setError, setValue, validate },
        }),
      ),
    [setFieldMap],
  );

  const handleSubmit = useMemo(
    () => e => {
      if (!dontPreventDefault) {
        e.preventDefault();
      }

      triggerValidation();

      if (!hasError()) {
        onSubmit(getValues());
      }
    },
    [fieldMap],
  );

  const notifyChange = useMemo(
    () => () => {
      onValueChange(getValues());
    },
    [fieldMap],
  );

  const value = useMemo(
    () => ({
      fieldMap,
      register,
      notifyChange,
    }),
    [fieldMap, register, notifyChange],
  );

  useEffect(() => {
    if (apiRef) {
      apiRef.current = {
        setValue,
        getValue,
        getError,
        setError,
        validate: triggerValidation,
        getState,
      };
    }
  }, [apiRef, setValue, getValue, getError, setError, getState, triggerValidation]);

  return html`
    <form @submit=${handleSubmit}>
      <form-provider .value=${value}>
        <slot></slot>
      </form-provider>
    </form>
  `;
};

export const register = () => {
  customElements.define(
    'hf-form',
    component(Form, {
      observedAttributes: ['dont-prevent-default', 'on-submit', 'on-value-change', 'api-ref'],
    }),
  );
};
