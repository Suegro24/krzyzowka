const continueButton = document.querySelector('#continueButton');
const finishButton = document.querySelector('#buttonFinish');
const crossword = document.querySelector('#crossword');
const questions = document.querySelector('#questions');
let choosenPassword;

const passwords = [
    {
        password: 'Wampiriada',
        questions: [
            {
                question: 'Projekt Niezależnego Zrzeszenia Studentów pomagający w kształtowaniu przyszłości studentów',
                hint: '',
                answer: 'Drogowskazy kariery',
                mainLetter: 'w'
            },
            {
                question: 'Imię przewodniczącego/przewodniczącej Niezależnego Zrzeszenia Studentów Uniwersytetu Rzeszowskiego',
                hint: '',
                answer: 'Ewelina',
                mainLetter: 'a'
            },
            {
                question: 'Osoba, która nie została jeszcze członkiem, ale pomaga organizacji i chcę się do niej przyłączyć',
                hint: '',
                answer: 'Sympatyk',
                mainLetter: 'm'
            },
            {
                question: 'Wiceprzewodniczący ds. ... - odpowiada m. in. za promowanie wydarzeń oraz przygotowanie oprawy wizualnej',
                hint: '',
                answer: 'Promocji',
                mainLetter: 'p'
            },
            {
                question: 'Nazwa domu studenta w którym siedzibę ma NZS UR',
                hint: '',
                answer: 'Hilton',
                mainLetter: 'i'
            },
            {
                question: 'Wydarzenie NZS UR, w którym można posłuchać rozmowy z ciekawymi osobami zza granicy',
                hint: '',
                answer: 'NZS bez granic',
                mainLetter: 'r'
            },
            {
                question: 'Nazwa radia w którym można słuchać audycji NZS UR',
                hint: '',
                answer: 'Feniks',
                mainLetter: 'i'
            },
            {
                question: 'Nazwisko obecnego przewodniczącego/przewodniczącej ogólnokrajowego Niezależnego Zrzeszenia Studentów',
                hint: '',
                answer: 'Białas',
                mainLetter: 'a'
            },
            {
                question: 'Akcja Niezależnego Zrzeszenia Studentów, którego celem jest wyróżnienie studentów o wybitnych osiągnięciach',
                hint: '',
                answer: 'Studencki Nobel',
                mainLetter: 'd'
            },
            {
                question: 'Były członek organizacji',
                hint: '',
                answer: 'Alumn',
                mainLetter: 'a'
            }
        ]
    }
]

continueButton.addEventListener('click', () => {
    const instructionSection = document.querySelector('#firstSection');
    const crosswordSection = document.querySelector('#secondSection');

    instructionSection.style.opacity = '0';
    setTimeout(() => {
        instructionSection.style.display = 'none';
        crosswordSection.style.display = 'block';
    },1000)
    setTimeout(() => {
        crosswordSection.style.opacity = '1';
        // newGame();
    },2000)
})

finishButton.addEventListener('click', () => {
    checkFinish();
})

function newGame() {
    choosenPassword = 0;
    prepareCrossword(choosenPassword);
    prepareQuestions(choosenPassword);
}

function checkFinish() {
    const mainLetters = crossword.querySelectorAll('.main-letter');
    let result = '';
    mainLetters.forEach(letter => {
        result+=letter.value.toLowerCase();
    })

    if (passwords[choosenPassword].password.toLowerCase() === result) {
        alert('Wygrana!');
    }
    else {
        alert('Próbuj dalej!');
    }
}

function prepareCrossword(password) {
    let crosswordContent = '';
    let positionOfFirstAnswerMainLetter;
    let index = 0;
    for (let answer of passwords[password].questions) {
        //console.log(answer);
        crosswordContent =
        `
            <div class="answer answer${index}">
        `

        let isMainCharacterSet = false;
        let mainCharacterPosition = 0;
        let i = 0;

        for (let letter of answer.answer) {
            if (letter.toLowerCase() === answer.mainLetter.toLowerCase() && !isMainCharacterSet) {
                crosswordContent += 
                `
                    <input class="letter main-letter" type="text" maxlength="1">
                `
                isMainCharacterSet = true;
                mainCharacterPosition = i;
                if (index == 0) {
                    positionOfFirstAnswerMainLetter = i;
                }

            }
            else if (letter === ' ') {
                crosswordContent += 
                `
                    <input class="space" type="text" maxlength="0" disabled>
                `
            }
            else {
                crosswordContent += 
                `
                    <input class="letter" type="text" maxlength="1">
                `
            }
            i++;
        }
        crosswordContent += 
        `
         </div> 
        ` 

        crossword.innerHTML += crosswordContent;
        let marginLeft = calculatePosition(positionOfFirstAnswerMainLetter, mainCharacterPosition);
        let div = crossword.querySelector(`.answer${index}`);
        div.style.marginLeft = marginLeft+'px';
        index++;
    }

    const letters = crossword.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                let next = e.target;
                while (next = next.nextElementSibling) {
                    if (next == null) {
                        break;
                    }
                    if (next.tagName.toLowerCase() === 'input') {
                        if (next.disabled === true) {
                            continue;
                        }
                        next.focus();
                        break;
                    }
                }
            }
            else if (e.target.value.length === 0) {
                let previous = e.target;
                while (previous = previous.previousElementSibling) {
                    if (previous == null) {
                        break;
                    }
                    if (previous.tagName.toLowerCase() === 'input') {
                        if (previous.disabled === true) {
                            continue;
                        }
                        previous.focus();
                        break;
                    }
                }
            }
        })
    })
}

function prepareQuestions(password) {
    let questionsContent = '';
    questionsContent = `
        <ol>
    `

    for (let question of passwords[password].questions) {
        questionsContent += `
            <li>${question.question}</li>
        `
    }

    questionsContent += `
        </ol>
    `
    questions.innerHTML = questionsContent;
}

function calculatePosition(positionA, positionB) {  
    const inputWidth = 36;
    let diffrence = positionA - positionB;
    let result = diffrence * inputWidth;
    return result;
}

newGame();