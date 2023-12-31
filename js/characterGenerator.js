const itemList = document.querySelector('.character-list');

// 데이터 불러오기
const getData = async () => {
  try {
    const response = await fetch('./items.json');
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
};

// 숫자 형식 변경
const formatNum = (num) => {
  return new Intl.NumberFormat().format(num);
};

// 상품 아이템 생성
const characterCollection = (data) => {
  let itemsEl = '';
  data.forEach((el) => {
    // 가격을 숫자에서 문자열로 변환하여 쉼표 추가
    const formattedPrice = formatNum(el.price);
    itemsEl += `<li>
    <button class="btn-character" type="button" data-name="${el.name}" data-price="${el.price}" data-img="${el.img}" data-count="${el.count}">
      <img class="character-img" src="../img/${el.img}" alt="">
      <span class="character-name">${el.name}</span>
      <strong class="character-price">${formattedPrice}원</strong>
    </button>
  </li>`;
  });

  itemList.innerHTML = itemsEl;
};

const setup = async () => {
  const data = await getData();
  characterCollection(data);
};
export default setup;
