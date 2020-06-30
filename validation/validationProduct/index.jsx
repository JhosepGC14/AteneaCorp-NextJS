export default function validationProduct(value) {
  let error = {};

  //validar el nombre de usuario
  if (!value.nameProduct) {
    error.nameProduct = "Your Product Name is required";
  }

  //validar el email del usuario
  if (!value.company) {
    error.company = "Your Company is required";
  }

  //validar url
  if (!value.url) {
    error.url = "Your Products's url is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value.url)) {
    error.url = "The format of you URL is not validated";
  }

  //validar el password del usuario
  if (!value.description) {
    error.description = "The Product's Description is required";
  }

  return error;
}
