// Interactive Form
// By Justin Black


const loadFocus = document.getElementById("name");
const jobRoleTitle = document.getElementById("title");
const otherTitleRole = document.getElementById("other-title");
      otherTitleRole.style.display = "none";
const designSelect = document.querySelector("#color");
const designOptions = document.querySelectorAll("#color option");
const firstColorOption = designOptions[0].text
const themeSelect = document.getElementById("design");
const selectThemeValue = "Please select a T-shirt theme";
const activitySelect = document.querySelector(".activities");
let   totalCost = 0;
const paymentSelect  = document.getElementById("payment");
      paymentSelect. remove(0);
const creditCardOption = paymentSelect.options[0].value;
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("mail");
const creditCardInput = document.getElementById("cc-num");
const zipInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");
const btn = document.querySelector("button");
const div = document.createElement("div");
      activitySelect.querySelector("legend").after(div);
      div.id = "activity";


// This function will hide color options when not selected
function hideColorOptions() {
  const defaultOption = designOptions[0]
        defaultOption.text = selectThemeValue;
  
  for (i = 0; i < designOptions.length; i++) {
    designSelect.remove(designSelect.length-1);
  }
  
  designSelect.appendChild(defaultOption);
}


//This hides the Color select  
function hideColorSelect() {
  const hideTheme = document.getElementById("design").value;
  
  if (document.getElementById("design").options[0].text === hideTheme) {
   designSelect.parentElement.style.display = "none"; 
  } 
  else {
    designSelect.parentElement.style.display = "";
  }
}


// This function displays the correct payment fields. 
function paymentToggle(paymentType){
  const paymentDivs = paymentSelect.parentElement.querySelectorAll("select ~ div");
  const paymentOptions = paymentSelect.options;

  for (i = 0; i < paymentOptions.length; i++) {
    if (paymentType === paymentOptions[i].value) {
      paymentDivs[i].style.display = "";
    } 
    else {
      paymentDivs[i].style.display = "none";
    }
  } 
}


//This function checks if email is valid
function isEmailValid(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}


//This function checks most text fields validity (Name, credit card, ccv, zip code)
function isFieldValid(field, exactNum, upToNum) {
  field = field.toString();
  
  if (exactNum == false) {
    return /^[\w]+\s+[\w]+\s*[\w]*$/i.test(field);
  } 
  else if (exactNum && upToNum == false) {
      if (field.length === exactNum) {
        return /^\d+$/.test(field);
      } 
      else { return false }
  } 
  else if (exactNum && upToNum) {
      let highNum = upToNum;
      let lowNum = exactNum;
    
      if (upToNum < exactNum) {
        highNum = exactNum;
        lowNum = upToNum; }
    
      if (field.length <= highNum && field.length >= lowNum) {
        return /^\d+$/.test(field);
      } 
      else { return false }     
  } 
  else {return false;}
}


//This function checks to see if a checkbox is checked
function isCheckboxChecked(field) {
  for (i = 0; i < field.length; i++) {
    if (field[i].checked) {
      return true
    } 
  }
  return false;
}


//This function prints error messages above input fields
function printErrorMessage(func, id, num, str, idElement,arr) {
   if (func == false) {
     if (document.getElementById(id)) {
        document.getElementById(id).parentElement.removeChild(document.getElementById(id));
        const spanElement = document.createElement("span");
              spanElement.id = id;
              document.getElementById(idElement).before(spanElement);
              spanElement.textContent += str;
              spanElement.style.color = "red";
        arr[num]= false;
     } 
     else {
        const spanElement = document.createElement("span");
              spanElement.id = id;
              document.getElementById(idElement).before(spanElement);
              spanElement.textContent += str;
              spanElement.style.color = "red";
              arr[num]= false;
    }
   } 
   else if (document.getElementById(id)) {
     document.getElementById(id).parentElement.removeChild(document.getElementById(id));
     arr[num]= true;
   } 
   else {
     arr[num]= true;
   }             
}


// This function checks for errors in realtime
function realTime(func1, func2) {
    if (func1 == false) { func1 } 
    else { func2 }
}


// This listner checks errors for name input in real time 
nameInput.addEventListener("input", () => {
      let arry = [];
      realTime(
        printErrorMessage(isFieldValid(nameInput.value, false, false), "nameMessage", 0, "First Name and Last Name must be entered", "name", arry), 
        printErrorMessage(isFieldValid(nameInput.value, false, false), "nameMessage", 0, "First Name and Last Name must be entered", "name", arry))
});


// This listner checks errors for email input in real time 
emailInput.addEventListener("input", () => {
      let arry = [];
      realTime(
        printErrorMessage(isEmailValid(emailInput.value, false, false), "emailMessage", 0, "Not an vaild email", "mail", arry), 
        printErrorMessage(isEmailValid(emailInput.value, false, false), "emailMessage", 0, "Not an vaild email", "mail", arry))
});


// This listener displays the Other Job Role when other is selected.
jobRoleTitle.addEventListener('change', () => {
  let selectedOption = jobRoleTitle.value;
                              
  if (selectedOption === "other") {
      otherTitleRole.style.display = "";
  } 
  else {
      otherTitleRole.style.display = "none";
  }
});

//This event hides the colors depending on the theme selected. 
themeSelect.addEventListener('change', (e) => {
    const themeOption = e.target.value;
    hideColorOptions();
    hideColorSelect();
  
    for (i = 0; i < themeSelect.length; i++) {
      if (themeOption === themeSelect.options[0].value) {
      }
      else if (themeOption === themeSelect.options[i].value) {
        designOptions[0].text = firstColorOption;
        designSelect.remove(0);
        
        for (a = 0; a < designOptions.length; a++) {
          if  (designOptions[a].textContent.includes(themeSelect.options[i].text.replace("Theme - ", ""))) {
            designSelect.appendChild(designOptions[a]);
          } 
        }
      }
    }
});



/*This listener disables matching activity fields when clicked
Also, it calculates cost and appends total to bottom of field.*/

activitySelect.addEventListener('change', (e) => {
  const activityInput = activitySelect.getElementsByTagName("input");
  
  for (i = 0; i < activityInput.length; i++) {
    const dateTime = activityInput[i].getAttribute("data-day-and-time");
    const checkedDate = e.target.getAttribute("data-day-and-time");
    const activityName = activityInput[i].getAttribute("name");
    const checkedName = e.target.getAttribute("name");
    const activityCost = parseInt(e.target.getAttribute("data-cost"));
    let   checkedClass = activityInput[i].getAttribute("class");
    
    //Creates total cost span
    function createCostSpan() {
      if (totalCost) {
        const span = document.createElement("span");
        span.id = "total_cost";
        span.textContent = "Total: $" + totalCost;
        activitySelect.appendChild(span);
      }
    }
    
    //Appends Cost to bottom of field
    function appendCost() {
      if (document.getElementById("total_cost")) {
        idSpan = document.getElementById("total_cost");
        idSpan.parentNode.removeChild(idSpan); 
        createCostSpan()
      } 
      else {createCostSpan()}
    }
    
    //This conditional looks for matching dates and disables checkboxes. 
    if (checkedName != activityName) {
      if (checkedDate === dateTime ) {
        if (activityInput[i].disabled) {
          activityInput[i].parentElement.style.color = "initial";
          activityInput[i].style.visibility = "";
          activityInput[i].disabled = false;
        } 
        else {
          activityInput[i].parentElement.style.color = "grey";
          activityInput[i].style.visibility = "hidden";
          activityInput[i].disabled = true;
        }
      }
    } 
    else {
      if (checkedClass) {
        activityInput[i].classList.remove("checked");
        totalCost -= activityCost;
      } 
      else {
          activityInput[i].classList.add("checked");
          totalCost += activityCost;
      }
    }
  }
  appendCost()
});


//This listener changes payment fields based on what user selects.
paymentSelect.addEventListener("change", (e) => {
  const clickedPayment = e.target.value;
  paymentToggle(clickedPayment)
});


// This listner submits form and checks for errors before it is submitted
btn.addEventListener("click", (e) => {
  const formSubmitted = [];

  /* Name Input Error message
  This conditional displays two different messages    
  depending on if name input is empty*/
  if (nameInput.value == "") {
    printErrorMessage(isFieldValid(nameInput.value, false, false), "nameMessage", 0, "Name must be entered", "name", formSubmitted); 
  } 
  else {
    printErrorMessage(isFieldValid(nameInput.value, false, false), "nameMessage", 0, "Please enter a first and last name", "name", formSubmitted); 
  }
  
  //Prints other error messages
  printErrorMessage(isEmailValid(emailInput.value), "emailMessage", 1, "Please enter a valid email", "mail",formSubmitted);
  
  printErrorMessage(isCheckboxChecked(activitySelect.getElementsByTagName("input")), "activityMessage", 2, "Please select an activity", "activity",formSubmitted);
    
  if (paymentSelect.options[0].text.toLowerCase() == paymentSelect.value) {
    printErrorMessage(isFieldValid(creditCardInput.value, 13, 16), "creditCardMessage", 3, "Credit Card number must be 13 to 16 digits long.", "cc-num",formSubmitted);
    printErrorMessage(isFieldValid(zipInput.value, 5, false), "zipMessage", 4, "Zip Code must be 5 digits long.", "zip",formSubmitted);
    printErrorMessage(isFieldValid(cvvInput.value, 3, false), "cvvMessage", 5, "CVV Number must be 3 digits long.", "cvv",formSubmitted);
  } 
  else {
    formSubmitted[3] = true;
    formSubmitted[4] = true;
    formSubmitted[5] = true;
  }
  

  //This form checks if all fields are completed and submits form. 
  function toSubmitForm(list) {
    let isTrue = 0;
    
    for (i = 0; i < list.length; i++) {
      if (list[i] == true) {
        isTrue += 1;
      } 
      else {
        isTrue = 0;
      }
    }
    
    if (isTrue != 6) {
     e.preventDefault(); 
    } 
  }
    
 toSubmitForm(formSubmitted);
});


hideColorOptions();
paymentToggle(creditCardOption);
hideColorSelect();

//This focus on the name input when page is loaded
window.onload = function() { 
  loadFocus.focus();
}
