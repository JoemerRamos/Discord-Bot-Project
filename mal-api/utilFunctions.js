function createComponents(animeList) {
  buttons = [];

  for (let i = 0; i < 5; i++) {
    let button = { type: 2, label: `${animeList[i]}`, style: 1, custom_id: `searchResult_${animeList[i]}` };
    buttons.push(button);
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
