function createComponents(animeList) {
  buttons = [];

  for (let i = 0; i < 5; i++) {
    let obj = { type: 2, label: `Click me ${i + 1}!`, style: 1, custom_id: `${animeList[i]}` };
    buttons.push(obj);
  }

  components = [
    {
      type: 1,
      components: buttons,
    },
  ];
  return components;
}

module.exports = createComponents;
