const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function(e){
  e.preventDefault();

  let isValid = checkRequired([username, email, password, confirmPassword]);

  if(isValid){
    isValid =
      checkLength(username, 3, 15) &&
      checkEmail(email) &&
      checkLength(password, 6, 20) &&
      checkPasswordsMatch(password, confirmPassword);
  }

  if(isValid){
    alert("🎉 Registration Successful!");
    form.reset();
    document.querySelectorAll(".form-group").forEach(group=>{
      group.className="form-group";
    });
  }
});

function checkRequired(inputs){
  let valid = true;
  inputs.forEach(input=>{
    if(input.value.trim()===""){
      showError(input, `${formatFieldName(input)} is required`);
      valid=false;
    }else{
      showSuccess(input);
    }
  });
  return valid;
}

function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, `${formatFieldName(input)} must be at least ${min} chars`);
    return false;
  }else if(input.value.length > max){
    showError(input, `${formatFieldName(input)} must be less than ${max} chars`);
    return false;
  }
  showSuccess(input);
  return true;
}

function checkEmail(input){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(regex.test(input.value.trim())){
    showSuccess(input);
    return true;
  }
  showError(input, "Email is not valid");
  return false;
}

function checkPasswordsMatch(p1, p2){
  if(p1.value !== p2.value){
    showError(p2, "Passwords do not match");
    return false;
  }
  return true;
}

function showError(input, message){
  const group = input.parentElement;
  group.className = "form-group error";
  group.querySelector("small").innerText = message;
}

function showSuccess(input){
  input.parentElement.className = "form-group success";
}

function formatFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
