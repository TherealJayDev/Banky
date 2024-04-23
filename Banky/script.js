'use strict';
const labelUser = document.querySelector('.label_user');
const user = document.querySelector('.user-name');
const userName = document.querySelector('.input_username');
const pin = document.querySelector('.input_pin');
const submitBtn = document.querySelector('.input_btn');
const labelBalance = document.querySelector('.label_balance');
const deposit = document.querySelector('.deposit');
const withdrawal = document.querySelector('.withdrawal');
const dropDown = document.querySelector('.caret');
const transaction = document.querySelector('.tra');
const containerTransactions = document.querySelector('.transactions');
const containerMain = document.querySelector('main');
const tra = document.querySelector('.tra_');
const caret = document.querySelector('.caret');
const functions = document.querySelector('.functions');
const samePopup = document.querySelector('.same-popup');
const receiverInput = document.querySelector('#receiver-input');
const amountInput = document.querySelector('#amount_input');
const sendBtn = document.querySelector('.send-btn');

// Data
const account1 = {
  owner: 'Jackson Joshua',
  monies: [-600, 1500, 3500, 400, -1500, 1500, 70, -150],
  pin: 1111,
  number: 8149721663,
};
const account2 = {
  owner: 'Roland Joshua',
  monies: [5000, 3400, -150, -790, -3100, 1500, 70, -150],
  pin: 2222,
  number: 8124879938,
};
const account3 = {
  owner: 'Arike Olayinka',
  monies: [3000, -600, 2500, 600, 1500, -500, 150, -150],
  pin: 3333,
  number: 8148492901,
};
const account4 = {
  owner: 'Williams Anastatia',
  monies: [150, -400, 3500, 500, -1500, -500, 400, -150],
  pin: 4444,
  number: 7060788057,
};

const accounts = [account1, account2, account3, account4];

const updateUI = function (acc) {
  // display balance and withdrawal
  totalBalance(currentAccount);

  displaySummary(currentAccount);
};

// create the users

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsernames(accounts);

// calculate the total balance and display it

const totalBalance = function (acc) {
  //mchaining methods
  acc.balance = acc.monies
    // .filter((money) => money > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `$${acc.balance}`;
};

// calculate te deposit and withdrawal and displa it
const displaySummary = function (acc) {
  const deposits = acc.monies
    .filter((money) => money > 0)
    .reduce((acc, money) => acc + money, 0);
  deposit.textContent = `$ ${deposits}`;
  deposit.style.color = 'green';

  const withdrawals = acc.monies
    .filter((money) => money < 0)
    .reduce((acc, money) => acc + money, 0);
  withdrawal.textContent = `${Math.abs(withdrawals)}$`;
  withdrawal.style.color = 'red';
};

// no account is currently logged in so set a somewhat default account, i dont know how to explain it, lol! keep it in the global sccope so i can access it anywhere and anytime i need it
let currentAccount;

// Event handlers

submitBtn.addEventListener('click', function (e) {
  // one of the reason why i used a form action is because when you input in the fields and click enter, it automatically submits even without clicking the button
  // prevent form from submitting without purpose
  e.preventDefault();

  // find if the inputed account exist in the accounts array using the find method
  currentAccount = accounts.find((acc) => acc.username === userName.value);
  if (currentAccount?.pin === Number(pin.value)) {
    // display UI and welcome message
    containerMain.style.opacity = 1;
    labelUser.textContent = `Hi, ${currentAccount.owner.split(' ')[0]}`;

    // clear the input fields
    userName.value = pin.value = '';
    userName.blur();
    pin.blur();

    // update UI
    updateUI(currentAccount);

    // display other UI
    functions.style.display = 'flex';
    document.querySelector('.other-features').style.display = 'grid';
    document.querySelector('.sides').style.display = 'flex';

    // add event listener to the transaction button

    document.querySelector('.caret').addEventListener('click', function () {
      document.querySelector('.sides').style.display = 'none';
      document.querySelector('.other-features').style.display = 'none';
      document.querySelector('.details').style.display = 'flex';
            document.querySelector('.beneficiaries').style.display = 'none';
            document.querySelector('.send').style.display = 'none';
      functions.style.display = 'none';
      containerTransactions.style.display = 'block';
      document.querySelector('.caret').style.display = 'none';
      document.querySelector('.carets').style.display = 'inline';
    });

    // display transaction history after clicking the text
    document.querySelector('.carets').addEventListener('click', function () {
      document.querySelector('.sides').style.display = 'flex';
      document.querySelector('.other-features').style.display = 'grid';
      document.querySelector('.details').style.display = 'none';
      functions.style.display = 'flex';
      containerTransactions.style.display = 'none';
      document.querySelector('.caret').style.display = 'inline';
      document.querySelector('.carets').style.display = 'none';
    });

    document.querySelector('.same').addEventListener('click', function () {
      document.querySelector('.other-features').style.display = 'none';
      document.querySelector('.sides').style.display = 'none';
      samePopup.style.display = 'block';
      document.querySelector('.beneficiaries').style.display = 'block';
      document.querySelector('.send').style.display = 'flex';
    });

    document.querySelector('#foot').addEventListener('click', function () {
      document.querySelector('.sides').style.display = 'flex';
      document.querySelector('.other-features').style.display = 'grid';
      document.querySelector('.beneficiaries').style.display = 'none';
      document.querySelector('.send').style.display = 'none';
      containerTransactions.style.display = 'none';
      document.querySelector('.details').style.display = 'none';
      functions.style.display = 'flex';
      document.querySelector('.caret').style.display = 'inline';
      document.querySelector('.carets').style.display = 'none';
    })

    document.querySelector('#eye-open').addEventListener('click', function () {
      document.querySelector('#eye-closed').style.display = 'inline'
      document.querySelector('#eye-open').style.display = 'none'
      labelBalance.textContent = '****'
    })

    document.querySelector('#eye-closed').addEventListener('click', function () {
      document.querySelector('#eye-open').style.display = 'inline'
      document.querySelector('#eye-closed').style.display = 'none'
        labelBalance.textContent = `$${currentAccount.balance}`;
    })
  }
  displayMonies(currentAccount.monies);
});

// create a function with the monies array

const displayMonies = function (monies) {
  // looping over the monies array
  monies.forEach(function (money, i) {
    const type = money > 0 ? 'Deposit' : 'Withdrawal';

    // create an html structure for the looped over array
    const html = `
         <div class="transaction-show">
            <div class="transaction-type-${type}">${i + 1}  ${type}</div>
            <div class="transaction-value">${money}$</div>
            </div>
            <hr>`;

    // adding the monies array into the DOM / html
    containerTransactions.insertAdjacentHTML('afterbegin', html);
  });
};

// implement the transfer
sendBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(amountInput.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === receiverInput.value
  );
  amountInput.value = receiverInput.value = '';
  amountInput.blur();
  receiverInput.blur();

  // check if the balance is greater than the amount to transfer
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // push a negative amount into the sender account to rep withdrawal and push a positive amount into the reciever money to rep deposit
    currentAccount.monies.push(-amount);
    receiverAcc.monies.push(amount);

    // update UI
    updateUI(currentAccount);
    displayMonies(currentAccount.monies);
  }
});
