export default function validationLogin(value) {
  let error = {};

  //validar el email del usuario
  if (!value.email) {
    error.email = "Your Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
    error.email = "Invalid Email";
  }

  //validar el password del usuario
  if (!value.password) {
    error.password = "Your Password is required";
  } else if (value.password.length < 6) {
    error.password = "Your password must be at least 6 characters";
  }

  return error;
}
