export const CheckPassword = (password: string): string[] | boolean => {
  const errorList: string[] = [];
  let lower = new RegExp("^(?=.*[a-z])");
  let upper = new RegExp("^(?=.*[A-Z])");
  let numeric = new RegExp("^(?=.*[0-9])");
  let special = new RegExp("^(?=.*[!@#$%^&*])");
  let longer = new RegExp("^(?=.{8,})");

  if (!lower.test(password)) {
    errorList.push("Password minimal mengandung 1 alfabet kecil");
  }
  if (!upper.test(password)) {
    errorList.push("Password minimal mengandung 1 alfabet besar");
  }
  if (!numeric.test(password)) {
    errorList.push("Password minimal mengandung 1 angka");
  }
  if (!special.test(password)) {
    errorList.push("Password minimal mengandung 1 karakter special");
  }
  if (!longer.test(password)) {
    errorList.push("Password minimal 8 karakter atau lebih");
  }
  if (errorList.length > 0) {
    return errorList;
  } else {
    return false;
  }
};
