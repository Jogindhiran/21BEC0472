document.getElementById('submitBtn').addEventListener('click', async function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const responseContainer = document.getElementById('responseContainer');
    const responseOutput = document.getElementById('responseOutput');

    errorElement.textContent = '';

    try {
        const parsedJson = JSON.parse(jsonInput);
        dropdownContainer.style.display = 'block';

        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedJson),
        });

        const data = await response.json();
        document.getElementById('optionsDropdown').addEventListener('change', function() {
            const selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
            let filteredResponse = {};

            if (selectedOptions.includes('alphabets')) {
                filteredResponse.alphabets = data.alphabets;
            }
            if (selectedOptions.includes('numbers')) {
                filteredResponse.numbers = data.numbers;
            }
            if (selectedOptions.includes('highestLowercase')) {
                filteredResponse.highestLowercase = data.highestLowercase;
            }

            responseOutput.textContent = JSON.stringify(filteredResponse, null, 2);
            responseContainer.style.display = 'block';
        });

    } catch (err) {
        errorElement.textContent = 'Invalid JSON format';
        dropdownContainer.style.display = 'none';
        responseContainer.style.display = 'none';
    }
});
