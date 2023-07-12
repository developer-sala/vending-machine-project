const cart = document.querySelector('.section1 .shopping-list');
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

const bundleOfEvents = () => {
  initializeItems();
  console.log(items);
  items.forEach((item) => {
    item.addEventListener('click', handleItem);
  });
};

export default bundleOfEvents;
