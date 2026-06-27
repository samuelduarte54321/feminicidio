// Shared helpers for the HTML-only Protege CM project.
window.ProtegeCM = {
    authenticatedKey: 'protegecm-auth',
    userKey: 'protegecm-user',
    validUsers: [
        { login: 'aluna123', senha: 'protege123', nome: 'Aluna Protege' },
        { login: 'cm2026', senha: 'acolhe2026', nome: 'Estudante CM' }
    ],

    setAuthenticatedUser(user) {
        sessionStorage.setItem(this.authenticatedKey, 'true');
        sessionStorage.setItem(this.userKey, user.nome);
    },

    logout() {
        sessionStorage.removeItem(this.authenticatedKey);
        sessionStorage.removeItem(this.userKey);
        window.location.href = '../index.html';
    },

    isAuthenticated() {
        return sessionStorage.getItem(this.authenticatedKey) === 'true';
    },

    getAuthenticatedUser() {
        return sessionStorage.getItem(this.userKey) || 'Usuária';
    },

    requireAuth(redirectTo = '/pages/login.html') {
        if (!this.isAuthenticated()) {
            window.location.href = redirectTo;
        }
    },

    validateLoginForm(login, senha) {
        if (!login || !senha) {
            return 'Preencha RA/e-mail e senha para continuar.';
        }
        const user = this.validUsers.find(item => item.login === login.trim().toLowerCase());
        if (!user) {
            return 'Usuário não encontrado. Verifique os dados informados.';
        }
        if (user.senha !== senha) {
            return 'Senha incorreta. Tente novamente.';
        }
        this.setAuthenticatedUser(user);
        return '';
    },

    validateRegisterForm(nome, login, senha, confirma) {
        if (!nome || !login || !senha || !confirma) {
            return 'Preencha todos os campos para criar sua conta.';
        }
        if (senha.length < 6) {
            return 'A senha precisa ter ao menos 6 caracteres.';
        }
        if (senha !== confirma) {
            return 'As senhas não conferem. Verifique e tente novamente.';
        }
        this.setAuthenticatedUser({ nome: nome.trim(), login: login.trim().toLowerCase() });
        return '';
    },

    showAlert(containerId, message, type = 'error') {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    },

    clearAlert(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
    },

    renderSidebar(activePage = 'home') {
        const sidebarRoot = document.getElementById('sidebar');
        if (!sidebarRoot) return;
        const items = [
            { label: 'Início', href: 'Home.html', icon: '🏠', key: 'home' },
            { label: 'Relacionamentos Abusivos', href: 'relacionamentos-abusivos.html', icon: '💔', key: 'relacionamentos' },
            { label: 'Violência Psicológica', href: 'violencia-psicologica.html', icon: '🧠', key: 'psicologica' },
            { label: 'Violência Física', href: 'violencia-fisica.html', icon: '🤕', key: 'fisica' },
            { label: 'Assédio', href: 'assedio.html', icon: '🚫', key: 'assedio' },
            { label: 'Dependência Emocional', href: 'dependencia-emocional.html', icon: '🤝', key: 'dependencia' },
            { label: 'Direitos da Mulher', href: 'direitos-da-mulher.html', icon: '⚖️', key: 'direitos' },
            { label: 'Denúncias', href: 'denuncias.html', icon: '📩', key: 'denuncias' },
            { label: 'Emergência', href: 'emergencia.html', icon: '🚨', key: 'emergencia' },
            { label: 'Configurações', href: 'configuracoes.html', icon: '⚙️', key: 'configuracoes' },
            { label: 'Perfil', href: 'perfil.html', icon: '👤', key: 'perfil' }
        ];

        sidebarRoot.innerHTML = `
            <div class="sidebar">
                <div class="header">
                    <div class="logo-circle">CM</div>
                    <div class="header-content">
                        <h2>Protege CM</h2>
                        <p>Espaço de acolhimento e proteção.</p>
                    </div>
                </div>
                <nav>
                    <ul class="nav-list">
                        ${items.map(item => `
                            <li class="nav-item"><a class="${activePage === item.key ? 'active' : ''}" href="${item.href}"><span>${item.icon}</span>${item.label}</a></li>
                        `).join('')}
                    </ul>
                </nav>
            </div>
        `;
        // Inicializa comportamento do menu móvel após renderizar sidebar
        this.initMobileMenu();
    },

    renderFooter() {
        const footer = document.getElementById('footer');
        if (!footer) return;
        footer.innerHTML = `
            <div class="footer">
                <p>Protege CM • Projeto Educacional • Escola Estadual Cecília Meireles</p>
                <p><a href="../index.html">Voltar para a página inicial</a> • <a href="https://google.com" target="_blank" rel="noreferrer">Saída rápida</a></p>
            </div>
        `;
    },
    activateTabs() {
        const tabs = document.querySelectorAll('.tab');
        const panels = document.querySelectorAll('.tab-panel');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.target;
                if (!target) return;
                tabs.forEach(item => item.classList.remove('active'));
                panels.forEach(panel => panel.classList.remove('active'));
                tab.classList.add('active');
                const panel = document.getElementById(target);
                if (panel) panel.classList.add('active');
            });
        });
    },
    initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const overlayId = 'mobile-overlay';
        let overlay = document.getElementById(overlayId);
        if (!btn) return;
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = overlayId;
            overlay.className = 'mobile-overlay';
            document.body.appendChild(overlay);
        }

        const openMenu = () => document.body.classList.add('show-mobile-sidebar');
        const closeMenu = () => document.body.classList.remove('show-mobile-sidebar');

        btn.addEventListener('click', (e) => { e.stopPropagation(); openMenu(); });
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking a sidebar link
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.addEventListener('click', (e) => {
                const a = e.target.closest('a');
                if (a) closeMenu();
            });
        }
    },
    prepareSms() {
        const text = encodeURIComponent('Estou em situação de emergência. Minha localização é: (latitude, longitude).');
        window.location.href = `sms:?body=${text}`;
    },

    requestLocation(outputId = 'location-output') {
        const output = document.getElementById(outputId);
        if (!output) return;
        if (!navigator.geolocation) {
            output.textContent = 'Geolocalização não é suportada neste navegador.';
            return;
        }
        navigator.geolocation.getCurrentPosition(
            position => {
                output.textContent = `Latitude: ${position.coords.latitude.toFixed(6)}, Longitude: ${position.coords.longitude.toFixed(6)}`;
            },
            () => {
                output.textContent = 'Não foi possível obter sua localização. Verifique as permissões do navegador.';
            }
        );
    }
};
