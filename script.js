// Vaccine suggestions based on age
const vaccineData = {
    "0-2": ["Hepatitis B", "DTaP", "Hib", "IPV", "PCV", "RV", "MMR", "Varicella"],
    "3-18": ["DTaP", "IPV", "MMR", "HPV", "MenACWY", "Influenza"],
    "19-64": ["Tdap", "Influenza", "HPV", "Shingles", "Pneumococcal"],
    "65+": ["Influenza", "Pneumococcal", "Shingles", "Tdap"]
};

// Vaccines for animal bites
const animalVaccineData = {
    "dog": ["Rabies"],
    "cat": ["Rabies"],
    "other": ["Rabies"]
};

// Show age-wise vaccines
function showVaccines(ageGroup) {
    const vaccineList = document.getElementById('vaccineList');
    vaccineList.innerHTML = ""; // Clear previous content

    if (vaccineData[ageGroup]) {
        vaccineData[ageGroup].forEach(vaccine => {
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            card.innerHTML = `
                <h3><i class="fas fa-syringe"></i> ${vaccine}</h3>
                <p>Recommended for ages ${ageGroup}.</p>
            `;
            vaccineList.appendChild(card);
        });
    } else {
        vaccineList.innerHTML = "<p>No suggestions available for this age group.</p>";
    }
}

// Show vaccines for animal bites
function showAnimalVaccines(animalType) {
    const animalVaccineList = document.getElementById('animalVaccineList');
    animalVaccineList.innerHTML = ""; // Clear previous content

    if (animalVaccineData[animalType]) {
        animalVaccineData[animalType].forEach(vaccine => {
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            card.innerHTML = `
                <h3><i class="fas fa-syringe"></i> ${vaccine}</h3>
                <p>Recommended for ${animalType} bites.</p>
            `;
            animalVaccineList.appendChild(card);
        });
    } else {
        animalVaccineList.innerHTML = "<p>No suggestions available for this animal type.</p>";
    }
}

// Check if the user is logged in
window.onload = function() {
    const userName = localStorage.getItem("userName");
    if (userName) {
        document.getElementById("userNameDisplay").innerText = `Welcome, ${userName}!`;
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "inline";
    } else {
        document.getElementById("loginBtn").style.display = "inline";
        document.getElementById("logoutBtn").style.display = "none";
    }
};

function logout() {
    localStorage.removeItem("userName");
    window.location.reload(); // Reload the page to update the UI
}

// Toggle chat visibility
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.right = chatContainer.style.right === '0px' ? '-400px' : '0px'; // Toggle chat visibility
}

// Show vaccine information in chat
function showVaccineInfo() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = `
        <div>Please select a disease to learn about its vaccine:</div>
        <div id="optionsContainer">
            <button class="optionBtn" onclick="showVaccineForDisease('COVID-19')">COVID-19</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Measles')">Measles</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Polio')">Polio</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Hepatitis B')">Hepatitis B</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Influenza')">Influenza</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Chickenpox')">Chickenpox</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Mumps')">Mumps </button>
            <button class="optionBtn" onclick="showVaccineForDisease('Rubella')">Rubella</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Hepatitis A')">Hepatitis A</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Diphtheria')">Diphtheria</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Tetanus')">Tetanus</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Whooping Cough')">Whooping Cough</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Dog Bite')">Dog Bite (Rabies)</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Typhoid')">Typhoid</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Yellow Fever')">Yellow Fever</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Meningitis')">Meningitis</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Rotavirus')">Rotavirus</button>
        </div>
    `;
}

// Show vaccine information for a specific disease
function showVaccineForDisease(disease) {
    const chatBox = document.getElementById('chatBox');
    const vaccineInfo = {
        'COVID-19': 'The COVID-19 vaccine prevents severe illness caused by the coronavirus. It is available in different brands and requires 2 or more doses.',
        'Measles': 'Measles is a contagious viral disease that can be prevented by the MMR vaccine (Measles, Mumps, Rubella). It is given in two doses, usually at age 1 and 4.',
        'Polio': 'Polio is a viral disease that can cause paralysis. The polio vaccine is given as an oral or inactivated injectable vaccine, starting at 2 months of age.',
        'Hepatitis B': 'Hepatitis B is a viral infection that affects the liver. The Hepatitis B vaccine is usually given in 3 doses over a period of 6 months, starting at birth.',
        'Influenza': 'The flu vaccine is given annually to protect against seasonal flu. It is typically given to children from age 6 months onwards.',
        'Chickenpox': 'The chickenpox vaccine helps prevent chickenpox, a contagious disease. It is typically given in 2 doses, starting at age 1.',
        'Mumps': 'Mumps is a contagious disease that causes swollen salivary glands. The Mumps vaccine is part of the MMR vaccine and is given to children from age 1.',
        'Rubella': 'Rubella (German measles) can cause birth defects in pregnant women. The Rubella vaccine is part of the MMR vaccine and is given to children from age 1.',
        'Hepatitis A': 'The Hepatitis A vaccine prevents Hepatitis A, a viral liver disease. It is given in 2 doses, typically starting at age 1.',
        'Diphtheria': 'Diphtheria is a bacterial infection that affects the respiratory system. The Diphtheria vaccine is given as part of the DTaP vaccine series.',
        'Tetanus': 'Tetanus is a bacterial infection that causes muscle spasms. The Tetanus vaccine is given as part of the DTaP vaccine series.',
        'Whooping Cough': 'Whooping cough (Pertussis) is a contagious respiratory disease. The vaccine is given as part of the DTaP vaccine series.',
        'Dog Bite': 'Rabies is a fatal disease transmitted by animal bites. If bitten by an animal, you should seek immediate medical help and may need the rabies vaccine.',
        'Typhoid': 'Typhoid fever is a bacterial infection. The Typhoid vaccine is given in a single dose or as a series of doses depending on the type.',
        'Yellow Fever': 'Yellow Fever is a viral disease spread by mosquitoes. The Yellow Fever vaccine is given in a single dose.',
        'Meningitis': 'Meningitis is an infection of the brain and spinal cord. There are different vaccines depending on the type of bacteria or virus causing the infection.',
        'Rotavirus': 'Rotavirus causes severe diarrhea in young children. The Rotavirus vaccine is given orally, typically in 2 or 3 doses starting at 2 months of age.',
    };
        chatBox.innerHTML = `
        <div>${vaccineInfo[disease]}</div>
        <div id="optionsContainer">
            <button class="optionBtn" onclick="showVaccineInfo()">Know more about vaccines</button>
            <button class="optionBtn" onclick="callAgent()">Talk to an agent</button>
        </div>
    `;
}

// Function to call an agent
function callAgent() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = `
        <div>You will be connected to an agent shortly. Please wait...</div>
        <div id="optionsContainer">
            <button class="optionBtn" onclick="showVaccineInfo()">Know about vaccines</button>
            <button class="optionBtn" onclick="callAgent()">Call another agent</button>
        </div>
    `;
    setTimeout(() => {
        chatBox.innerHTML += '<div>An agent is now available. How can I assist you further?</div>';
    }, 2000);
}

// Function to toggle chat visibility
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.right = chatContainer.style.right === '0px' ? '-400px' : '0px'; // Toggle chat visibility
}

// Function to show vaccine information based on age group
function showVaccines(ageGroup) {
    const vaccineList = document.getElementById('vaccineList');
    vaccineList.innerHTML = ""; // Clear previous content

    if (vaccineData[ageGroup]) {
        vaccineData[ageGroup].forEach(vaccine => {
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            card.innerHTML = `
                <h3><i class="fas fa-syringe"></i> ${vaccine}</h3>
                <p>Recommended for ages ${ageGroup}.</p>
            `;
            vaccineList.appendChild(card);
        });
    } else {
        vaccineList.innerHTML = "<p>No suggestions available for this age group.</p>";
    }
}

// Function to show vaccines for animal bites
function showAnimalVaccines(animalType) {
    const animalVaccineList = document.getElementById('animalVaccineList');
    animalVaccineList.innerHTML = ""; // Clear previous content

    if (animalVaccineData[animalType]) {
        animalVaccineData[animalType].forEach(vaccine => {
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            card.innerHTML = `
                <h3><i class="fas fa-syringe"></i> ${vaccine}</h3>
                <p>Recommended for ${animalType} bites.</p>
            `;
            animalVaccineList.appendChild(card);
        });
    } else {
        animalVaccineList.innerHTML = "<p>No suggestions available for this animal type.</p>";
    }
}

// Check if the user is logged in
window.onload = function() {
    const userName = localStorage.getItem("userName");
    if (userName) {
        document.getElementById("userNameDisplay").innerText = `Welcome, ${userName}!`;
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "inline";
    } else {
        document.getElementById("loginBtn").style.display = "inline";
        document.getElementById("logoutBtn").style.display = "none";
    }
};

function logout() {
    localStorage.removeItem("userName");
    window.location.reload(); // Reload the page to update the UI
}
