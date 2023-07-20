const cart = document.querySelector('.section1 .shopping-list');
const obtainBtn = document.querySelector('.btn-obtain');
const obtainedList = document.querySelector('.obtained-list');
const total = document.querySelector('.total');
const depositBtn = document.querySelector('.inputBtn');
const inputDeposit = document.querySelector('#input-money');

const balance = document.querySelector('.balance-money');
const myMoney = document.querySelector('.money-in-hand');
const changeBtn = document.querySelector('.changeBtn');
let items;

const initializeItems = () => {
  items = document.querySelectorAll('.character-list button');
};

const plusCount = (target) => {
  const beforeCount = target.querySelector('strong').firstChild.textContent;
  const resultCount = parseInt(beforeCount) + 1;

  target.querySelector('strong').firstChild.textContent = resultCount;
};

const createCartItem = (data) => {
  const li = document.createElement('li');
  li.dataset.name = data.name;
  li.dataset.price = data.price;
  li.classList.add('cart-character');
  li.innerHTML = `
    <img src="../img/${data.img}" alt=""/>
    <span class="obtained-character">${data.name}</span>
    <strong class="count">1<span class="a11y-hidden">개</span></strong>
    `;
  cart.appendChild(li);
};

const minusCount = (target) => {
  target.dataset.count = parseInt(target.dataset.count) - 1;
};

const productSoldOut = (target) => {
  if (target.dataset.count === '0') {
    target.disabled = true;
    target.innerHTML += `
      <strong class='soldout'>
        <span>SOLD<br>OUT</span>
      </strong>
    `;
  }
};
const handleItem = (e) => {
  const target = e.currentTarget;
  const data = target.dataset;
  const cartItems = cart.children;

  const cartTotal = getCartTotal();
  const total = cartTotal + parseInt(e.currentTarget.dataset.price);
  const balanceVal = parseInt(balance.textContent.replace(/[^0-9]/g, ''));

  // 잔액 부족 예외 처리
  if (total > balanceVal) {
    alert('잔액이 부족합니다.');
    return;
  }
  let targetCartEl;

  for (const item of cartItems) {
    if (item.dataset.name === data.name) {
      targetCartEl = item;
      break;
    }
  }

  if (targetCartEl) {
    // 장바구니에 그 상품이 있으면 수량만 증가
    plusCount(targetCartEl);
  } else {
    // 장바구니에 그 상품이 없을 시 요소 생성
    createCartItem(data);
  }

  // 장바구니에 상품 선택 시 재고 감소
  minusCount(target);

  // 재고 소진 시 표시
  productSoldOut(target);
};

// 숫자 형식 변경
const formatNum = (num) => {
  return new Intl.NumberFormat().format(num);
};

const getCartTotal = () => {
  const cartItems = cart.children;
  let totalPrice = 0;
  [...cartItems].forEach((item) => {
    const quantity = parseInt(item.querySelector('strong').textContent);
    totalPrice += item.dataset.price * quantity;
  });
  return totalPrice;
};

const handleItemsObtain = () => {
  const cartItems = cart.children;
  const cartTotal = getCartTotal();
  const obtainedItemsName = [...obtainedList.children].map(
    (item) => item.dataset.name
  );

  // 총금액 변경
  const currTotal = parseInt(total.textContent.replace(/[^0-9]/g, ''), 10);
  const totalVal = formatNum(currTotal + cartTotal);
  total.textContent = `총금액: ${totalVal}원`;

  // 잔액 변경
  const currBalanceVal = parseInt(balance.textContent.replace(/[^0-9]/g, ''));
  const balanceVal = formatNum(currBalanceVal - cartTotal);
  balance.textContent = `${balanceVal}원`;
  [...cartItems].forEach((item) => {
    // 획득한 캐릭터에 있다면 상품 수량 증가
    if (obtainedItemsName.includes(item.dataset.name)) {
      const target = obtainedList.querySelector(
        `[data-name="${item.dataset.name}"] strong`
      );

      target.textContent =
        parseInt(item.querySelector('strong').textContent) +
        parseInt(target.textContent);
    } else {
      // 획득한 캐릭터가 기존에 없었다면 요소 생성
      const clone = item.cloneNode(true);
      obtainedList.appendChild(clone);
    }
  });
  cart.innerHTML = '';
};

const handleDeposit = () => {
  const depositVal = parseInt(inputDeposit.value);
  const reg = new RegExp(/[^0-9]/, 'g');
  if (reg.test(depositVal)) {
    alert('숫자만 입력 가능합니다.');
    inputDeposit.value = '';
    return;
  }
  const currMyMoneyVal = parseInt(myMoney.textContent.replace(/[^0-9]/g, ''));
  if (currMyMoneyVal < depositVal) {
    alert('소지금이 부족합니다.');
    return;
  }

  // 잔액 업데이트
  const currBalanceVal = parseInt(balance.textContent.replace(/[^0-9]/g, ''));
  const balanceVal = formatNum(currBalanceVal + depositVal);
  balance.textContent = `${balanceVal}원`;

  // 입금액 초기화
  inputDeposit.value = '';

  // 소지금 업데이트
  const myMoneyVal = formatNum(currMyMoneyVal - depositVal);
  myMoney.textContent = `${myMoneyVal}원`;
};

const handleChangeObtain = () => {
  const currMyMoneyVal = parseInt(myMoney.textContent.replace(/[^0-9]/g, ''));
  const currBalanceVal = parseInt(balance.textContent.replace(/[^0-9]/g, ''));
  myMoney.textContent = `${formatNum(currMyMoneyVal + currBalanceVal)}원`;
  balance.textContent = '0원';
};

const bundleOfEvents = () => {
  initializeItems();

  items.forEach((item) => {
    item.addEventListener('click', handleItem);
  });
  obtainBtn.addEventListener('click', handleItemsObtain);
  depositBtn.addEventListener('click', handleDeposit);
  changeBtn.addEventListener('click', handleChangeObtain);
};

export default bundleOfEvents;
