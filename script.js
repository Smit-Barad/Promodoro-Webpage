// Set default background video
const defaultBgVideo = document.getElementById('default-bg-video');

// Sign Up Button and Modal START HERE
let users = {}; // Store user data locally (For demonstration purposes)

// Open modal
document.getElementById('sign-in-btn').addEventListener('click', () => {
    document.getElementById('sign-in-modal').style.display = 'block';
});

document.getElementById('log-in-btn').addEventListener('click', () => {
    document.getElementById('log-in-modal').style.display = 'block';
});

// Close modal
document.querySelectorAll('.close').forEach((closeButton) => {
    closeButton.addEventListener('click', (e) => {
        const targetModal = e.target.getAttribute('data-target');
        document.getElementById(targetModal).style.display = 'none';
    });
});

// Validate and store Sign In data
document.getElementById('sign-in-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('sign-in-username').value.trim();
    const email = document.getElementById('sign-in-email').value.trim();
    const password = document.getElementById('sign-in-password').value.trim();
    const feedback = document.getElementById('sign-in-feedback');

    // Validation
    if (!username || !email || !password) {
        feedback.textContent = 'All fields are required!';
        return;
    }
    if (!validateEmail(email)) {
        feedback.textContent = 'Please enter a valid email!';
        return;
    }
    if (password.length < 6) {
        feedback.textContent = 'Password must be at least 6 characters long!';
        return;
    }

    // Store user data
    if (users[email]) {
        feedback.textContent = 'Email already registered!';
        return;
    }

    users[email] = { username, password };
    feedback.textContent = '';
    alert('Sign In successful!');
    document.getElementById('sign-in-modal').style.display = 'none';
});

// Validate and check Log In data
document.getElementById('log-in-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('log-in-email').value.trim();
    const password = document.getElementById('log-in-password').value.trim();
    const feedback = document.getElementById('log-in-feedback');

    // Validation
    if (!users[email]) {
        feedback.textContent = 'No account found for this email!';
        return;
    }
    if (users[email].password !== password) {
        feedback.textContent = 'Incorrect password!';
        return;
    }

    // Log In success
    feedback.textContent = '';
    document.getElementById('log-in-modal').style.display = 'none';
    displayGreeting(users[email].username);
});

// Display greeting
function displayGreeting(username) {
    const greetingSection = document.getElementById('greeting-section');
    const greetingMessage = document.getElementById('greeting-message');
    greetingMessage.textContent = `Hi! ${username}`;
    greetingSection.style.display = 'block';
}

// Utility function: Validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



// Sign Up Button and Modal END HERE


// Real-time clock and date update
// Real-time clock and date update function
function updateTimeAndDate() {
    const now = new Date(); // Get current date and time

    // Format time as "HH:MM:SS AM/PM"
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    // Format date as "Day | Date Month 'YY"
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDate = `${days[now.getDay()]} | ${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} '${now.getFullYear() % 100}`;

    // Calculate percentage of day passed for progress bar
    const secondsPassedToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const totalSecondsInDay = 86400; // Total seconds in a day
    const progressPercentage = (secondsPassedToday / totalSecondsInDay) * 100;

    // Update time and date in the DOM
    document.getElementById('time-display').textContent = formattedTime;
    document.getElementById('date-display').textContent = formattedDate;

    // Update progress bar's width
    document.getElementById('time-progress-bar').style.width = `${progressPercentage}%`;
}

// Call updateTimeAndDate every second to keep clock updated
setInterval(updateTimeAndDate, 1000); // Updates every 1 second
updateTimeAndDate(); // Initial call to display immediately


// Real-time clock and date update END HERE


// THEME BUTTON START HERE
 // THEME BUTTON START HERE

// Toggle the popup visibility
document.querySelector('.theme-button').addEventListener('click', () => {
    document.querySelector('.popup-box').classList.toggle('hidden');
    document.querySelector('.effect-popup').classList.add('hidden'); // Hide Effect popup
    document.querySelector('#music-popup').classList.add('hidden'); // Hide Music popup
    document.querySelector('#promo-popup').classList.add('hidden');
   
});

// Close the popup
document.querySelector('.close-popup').addEventListener('click', () => {
    document.querySelector('.popup-box').classList.add('hidden'); // Theme Hidden
});

// Change background on video selection
document.querySelectorAll('.video-item video').forEach((video) => {
    video.addEventListener('click', () => {
        const selectedVideoSrc = video.querySelector('source').src;
        defaultBgVideo.src = selectedVideoSrc; // Change default video source
        defaultBgVideo.load(); // Reload video to apply changes
        defaultBgVideo.play(); // Ensure the video starts playing
        document.querySelector('.popup-box').classList.add('hidden');
    });
});

// THEME BUTTON END HERE
// THEME BUTTON END HERE

// Effect Button Functionality START HERE

// Selectors for button and popup
const effectButton = document.querySelector('.effect-button'); // Main button
const effectPopup = document.querySelector('.effect-popup'); // Popup container
const snowToggle = document.getElementById('toggle-snow'); // Snow option
const rainToggle = document.getElementById('toggle-rain'); // Rain option

// Toggle popup visibility when button is clicked
effectButton.addEventListener('click', () => {
    effectPopup.style.display = effectPopup.style.display === 'none' || !effectPopup.style.display ? 'block' : 'none';
    document.querySelector('.popup-box').classList.add('hidden'); // Theme Hidden
});

// Function to create a snowflake effect
function createSnow() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
    snowflake.textContent = '❄';
    document.body.appendChild(snowflake);

    setTimeout(() => snowflake.remove(), 5000); // Remove snowflake after falling
}

// Function to create a raindrop effect
function createRain() {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.style.left = Math.random() * window.innerWidth + 'px';
    raindrop.style.opacity = Math.random();
    document.body.appendChild(raindrop);

    setTimeout(() => raindrop.remove(), 5000); // Remove raindrop after falling
}

// Toggles for snow and rain effects
let snowInterval, rainInterval;

snowToggle.addEventListener('click', () => {
    if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
    } else {
        snowInterval = setInterval(createSnow, 100); // Start snow effect
    }
});

rainToggle.addEventListener('click', () => {
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    } else {
        rainInterval = setInterval(createRain, 50); // Start rain effect
    }
});

// Effect Button Functionality END HERE



// Promo Button START HERE
// Element References
const promoButton = document.querySelector('.promo-button'); // Promo button
const promoPopup = document.querySelector('#promo-popup'); // Promo popup
const workInput = document.querySelector('#work-timer'); // Work timer input
const breakInput = document.querySelector('#break-timer'); // Break timer input
const startWorkButton = document.querySelector('#start-work-timer'); // Work timer start button
const startBreakButton = document.querySelector('#start-break-timer'); // Break timer start button
const timerDisplay = document.querySelector('#timer-display'); // Timer display section
const timerCountdown = document.querySelector('#timer-countdown'); // Countdown display
const stopAlarmButton = document.querySelector('#stop-alarm'); // Stop alarm button

// Timer Variables
let timerInterval = null; // Holds interval ID

// Show/Hide Popup
promoButton.addEventListener('click', () => {
    promoPopup.classList.toggle('hidden'); // Toggle popup visibility
    document.querySelector('.effect-popup').classList.add('hidden'); // Hide Effect popup
    document.querySelector('.popup-box').classList.add('hidden'); // Hide Theme popup
    document.querySelector('#music-popup').classList.add('hidden');// Hide Music popup
});

// Start Timer Function
const startTimer = (time, label) => {
    const [minutes, seconds] = time.split(':').map(Number); // Convert MM:SS to numbers
    let remainingTime = minutes * 60 + seconds; // Total time in seconds

    timerDisplay.classList.remove('hidden'); // Show timer display
    promoPopup.classList.add('hidden'); // Hide promo popup

    timerInterval = setInterval(() => {
        const mins = Math.floor(remainingTime / 60).toString().padStart(2, '0'); // Minutes left
        const secs = (remainingTime % 60).toString().padStart(2, '0'); // Seconds left
        timerCountdown.textContent = `${mins}:${secs}`; // Update timer display

        if (remainingTime === 0) {
            clearInterval(timerInterval); // Stop timer
            triggerAlarm(label); // Trigger alarm
        } else {
            remainingTime--; // Decrement remaining time
        }
    }, 1000); // Update every second
};

// Trigger Alarm
const triggerAlarm = (label) => {
    timerCountdown.textContent = `${label} Timer Ended!`; // Show timer ended message
    stopAlarmButton.classList.remove('hidden'); // Show Stop button

    const alarmSound = new Audio('path_to_alarm.mp3'); // Alarm sound file
    alarmSound.play(); // Play alarm
};

// Stop Alarm
stopAlarmButton.addEventListener('click', () => {
    stopAlarmButton.classList.add('hidden'); // Hide Stop button
    timerDisplay.classList.add('hidden'); // Hide timer display
});

// Start Work Timer
startWorkButton.addEventListener('click', () => {
    const workTime = workInput.value || '25:00'; // Default 25:00 if input is empty
    startTimer(workTime, 'Work'); // Start work timer
});

// Start Break Timer
startBreakButton.addEventListener('click', () => {
    const breakTime = breakInput.value || '05:00'; // Default 05:00 if input is empty
    startTimer(breakTime, 'Break'); // Start break timer
});



// Promo Button END HERE


// Music Button START HERE
// Reference to all elements for better control and interactions
const musicButton = document.querySelector('.music-button'); // Music button to toggle popup
const musicPopup = document.querySelector('#music-popup'); // Popup box to display music options
const musicList = document.querySelector('#music-list'); // List of preloaded music tracks
const uploadMusic = document.querySelector('#upload-music'); // Upload field for user music files
const musicPlayer = document.querySelector('#music-player'); // Music player box for playing tracks
const trackName = document.querySelector('#track-name'); // Track name display in the player
const albumArt = document.querySelector('#album-art'); // Album art display
const stopMusicButton = document.querySelector('#stop-music'); // Stop button
const resumeMusicButton = document.querySelector('#resume-music'); // Resume button
const repeatMusicButton = document.querySelector('#repeat-music'); // Repeat button

// Initialize audio element and track management
let audio = new Audio();
let currentTrack = null;

// Toggle music popup on button click
musicButton.addEventListener('click', () => {
    musicPopup.classList.toggle('hidden'); // Show or hide the popup
    document.querySelector('.popup-box').classList.add('hidden'); // Ensure other popups are hidden
    document.querySelector('.effect-popup').classList.add('hidden');
    document.querySelector('#promo-popup').classList.add('hidden');
    
});

// Function to play music and update player UI
const playMusic = (src, name) => {
    currentTrack = src; // Store the current track source
    audio.src = src; // Set the audio source
    audio.play(); // Play the audio
    trackName.textContent = `Playing: ${name}`; // Update track name
    musicPlayer.classList.remove('hidden'); // Show the music player
    musicPopup.classList.add('hidden'); // Hide the popup
};

// Play Google Drive Music
function playGoogleDriveMusic(link) {
    playMusic(link, 'Google Drive Track');
}


// Play music when a preloaded track is clicked
musicList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const trackSrc = e.target.getAttribute('data-src'); // Get track source
        const trackTitle = e.target.textContent; // Get track title
        playMusic(trackSrc, trackTitle); // Play the selected track
    }
});

// Handle music file upload
uploadMusic.addEventListener('change', (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file && (file.type === 'audio/mp3' || file.type === 'audio/wav')) {
        const fileURL = URL.createObjectURL(file); // Generate a URL for the file
        playMusic(fileURL, file.name); // Play the uploaded file
    } else {
        alert('Please upload a valid audio file (MP3/WAV).'); // Show error for invalid file
    }
});

// Stop music and reset player
stopMusicButton.addEventListener('click', () => {
    audio.pause(); // Pause the audio
    audio.currentTime = 0; // Reset audio to the beginning
    trackName.textContent = 'No Track Playing'; // Update track name
    musicPlayer.classList.add('hidden'); // Hide the music player
});

// Resume the current track
resumeMusicButton.addEventListener('click', () => {
    if (currentTrack) {
        audio.play(); // Resume audio playback
    }
});

// Restart the current track from the beginning
repeatMusicButton.addEventListener('click', () => {
    if (currentTrack) {
        audio.currentTime = 0; // Reset audio to the beginning
        audio.play(); // Play the track again
    }
});


// Music Button END HERE




// To-Do Button Start HERE

// References to HTML elements
const todoButton = document.querySelector('.todo-button'); // The "To-Do" button
const todoPopup = document.querySelector('#todo-popup'); // Popup for the To-Do list
const taskInput = document.querySelector('#task-input'); // Input field for tasks
const addTaskButton = document.querySelector('#add-task-button'); // Button to add a task
const taskList = document.querySelector('#task-list'); // The task list container

// Toggle the visibility of the To-Do popup when the button is clicked
todoButton.addEventListener('click', () => {
    todoPopup.classList.toggle('hidden'); // Add/remove 'hidden' class for showing/hiding the popup
   
    
});

// Add a new task to the list
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim(); // Trim whitespace from input

    // Ensure task is not empty
    if (taskText === '') {
        alert('Please enter a task.'); // Alert if the input is empty
        return;
    }

    const taskItem = document.createElement('li'); // Create a list item for the new task

    // Create a checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.addEventListener('change', (e) => {
        // Strike through the task when checked
        taskItem.style.textDecoration = e.target.checked ? 'line-through' : 'none';
    });

    // Create a span to hold the task text
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    // Create a delete button to remove the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-task');
    deleteButton.addEventListener('click', () => {
        taskItem.remove(); // Remove the task from the list
    });

    // Add checkbox, text, and delete button to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);

    // Add the task item to the task list
    taskList.appendChild(taskItem);

    // Clear the input field after adding the task
    taskInput.value = '';
});


// To-Do Button END HERE