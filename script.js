const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const userInp = document.getElementById('username-inp');
        const userName = userInp.value;

        const passwordInp = document.getElementById('password-inp');
        const password = passwordInp.value;

        if (userName === 'admin' && password === 'admin123') {
            window.location.href = 'all.html';
        }

    });
}

const allTab = document.getElementById('all-tab');
const openTab = document.getElementById('open-tab');
const closedTab = document.getElementById('closed-tab');
function filterIssue(id) {
    allTab.classList.add('btn-outline')
    openTab.classList.add('btn-outline')
    closedTab.classList.add('btn-outline')

    allTab.classList.remove('btn-primary')
    openTab.classList.remove('btn-primary')
    closedTab.classList.remove('btn-primary')

    const selected = document.getElementById(id);


    selected.classList.remove('btn-outline');
    selected.classList.add('btn-primary')

    if (id == 'all-tab') {
        renderIssues(allIssues);
    }
    else if (id == 'open-tab') {
        const openIssues = allIssues.filter(issue => issue.status === 'open');
        renderIssues(openIssues);
    }
    else if (id == 'closed-tab') {
        const closedIssues = allIssues.filter(issue => issue.status === 'closed');
        renderIssues(closedIssues);
    }
}

let allIssues = [];

async function loadIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    allIssues = data.data;
    renderIssues(allIssues);
}
loadIssues();

function renderIssues(issues) {
    const issueContainer = document.getElementById('issue-container');
    const issueCount = document.getElementById('issue-count');
    issueContainer.innerHTML = '';
    issueCount.innerText = `${issues.length} Issues`;
    issues.forEach(issue => {
        const issueEl = document.createElement('div');
        const borderColor =
            issue.status === "open" ? "border-green-500" : "border-purple-500";
        issueEl.className = `bg-white rounded-lg shadow h-[100%] border-t-4 ${borderColor}`;
        issueEl.innerHTML = `
        
                    <div class="p-4">
                        <div class="flex justify-between mb-3">
                            <img src="./assets/Open-Status.png" alt="">
                            <span
                                class="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">${issue.priority}</span>
                        </div>
                        <h3 class="text-sm font-semibold mb-2">${issue.title}</h3>
                        <p class="text-[12px] text-gray-600 mb-4">${issue.description}</p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                class="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">BUG</span>
                            <span
                                class="bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded-full">HELP
                                WANTED</span>
                        </div>
                    </div>
                    <div class="text-sm text-gray-500 border-t border-gray-300 p-4">by ${issue.author} <br> ${issue.createdAt}</div>
        
        `;
        issueContainer.appendChild(issueEl);
    });
}