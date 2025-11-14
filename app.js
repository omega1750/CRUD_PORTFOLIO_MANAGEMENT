const apiUrl = 'http://localhost:3000/api/portfolio';
 // match backend port

const form = document.getElementById('portfolioForm');
const tableBody = document.querySelector('#portfolioTable tbody');
const idField = document.getElementById('portfolioId');

// helper function to fetch safely
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Fetch error for', url, err);
    alert('Error connecting to server.');
    throw err;
  }
}

// Fetch all portfolio records
async function fetchPortfolio() {
  const data = await safeFetch(apiUrl);
  tableBody.innerHTML = data.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.owner_name}</td>
      <td>${p.project_title || ''}</td>
      <td>${p.status || ''}</td>
      <td>${p.started_date || ''}</td>
      <td>${p.completed_date || ''}</td>
      <td>
        <button onclick="editPortfolio(${p.id})">Edit</button>
        <button onclick="deletePortfolio(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Form submit (create/update)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const record = {
    owner_name: form.owner_name.value.trim(),
    project_title: form.project_title.value.trim(),
    description: form.description.value.trim(),
    status: form.status.value.trim(),
    started_date: form.started_date.value || null,
    completed_date: form.completed_date.value || null
  };

  const isEditing = Boolean(idField.value);
  const url = isEditing ? `${apiUrl}/${idField.value}` : apiUrl;
  const method = isEditing ? 'PUT' : 'POST';

  await safeFetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  });

  form.reset();
  idField.value = '';
  fetchPortfolio();
});

// Edit record
async function editPortfolio(id) {
  const p = await safeFetch(`${apiUrl}/${id}`);
  idField.value = p.id;
  form.owner_name.value = p.owner_name;
  form.project_title.value = p.project_title;
  form.description.value = p.description;
  form.status.value = p.status;
  form.started_date.value = p.started_date || '';
  form.completed_date.value = p.completed_date || '';
}

// Delete record
async function deletePortfolio(id) {
  if (!confirm('Confirm delete?')) return;
  await safeFetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchPortfolio();
}

// Initial fetch
fetchPortfolio();
