const connection = require('../database/connection');

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query;

		const [ count ] = await connection('incidents').count();

		const incidents = await connection('incidents')
			.join('ongs', 'ongs.id', '=', 'incidents.ong_id')
			.limit(5)
			.offset((page - 1) * 5)
			.select([ 'incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf' ]);
		// console.log(count);

		response.header('X-Total-Count', count['count(*)']);

		return response.json(incidents);
	},

	async create(request, response) {
		const {
			title,
			description,
			value
		} = request.body; /* el id se crea automaticamente con increment, 
        en el header se guarda el id que está loggeado, por eso se pone en el header y no en el body*/
		const ong_id = request.headers.authorization;

		const [ id ] = await connection('incidents').insert({
			title,
			description,
			value,
			ong_id
		});
		return response.json({ id });
	},

	async delete(request, response) {
		const { id } = request.params;
		const ong_id = request.headers.authorization;

		const incident = await connection('incidents').where('id', id).select('ong_id').first();
		/* verificar si el id seleccionado de la base de datos es diferente al del header*/
		if (incident.ong_id != ong_id) {
			return response.status(401).json({ error: 'Operation not permitted!' });
		}

		await connection('incidents').where('id', id).delete();

		return response.status(204).send();
	}
};
