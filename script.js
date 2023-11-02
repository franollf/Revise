const flashcards = document.getElementsByClassName
("flashcards")[0];
const createBox = document.getElementsByClassName
("create-box")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
let contentArray = localStorage.getItem('items') ? 
JSON.parse(localStorage.getItem('items')) : [];

contentArray.array.forEach(divMaker);

// ... (existing code)

function divMaker(text) {
    var div = document.createElement("div");
    var h2_question = document.createElement("h2");
    var h2_answer = document.createElement("h2");
    var deleteButton = document.createElement("button"); 

    div.className = 'flashcard';

    h2_question.innerHTML = text.my_question;

    h2_answer.setAttribute("style", "text-align:center; display:none; color:red");
    h2_answer.innerHTML = text.my_answer;

    deleteButton.innerHTML = 'X'; 
    deleteButton.className = 'delete-button';

    
    deleteButton.setAttribute("data-index", contentArray.indexOf(text));

    div.appendChild(deleteButton); 
    div.appendChild(h2_question);
    div.appendChild(h2_answer);

    deleteButton.addEventListener("click", function () {
        
        const index = parseInt(deleteButton.getAttribute("data-index"));

        
        contentArray.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(contentArray));

      
        flashcards.removeChild(div);
    });

    div.addEventListener("click", function () {
        if (h2_answer.style.display == "none")
            h2_answer.style.display = "block";
        else
            h2_answer.style.display = "none";
    });

    flashcards.appendChild(div);
}




function delFlashcards(){
    localStorage.clear()
    flashcards.innerHTML = '';
    contentArray = [];

}

function addFlashcard(){
    var flashcard_info = {
        'my_question' : question.value,
        'my_answer' : answer.value
    }

    contentArray.push(flashcard_info)
    localStorage.setItem('items', JSON.stringify(contentArray));
    divMaker(contentArray[contentArray.length - 1]);
    question.value = '';
    answer.value = '';
}

function hideCreateBox(){
    createBox.style.display = "none";
}

function showCreateCardBox(){
    createBox.style.display = "block";
}


