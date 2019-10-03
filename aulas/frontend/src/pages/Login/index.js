import React, { useState } from 'react';

import api from '../../services/api';

//o componente eh criado em forma de funcao
export default function Login() {

  //state eh utilizado para guardar qq tipo de info do componente
  const [email, setEmail] = useState('');


  //declacao da funcao que vai ser usada pelo botao entrar
  //para atribuir a funcao no evento onSubmit deve-se colocar
  //chaves mais o nome da funcao, pq eh a utilizacao do javascript no html

  async function handleSubmint(event) {
    //desabilita o comportamento padrao
    event.preventDefault();

    const response = await api.post('/sessions', { email });
    const { _id } = response.data;

    localStorage.setItem('user', _id);

  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>
      <form onSubmit={handleSubmint}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="text"
          id="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)} />
        <button className="btn" type="submit">Entrar</button>

      </form>
    </>
  )
}
