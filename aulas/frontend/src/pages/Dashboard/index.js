import React, { useEffect, useState } from 'react'
//componente Link serve para ligar as rotas
import {Link} from 'react-router-dom';
import api from '../../services/api'

import './styles.css';
//o componente eh criado em forma de funcao
export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  //ao passar as dependencias com useEffect como array varzio, o metodo vai executar apenas uma vez
  //nao eh possivel utilizar o primeiro parametro do useEffect, que eh uma funcao, como asyncrona
  //entao para usar uma basta declarar dentro dela
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      //passa o user id dentro do header
      const response = await api.get('/dashboard', { headers: { user_id } });
      setSpots(response.data);
    }
    loadSpots()
  }, [])
  //elemento sem 'tipo' eh um fragment <></>
  //no react aol fazer uma iteracao em um loop eh necessario informar o key
  //onde deve ser um valor unico na lista
  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{backgroundImage : `url(${spot.thumbnail_url})`}}/>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia`:'Gratuito'}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">
        Cadastrar novo spot
        </button>
        </Link>
    </>
  )
}
