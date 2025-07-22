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
    'bulbasaur',
    'squirtle',
]
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard= ''; 
let secondCard= '';


let points = 0;
function sumPoints(){
    points +=1;
    document.getElementById('point').textContent= points;
    
}

let segundos = 0;
let time;
function startTime(){
    time = setInterval(() => {
        segundos++;
        document.getElementById('timer').textContent= `${segundos}s`;
    },1000);
}

const playButton = document.getElementById('play-button');

function resetGame(){
    firstCard='';
    secondCard='';
    points= 0;
    segundos= 0;

    document.getElementById('point').textContent= '0';
    document.getElementById('timer').textContent= '0s';

    grid.innerHTML = '';

    document.getElementById('play-button').style.display = 'block';
}

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 20){
        clearInterval(timer);
        alert(`Parabéns, você acertou todas as cartas em ${segundos} segundos!`)
        resetGame();
    }
}

const checkCards = () => {
    const firstPokemon = firstCard.getAttribute('data-pokemons');
    const secondPokemon = secondCard.getAttribute('data-pokemons');

    if (firstPokemon === secondPokemon){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard= '';
        secondCard= '';

        sumPoints();
        checkEndGame();

    } else {

        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard= '';
            secondCard= '';

        }, 700);
    }

}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if(secondCard === ''){

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    target.parentNode.classList.add('reveal-card')
}

const createCards = (pokemons) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('assets/pokemons/${pokemons}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-pokemons', pokemons)

    return card;
}

const loadGame = () => {

    const duplicatePokemons = [...pokemons, ...pokemons];

    const embaralhar = duplicatePokemons.sort( () => Math.random() - 0.5 );

    embaralhar.forEach((pokemons)=> {
        const card = createCards(pokemons);
        grid.appendChild(card);

    });

}

playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    startTime();
    loadGame(); 
});