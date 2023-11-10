// Récupérez le nom du quiz à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const quizName = urlParams.get('quiz');

// Chargez les questions spécifiques au quiz
async function loadQuizQuestions() {
    try {
        if (quizName) {
            const response = await fetch(`./quizz/${quizName}_questions.json`);
            const data = await response.json();
            return data;
        } else {
            return null; // Retourne null si le nom du quiz n'est pas spécifié
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors du chargement des questions:', error);
    }
}

// Utilisation
async function startQuiz() {
    const questions = await loadQuizQuestions();

    if (!questions) {
        // Faites quelque chose lorsque le nom du quiz n'est pas spécifié
        console.error('Nom du quiz non spécifié');
        return;
    }

    // Reste du code pour gérer le quiz, comme vous l'avez déjà fait
//DATABASE CALL
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Une erreur s\'est produite lors du chargement des questions:', error);
    }
}

    //init
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answers");
const nextButton = document.getElementById("next-question");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn");
        answerElement.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }


    //BTN clicked is correct??
    Array.from(answerElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";

}

function showScore() {
    resetState();
    questionElement.innerHTML = `Votre score est de ${score} / ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

    // ...

    // Appel à showQuestion au lieu de startQuizz
    showQuestion();
}

// Appel à startQuiz au lieu de startQuizz
startQuiz();

// Gestionnaire d'événements pour les liens de quizz
document.querySelectorAll('.quiz-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien

        const quizName = this.getAttribute('data-quiz');
        if (quizName) {
            // Redirigez l'utilisateur vers l'URL du quiz
            window.location.href = `quiz.html?quiz=${quizName}`;
        } else {
            console.error('Aucun nom de quiz spécifié dans le lien');
        }
    });
});
