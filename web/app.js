const API_BASE = 'https://tudominio.com/api';
let token = localStorage.getItem('token');

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        alert('Login exitoso');
        window.location.href = 'index.html';
    } else {
        alert('Error de login');
    }
}

async function loadStrings() {
    const res = await fetch(`${API_BASE}/data/list`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const list = await res.json();
    const ul = document.getElementById('stringList');
    ul.innerHTML = '';
    list.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

async function uploadFile() {
    const file = document.getElementById('fileInput').files[0];
    if (!file) return alert('Selecciona un archivo');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/files/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    });

    if (res.ok) {
        alert('Archivo subido');
    } else {
        alert('Error al subir archivo');
    }
}

async function updateData() {
    const newData = document.getElementById('dataInput').value;

    const res = await fetch(`${API_BASE}/data/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ newData }),
    });

    if (res.ok) {
        alert('Datos actualizados');
    } else {
        alert('Error al actualizar');
    }
}
