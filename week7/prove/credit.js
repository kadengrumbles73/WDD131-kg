const cardNumberInput = document.getElementById('cardNumber');

// Auto-format: Adds space every 4 digits
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    let formatted = value.match(/.{1,4}/g)?.join(' ') || ''; 
    e.target.value = formatted.substring(0, 19); 
});

document.getElementById('credit-card-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt("20" + document.getElementById('year').value);
    const feedback = document.getElementById('feedback');

    // Computational Thinking Validation
    const validNumber = "1234123412341234";
    const now = new Date();
    const isExpired = (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1));

    if (cardNumber !== validNumber) {
        feedback.textContent = "Invalid Card Number. Please use 1234 1234 1234 1234.";
        feedback.style.color = "red";
    } else if (isExpired) {
        feedback.textContent = "This card is expired.";
        feedback.style.color = "red";
    } else {
        feedback.textContent = "Success! Your payment has been processed.";
        feedback.style.color = "green";
    }
});