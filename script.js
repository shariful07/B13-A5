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
    const loadingSpinner = document.getElementById('spinner');
    loadingSpinner.classList.remove('hidden');
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    loadingSpinner.classList.add('hidden');
    allIssues = data.data;
    renderIssues(allIssues);
}

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
        
                    <div class="p-4" onclick="modalDetails(${issue.id})">
                        <div class="flex justify-between mb-3">
                            <img src="./assets/Open-Status.png" alt="">
                            <span
                                class="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">${issue.priority}</span>
                        </div>
                        <h3 class="text-sm font-semibold mb-2">${issue.title}</h3>
                        <p class="text-[12px] text-gray-600 mb-4">${issue.description}</p>
                        <div class="flex flex-wrap gap-2">
                            ${issue.labels.map(label => `<span class="bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded-full">${label}</span>`).join('')}
                        </div>
                    </div>
                    <div class="text-sm text-gray-500 border-t border-gray-300 p-4 flex justify-between items-center">
                        <div>#${issue.id} by ${issue.author} </div>
                        <div>${new Date(issue.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div class="text-sm text-gray-500 px-4 pb-4 flex justify-between items-center">
                      <div>Assignee: ${issue.assignee}</div>
                      <div>${new Date(issue.updatedAt).toLocaleDateString()}</div>
                    </div>
        
        `;
        issueContainer.appendChild(issueEl);
    });
}

const issueModal = document.getElementById('issue-modal');
async function modalDetails(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const issue = await res.json();
    const issueData = issue.data;
    issueModal.showModal();
    const div = document.createElement('div');
    div.className = 'modal-box lg:min-w-[700px]';
    div.innerHTML = `
    <div class="p-4">
        <h3 class="text-2xl font-semibold mb-2">${issueData.title}</h3>
        <ul class="flex gap-4 text-[12px] text-gray-500 mb-3">
            <li> <span class="bg-[#00A96E] text-white text-xs font-semibold px-2 py-1 rounded-full">${issueData.status}</span></li>
            <li>Opened by ${issueData.author}</li>
            <li>${new Date(issueData.createdAt).toLocaleDateString()}</li>
        </ul>
        <div class="flex flex-wrap gap-2 mb-3">
            ${issueData.labels.map(label => `<span class="bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded-full">${label}</span>`).join('')}
        </div>
        <p class="text-[16px] text-gray-600">${issueData.description}</p>
    </div>
    <div class="flex bg-[#F8FAFC] rounded-md justify-between p-4">
        <div class="text-sm text-gray-500 flex justify-between items-center">
            <div><b>Assignee:</b> <br>
                ${issueData.assignee}
            </div>
        </div>
        <div>
            Priority: <br>
            <span class="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">${issueData.priority}</span>
        </div>
    </div>  
    
    <div class="modal-action">
        <form method="dialog">
            <button class="btn btn-primary border-0">Close</button>
        </form>
    </div>
    `;
    issueModal.innerHTML = '';
    issueModal.appendChild(div);
}

async function searchIssue() {
    const searchInput = document.getElementById('search-inp');
    const query = searchInput.value.trim().toLowerCase();

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    const data = await res.json();
    const allIssues = data.data;
    const filteredIssues = allIssues.filter(issue => issue.title.toLowerCase().includes(query));
    renderIssues(filteredIssues);
}



loadIssues();