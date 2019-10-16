import { hook, Hook, useContext, useEffect, useRef, useState, useMemo } from 'haunted';

import FormContext from './FormContext';
import useStateWithGetter from './useStateWithGetter';

const useField = hook(
  class extends Hook {
    constructor(id, state) {
      super(id, state);
    }

    update({
      field,
      initialValue,
      onValueChange = () => {},
      validate = () => undefined,
      validateOnBlur = false,
      validateOnChange = false,
      validateOnRender = false,
    }) {
      const formContext = useContext(FormContext);
      const valueRef = useRef();
      const [error, setError, getError] = useStateWithGetter();

      useState(() => {
        valueRef.current = initialValue;
        onValueChange(valueRef.current);
        formContext.notifyChange();
      });

      useEffect(() => {
        if (validateOnRender) {
          triggerValidation();
        }
      }, []);

      const triggerValidation = () => {
        const newError = validate(valueRef.current);

        if (newError !== getError()) {
          setError(newError);
        }
      };

      const setValue = value => {
        this.state.host.shadowRoot.querySelector('input').value = value;
        valueRef.current = value;
      };

      const getValue = () => valueRef.current;

      const handleChange = useMemo(
        () => e => {
          valueRef.current = e.originalTarget.value;
          onValueChange(valueRef.current);
          formContext.notifyChange();

          if (validateOnChange) {
            triggerValidation();
          }
        },
        [setError, formContext.notifyChange],
      );

      const handleBlur = useMemo(
        () => () => {
          if (validateOnBlur) {
            triggerValidation();
          }
        },
        [],
      );

      const render = children =>
        useMemo(() => {
          return children;
        }, [JSON.stringify(children), error, handleChange]);

      // context appears to be... synchronous
      useEffect(() => {
        formContext.register({
          field,
          getValue,
          setValue,
          setError,
          getError,
          validate: triggerValidation,
        });
      }, [formContext.register]);

      return {
        error,
        handleChange,
        render,
        handleBlur,
      };
    }
  },
);

export default useField;
