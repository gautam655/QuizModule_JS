//First we will make the array of object of all the questions and their right answer
var questions = [
  {
    question:"Which character is used to represent the closing of a tag in HTML?",
    options: [ "!",".","/","|" ],
    right_answer: "/"
  },
  {
    question:"what is the full form of HTML",
    options: [ "high markup language",
                "hyper text mockup language",
                "hyper text markup language",
                "none of the above" 
              ],
    right_answer: "hyper text markup language"
  },
  {
    question:"HTML is programming language",
    options: [ "yes","no"],
    right_answer: "no"
  },
  {
    question:"There are no array in JS",
    options: [ "yes","no","strictly no", "maybe" ],
    right_answer: "strictly no"
  },
  {
    question:"What is Full Form of CQ",
    options:["CodeQuotient","Coding","CodeQ","None"],
    right_answer:"CodeQuotient"
  },
  {
    question:"The correct sequence of HTML tags for starting a webpage is ",
    options:["Head, Title, HTML, body","HTML, Body, Title, Head","HTML, Head, Title, Body","HTML, Head, Title, Body"],
    right_answer:"HTML, Head, Title, Body"
  },
  {
    question:" Which of the following element is responsible for making the text bold in HTML?",
    options:["<pre>","<a>","<b>","<br>"],
    right_answer:"<b>"
  },
  {
    question:"Which of the following tag is used for inserting the largest heading in HTML?",
    options:["<h3>","<h1>","<h5>","<h6>"],
    right_answer:"<h1>"
  },
  {
    question:"Which of the following tag is used to insert a line-break in HTML?",
    options:["<br>","<a>","<pre>","<b>"],
    right_answer:"<br>"
  },
  {
    question:"How to create an unordered list (a list with the list items in bullets) in HTML?",
    options:["ul","ol","li","i"],
    right_answer:"ul"
  }
  
];
//Getting all The desiered values
var score=0;
var current_question=0;  //The index of the particular question

var que1=document.getElementById("que1");
var title=document.getElementById("title");
var options=document.getElementById("options");
var next=document.getElementById("next");
var submit=document.getElementById("submit");
var result=document.getElementById("result");
var answersheet=document.getElementById("answersheet");
var restart=document.getElementById("restart");

//This function prints the question on the display
function createQuestion()
{
 var question =questions[current_question]; //Taking question from zero index

  next.style.display="none"; //The Next Button is Hidden

  title.innerText=question.question; //Storing the value in the h2 tag in HTML with id title

//Creating the element of the type radio 
  question.options.forEach(function(option, index){

    var radio=document.createElement("input"); //Creating input tag
    radio.setAttribute("type","radio");  //Setting input tag type="radio"
    radio.setAttribute("name","option"); //Setting input tag name="option"
    radio.setAttribute("value",option); //Setting input tag value="option" 

    var label=document.createElement("label");  //Create a Element which is of label type
    label.innerText=option; //Storing option to label

    var list_iteam=document.createElement("li"); //Creating list tag
    list_iteam.appendChild(radio); //Appending radio to list_iteam(li)
    list_iteam.appendChild(label); //Appending label to list_iteam(li)

    options.appendChild(list_iteam); //Appending list_iteam to options
  })
  
}

//createQuestion(); //Calling the function 

//Adding event for the submit button
submit.addEventListener("click", function(event) 
{
  var options = document.getElementsByName("option"); 

  var checked_answer = "";

  options.forEach(function(option, index) 
  {

    if( option.checked ) //The option which is selected
    {
      checked_answer = index; //storing the index of the selected element
    }
    else if(!option.checked) //If no otion is selected show error
    {
      result.innerText="Please Select One Option!";
    
    }
  
  })

  var selected_option = options[checked_answer].value; //Getting the value
  
  var is_right = questions[current_question].right_answer === selected_option; //Checking the answer is right or not

  if( is_right ) //If the answer is right then it will show up correct
  {
    submit.style.display = "none";
    result.innerText = "Correct";
    result.classList.add("correct"); //Making class in a html for css
    next.style.display = "block";
     score++;
   
    
  }
  else //Not corrected option selected then show incorrect
  {
     submit.style.display = "none";  
    result.innerText = "In Correct"; 
    result.classList.add("incorrect"); //Making class in a html for css
    next.style.display = "block";
  }
})


//Next button eventListner
next.addEventListener("click",function() 
{
  result.setAttribute("class",""); //The result again set to empty string
  result.innerHTML = "" 

  options.innerHTML = ""; //options of old question will removed

  next.style.display = "none"; 
  submit.style.display = "block";
  current_question++; //Shifts to next question

  if( questions[current_question] ) //If more questions are there then this will work
  {
    createQuestion();

  }
  else //When all the questions are finished then answesheet will displayed
  {
    answersheet.style.display = "block";
    que1.style.display = "none"; 
    
    showAnswerSheet();
    submit.style.display="none";
    
  }

})

//Answer Sheet of corrret answers
function showAnswerSheet()
{
  var label = document.createElement("label");
  label.innerText = "Your current score is "+score; //Shows your score

  answersheet.appendChild(label);

  var list = document.createElement("ol");//List of unordered
  
  questions.forEach(function(question) //Shows question and correct answer
  {
    var list_item = document.createElement("li");
    list_item.setAttribute("style","display:list-item");
    list_item.innerText =question.question +" - "+ question.right_answer;
    list.appendChild(list_item);
  })

 restart.style.display="block";
  answersheet.appendChild(list);
  

}
createQuestion();
 
 //Restart button to researt the quiz
 restart.addEventListener('click',function(){
   score = 0; //Again score will zero
  current_question=0; //Question start from the begning
  createQuestion(); //Question function starts again 
  
  //Removing all the function/elements of the answersheet for new begining
  answersheet.style.display = "none";
  que1.style.display = "block";
  title.style.display = "block";
  answersheet.style.display = "none";
  submit.style.display = "block";
  restart.style.display = "none";
  })

