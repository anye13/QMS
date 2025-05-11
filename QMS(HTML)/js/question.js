// 题目切换逻辑
let currentQuestion = 1;
const totalQuestions = 20;
const questionArea = document.getElementById('question-area');

function switchQuestion(direction) {
    if (currentQuestion + direction < 1 || currentQuestion + direction > totalQuestions) return;

    questionArea.classList.add('slide-exit');
    setTimeout(() => {
        currentQuestion += direction;
        updateQuestionContent();
        questionArea.classList.remove('slide-exit');
        questionArea.classList.add('slide-enter');
        setTimeout(() => questionArea.classList.remove('slide-enter'), 300);
    }, 300);
}

function updateQuestionContent() {
    questionArea.innerHTML = `
        <h2>📝 题目描述（第${currentQuestion}题）</h2>
        <div class="question-text">
            <p>【题目内容】示例题目 ${currentQuestion}...</p>
        </div>
        <div class="button-group">
            <button onclick="switchQuestion(-1)">← 上一题</button>
            <button onclick="toggleExplanation()">查看解析</button>
            <button onclick="switchQuestion(1)">下一题 →</button>
        </div>
    `;
    updateAnswerCard();
}

// 答题卡交互
function updateAnswerCard() {
    const card = document.getElementById('answer-card');
    card.innerHTML = '';

    for (let i = 1; i <= totalQuestions; i++) {
        const status = document.createElement('div');
        status.className = `question-status ${i === currentQuestion ? 'current' : ''}`;
        status.innerHTML = i;
        status.onclick = () => jumpToQuestion(i);
        card.appendChild(status);
    }
}

function jumpToQuestion(num) {
    currentQuestion = num;
    updateQuestionContent();
}

// 解析切换
let isExplanationOpen = false;
function toggleExplanation() {
    const content = document.getElementById('explanation-content');
    const btn = document.getElementById('toggle-explanation');

    isExplanationOpen = !isExplanationOpen;
    content.style.maxHeight = isExplanationOpen ? '500px' : '0';
    btn.textContent = isExplanationOpen ? '收起' : '展开';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateQuestionContent();
    // 为答题卡添加示例状态
    document.querySelectorAll('.question-status').forEach((item, index) => {
        if (index % 3 === 0) item.classList.add('correct');
        if (index % 5 === 0) item.classList.add('wrong');
    });
});