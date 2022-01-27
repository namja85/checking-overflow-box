function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientHeight;
}

const box = document.querySelector('.box');
const add = document.querySelector('.add');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

const randomHeightBoxCount = 40;
const randomHeightBoxes = Array.from({ length: randomHeightBoxCount }, (_, index) => index);
const moveLeft = 250 * 3 + 4 * 2 + 4; // inner width(250px) * 3columns + gap(4px) * 2 + padding of one side(4px);

randomHeightBoxes.forEach(elem => {
  const inner = document.createElement('div');
  inner.setAttribute('class', 'inner');
  inner.style.height = `${100 + 20 * Math.floor(Math.random() * 3)}px`;
  inner.textContent = elem;
  box.appendChild(inner);
});

add.addEventListener('click', () => {
  const inner = document.createElement('div');
  inner.setAttribute('class', 'inner');
  box.appendChild(inner);
  // console.log(box);
  console.dir(box);
  console.log(isOverflown(box));
});

left.addEventListener('click', () => {
  const { scrollLeft } = box;
  if (scrollLeft !== 0) {
    box.scrollLeft = scrollLeft > moveLeft ? scrollLeft - moveLeft : 0;
  }
  showButtons();
});

right.addEventListener('click', () => {
  const { scrollLeft, scrollWidth } = box;
  if (scrollLeft !== scrollWidth) {
    box.scrollLeft = scrollWidth - scrollLeft > moveLeft ? scrollLeft + moveLeft : scrollWidth;
  }
  showButtons();
});

console.log(isOverflown(box));

function showButtons() {
  if (isOverflown(box)) {
    const leftClasses = new Set(left.className.split(" "));
    const rightClasses = new Set(right.className.split(" "));
    
    box.scrollLeft === 0 ? leftClasses.add('hide') : leftClasses.delete('hide');
    (box.scrollLeft + box.clientWidth) === box.scrollWidth ? rightClasses.add('hide') : rightClasses.delete('hide');

    left.className = [...leftClasses].join(" ");
    right.className = [...rightClasses].join(" ");
  }
}

showButtons();