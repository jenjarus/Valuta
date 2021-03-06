"use strict";

const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const amountDollar = document.getElementById('amount-USD');
const amountEuro = document.getElementById('amount-EUR');
const amountYen = document.getElementById('amount-JPY');
const amountWon = document.getElementById('amount-KRW');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

const arrFullName = {
    'RUB': 'Российские рубли',
    'USD': 'Американские Доллары',
    'EUR': 'Европейские Евро',
    'GBP': 'Фунт стерлингов',
    'CHF': 'Швейцарский франк',
    'BYN': 'Белорусский рубль',
    'UAH': 'Украинская гривна',
    'ILS': 'Израильский шекель',
    'NOK': 'Норвежская крона',
    'CNY': 'Китайский юань',
    'JPY': 'Японские Йены',
    'KRW': 'Корейские Воны',
    'AMD': 'Армянский драм',
    'BRL': 'Бразильский реал',
};

function calculate() {
    const currency_one = currencyEl_one.value.length ? currencyEl_one.value : "RUB";
    const currency_two = currencyEl_two.value.length ? currencyEl_two.value : "USD";

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];
            const rateUSD = data.rates['USD'];
            const rateEUR = data.rates['EUR'];
            const rateJPY = data.rates['JPY'];
            const rateKRW = data.rates['KRW'];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.innerHTML = (amountEl_one.value * rate).toFixed(2);

            amountDollar.innerHTML = (amountEl_one.value * rateUSD).toFixed(2)+' $';
            amountEuro.innerHTML = (amountEl_one.value * rateEUR).toFixed(2)+' €';
            amountYen.innerHTML = (amountEl_one.value * rateJPY).toFixed(2)+' ¥';
            amountWon.innerHTML = (amountEl_one.value * rateKRW).toFixed(2)+' ₩';
        });
}

function select(item, selected) {
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then(res => res.json())
        .then(data => {
            const CurrencyNames = Object.keys(data.rates);
            CurrencyNames.map(function(el) {
                item.innerHTML += (`
                                    <option value="${el}" ${el === selected ? 'selected' : ''}>
                                        ${arrFullName[el] ? arrFullName[el]: el}
                                    </option>`);
            });
        });
}

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});


select(currencyEl_one, "RUB");
select(currencyEl_two, "USD");
calculate();