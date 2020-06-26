import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

function useAuth() {
  const [userAutenticado, saveUserAutenticado] = useState(null);
  useEffect(() => {
    const onSuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        saveUserAutenticado(user);
      } else {
        saveUserAutenticado(null);
      }
    });
    return () => onSuscribe();
  }, []);
  return userAutenticado;
}

export default useAuth;
