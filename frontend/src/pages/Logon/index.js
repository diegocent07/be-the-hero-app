import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
	const [ id, setid ] = useState('');

	const history = useHistory();

	async function handleLogin(e) {
		e.preventDefault();

		try {
			const response = await api.post('sessions', { id });

			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', response.data.name);

			history.push('/profile');
		} catch (err) {
			alert('ID incorrecto o no existe!');
		}
	}

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Logo" />

				<form onSubmit={handleLogin}>
					<h1>Iniciar Sesión</h1>
					<input placeholder=" Ingrese ID" value={id} onChange={(e) => setid(e.target.value)} />
					<button className="button" type="submit">
						Entrar
					</button>

					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#E02041" />
						No estoy registrado
					</Link>
				</form>
			</section>

			<img src={heroesImg} alt="Heroes" />
		</div>
	);
}
