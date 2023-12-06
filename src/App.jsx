import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState({})
  const[busca, setBusca]= useState('')

//karol

  const getPokemons = (id) => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(response => {

        const pokemon = response.data
        setPokemons(prevPokemons => ({ ... prevPokemons, [id]: pokemon }))
      })
  }

//Nicoly

  const arrayPokemons = () =>Array(200).fill().map((_, index) => getPokemons(index + 1))

   const buscarPokemons = Object.values(pokemons).filter(
    (pokemon) => pokemon.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase()) ||
    pokemon.id === parseInt(busca)
 )

  useEffect(() => {arrayPokemons();
  }, [])
//Ph

  return (
    <div className='container'>
      <h1>Pokedex</h1>

      <div className='busca-container'> 
        <input className="busca"
         type="search" 
         placeholder='pesquisar pokemons'
         value={busca}
         onChange={({target})=> setBusca(target.value)}
         />
      </div>
//caio
 
      <ul className='pokemons'>
        {buscarPokemons.map(item =>

            <li className='card'>
              <img  className='card-image' src={item.sprites.front_default} alt="name" />
              <h3>{item.id}. {item.name}</h3>
              <p className='type'>{item.types.map((item) => item.type.name).join("||")}</p>
            </li>
            )
        }
      </ul>
    </div>
//  Matheus
  )
}
export default App