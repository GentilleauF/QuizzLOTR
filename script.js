
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

// Utilisation
async function startQuizz() {
    const questions = await loadQuestions();
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
        startQuizz();
    }
});
   // Appel à showQuestion au lieu de startQuizz
   showQuestion();
}

// Appel à startQuizz au lieu de startQuizz();
startQuizz();



