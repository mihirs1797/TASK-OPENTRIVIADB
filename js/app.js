//-----------------------Homepage---------------------
function welcomeScreen() {
    var welcomeContainer = document.createElement("div");
    welcomeContainer.setAttribute("class", "container-fluid");
    welcomeContainer.style.width = "30%";
    //welcomeCard layout
    var welcomeCard = document.createElement("div");
    welcomeCard.setAttribute("class", "card bg-dark text-white mx-auto welcome");
    //cardBody here
    var welcomeCardBody = document.createElement("div");
    welcomeCardBody.setAttribute("class", "card-body text-center");
    //cardBody content here
    var quizzio = document.createElement("h1");
    quizzio.setAttribute("class", "card-text text-center");
    quizzio.innerHTML = "QUIZZIO!";
    var welcomeText = document.createElement("p");
    welcomeText.setAttribute("class", "card-text mt-5 text-center");
    welcomeText.innerHTML = "WELCOME TO A SIMPLE COMPUTER SCIENCE QUIZ";
    var startButton = document.createElement("button");
    startButton.setAttribute("class", "btn text-center mt-5 start");
    var linkIcon = document.createElement("a");
    linkIcon.href = "game.html";
    linkIcon.innerHTML = "<i class=\"fas fa-play-circle fa-7x\" style=\"color: white;\"></i>";


    //Footer
    var footer = document.createElement("div");
    footer.className = "card-footer";
    var score = document.createElement("h5");
    score.setAttribute("class", "card-text text-center");
    var link = document.createElement("a");
    link.href = " ";
    link.innerHTML = "High Scores!";
    //render section
    score.appendChild(link);
    footer.appendChild(score);
    startButton.append(linkIcon);
    welcomeCardBody.append(quizzio, welcomeText, startButton);
    welcomeCard.append(welcomeCardBody, footer);
    welcomeContainer.append(welcomeCard);
    document.body.append(welcomeContainer);
}
//----------------------end of homepage ----------------------------


//--------------------- start of game.html--------------------------
let score = 0;
let questionsDone = 0;
let questionNumber = 0;
let responseObject = null;

async function getQuizData() {
    try {
        var data = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple");
        var quizData = await data.json();
        // console.log(quizData);
        displayQuestions(quizData.results);
        return quizData.results;
    } catch (error) {
        console.error(error);
    }
}

async function loadGamePage() {
    var questionsData = await getQuizData();
    //var formatData = formatData(questionsData);
    console.log(questionsData);
    responseObject = questionsData;
}

function randomiseArray(arr){
    for (var j = arr.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var temp = arr[j];
        arr[j] = arr[k];
        arr[k] = temp;
    }
    return arr;
}

function displayQuestions(q) {

    var seq = [0,1,2,3];
    var jumbledSeq = randomiseArray(seq);

    var container = document.createElement("div");
    container.setAttribute("class", "container holder mt-5");

    var card = document.createElement("div");
    card.setAttribute("class", "card bg-dark text-white");
    //cardHeader
    var cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header text-center");
    var title = document.createElement("h1");
    title.setAttribute("class", "card-title text-center");
    title.innerHTML = "Computer Science Quiz";

    //cardBody
    var arrOfAnswers = [q[questionNumber].correct_answer, ...(q[questionNumber].incorrect_answers)];
    
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    //cardBody content
    var question = document.createElement("h3");
    question.setAttribute("class", "card-text mt-5");
    question.setAttribute("id", "question");
    question.innerHTML = "Q. " + q[questionNumber].question;

    //MCQ layout
    var row = document.createElement("div");
    row.setAttribute("class", "row mt-5");
    //buttons
    var div1 = document.createElement("div");
    div1.setAttribute("class", "col-sm-12 col-md-6 col-lg-6 mt-3");
    var btn1 = document.createElement("button");
    btn1.setAttribute("class", "btn btn-block btn-primary");
    btn1.setAttribute("id", "optionBtn1");
    btn1.setAttribute("value",arrOfAnswers[jumbledSeq[0]]);
    btn1.innerHTML =arrOfAnswers[jumbledSeq[0]];
    btn1.addEventListener('click', validateAnswer)

    var div2 = document.createElement("div");
    div2.setAttribute("class", "col-sm-12 col-md-6 col-lg-6 mt-3");
    var btn2 = document.createElement("button");
    btn2.setAttribute("class", "btn btn-block btn-primary");
    btn2.setAttribute("id", "optionBtn2");
    btn2.setAttribute("value",arrOfAnswers[jumbledSeq[1]]);
    btn2.innerHTML =arrOfAnswers[jumbledSeq[1]];
    btn2.addEventListener('click', validateAnswer)

    var div3 = document.createElement("div");
    div3.setAttribute("class", "col-sm-12 col-md-6 col-lg-6 mt-3");
    var btn3 = document.createElement("button");
    btn3.setAttribute("class", "btn btn-block btn-primary");
    btn3.setAttribute("id", "optionBtn3");
    btn3.setAttribute("value",arrOfAnswers[jumbledSeq[2]]);
    btn3.innerHTML =arrOfAnswers[jumbledSeq[2]];
    btn3.addEventListener('click', validateAnswer)

    var div4 = document.createElement("div");
    div4.setAttribute("class", "col-sm-12 col-md-6 col-lg-6 mt-3");
    var btn4 = document.createElement("button");
    btn4.setAttribute("class", "btn btn-block btn-primary ");
    btn4.setAttribute("id", "optionBtn4");
    btn4.setAttribute("value",arrOfAnswers[jumbledSeq[3]]);
    btn4.innerHTML =arrOfAnswers[jumbledSeq[3]];
    btn4.addEventListener('click', validateAnswer)
    
    var cardFooter = document.createElement("div");
    cardFooter.setAttribute("class","card-footer");
    // cardFooter.setAttribute("id","score");
    var quesNumDiv = document.createElement("div");
    quesNumDiv.setAttribute("class","float-left");
    var quesNum = document.createElement("p");
    quesNum.setAttribute("class","card-text float-right");
    quesNum.setAttribute("id","quesNum");
    quesNum.innerHTML = "Question: "+parseInt(questionNumber+1)+"/10";
    var scoreInfo = document.createElement("p");
    scoreInfo.setAttribute("class","card-text");
    scoreInfo.setAttribute("id","score");
    scoreInfo.innerHTML = "Score: "+score;

    //render section
    cardFooter.append(quesNum,scoreInfo);
    div4.append(btn4);
    div3.append(btn3);
    div2.append(btn2);
    div1.append(btn1);
    row.append(div1, div2, div3, div4);
    cardBody.append(question, row);

    cardHeader.append(title);
    card.append(cardHeader, cardBody, cardFooter);
    container.append(card);

    document.body.append(container);
}

function validateAnswer(e) {
    if(questionNumber<10){
        if (e.target.value === responseObject[questionNumber].correct_answer) {
            questionNumber++;            
            updateScore();
    
            updateContent(questionNumber);
        }
        else if(responseObject[questionNumber].incorrect_answers.includes(e.target.value)){
            questionNumber++;
            updateContent(questionNumber);
        }
    }    
}

function updateContent(questionNumber){
    document.getElementById("question").innerHTML = "Q. "+responseObject[questionNumber].question;
    document.getElementById("quesNum").innerHTML = "Question: "+parseInt(questionNumber+1)+"/10";
    document.getElementById("optionBtn1").innerHTML =  
}

function updateScore(){
    score+=10;
    document.getElementById("score").innerHTML = "Score: "+score;
}



// GetAPIResposne
// Document.ready
// renderTheQuestionAndAnswers
// TriggerEvent 
// validate
// based on true for validate you need to increase counter for new question from object and then update the value shown on screen
// if false show alert('wrogn answer' )