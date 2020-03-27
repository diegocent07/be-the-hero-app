import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function Register() {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ whatsapp, setWhatsapp ] = useState('');
	const [ city, setCity ] = useState('');
	const [ uf, setUf ] = useState('');

	const history = useHistory();

	async function handleRegister(e) {
		e.preventDefault();

		const data = {
			name,
			email,
			whatsapp,
			city,
			uf
		};

		try {
			const response = await api.post('ongs', data);

			alert(`ID de acceso: ${response.data.id}`);
			history.push('/');
		} catch (err) {
			alert('Error al registrar, intente nuevamente.');
		}
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Logo" />

					<h1>Regístrate</h1>
					<p>
						Regístrate, accesa a la plataforma y ayuda a personas/organizaciones a que encuentren y
						publiquen casos de ayuda.
					</p>

					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						Volver
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input
						placeholder="Nombre de la Organización"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input placeholder="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
					<div className="input-group">
						<input placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
						<input
							placeholder="Departamento"
							style={{ width: 180 }}
							value={uf}
							onChange={(e) => setUf(e.target.value)}
						/>
					</div>
					<button className="button" type="submit">
						Registrar
					</button>
				</form>
			</div>
		</div>
	);
}
