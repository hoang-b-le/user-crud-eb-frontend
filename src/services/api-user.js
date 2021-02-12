export const registerUser = user => {
	return fetch('/api/users/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const findUserProfile = (params, credentials) => {
	return fetch('/api/users/' + params.userId, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + credentials.t
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
};

export const retrieveAllUsers = (params, credentials) => {
	return fetch('/api/users/', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + credentials.t
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
};


export const deleteUser = (params, credentials) => {
	return fetch('/api/users/' + params.userId, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + credentials.t
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
};

export const updateUser = (params, credentials) => {
	return fetch('/api/users/' + params.userId, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + credentials.t
		},
		body: JSON.stringify(params.user)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
};
