import React, { useState, useEffect } from "react";

const useValidation = (stateInitial, validation, fn) => {
  const [value, setValue] = useState(stateInitial);
  const [error, setError] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noError = Object.keys(error).length === 0;
      if (noError) {
        fn(); //Fn = funcion que se ejecuta en el componente
      }
      setSubmitForm(false);
    }
  }, [error]);

  //Funcion que se ejecuta conforme el user escribe algo
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  //funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorValidation = validation(value);
    setError(errorValidation);
    setSubmitForm(true);
  };

  //realizar el evento blur
  const handleBlur = () => {
    const errorValidation = validation(value);
    setError(errorValidation);
  };

  return {
    value,
    error,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useValidation;
