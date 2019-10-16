import { createContext } from 'haunted';

const FormContext = createContext({
  fieldMap: {},
  register: () => {},
  notifyChange: () => {},
});

export const register = () => {
  customElements.define('form-provider', FormContext.Provider);
};

export default FormContext;
