const grid = document.querySelector('.grid');

const pokemons= [
    'pikachu',
    'charmander',
    'cubone',
    'gengar',
    'snorlax',
    'mewtwo',
    'jigglypuff',
    'psyduck',
]
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const createCards = (pokemons) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('assets/pokemons/${pokemons}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    return card;
}

const loadGame = () => {

    const duplicatePokemons = [...pokemons, ...pokemons];

    duplicatePokemons.forEach((pokemons)=> {
        
        const card = createCards(pokemons);
        grid.appendChild(card);

    });
}

loadGame();