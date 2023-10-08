let pokemonName = document.querySelector('.pokemon__name')
let pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImg = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
const shiny = document.querySelector('.btn-shiny')

let searchPokemon = 1
const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(apiResponse.status == 200){
        const data = await apiResponse.json()
        return data
    }else if (apiResponse.status == 404){
        pokemonImg.style.display = 'none'
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''
        input.value = ''
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data.id <= 649){
        if(data) {
            pokemonImg.style.display = 'block'
            pokemonName.innerHTML = data['name']
            pokemonNumber.innerHTML = data['id']
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            input.value = ''
            searchPokemon = data.id
        } else {
            pokemonImg.style.display = 'none'
            pokemonName.innerHTML = 'Not Found'
            pokemonNumber.innerHTML = ''
            input.value = ''
        }
    }else if(data.id > 649) {
        pokemonImg.style.display = 'block'
        pokemonName.innerHTML = data['name']
        pokemonNumber.innerHTML = data['id']
        pokemonImg.src = data['sprites']['front_default']
        input.value = ''
        searchPokemon = data.id
    }else {
        pokemonImg.style.display = 'none'
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''
        input.value = ''
    }
}

const renderShinyPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon)

    if(data.id <= 649){
        if(shiny.classList.value == 'btn-shiny selecionado'){
            shiny.classList.remove('selecionado')
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        } else if (shiny.classList.value !== 'btn-shiny selecionado') {
            shiny.classList.add('selecionado')
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
        }
    }else {
        if(shiny.classList.value == 'btn-shiny selecionado'){
            shiny.classList.remove('selecionado')
            pokemonImg.src = data['sprites']['front_default']
        } else if (shiny.classList.value !== 'btn-shiny selecionado') {
            shiny.classList.add('selecionado')
            pokemonImg.src = data['sprites']['front_shiny']
        }
    }
  
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--
        shiny.classList.remove('selecionado')
        renderPokemon(searchPokemon)
    }
})

next.addEventListener('click', () => {
    searchPokemon++
    shiny.classList.remove('selecionado')
    renderPokemon(searchPokemon)
})

shiny.addEventListener('click', () => {
    renderShinyPokemon(searchPokemon)
})

renderPokemon(searchPokemon)