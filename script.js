const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

async function populateCurrencies() {
    const response = await fetch(API_URL + 'USD');
    const data = await response.json();

    const currencyKeys = Object.keys(data.rates);
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencyKeys.forEach(currency => {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');

        optionFrom.value = optionTo.value = currency;
        optionFrom.text = optionTo.text = currency;

        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
    });
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || fromCurrency === toCurrency) {
        document.getElementById('result').innerText = 'Please enter a valid amount and select different currencies.';
        return;
    }

    const response = await fetch(`${API_URL}${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];

    const convertedAmount = (amount * rate).toFixed(2);
    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

populateCurrencies();