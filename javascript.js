const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
let currentStep = 
    formSteps.findIndex(step=> {
    return step.classList.contains('active');
});

console.log(currentStep)

if(currentStep < 0){
    currentStep = 0;
    showCurrentStep();
}

// doesn't check for whether the input is empty
multiStepForm.addEventListener("click", e => {
    let incrementor
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input => input.reportValidity())
    let empties = true;
    
    if (e.target.matches("[data-next]")) {
      incrementor = 1
      for(let i = 0; i < inputs.length; i++){
        if(!inputs[i].value){
            empties = false;
            console.log(empties, "empty")
            return;
        }
    }
    } else if (e.target.matches("[data-previous]")) {
      incrementor = -1
    }
  
    if (incrementor == null) return
  
    console.log(empties, "a")
    if (allValid && empties) {
      currentStep += incrementor
      showCurrentStep()
    }
  })

  formSteps.forEach(step => {
    step.addEventListener("animationend", e => {
      formSteps[currentStep].classList.remove("hide")
      e.target.classList.toggle("hide", !e.target.classList.contains("active"))
    })
  })
  
  function showCurrentStep() {
    formSteps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep)
    })
  }