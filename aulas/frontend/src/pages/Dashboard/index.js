import React, { useEffect, useState, useMemo } from 'react'
//componente Link serve para ligar as rotas
import {Link} from 'react-router-dom';
import api from '../../services/api'
import socketio from 'socket.io-client'

import './styles.css';
//o componente eh criado em forma de funcao
export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  //para que a conexao do socket n seja criada toda vez que o componente
  //eh renderizado temos que usar o useMemo para 'memorizar' o estado de uma variavel
  //e associar a dependencia a variavel do usuario, qdo ela mudar entao o socket muda tb
  //envia o id do usuario pelos parametros do socket
  const socket = useMemo(()=> socketio('http://192.168.1.5:3333',{
    query:{user_id}
  }),[user_id]);

  useEffect(()=>{
    socket.on('booking_request',data=>{
      //console.log(data);
      setRequests([...requests,data]);
    })
    //funcao para desconectar o socket qdo o componente for desmontado
    return ()=>{
      socket.close();
    }

  },[requests,socket])

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

  async function handleAccept(id){
    await api.post(`/bookings/${id}/approvals`);
    //atualiza a lista de bookins removendo o que foi aprovado
    setRequests(requests.filter(request=>request._id !== id));
  }
  async function handleReject(id){
    await api.post(`/bookings/${id}/rejections`);
    //atualiza a lista de bookins removendo o que foi rejeitado
    setRequests(requests.filter(request=>request._id !== id));
  }
  //elemento sem 'tipo' eh um fragment <></>
  //no react aol fazer uma iteracao em um loop eh necessario informar o key
  //onde deve ser um valor unico na lista
  return (
    <>
      <ul className="notifications">
      {requests.map(request=>(
        <li key={request._id}>
          <p>
            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
          </p>
          <button className="accept" onClick={()=>handleAccept(request._id)}>ACEITAR</button>
          <button className="reject" onClick={()=>handleReject(request._id)}>REJEITAR</button>

        </li>
      ))}
      </ul>
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
