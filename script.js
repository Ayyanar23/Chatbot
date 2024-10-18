const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');
const messageBox = document.getElementById('message-box');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;

startBtn.addEventListener('click', () => {
  recognition.start();
  startBtn.textContent = 'Listening...';
});

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  output.textContent = transcript;
  displayMessage(transcript);
};

recognition.onend = function() {
  startBtn.textContent = 'Start Listening';
};

recognition.onerror = function(event) {
  output.textContent = 'Error occurred: ' + event.error;
};

function displayMessage(message) {
  messageBox.textContent = message;
}


const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);

// Data for bot responses
    const responses = {
        greetings: ['Hello!', 'Hi there!', 'Hey!', 'Greetings!'],
        farewells: ['Goodbye!', 'See you later!', 'Bye!', 'Take care!'],
        thanks: ['You\'re welcome!', 'No problem!', 'Anytime!', 'Glad to help!'],
        compliments: ['You\'re doing great!', 'You\'re awesome!', 'Keep up the good work!', 'You\'re fantastic!'],
        encouragement: ['You got this!', 'Believe in yourself!', 'Stay positive!', 'Keep pushing forward!'],
        affirmations: ['You are valued.', 'You are loved.', 'You matter.', 'You are important.'],
        empathy: ['I understand.', 'I hear you.', 'I\'m here for you.', 'You\'re not alone.'],
        motivation: ['You can achieve anything you set your mind to!', 'Stay motivated and you will succeed!', 'You are capable of great things!', 'Believe in your abilities!'],
        positivity: ['Stay positive and things will work out!', 'Focus on the good things!', 'Choose happiness!', 'Keep a positive mindset!'],
        relaxation: ['Take a deep breath and relax.', 'Find a moment to unwind and de-stress.', 'Remember to take care of yourself.', 'Take it easy and enjoy the moment.'],
        appreciation: ['Thank you for being you.', 'I appreciate you.', 'You\'re amazing just the way you are.', 'Thank you for being a wonderful person.']
      };
      

// Bot name
const botName = "Veronica";

function sendMessage() {
  const message = userInput.value;
  if (message.trim() === '') return; // Don't send empty messages

  appendMessage('user', message); // Display user message
  userInput.value = ''; // Clear input field

  // Generate bot response based on user message
  const botResponse = generateBotResponse(message);
  appendMessage('bot', botResponse);
  
  // Scroll to bottom of chat box
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = (sender === 'bot') ? `${botName}: ${message}` : message;
  chatBox.appendChild(messageElement);
}

function generateBotResponse(message) {
    const allResponses = [
      ...responses.greetings,
      ...responses.farewells,
      ...responses.thanks,
      ...responses.compliments,
      ...responses.encouragement,
      ...responses.affirmations,
      ...responses.empathy,
      ...responses.motivation,
      ...responses.positivity,
      ...responses.relaxation,
      ...responses.appreciation
    ];
  
    // Check if user message contains any keywords
    if (containsKeyword(message, 'hello')) {
      return randomResponse(responses.greetings);
    } else if (containsKeyword(message, 'goodbye')) {
      return randomResponse(responses.farewells);
    } else if (containsKeyword(message, 'thanks') || containsKeyword(message, 'thank you')) {
      return randomResponse(responses.thanks);
    } else if (containsKeyword(message, 'date')) {
      return `: The current date is ${getCurrentDate()}.`;
    } else if (containsKeyword(message, 'time')) {
      return `: The current time is ${getCurrentTime()}.`;
    } else if (containsKeyword(message, 'weather')) {
      return `: The weather is currently ${getCurrentWeather()}.`;
    } else if (containsKeyword(message, 'how are you')) {
      return `: I'm just a bot, but I'm doing well, thank you for asking!`;
    } else {
      // If no keyword found, return a random response
      return randomResponse(allResponses);
    }
  }
  
  function getCurrentTime() {
    // Get the current time in a user-friendly format (e.g., "12:34 PM")
    const currentTime = new Date();
    return currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
  
  function getCurrentWeather() {
    // Return a mock weather for demonstration purposes
    return "winter";
  }
  
  
function containsKeyword(message, keyword) {
  // Check if the message contains the given keyword (case insensitive)
  return message.toLowerCase().includes(keyword.toLowerCase());
}

function randomResponse(array) {
  // Return a random response from the given array
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getCurrentDate() {
  // Get the current date in a user-friendly format (e.g., "February 12, 2024")
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
}

