document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        home: document.getElementById('home-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen'),
        leaderboard: document.getElementById('leaderboard-screen')
    };
    
    const buttons = {
        start: document.getElementById('start-btn'),
        leaderboard: document.getElementById('leaderboard-btn'),
        homeFromResults: document.getElementById('home-from-results-btn'),
        homeFromLeaderboard: document.getElementById('home-from-leaderboard-btn'),
        yes: document.getElementById('yes-btn'),
        no: document.getElementById('no-btn'),
        save: document.getElementById('save-btn'),
        share: document.getElementById('share-btn')
    };
    
    const displayElements = {
        questionText: document.getElementById('question-text'),
        progressBar: document.getElementById('progress-bar'),
        questionCounter: document.getElementById('question-counter'),
        finalScore: document.getElementById('final-score'),
        badgeText: document.getElementById('badge-text'),
        categoriesContainer: document.getElementById('categories-container'),
        usernameInput: document.getElementById('username-input'),
        leaderboardTable: document.querySelector('#leaderboard-table tbody')
    };
    
    let quizState = {
        currentQuestion: 0,
        answers: [],
        score: 0,
        categoryScores: {},
        leaderboard: JSON.parse(localStorage.getItem('yanissskaLeaderboard')) || []
    };
    
    Object.keys(categories).forEach(cat => {
        quizState.categoryScores[cat] = { correct: 0, total: 0 };
    });
    
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#9147ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#9147ff", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    buttons.start.addEventListener('click', startQuiz);
    buttons.leaderboard.addEventListener('click', showLeaderboard);
    buttons.homeFromResults.addEventListener('click', () => switchScreen('home'));
    buttons.homeFromLeaderboard.addEventListener('click', () => switchScreen('home'));
    buttons.yes.addEventListener('click', () => handleAnswer(true));
    buttons.no.addEventListener('click', () => handleAnswer(false));
    buttons.save.addEventListener('click', saveScore);
    buttons.share.addEventListener('click', shareResult);
    
    function switchScreen(screenName) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        screens[screenName].classList.add('active');
    }
    
    function startQuiz() {
        shuffleArray(questions);
        quizState.currentQuestion = 0;
        quizState.answers = [];
        quizState.score = 0;
        
        Object.keys(quizState.categoryScores).forEach(cat => {
            quizState.categoryScores[cat] = { correct: 0, total: 0 };
        });
        
        switchScreen('quiz');
        showQuestion();
    }
    
    function showQuestion() {
        if (quizState.currentQuestion >= questions.length) {
            finishQuiz();
            return;
        }
        
        const question = questions[quizState.currentQuestion];
        displayElements.questionText.textContent = question.text;

        const progress = (quizState.currentQuestion / questions.length) * 100;
        displayElements.progressBar.style.width = `${progress}%`;

        displayElements.questionCounter.textContent = 
            `Question ${quizState.currentQuestion + 1}/${questions.length}`;
    }
    
    function handleAnswer(answer) {
        const question = questions[quizState.currentQuestion];

        quizState.answers.push({
            question: question.text,
            answer,
            category: question.category
        });

        if (answer) {
            quizState.categoryScores[question.category].correct++;
        }
        quizState.categoryScores[question.category].total++;

        quizState.currentQuestion++;
        showQuestion();
    }
    
    function finishQuiz() {
        const totalCorrect = Object.values(quizState.categoryScores)
            .reduce((sum, cat) => sum + cat.correct, 0);
        quizState.score = Math.round((totalCorrect / questions.length) * 100);

        displayElements.finalScore.textContent = `${quizState.score}%`;

        const badge = getBadge(quizState.score);
        displayElements.badgeText.textContent = `${badge.name} ${badge.emoji}`;

        displayElements.categoriesContainer.innerHTML = '';
        Object.entries(quizState.categoryScores).forEach(([catId, catData]) => {
            const catScore = catData.total > 0 
                ? Math.round((catData.correct / catData.total) * 100) 
                : 0;
            
            const catElement = document.createElement('div');
            catElement.className = 'category floating';
            catElement.style.animationDelay = `${Math.random() * 0.5}s`;
            catElement.innerHTML = `
                <h3>${categories[catId].name}</h3>
                <div class="category-score">${catScore}%</div>
                <small>${categories[catId].description}</small>
            `;
            
            displayElements.categoriesContainer.appendChild(catElement);
        });

        createResultsChart();

        if (quizState.score >= 80) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#9147ff', '#ad7bff', '#6a23d8']
            });
        }
        
        switchScreen('results');
    }
    
    function getBadge(score) {
        return badges.find(badge => score >= badge.min && score <= badge.max) || badges[0];
    }
    
    function createResultsChart() {
        const ctx = document.getElementById('results-chart').getContext('2d');
        
        const labels = Object.keys(quizState.categoryScores)
            .map(catId => categories[catId].name);
            
        const data = Object.values(quizState.categoryScores).map(cat => {
            return cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0;
        });
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels,
                datasets: [{
                    label: 'Tes scores',
                    data,
                    backgroundColor: 'rgba(145, 71, 255, 0.2)',
                    borderColor: 'rgba(145, 71, 255, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(145, 71, 255, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#f0f0ff',
                            font: {
                                family: 'Poppins',
                                size: 14
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#b0b0c0',
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function saveScore() {
        const username = displayElements.usernameInput.value.trim() || 'Anonyme';

        quizState.leaderboard.push({
            username,
            score: quizState.score,
            date: new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            })
        });

        quizState.leaderboard.sort((a, b) => b.score - a.score);

        if (quizState.leaderboard.length > 50) {
            quizState.leaderboard = quizState.leaderboard.slice(0, 50);
        }

        localStorage.setItem('yanissskaLeaderboard', JSON.stringify(quizState.leaderboard));

        updateLeaderboard();

        alert(`Score enregistré pour ${username} !`);
    }
    
    function updateLeaderboard() {
        displayElements.leaderboardTable.innerHTML = '';
        
        quizState.leaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><span class="rank">${index + 1}</span></td>
                <td>${entry.username}</td>
                <td>${entry.score}%</td>
                <td>${entry.date}</td>
            `;
            
            displayElements.leaderboardTable.appendChild(row);
        });
    }
    
    function showLeaderboard() {
        updateLeaderboard();
        switchScreen('leaderboard');
    }
    
    function shareResult() {
        const badge = getBadge(quizState.score);
        const username = displayElements.usernameInput.value.trim();
        
        shareResults(quizState.score, badge, username);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    switchScreen('home');
});
