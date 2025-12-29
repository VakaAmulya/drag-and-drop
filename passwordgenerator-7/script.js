const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");

const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", generatePassword);

function generatePassword(){
  let chars = "";
  if(uppercaseCheckbox.checked) chars += upper;
  if(lowercaseCheckbox.checked) chars += lower;
  if(numbersCheckbox.checked) chars += nums;
  if(symbolsCheckbox.checked) chars += syms;

  if(chars === ""){
    alert("Please select at least one option");
    return;
  }

  let pwd = "";
  for(let i = 0; i < lengthSlider.value; i++){
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordInput.value = pwd;
  updateStrength(pwd);
}

function updateStrength(pwd){
  let score = pwd.length * 4;
  if(/[A-Z]/.test(pwd)) score += 10;
  if(/[a-z]/.test(pwd)) score += 10;
  if(/[0-9]/.test(pwd)) score += 10;
  if(/[^A-Za-z0-9]/.test(pwd)) score += 10;

  score = Math.min(score, 100);
  strengthBar.style.width = score + "%";

  if(score < 40){
    strengthBar.style.background = "var(--weak)";
    strengthLabel.textContent = "Weak";
  }else if(score < 70){
    strengthBar.style.background = "var(--medium)";
    strengthLabel.textContent = "Medium";
  }else{
    strengthBar.style.background = "var(--strong)";
    strengthLabel.textContent = "Strong";
  }
}

copyButton.addEventListener("click", () => {
  if(!passwordInput.value) return;

  navigator.clipboard.writeText(passwordInput.value);
  copyButton.classList.replace("fa-copy","fa-check");

  setTimeout(()=>{
    copyButton.classList.replace("fa-check","fa-copy");
  },1200);
});

generatePassword();
