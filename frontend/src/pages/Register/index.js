import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Register() {
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
						No estoy registrado
					</Link>
				</section>
				<form>
					<input placeholder="Nombre de la Organización" />
					<input type="email" placeholder="E-mail" />
					<input placeholder="Whatsapp" />
					<div className="input-group">
						<input placeholder="Ciudad" />
						<input placeholder="Departamento" style={{ width: 180 }} />
					</div>
					<button className="button" type="submit">
						Registrar
					</button>
				</form>
			</div>
		</div>
	);
}
