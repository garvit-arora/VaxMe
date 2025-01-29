<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VAXIFY</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navbar -->
    <nav>
        <a href='/'><i class="fas fa-home"></i> Home</a>
        <a href='/centers'><i class="fas fa-map-marker-alt"></i> Vaccination Centers</a>
        <a href='/contact'><i class="fas fa-phone"></i> Contact Us</a>
        <div class="auth-buttons">
            <span id="userNameDisplay"></span>
            <a class='btn' href='/login' id='loginBtn'>Login</a>
            <a href="#" id="logoutBtn" class="btn" style="display: none;" onclick="logout()">Logout</a>
        </div>
    </nav>

    <!-- Header -->
    <header>
        <h1>Vaccination Appointment Scheduler</h1>
        <p>Health in a Click! Never Miss a Dose!</p>
    </header>

    <!-- Main Content -->
    <main>
        <button id="agentButton" onclick="toggleChat()">💬</button>

        <div id="chatContainer">
            <div id="header">Vaccine Help Bot</div>
            <div id="chatBox">
                <div>Welcome! How can I assist you with vaccine-related queries?</div>
                <div id="optionsContainer">
                    <button class="optionBtn" onclick="showVaccineInfo()">Know about vaccines</button>
                    <button class="optionBtn" onclick="callAgent()">Call an agent</button>
                </div>
            </div>
            <div id="footer">
                <span>Vaccine Bot</span>
            </div>
        </div>

        <!-- Age-wise Vaccine Suggestions -->
        <section>
            <h2>Age-wise Vaccine Suggestions</h2>
            <div class="dropdown">
                <button class="dropbtn">Select Age Group <i class="fas fa-chevron-down"></i></button>
                <div class="dropdown-content">
                    <a href="#" onclick="showVaccines('0-2')">0-2 Years</a>
                    <a href="#" onclick="showVaccines('3-18')">3-18 Years</a>
                    <a href="#" onclick="showVaccines('19-64')">19-64 Years</a>
                    <a href="#" onclick="showVaccines('65+')">65+ Years</a>
                </div>
            </div>
            <div id="vaccineList" class="vaccine-list"></div>
        </section>

        <!-- Vaccines for Animal Bites -->
        <section>
            <h2>Vaccines for Animal Bites</h2>
            <div class="dropdown">
                <button class="dropbtn">Select Animal <i class="fas fa-chevron-down"></i></button>
                <div class="dropdown-content">
                    <a href="#" onclick="showAnimalVaccines('dog')">Dog Bite</a>
                    <a href="#" onclick="showAnimalVaccines('cat')">Cat Bite</a>
                    <a href="#" onclick="showAnimalVaccines('other')">Other Animal Bites</a>
                </div>
            </div>
            <div id="animalVaccineList" class="vaccine-list"></div>
        </section>

        <!-- Appointment Section -->
        <section>
            <h2>Book an Appointment!</h2>
            <div class="appointment-box">
                <h3>Remind Me!</h3>
                <form class="appointment-form" id="appointmentForm">
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="date">Preferred Date:</label>
                    <input type="date" id="date" name="date" required>

                    <div id="syncSection">
                        <a
                            href="https://www.google.com/calendar/render?action=TEMPLATE&text=Vaccination%20Appointment&details=Name%3A%20%5BYour%20Name%5D%0AVaccine%3A%20%5BVaccine%20Name%5D&location=Vaccination%20Center&dates=20231010T090000Z%2F20231010T100000Z"
                            target="_blank"
                            class="sync-link"
                        >
                            Sync with Google Calendar
                        </a>
                    </div>
                </form>
            </div>

            <div class="appointment-box">
                <h3>Schedule an Appointment</h3>
                <form class="appointment-form" id="paymentForm">
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required>

                    <label for="vaccine">Select Vaccine:</label>
                    <select id="vaccine" name="vaccine" required>
                        <option value="">-- Select a Vaccine --</option>
                        <option value="Hepatitis B">Hepatitis B</option>
                        <option value="DTaP">DTaP (Diphtheria, Tetanus, Pertussis)</option>
                        <option value="Hib">Hib (Haemophilus influenzae type b)</option>
                        <option value="IPV">IPV (Polio)</option>
                        <option value="PCV">PCV (Pneumococcal)</option>
                        <option value="RV">RV (Rotavirus)</option>
                        <option value="MMR">MMR (Measles, Mumps, Rubella)</option>
                        <option value="Varicella">Varicella (Chickenpox)</option>
                        <option value="Hepatitis A">Hepatitis A</option>
                        <option value="HPV">HPV (Human Papillomavirus)</option>
                        <option value="MenACWY">MenACWY (Meningococcal)</option>
                        <option value="Tdap">Tdap (Tetanus, Diphtheria, Pertussis)</option>
                        <option value="Influenza">Influenza (Flu)</option>
                        <option value="Shingles">Shingles</option>
                        <option value="Pneumococcal">Pneumococcal (Pneumonia)</option>
                        <option value="COVID-19">COVID-19</option>
                        <option value="Rabies">Rabies</option>
                        <option value="Tetanus">Tetanus</option>
                    </select>

                    <label for="center">Select Vaccination Center:</label>
                    <select id="center" name="center" required>
                        <option value="">-- Select a Center --</option>
                        <option value="Center A">Center A</option>
                        <option value="Center B">Center B</option>
                        <option value="Center C">Center C</option>
                    </select>

                    <label for="date">Preferred Date:</label>
                    <input type="date" id="date" name="date" required>

                    <label for="time">Preferred Time:</label>
                    <input type="time" id="time" name="time" required>

                    <div id="paymentSection">
                        <a href="https://buymeacoffee.com/vaxify" target="_blank" class="payment-button">Pay and Schedule</a>
                    </div>
                </form>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 Vaccination Reminder. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
