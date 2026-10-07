document.documentElement.classList.add('js');
const search = document.querySelector('[data-search]');
const filter = document.querySelector('[data-filter]');
if (search) {
  const items = [...document.querySelectorAll('[data-item]')];
  const count = document.querySelector('[data-count]');
  const empty = document.querySelector('[data-empty]');
  const normalize = text => text.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
  function update() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const item of items) {
      const match = words.every(word => normalize(item.textContent).includes(word)) && (!filter?.value || item.dataset.topic === filter.value);
      item.hidden = !match;
      if (match) shown++;
    }
    if (count) count.textContent = `Показано ${shown} из ${items.length}`;
    if (empty) empty.hidden = shown !== 0;
  }
  search.addEventListener('input', update);
  filter?.addEventListener('change', update);
  update();
}
