// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // hide results
  document.getElementById('results').style.display = 'none';
  
  // show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//calculate results function
function calculateResults() {

  //UI Variables
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

// Principle
const principle = parseFloat(amount.value);

// calculated interest
const calculatedInterest = parseFloat(interest.value) / 100 / 12;

//calculated payments
const calculatedPayments = parseFloat(years.value) * 12;

// compute monthly payments
const y = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principle * y * calculatedInterest)/(y-1);

if(isFinite(monthly)) {
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
    // show results
    document.getElementById('results').style.display = 'block';
  
    // hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
  
}

//show error function
function showError(error) {
  // hide results
  document.getElementById('results').style.display = 'none';
  
  // hide loader
  document.getElementById('loading').style.display = 'none';

   //create a div element
   const errorDiv = document.createElement('div');

   // get elements
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');

   // add class
   errorDiv.className = 'alert alert-danger';

   // create textNode and append to div
   errorDiv.appendChild(document.createTextNode(error));

  // add the error above the heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);

}

// clear error function
function clearError() {
  document.querySelector('.alert').remove();
}


