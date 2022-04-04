export const isStringField = (value) => {
  var letters = /^[A-Za-z]+$/;
  if (letters.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const isEmail = (value) => {
  var emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailPattern.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const isPhoneNumber = (value) => {
  var phoneno = /^\d{10}$/;
  if (phoneno.test(value)) {
    return true;
  } else {
    return false;
  }
};

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

export const isValidUrl = (value) => {
  var urlPattern = /^((http|https):\/\/)?(github.com|GITHUB.COM)\/([A-z]+)/;
  if (urlPattern.test(value)) {
    return true;
  } else {
    return false;
  }
};
