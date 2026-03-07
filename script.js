const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
    const userInp = document.getElementById('username-inp');
    const userName = userInp.value;

    const passwordInp = document.getElementById('password-inp');
    const password = passwordInp.value;

    if (userName === 'admin' && password === 'admin123') {
        window.location.href = 'all.html';
    }

});