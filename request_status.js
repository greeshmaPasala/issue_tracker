document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('query-table');
    let queryData = [];  

    function populateTable(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item._id}</td>
                <td>${item.date}</td>
                <td>${item.name}</td>
                <td>${item.department}</td>
                <td>${item.type}</td>
                <td>${item.media}</td>
                <td>${item.description}</td>
                <td>${item.status}</td>
                <td><button class="action-btn ${item.status === 'open' ? 'resolve-btn' : 'reopen-btn'}">${item.status === 'open' ? 'Resolve' : 'Reopen'}</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetch('http://localhost:5000/queries')
        .then(response => response.json())
        .then(data => {
            queryData = data.queries; 
            populateTable(queryData);  
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('sort-order').addEventListener('change', function() {
        const sortedData = queryData.sort((a, b) => {
            return this.value === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
        });
        populateTable(sortedData);
    });

    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredData = queryData.filter(item => {
            return item.name.toLowerCase().includes(searchTerm) ||
                   item.department.toLowerCase().includes(searchTerm) ||
                   item.type.toLowerCase().includes(searchTerm);
        });
        populateTable(filteredData);
    });

    document.getElementById('logout').addEventListener('click', function() {
        alert('Logout successful');
        window.location.href = 'index.html';
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('resolve-btn')) {
            event.target.textContent = 'Reopen';
            event.target.classList.remove('resolve-btn');
            event.target.classList.add('reopen-btn');
        } else if (event.target.classList.contains('reopen-btn')) {
            event.target.textContent = 'Resolve';
            event.target.classList.remove('reopen-btn');
            event.target.classList.add('resolve-btn');
        }
    });
});
