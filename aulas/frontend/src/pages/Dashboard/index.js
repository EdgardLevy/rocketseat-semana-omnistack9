import React, { useEffect, useState } from 'react';
import api from '../../services/api'
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
  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header />
            <strong>{spot.company}</strong>
            <span>{spot.price}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
