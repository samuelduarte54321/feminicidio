// Validação do formulário de login para acessar o sistema.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if (!form) return;

    if (window.ProtegeCM && window.ProtegeCM.isAuthenticated()) {
        window.location.href = 'Home.html';
        return;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        const login = document.getElementById('login-username').value;
        const senha = document.getElementById('login-password').value;
        const error = window.ProtegeCM.validateLoginForm(login, senha);
        if (error) {
            window.ProtegeCM.showAlert('login-feedback', error, 'error');
            return;
        }
        window.location.href = 'Home.html';
    });
});
