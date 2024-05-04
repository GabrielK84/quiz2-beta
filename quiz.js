let questions = []; // Array para almacenar las preguntas
let currentQuestionIndex = 0; // Índice de la pregunta actual
let score = 0; // Puntuación del jugador

// Función para cargar las preguntas desde el archivo JSON
function loadQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            console.log('Preguntas cargadas:', questions);
        })
        .catch(error => {
            console.error('Error al cargar las preguntas:', error);
        });
}

// Función para obtener una pregunta aleatoria que no se haya mostrado antes
function getRandomQuestion() {
    const remainingQuestions = questions.filter((question, index) => index !== currentQuestionIndex);
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    return remainingQuestions[randomIndex];
}

// Función para mostrar una pregunta en la pantalla
function displayQuestion(question) {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";
    const shuffledOptions = shuffleArray(question.options);
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, question.answer);
        optionsElement.appendChild(button);
    });
}

// Función para mezclar las opciones de una pregunta
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para comprobar la respuesta del jugador
function checkAnswer(selectedOption, correctAnswer) {
    const messageElement = document.getElementById('message');
    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => {
        button.disabled = true; // Desactivar botones después de seleccionar una opción
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });
    if (selectedOption === correctAnswer) {
        score++;
    }
    document.getElementById('score-value').textContent = score;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            const nextQuestion = getRandomQuestion();
            displayQuestion(nextQuestion);
            messageElement.textContent = "";
        }, 1000); // Retraso de 1 segundo antes de mostrar la próxima pregunta
    } else {
        displayEndMessage();
    }
}

// Función para mostrar el mensaje de fin de la quiz
function displayEndMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = "¡Fin del quiz! Tu puntuación es: " + score;
}

// Cargar las preguntas al cargar la página
window.onload = () => {
    loadQuestions();
};
