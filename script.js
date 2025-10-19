// Computer Architecture 351 - Interactive Study Platform
// Main JavaScript file

// Global variables
let currentSection = 'review';
let currentCardIndex = 0;
let currentQuiz = null;
let currentQuizIndex = 0;
let quizScore = 0;
let matchingPairs = [];
let selectedTerm = null;
let selectedDefinition = null;
let matchCount = 0;
let attemptCount = 0;
let gameStartTime = null;
let studyTimer = null;
let timerInterval = null;
let challengeTimer = null;
let challengeScore = 0;
let challengeQuestions = 0;
let challengeMode = false;

let progress = {
    topicsReviewed: new Set(),
    flashcardsCompleted: 0,
    quizAccuracy: 0,
    matchingGames: 0,
    challengeScore: 0,
    totalQuizAttempts: 0,
    correctQuizAnswers: 0
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeReviewSection();
    initializeFlashcards();
    initializeMatching();
    initializeQuiz();
    initializeChallenge();
    initializeProgress();
    initializeTimer();
    initializeExport();
    loadProgress();
    loadReviewContent();
    
    // Load study data from study-data.js
    if (typeof studyData !== 'undefined') {
        window.studyData = studyData;
        console.log('Study data loaded from study-data.js');
    }
});

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            showSection(targetSection);
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Load section-specific content
        switch(sectionId) {
            case 'review':
                loadReviewContent();
                break;
            case 'flashcards':
                loadFlashcards();
                break;
            case 'matching':
                resetMatchingGame();
                break;
            case 'quiz':
                resetQuiz();
                break;
            case 'challenge':
                resetChallenge();
                break;
            case 'progress':
                updateProgressDisplay();
                break;
        }
    }
}

// Review Section
function initializeReviewSection() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterReviewContent);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterReviewContent);
    }
}

function loadReviewContent() {
    if (!window.studyData || !window.studyData.lectures) return;
    
    const reviewContent = document.getElementById('reviewContent');
    if (!reviewContent) return;
    
    let html = '';
    
    window.studyData.lectures.forEach(lecture => {
        html += `
            <div class="lecture-card" data-lecture="${lecture.id}">
                <h3>${lecture.title}</h3>
        `;
        
        lecture.slides.forEach(slide => {
            html += `
                <div class="slide-section">
                    <h4>${slide.title}</h4>
            `;
            
            slide.content.concepts.forEach(concept => {
                html += `
                    <div class="concept">
                        <div class="concept-term">${concept.term}</div>
                        <div class="concept-definition">${concept.definition}</div>
                        <div class="concept-example">Example: ${concept.example}</div>
                `;
                
                if (concept.keyPoints && concept.keyPoints.length > 0) {
                    html += `
                        <div class="key-points">
                            <h5>Key Points:</h5>
                            <ul>
                    `;
                    concept.keyPoints.forEach(point => {
                        html += `<li>${point}</li>`;
                    });
                    html += `
                            </ul>
                        </div>
                    `;
                }
                
                html += '</div>';
            });
            
            html += '</div>';
        });
        
        html += '</div>';
    });
    
    reviewContent.innerHTML = html;
    
    // Mark topics as reviewed
    window.studyData.lectures.forEach(lecture => {
        progress.topicsReviewed.add(lecture.id);
    });
    saveProgress();
}

function filterReviewContent() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const lectureCards = document.querySelectorAll('.lecture-card');
    
    lectureCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Flashcards
function initializeFlashcards() {
    const flipCard = document.getElementById('flipCard');
    const nextCard = document.getElementById('nextCard');
    const prevCard = document.getElementById('prevCard');
    const shuffleCards = document.getElementById('shuffleCards');
    const topicFilter = document.getElementById('topicFilter');
    const flashcard = document.getElementById('flashcard');
    
    if (flipCard) flipCard.addEventListener('click', flipCurrentCard);
    if (nextCard) nextCard.addEventListener('click', nextFlashcard);
    if (prevCard) prevCard.addEventListener('click', prevFlashcard);
    if (shuffleCards) shuffleCards.addEventListener('click', shuffleFlashcards);
    if (topicFilter) topicFilter.addEventListener('change', filterFlashcardsByTopic);
    if (flashcard) flashcard.addEventListener('click', flipCurrentCard);
    
    // Add event listeners for card action buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('save-card-btn') || e.target.classList.contains('master-card-btn')) {
            e.stopPropagation(); // Prevent card flip
            if (e.target.classList.contains('save-card-btn')) {
                saveCurrentCard();
            } else if (e.target.classList.contains('master-card-btn')) {
                masterCurrentCard();
            }
        }
    });
}

function loadFlashcards() {
    if (!window.studyData || !window.studyData.flashcards) return;
    
    const flashcard = document.getElementById('flashcard');
    const cardTerm = document.getElementById('cardTerm');
    const cardDefinition = document.getElementById('cardDefinition');
    const cardProgress = document.getElementById('cardProgress');
    const cardProgressBar = document.getElementById('cardProgressBar');
    
    if (!flashcard || currentCardIndex >= window.studyData.flashcards.length) return;
    
    const currentCard = window.studyData.flashcards[currentCardIndex];
    cardTerm.textContent = currentCard.term;
    cardDefinition.textContent = currentCard.definition;
    
    // Update progress
    cardProgress.textContent = `${currentCardIndex + 1} / ${window.studyData.flashcards.length}`;
    const progressPercent = ((currentCardIndex + 1) / window.studyData.flashcards.length) * 100;
    cardProgressBar.style.width = `${progressPercent}%`;
    
    // Reset flip state
    flashcard.classList.remove('flipped');
    
    // Update button states based on current card status
    updateCardButtonStates();
}

function flipCurrentCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
}

function nextFlashcard() {
    if (!window.studyData || !window.studyData.flashcards) return;
    
    currentCardIndex = (currentCardIndex + 1) % window.studyData.flashcards.length;
    loadFlashcards();
}

function prevFlashcard() {
    if (!window.studyData || !window.studyData.flashcards) return;
    
    currentCardIndex = currentCardIndex === 0 ? window.studyData.flashcards.length - 1 : currentCardIndex - 1;
    loadFlashcards();
}

function shuffleFlashcards() {
    if (!window.studyData || !window.studyData.flashcards) return;
    
    // Fisher-Yates shuffle
    for (let i = window.studyData.flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [window.studyData.flashcards[i], window.studyData.flashcards[j]] = [window.studyData.flashcards[j], window.studyData.flashcards[i]];
    }
    
    currentCardIndex = 0;
    loadFlashcards();
}

function filterFlashcardsByTopic() {
    const topicFilter = document.getElementById('topicFilter');
    const selectedTopic = topicFilter.value;
    
    if (!window.studyData || !window.studyData.flashcards) return;
    
    // Reload original data first
    if (typeof studyData !== 'undefined') {
        window.studyData = studyData;
    }
    
    if (selectedTopic === 'all') {
        // Show all cards
        currentCardIndex = 0;
        loadFlashcards();
        return;
    }
    
    // Filter cards by topic
    const filteredCards = window.studyData.flashcards.filter(card => {
        // Check if card belongs to the selected topic
        const term = card.term.toLowerCase();
        const definition = card.definition.toLowerCase();
        
        // Topic-based filtering logic
        switch(selectedTopic) {
            case 'assembly':
                return term.includes('add') || term.includes('sub') || term.includes('and') || 
                       term.includes('or') || term.includes('xor') || term.includes('nor') ||
                       term.includes('sll') || term.includes('srl') || term.includes('sra') ||
                       term.includes('slt') || term.includes('mult') || term.includes('div') ||
                       term.includes('jr') || term.includes('jalr') || term.includes('syscall') ||
                       term.includes('addi') || term.includes('andi') || term.includes('ori') ||
                       term.includes('xori') || term.includes('slti') || term.includes('lui') ||
                       term.includes('lw') || term.includes('sw') || term.includes('beq') ||
                       term.includes('bne') || term.includes('j') || term.includes('jal') ||
                       term.includes('$0') || term.includes('$1') || term.includes('$2') ||
                       term.includes('$3') || term.includes('$4') || term.includes('$5') ||
                       term.includes('$6') || term.includes('$7') || term.includes('$8') ||
                       term.includes('$9') || term.includes('$10') || term.includes('$11') ||
                       term.includes('$12') || term.includes('$13') || term.includes('$14') ||
                       term.includes('$15') || term.includes('$16') || term.includes('$17') ||
                       term.includes('$18') || term.includes('$19') || term.includes('$20') ||
                       term.includes('$21') || term.includes('$22') || term.includes('$23') ||
                       term.includes('$24') || term.includes('$25') || term.includes('$26') ||
                       term.includes('$27') || term.includes('$28') || term.includes('$29') ||
                       term.includes('$30') || term.includes('$31') || term.includes('$at') ||
                       term.includes('$v0') || term.includes('$v1') || term.includes('$a0') ||
                       term.includes('$a1') || term.includes('$a2') || term.includes('$a3') ||
                       term.includes('$t0') || term.includes('$t1') || term.includes('$t2') ||
                       term.includes('$t3') || term.includes('$t4') || term.includes('$t5') ||
                       term.includes('$t6') || term.includes('$t7') || term.includes('$t8') ||
                       term.includes('$t9') || term.includes('$s0') || term.includes('$s1') ||
                       term.includes('$s2') || term.includes('$s3') || term.includes('$s4') ||
                       term.includes('$s5') || term.includes('$s6') || term.includes('$s7') ||
                       term.includes('$k0') || term.includes('$k1') || term.includes('$gp') ||
                       term.includes('$sp') || term.includes('$fp') || term.includes('$ra') ||
                       definition.includes('instruction') || definition.includes('register') ||
                       definition.includes('assembly') || definition.includes('mips');
            case 'machine':
                return term.includes('opcode') || term.includes('funct') || term.includes('format') ||
                       term.includes('binary') || term.includes('hexadecimal') || term.includes('encoding') ||
                       definition.includes('opcode') || definition.includes('funct') || definition.includes('format') ||
                       definition.includes('binary') || definition.includes('hexadecimal') || definition.includes('encoding');
            case 'datapath':
                return term.includes('PC') || term.includes('ALU') || term.includes('register') ||
                       term.includes('memory') || term.includes('sign') || term.includes('extender') ||
                       term.includes('adder') || term.includes('control') || term.includes('signal') ||
                       definition.includes('datapath') || definition.includes('processor') || definition.includes('execution');
            case 'control':
                return term.includes('RegWrite') || term.includes('MemRead') || term.includes('MemWrite') ||
                       term.includes('Branch') || term.includes('Jump') || term.includes('ALUSrc') ||
                       term.includes('RegDst') || term.includes('MemtoReg') || term.includes('ALUOp') ||
                       definition.includes('control') || definition.includes('signal') || definition.includes('enable');
            case 'memory':
                return term.includes('cache') || term.includes('memory') || term.includes('RAM') ||
                       term.includes('ROM') || term.includes('L1') || term.includes('L2') ||
                       term.includes('L3') || term.includes('hierarchy') || term.includes('access') ||
                       definition.includes('memory') || definition.includes('cache') || definition.includes('storage');
            default:
                return true;
        }
    });
    
    // Update the flashcards array temporarily
    window.studyData.flashcards = filteredCards;
    
    // Reset to first card
    currentCardIndex = 0;
    loadFlashcards();
    
    // Show filter results
    const cardProgress = document.getElementById('cardProgress');
    if (cardProgress) {
        cardProgress.textContent = `Topic: ${selectedTopic} (${filteredCards.length} cards)`;
    }
}

function saveCurrentCard() {
    if (!window.studyData || !window.studyData.flashcards || currentCardIndex >= window.studyData.flashcards.length) return;
    
    const currentCard = window.studyData.flashcards[currentCardIndex];
    
    // Initialize saved cards if not exists
    if (!progress.savedCards) {
        progress.savedCards = new Set();
    }
    
    // Check if already saved
    const isSaved = progress.savedCards.has(currentCard.term);
    
    if (isSaved) {
        // Un-save the card
        progress.savedCards.delete(currentCard.term);
        updateSaveButton(false);
    } else {
        // Save the card
        progress.savedCards.add(currentCard.term);
        updateSaveButton(true);
    }
    
    saveProgress();
}

function masterCurrentCard() {
    if (!window.studyData || !window.studyData.flashcards || currentCardIndex >= window.studyData.flashcards.length) return;
    
    const currentCard = window.studyData.flashcards[currentCardIndex];
    
    // Initialize mastered cards if not exists
    if (!progress.masteredCards) {
        progress.masteredCards = new Set();
    }
    
    // Check if already mastered
    const isMastered = progress.masteredCards.has(currentCard.term);
    
    if (isMastered) {
        // Un-master the card
        progress.masteredCards.delete(currentCard.term);
        updateMasterButton(false);
    } else {
        // Master the card
        progress.masteredCards.add(currentCard.term);
        updateMasterButton(true);
    }
    
    saveProgress();
}

function updateSaveButton(isSaved) {
    const saveButtons = document.querySelectorAll('.save-card-btn');
    saveButtons.forEach(button => {
        if (isSaved) {
            button.textContent = '✓ Marked for Review';
            button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            button.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.4)';
        } else {
            button.textContent = '📝 Mark for Review';
            button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
        }
    });
}

function updateMasterButton(isMastered) {
    const masterButtons = document.querySelectorAll('.master-card-btn');
    masterButtons.forEach(button => {
        if (isMastered) {
            button.textContent = '✓ Mastered';
            button.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            button.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
        } else {
            button.textContent = '⭐ Master';
            button.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            button.style.boxShadow = '0 4px 15px rgba(240, 147, 251, 0.3)';
        }
    });
}

function updateCardButtonStates() {
    if (!window.studyData || !window.studyData.flashcards || currentCardIndex >= window.studyData.flashcards.length) return;
    
    const currentCard = window.studyData.flashcards[currentCardIndex];
    
    // Check if card is saved
    const isSaved = progress.savedCards && progress.savedCards.has(currentCard.term);
    updateSaveButton(isSaved);
    
    // Check if card is mastered
    const isMastered = progress.masteredCards && progress.masteredCards.has(currentCard.term);
    updateMasterButton(isMastered);
}

// Matching Game
function initializeMatching() {
    const startMatching = document.getElementById('startMatching');
    const resetMatching = document.getElementById('resetMatching');
    
    if (startMatching) startMatching.addEventListener('click', startMatchingGame);
    if (resetMatching) resetMatching.addEventListener('click', resetMatchingGame);
}

function startMatchingGame() {
    if (!window.studyData || !window.studyData.flashcards) return;
    
    // Create pairs from flashcards
    matchingPairs = window.studyData.flashcards.slice(0, 8); // Use first 8 cards
    const terms = [...matchingPairs];
    const definitions = [...matchingPairs];
    
    // Shuffle definitions
    for (let i = definitions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [definitions[i], definitions[j]] = [definitions[j], definitions[i]];
    }
    
    // Render terms
    const termsList = document.getElementById('termsList');
    termsList.innerHTML = '';
    terms.forEach((term, index) => {
        const termElement = document.createElement('div');
        termElement.className = 'term-item';
        termElement.textContent = term.term;
        termElement.dataset.index = index;
        termElement.addEventListener('click', selectTerm);
        termsList.appendChild(termElement);
    });
    
    // Render definitions
    const definitionsList = document.getElementById('definitionsList');
    definitionsList.innerHTML = '';
    definitions.forEach((definition, index) => {
        const definitionElement = document.createElement('div');
        definitionElement.className = 'definition-item';
        definitionElement.textContent = definition.definition;
        definitionElement.dataset.index = index;
        definitionElement.addEventListener('click', selectDefinition);
        definitionsList.appendChild(definitionElement);
    });
    
    // Reset game state
    matchCount = 0;
    attemptCount = 0;
    selectedTerm = null;
    selectedDefinition = null;
    gameStartTime = Date.now();
    
    updateMatchingStats();
}

function selectTerm(event) {
    const termElement = event.target;
    const termIndex = parseInt(termElement.dataset.index);
    
    // Clear previous selection
    document.querySelectorAll('.term-item').forEach(item => item.classList.remove('selected'));
    
    if (termElement.classList.contains('matched')) return;
    
    termElement.classList.add('selected');
    selectedTerm = { element: termElement, index: termIndex, data: matchingPairs[termIndex] };
    
    checkMatch();
}

function selectDefinition(event) {
    const definitionElement = event.target;
    const definitionIndex = parseInt(definitionElement.dataset.index);
    
    // Clear previous selection
    document.querySelectorAll('.definition-item').forEach(item => item.classList.remove('selected'));
    
    if (definitionElement.classList.contains('matched')) return;
    
    definitionElement.classList.add('selected');
    selectedDefinition = { element: definitionElement, index: definitionIndex, data: matchingPairs[definitionIndex] };
    
    checkMatch();
}

function checkMatch() {
    if (!selectedTerm || !selectedDefinition) return;
    
    attemptCount++;
    
    if (selectedTerm.data.term === selectedDefinition.data.term) {
        // Match found
        selectedTerm.element.classList.add('matched');
        selectedDefinition.element.classList.add('matched');
        selectedTerm.element.classList.remove('selected');
        selectedDefinition.element.classList.remove('selected');
        matchCount++;
        
        selectedTerm = null;
        selectedDefinition = null;
        
        if (matchCount === matchingPairs.length) {
            // Game completed
            const timeElapsed = Math.floor((Date.now() - gameStartTime) / 1000);
            alert(`Congratulations! You matched all ${matchCount} pairs in ${timeElapsed} seconds with ${attemptCount} attempts!`);
            progress.matchingGames++;
            saveProgress();
        }
    } else {
        // No match
        setTimeout(() => {
            selectedTerm.element.classList.remove('selected');
            selectedDefinition.element.classList.remove('selected');
            selectedTerm = null;
            selectedDefinition = null;
        }, 1000);
    }
    
    updateMatchingStats();
}

function updateMatchingStats() {
    const matchCountEl = document.getElementById('matchCount');
    const gameTimeEl = document.getElementById('gameTime');
    const attemptCountEl = document.getElementById('attemptCount');
    
    if (matchCountEl) matchCountEl.textContent = matchCount;
    if (attemptCountEl) attemptCountEl.textContent = attemptCount;
    
    if (gameStartTime && gameTimeEl) {
        const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        gameTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function resetMatchingGame() {
    const termsList = document.getElementById('termsList');
    const definitionsList = document.getElementById('definitionsList');
    
    if (termsList) termsList.innerHTML = '<p>Click "Start Game" to begin matching!</p>';
    if (definitionsList) definitionsList.innerHTML = '<p>Click "Start Game" to begin matching!</p>';
    
    matchCount = 0;
    attemptCount = 0;
    selectedTerm = null;
    selectedDefinition = null;
    gameStartTime = null;
    
    updateMatchingStats();
}

// Quiz
function initializeQuiz() {
    const startQuiz = document.getElementById('startQuiz');
    const resetQuiz = document.getElementById('resetQuiz');
    
    if (startQuiz) startQuiz.addEventListener('click', startQuizGame);
    if (resetQuiz) resetQuiz.addEventListener('click', resetQuizGame);
}

function startQuizGame() {
    if (!window.studyData || !window.studyData.quizQuestions) return;
    
    currentQuiz = [...window.studyData.quizQuestions];
    // Shuffle questions
    for (let i = currentQuiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentQuiz[i], currentQuiz[j]] = [currentQuiz[j], currentQuiz[i]];
    }
    
    currentQuizIndex = 0;
    quizScore = 0;
    progress.totalQuizAttempts++;
    
    showQuizQuestion();
}

function showQuizQuestion() {
    if (!currentQuiz || currentQuizIndex >= currentQuiz.length) {
        showQuizResults();
        return;
    }
    
    const question = currentQuiz[currentQuizIndex];
    const quizContent = document.getElementById('quizContent');
    const quizProgressBar = document.getElementById('quizProgressBar');
    const quizProgressText = document.getElementById('quizProgressText');
    
    let html = `
        <div class="question-card">
            <h3>Question ${currentQuizIndex + 1} of ${currentQuiz.length}</h3>
            <p>${question.question}</p>
    `;
    
    if (question.type === 'multiple_choice') {
        html += '<div class="question-options">';
        question.options.forEach((option, index) => {
            html += `
                <div class="option" data-index="${index}">
                    ${option}
                </div>
            `;
        });
        html += '</div>';
    } else if (question.type === 'true_false') {
        html += `
            <div class="question-options">
                <div class="option" data-index="0">True</div>
                <div class="option" data-index="1">False</div>
            </div>
        `;
    } else if (question.type === 'fill_blank') {
        html += `
            <div class="question-options">
                <input type="text" id="fillAnswer" placeholder="Enter your answer..." class="search-input">
            </div>
        `;
    }
    
    html += `
            <div class="quiz-controls">
                <button id="submitAnswer" class="btn btn-primary">Submit Answer</button>
            </div>
        </div>
    `;
    
    quizContent.innerHTML = html;
    
    // Update progress
    const progressPercent = ((currentQuizIndex + 1) / currentQuiz.length) * 100;
    quizProgressBar.style.width = `${progressPercent}%`;
    quizProgressText.textContent = `Question ${currentQuizIndex + 1} of ${currentQuiz.length}`;
    
    // Add event listeners
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', selectQuizOption);
    });
    
    const submitBtn = document.getElementById('submitAnswer');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitQuizAnswer);
    }
}

function selectQuizOption(event) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected');
}

function submitQuizAnswer() {
    const question = currentQuiz[currentQuizIndex];
    let userAnswer = null;
    let isCorrect = false;
    
    if (question.type === 'multiple_choice' || question.type === 'true_false') {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            alert('Please select an answer!');
            return;
        }
        userAnswer = parseInt(selectedOption.dataset.index);
        isCorrect = userAnswer === question.correct;
    } else if (question.type === 'fill_blank') {
        const fillAnswer = document.getElementById('fillAnswer');
        if (!fillAnswer || !fillAnswer.value.trim()) {
            alert('Please enter an answer!');
            return;
        }
        userAnswer = fillAnswer.value.trim().toLowerCase();
        isCorrect = userAnswer === question.correct.toLowerCase();
    }
    
    if (isCorrect) {
        quizScore++;
        progress.correctQuizAnswers++;
    }
    
    // Show feedback
    showQuizFeedback(question, userAnswer, isCorrect);
    
    setTimeout(() => {
        currentQuizIndex++;
        showQuizQuestion();
    }, 2000);
}

function showQuizFeedback(question, userAnswer, isCorrect) {
    const quizContent = document.getElementById('quizContent');
    const feedback = document.createElement('div');
    feedback.className = 'question-card';
    feedback.style.backgroundColor = isCorrect ? '#1B5E20' : '#B71C1C';
    feedback.style.borderColor = isCorrect ? '#4CAF50' : '#F44336';
    
    feedback.innerHTML = `
        <h3>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
        <p>${question.explanation}</p>
    `;
    
    quizContent.innerHTML = '';
    quizContent.appendChild(feedback);
}

function showQuizResults() {
    const quizContent = document.getElementById('quizContent');
    const accuracy = Math.round((quizScore / currentQuiz.length) * 100);
    
    quizContent.innerHTML = `
        <div class="question-card">
            <h3>Quiz Complete!</h3>
            <p>You scored ${quizScore} out of ${currentQuiz.length} questions.</p>
            <p>Accuracy: ${accuracy}%</p>
            <div class="quiz-controls">
                <button id="retakeQuiz" class="btn btn-primary">Retake Quiz</button>
                <button id="newQuiz" class="btn btn-secondary">New Quiz</button>
            </div>
        </div>
    `;
    
    // Update progress
    progress.quizAccuracy = accuracy;
    saveProgress();
    
    // Add event listeners
    const retakeBtn = document.getElementById('retakeQuiz');
    const newBtn = document.getElementById('newQuiz');
    
    if (retakeBtn) retakeBtn.addEventListener('click', startQuizGame);
    if (newBtn) newBtn.addEventListener('click', startQuizGame);
}

function resetQuizGame() {
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <div class="quiz-welcome">
            <h3>Ready to test your knowledge?</h3>
            <p>Click "Start Quiz" to begin with randomized questions covering all topics.</p>
        </div>
    `;
    
    const quizProgressBar = document.getElementById('quizProgressBar');
    const quizProgressText = document.getElementById('quizProgressText');
    
    if (quizProgressBar) quizProgressBar.style.width = '0%';
    if (quizProgressText) quizProgressText.textContent = 'Question 0 of 0';
}

// Challenge Mode
function initializeChallenge() {
    const startChallenge = document.getElementById('startChallenge');
    const resetChallenge = document.getElementById('resetChallenge');
    
    if (startChallenge) startChallenge.addEventListener('click', startChallengeMode);
    if (resetChallenge) resetChallenge.addEventListener('click', resetChallengeMode);
}

function startChallengeMode() {
    challengeMode = true;
    challengeScore = 0;
    challengeQuestions = 0;
    challengeTimer = 10 * 60; // 10 minutes
    
    const challengeContent = document.getElementById('challengeContent');
    challengeContent.innerHTML = `
        <div class="challenge-welcome">
            <h3>Challenge Mode Active!</h3>
            <p>Answer as many questions as possible in 10 minutes!</p>
            <div class="challenge-timer">
                <span id="challengeTimerDisplay">10:00</span>
            </div>
            <div class="challenge-stats">
                <div class="stat">
                    <span class="stat-label">Score:</span>
                    <span id="challengeScoreDisplay">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Questions:</span>
                    <span id="challengeQuestionsDisplay">0</span>
                </div>
            </div>
        </div>
    `;
    
    // Start timer
    const timerInterval = setInterval(() => {
        challengeTimer--;
        updateChallengeTimer();
        
        if (challengeTimer <= 0) {
            clearInterval(timerInterval);
            endChallenge();
        }
    }, 1000);
    
    // Start with a random question
    showChallengeQuestion();
}

function showChallengeQuestion() {
    if (!window.studyData || !window.studyData.quizQuestions) return;
    
    const questions = window.studyData.quizQuestions;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    const challengeContent = document.getElementById('challengeContent');
    
    let html = `
        <div class="question-card">
            <h3>Challenge Question ${challengeQuestions + 1}</h3>
            <p>${randomQuestion.question}</p>
    `;
    
    if (randomQuestion.type === 'multiple_choice') {
        html += '<div class="question-options">';
        randomQuestion.options.forEach((option, index) => {
            html += `<div class="option" data-index="${index}">${option}</div>`;
        });
        html += '</div>';
    } else if (randomQuestion.type === 'true_false') {
        html += `
            <div class="question-options">
                <div class="option" data-index="0">True</div>
                <div class="option" data-index="1">False</div>
            </div>
        `;
    } else if (randomQuestion.type === 'fill_blank') {
        html += `
            <div class="question-options">
                <input type="text" id="challengeFillAnswer" placeholder="Enter your answer..." class="search-input">
            </div>
        `;
    }
    
    html += `
            <div class="quiz-controls">
                <button id="submitChallengeAnswer" class="btn btn-primary">Submit Answer</button>
            </div>
        </div>
    `;
    
    challengeContent.innerHTML = html;
    
    // Add event listeners
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', selectQuizOption);
    });
    
    const submitBtn = document.getElementById('submitChallengeAnswer');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => submitChallengeAnswer(randomQuestion));
    }
}

function submitChallengeAnswer(question) {
    let userAnswer = null;
    let isCorrect = false;
    
    if (question.type === 'multiple_choice' || question.type === 'true_false') {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            alert('Please select an answer!');
            return;
        }
        userAnswer = parseInt(selectedOption.dataset.index);
        isCorrect = userAnswer === question.correct;
    } else if (question.type === 'fill_blank') {
        const fillAnswer = document.getElementById('challengeFillAnswer');
        if (!fillAnswer || !fillAnswer.value.trim()) {
            alert('Please enter an answer!');
            return;
        }
        userAnswer = fillAnswer.value.trim().toLowerCase();
        isCorrect = userAnswer === question.correct.toLowerCase();
    }
    
    if (isCorrect) {
        challengeScore += 10;
    }
    
    challengeQuestions++;
    updateChallengeStats();
    
    // Show next question immediately
    setTimeout(() => {
        showChallengeQuestion();
    }, 500);
}

function updateChallengeTimer() {
    const timerDisplay = document.getElementById('challengeTimerDisplay');
    if (timerDisplay) {
        const minutes = Math.floor(challengeTimer / 60);
        const seconds = challengeTimer % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateChallengeStats() {
    const scoreDisplay = document.getElementById('challengeScoreDisplay');
    const questionsDisplay = document.getElementById('challengeQuestionsDisplay');
    
    if (scoreDisplay) scoreDisplay.textContent = challengeScore;
    if (questionsDisplay) questionsDisplay.textContent = challengeQuestions;
}

function endChallenge() {
    challengeMode = false;
    progress.challengeScore = Math.max(progress.challengeScore, challengeScore);
    saveProgress();
    
    const challengeContent = document.getElementById('challengeContent');
    challengeContent.innerHTML = `
        <div class="challenge-welcome">
            <h3>Challenge Complete!</h3>
            <p>Final Score: ${challengeScore} points</p>
            <p>Questions Answered: ${challengeQuestions}</p>
            <div class="quiz-controls">
                <button id="retryChallenge" class="btn btn-primary">Try Again</button>
            </div>
        </div>
    `;
    
    const retryBtn = document.getElementById('retryChallenge');
    if (retryBtn) {
        retryBtn.addEventListener('click', startChallengeMode);
    }
}

function resetChallengeMode() {
    const challengeContent = document.getElementById('challengeContent');
    challengeContent.innerHTML = `
        <div class="challenge-welcome">
            <h3>Ultimate Study Challenge</h3>
            <p>Test your knowledge with a mix of flashcards, matching, and quiz questions!</p>
            <div class="challenge-timer">
                <span id="challengeTimer">10:00</span>
            </div>
        </div>
    `;
    
    challengeMode = false;
    challengeScore = 0;
    challengeQuestions = 0;
}

// Progress Tracking
function initializeProgress() {
    const clearProgress = document.getElementById('clearProgress');
    if (clearProgress) {
        clearProgress.addEventListener('click', clearAllProgress);
    }
}

function loadProgress() {
    const savedProgress = localStorage.getItem('studyProgress');
    if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        progress = {
            topicsReviewed: new Set(parsed.topicsReviewed || []),
            flashcardsCompleted: parsed.flashcardsCompleted || 0,
            quizAccuracy: parsed.quizAccuracy || 0,
            matchingGames: parsed.matchingGames || 0,
            challengeScore: parsed.challengeScore || 0,
            totalQuizAttempts: parsed.totalQuizAttempts || 0,
            correctQuizAnswers: parsed.correctQuizAnswers || 0
        };
    }
}

function saveProgress() {
    const progressToSave = {
        topicsReviewed: Array.from(progress.topicsReviewed),
        flashcardsCompleted: progress.flashcardsCompleted,
        quizAccuracy: progress.quizAccuracy,
        matchingGames: progress.matchingGames,
        challengeScore: progress.challengeScore,
        totalQuizAttempts: progress.totalQuizAttempts,
        correctQuizAnswers: progress.correctQuizAnswers
    };
    
    localStorage.setItem('studyProgress', JSON.stringify(progressToSave));
}

function updateProgressDisplay() {
    const topicsReviewed = document.getElementById('topicsReviewed');
    const flashcardsCompleted = document.getElementById('flashcardsCompleted');
    const quizAccuracy = document.getElementById('quizAccuracy');
    const matchingGames = document.getElementById('matchingGames');
    const challengeScore = document.getElementById('challengeScore');
    
    if (topicsReviewed) topicsReviewed.textContent = progress.topicsReviewed.size;
    if (flashcardsCompleted) flashcardsCompleted.textContent = progress.flashcardsCompleted;
    if (quizAccuracy) quizAccuracy.textContent = `${progress.quizAccuracy}%`;
    if (matchingGames) matchingGames.textContent = progress.matchingGames;
    if (challengeScore) challengeScore.textContent = progress.challengeScore;
}

function clearAllProgress() {
    if (confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
        progress = {
            topicsReviewed: new Set(),
            flashcardsCompleted: 0,
            quizAccuracy: 0,
            matchingGames: 0,
            challengeScore: 0,
            totalQuizAttempts: 0,
            correctQuizAnswers: 0
        };
        
        localStorage.removeItem('studyProgress');
        updateProgressDisplay();
    }
}

// Timer
function initializeTimer() {
    const startTimer = document.getElementById('startTimer');
    const pauseTimer = document.getElementById('pauseTimer');
    const resetTimer = document.getElementById('resetTimer');
    const closeTimerModal = document.getElementById('closeTimerModal');
    
    if (startTimer) startTimer.addEventListener('click', startStudyTimer);
    if (pauseTimer) pauseTimer.addEventListener('click', pauseStudyTimer);
    if (resetTimer) resetTimer.addEventListener('click', resetStudyTimer);
    if (closeTimerModal) closeTimerModal.addEventListener('click', closeTimerModal);
}

function startStudyTimer() {
    if (studyTimer === null) {
        studyTimer = 25 * 60; // 25 minutes in seconds
    }
    
    timerInterval = setInterval(() => {
        studyTimer--;
        updateTimerDisplay();
        
        if (studyTimer <= 0) {
            clearInterval(timerInterval);
            showTimerComplete();
        }
    }, 1000);
    
    updateTimerDisplay();
}

function pauseStudyTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetStudyTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    studyTimer = 25 * 60;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay && studyTimer !== null) {
        const minutes = Math.floor(studyTimer / 60);
        const seconds = studyTimer % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function showTimerComplete() {
    const modal = document.getElementById('timerModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeTimerModal() {
    const modal = document.getElementById('timerModal');
    if (modal) {
        modal.style.display = 'none';
    }
    resetStudyTimer();
}


// Export Progress
function initializeExport() {
    const exportBtn = document.getElementById('exportProgress');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportProgress);
    }
}

function exportProgress() {
    const progressData = {
        topicsReviewed: Array.from(progress.topicsReviewed),
        flashcardsCompleted: progress.flashcardsCompleted,
        quizAccuracy: progress.quizAccuracy,
        matchingGames: progress.matchingGames,
        challengeScore: progress.challengeScore,
        totalQuizAttempts: progress.totalQuizAttempts,
        correctQuizAnswers: progress.correctQuizAnswers,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'study-progress.json';
    link.click();
    
    URL.revokeObjectURL(url);
}
