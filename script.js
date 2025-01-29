const apiKey = 'AIzaSyB8XYKsy07fdgs38wqDhFp14kLsLb8PXo0'; 

// Function to fetch vaccine data based on age group
async function fetchVaccines(ageGroup) {
    try {
        const response = await fetch(`https://api.gemini.com/vaccine/age-group/${ageGroup}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`  // API key in Authorization header
            }
        });
        const data = await response.json();
        return data; // Assuming the API responds with the required data
    } catch (error) {
        console.error('Error fetching vaccine data:', error);
        return null; // If there's an error, return null
    }
}

// Function to display vaccines for age group
async function showVaccines(ageGroup) {
    const vaccineListElement = document.getElementById('vaccineList');
    vaccineListElement.innerHTML = ''; // Clear previous results

    const vaccines = await fetchVaccines(ageGroup);

    if (vaccines && vaccines.length > 0) {
        vaccines.forEach(vaccine => {
            const vaccineCard = document.createElement('div');
            vaccineCard.classList.add('vaccine-card');
            vaccineCard.innerHTML = `
                <h3>${vaccine.name}</h3>
                <p>${vaccine.description}</p>
            `;
            vaccineListElement.appendChild(vaccineCard);
        });
    } else {
        vaccineListElement.innerHTML = '<p>No vaccines available for this age group.</p>';
    }
}

// Function to fetch vaccine data for animal bites
async function fetchAnimalVaccines(animalType) {
    try {
        const response = await fetch(`https://api.gemini.com/vaccine/animal/${animalType}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`  // API key in Authorization header
            }
        });
        const data = await response.json();
        return data; // Assuming the API responds with the required data
    } catch (error) {
        console.error('Error fetching animal vaccine data:', error);
        return null; // If there's an error, return null
    }
}

// Function to display vaccines for animal bites
async function showAnimalVaccines(animalType) {
    const animalVaccineListElement = document.getElementById('animalVaccineList');
    animalVaccineListElement.innerHTML = ''; // Clear previous results

    const vaccines = await fetchAnimalVaccines(animalType);

    if (vaccines && vaccines.length > 0) {
        vaccines.forEach(vaccine => {
            const vaccineCard = document.createElement('div');
            vaccineCard.classList.add('vaccine-card');
            vaccineCard.innerHTML = `
                <h3>${vaccine.name}</h3>
                <p>${vaccine.description}</p>
            `;
            animalVaccineListElement.appendChild(vaccineCard);
        });
    } else {
        animalVaccineListElement.innerHTML = '<p>No vaccines available for this animal bite type.</p>';
    }
}
