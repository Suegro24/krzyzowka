const continueButton = document.querySelector('#continueButton');
const crossword = document.querySelector('#crossword');
const questions = document.querySelector('#questions');
const modal = document.querySelector('#crosswordCompletedModal');
let choosenPassword;

const passwords = [
    {
        password: 'Wampiriada',
        questions: [
            {
                question: 'Projekt Niezależnego Zrzeszenia Studentów pomagający w kształtowaniu przyszłej kariery zawodowej studentów.',
                hint: 'https://www.facebook.com/DK.Kraj',
                answer: 'Drogowskazy kariery',
                mainLetter: 'w'
            },
            {
                question: 'Imię przewodniczącego/przewodniczącej Niezależnego Zrzeszenia Studentów Uniwersytetu Rzeszowskiego.',
                hint: 'https://www.facebook.com/nzsuniwersyteturzeszowskiego/posts/3038036589599458',
                answer: 'Ewelina',
                mainLetter: 'a'
            },
            {
                question: 'Osoba, która nie została jeszcze członkiem, ale pomaga organizacji,  chcę działać i dołączyć do niej.',
                hint: 'http://nzs.org.pl/kim-jestesmy/',
                answer: 'Sympatyk',
                mainLetter: 'm'
            },
            {
                question: 'Wiceprzewodniczący ds. ... - odpowiada m.in. za promowanie wydarzeń oraz przygotowanie oprawy wizualnej.',
                hint: 'https://www.facebook.com/nzsuniwersyteturzeszowskiego/posts/3038036589599458',
                answer: 'Promocji',
                mainLetter: 'p'
            },
            {
                question: 'Nazwa domu studenta w którym siedzibę ma NZS UR.',
                hint: 'https://www.facebook.com/nzsuniwersyteturzeszowskiego/about/?ref=page_internal',
                answer: 'Hilton',
                mainLetter: 'i'
            },
            {
                question: 'Projekt NZS UR, w którym można posłuchać rozmów z ciekawymi osobami zza granicy.',
                hint: 'https://www.facebook.com/hashtag/nzsbezgranic',
                answer: 'NZS bez granic',
                mainLetter: 'r'
            },
            {
                question: 'Nazwa radia w którym można słuchać audycji NZS UR.',
                hint: 'https://www.facebook.com/Feniks.fm',
                answer: 'Feniks',
                mainLetter: 'i'
            },
            {
                question: 'Nazwisko obecnego przewodniczącego/przewodniczącej ogólnokrajowego Niezależnego Zrzeszenia Studentów.',
                hint: 'http://nzs.org.pl/zarzad-krajowy/',
                answer: 'Białas',
                mainLetter: 'a'
            },
            {
                question: 'Projekt Niezależnego Zrzeszenia Studentów, którego celem jest wyróżnienie studentów o wybitnych osiągnięciach.',
                hint: 'http://nzs.org.pl/studencki-nobel/',
                answer: 'Studencki Nobel',
                mainLetter: 'd'
            },
            {
                question: 'Były członek organizacji.',
                hint: 'https://www.facebook.com/nzsuniwersyteturzeszowskiego/posts/2792610390808747',
                answer: 'Alumn',
                mainLetter: 'a'
            }
        ],
        passwordCompleted: {
            description: 'Wampiriada to cykliczny projekt Niezależnego Zrzeszenia Studentów, promujący bezinteresowne pomaganie innym poprzez oddawanie krwi, zapisy do bazy potencjalnych dawców szpiku oraz szerzenie idei ratowania życia. Działamy w myśl zasady: „1 donacja = 3 życia!”.',
            link: 'https://www.facebook.com/WampiriadaRzeszow'
        }
    }
]

continueButton.addEventListener('click', changeStage, false);

function changeStage() {
    const instructionSection = document.querySelector('#firstSection');
    const crosswordSection = document.querySelector('#secondSection');

    instructionSection.style.opacity = '0';
    setTimeout(() => {
        instructionSection.style.display = 'none';
        crosswordSection.style.display = 'block';
    },1000)
    setTimeout(() => {
        crosswordSection.style.opacity = '1';
        newGame();
    },2000)
}

function newGame() {
    choosenPassword = 0;
    prepareCrossword(choosenPassword);
    prepareQuestions(choosenPassword);
    prepereCompleteModal(choosenPassword);
    const finishButton = document.querySelector('#buttonFinish');

    finishButton.addEventListener('click', () => {
        checkFinish(choosenPassword);
    })
}

function checkFinish(password) {
    const answers = crossword.querySelectorAll('.answer');
    const amountOfQuestions = passwords[password].questions.length;
    let amountOfGoodAnswers = 0;
    answers.forEach((answer,index) => {
        const letters = answer.querySelectorAll('.letter');
        const questionAnswer = passwords[password].questions[index].answer;
        let userAnswer = '';
        letters.forEach(letter => {
            userAnswer += letter.value;
            if (letter.classList.contains('space')) userAnswer+= ' '; 
        })

        if (userAnswer.toLowerCase() == questionAnswer.toLowerCase()) {
            letters.forEach(letter => {
                if (!letter.classList.contains('space')) {
                    letter.classList.add('good-letter');
                    letter.classList.remove('bad-letter');
                }
            })
            amountOfGoodAnswers++;
        }
        else {
            letters.forEach(letter => {
                if (!letter.classList.contains('space')) {
                    letter.classList.add('bad-letter')
                    letter.classList.remove('good-letter');
                }
            })
        }
    })

    console.log(amountOfGoodAnswers);

    if (amountOfGoodAnswers == amountOfQuestions) {
        modal.style.display = 'block';
    }
}

function prepareCrossword(password) {
    let crosswordContent = '';
    let positionOfFirstAnswerMainLetter;
    let index = 0;
    let minMarginLeft;
    for (let answer of passwords[password].questions) {
        crosswordContent =
        `
            <div class="answer answer${index}">
            <p class="index">${index+1}.</p>
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
                    <input class="space letter" type="text" maxlength="0" disabled>
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
        if (index == 0) {
            minMarginLeft = marginLeft;
        }
        else {
            if (minMarginLeft > marginLeft) minMarginLeft = marginLeft;
        }

        let div = crossword.querySelector(`.answer${index}`);
        div.style.marginLeft = marginLeft+'px';
        index++;
    }

    const windowWidth = window.innerWidth;
    if (windowWidth < 500) {
        crossword.style.left = `${Math.abs(minMarginLeft) + 40}px`;
    }

    let answersIndex = crossword.querySelectorAll('.index');
    answersIndex.forEach(index => {
        if (index.innerHTML.slice(0, -1) < 10) {
            index.style.left="-25px";
        }
        else {
            index.style.left="-40px";
        }
    })

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
            <li>${question.question} <a class="hint" target="_blank" href="${question.hint}">[?]</a></li>
        `
    }

    questionsContent += `
        </ol>
        <button id="buttonFinish" class="btn button--finish">
            <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%"/>
            </svg>
            Sprawdź
        </button>
    `
    questions.innerHTML = questionsContent;
}

function prepereCompleteModal(password) {
    const crosswordChoosenPassword = passwords[password];
    let modalContent = '';
    modalContent = `
        <div class="modal-header">
            <p class="modal-title">Gratulację! Już znasz hasło!</p>
            <p class="modal-title-password">${crosswordChoosenPassword.password} </p>
        </div>
        <div class="modal-content">
            <p class="description">${crosswordChoosenPassword.passwordCompleted.description}</p>
            <p>Wiecej informacji znajdziesz <a href="${crosswordChoosenPassword.passwordCompleted.link}" target="_blank">tutaj</a></p>
        </div>
        <div class="modal-footer">
            <button id="buttonCloseModal" class="btn button--close close">
                <svg>
                    <rect x="0" y="0" fill="none" width="100%" height="100%"/>
                </svg>
                Zamknij
            </button>
        </div>
    `

    const modal = document.querySelector('#crosswordCompletedModal');
    modal.innerHTML = modalContent;

    const closeButtons = modal.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display="none";
        })
    })
}

function calculatePosition(positionA, positionB) {  
    let windowWidth = window.innerWidth;
    let inputWidth;
    if (windowWidth <= 550) {
        inputWidth = 17;
    }
    else if (windowWidth <= 880) {
        inputWidth = 22;
    }
    else {
        inputWidth = 36;
    }
    
    let diffrence = positionA - positionB;
    let result = diffrence * inputWidth;
    return result;
}
