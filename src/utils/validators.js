// Method to validate the given value is a string or it contains any number or special characters
// Returns true if the value is string and false when it contains number or special characters
export const isStringField = (value) => {
  var letters = /^[A-Za-z]+$/;
  if (letters.test(value)) {
    return true;
  } else {
    return false;
  }
};
// Method to validate the given value is a email formatted or not
// Returns true if the value is valid email such as 'test@mail.com' and false when it is invalid such as 'testmail.com'
export const isEmail = (value) => {
  var emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailPattern.test(value)) {
    return true;
  } else {
    return false;
  }
};
// Method to validate the given value is number or contains characters or special characters and length of 10 digits
// returns true is length is 10 and all are digits such as '9090909090'
// return false when length is <10 or it contains any characters or special characters
export const isPhoneNumber = (value) => {
  var phoneno = /^\d{10}$/;
  if (phoneno.test(value)) {
    return true;
  } else {
    return false;
  }
};

// MEthod to validate the uploaded file type of element locating by Id selector
// allowed extensions are .doc or .docx or .pdf formats only
// returns true if file extension matches to allowed extensions
// returns false if file extension is other than allowed extension
export const isFileTypeAccepted = (fileId) => {
  var fileInputField = document.getElementById(fileId);
  var filePath = fileInputField.value;
  var allowedExtensions = /(\.doc|\.docx|\.pdf)$/i;
  if (!allowedExtensions.exec(filePath)) {
    return false;
  } else {
    return true;
  }
};

// Method to validate the github url
// All the github url contains github.com hence added as complete string to match either upper case or lower case
// returns true if value contains http or https protocol with // value and followed by github.com or GITHUB.COM such as 'https://github.com/test'
// returns false if value does not contain http or https protocal with // value and followed by github.com or GITHUB.COM such as 'htt://gthub.com/test'
export const isValidUrl = (value) => {
  var urlPattern = /^((http|https):\/\/)?(github.com|GITHUB.COM)\/([A-z]+)/;
  if (urlPattern.test(value)) {
    return true;
  } else {
    return false;
  }
};
