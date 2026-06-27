// Validação do formulário de cadastro para criar usuário no sistema.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();
        const nome = document.getElementById('register-name').value;
        const login = document.getElementById('register-login').value;
        const senha = document.getElementById('register-password').value;
        const confirma = document.getElementById('register-confirm').value;
        const error = window.ProtegeCM.validateRegisterForm(nome, login, senha, confirma);
        if (error) {
            window.ProtegeCM.showAlert('register-feedback', error, 'error');
            return;
        }
        window.location.href = 'Home.html';
    });
});
