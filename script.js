document.addEventListener('DOMContentLoaded', function() {
    const queryTypeSelect = document.getElementById('query-type');
    const descriptionContainer = document.getElementById('description-container');
    const form = document.getElementById('query-form');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const modalOkButton = document.getElementById('modalOkButton');
    const mediaInput = document.getElementById('media');

    queryTypeSelect.addEventListener('change', function() {
        if (queryTypeSelect.value !== 'select') {
            descriptionContainer.style.display = 'block';
            document.getElementById('description').required = true;
        } else {
            descriptionContainer.style.display = 'none';
            document.getElementById('description').required = false;
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const queryType = queryTypeSelect.value;
        if (queryType === 'select') {
            alert('Please select a query type.');
            return;
        }

        const description = document.getElementById('description').value;
        if (description.length > 500) {
            alert('Description cannot exceed 500 words.');
            return;
        }

        const mediaFile = mediaInput.files[0];
        if (mediaFile && mediaFile.size > 50 * 1024 * 1024) {
            alert('File size cannot exceed 50MB.');
            return;
        }

        const newQuery = {
            name: document.getElementById('name').value,
            department: document.getElementById('department').value,
            type: queryType,
            media: mediaFile ? 'View Media' : '',
            description: description
        };

        fetch('http://localhost:5000/queries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuery)
        })
        .then(response => response.json())
        .then(data => {
            modal.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalOkButton.addEventListener('click', function() {
        modal.style.display = 'none';
        location.reload();
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
