"use strict";

let nowYear = () => {
    let date = new Date();
    let span = document.querySelector('footer .year');

    span.innerHTML = date.getFullYear();
};
let nowDateInput = () => {
    let inputDate = document.querySelectorAll('input[type="date"]');
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    now = year + "-" + month + "-" + day;

    inputDate.forEach((el) => {
        el.value = now;
    });
};

nowYear();
nowDateInput();