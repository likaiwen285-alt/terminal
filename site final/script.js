document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const linkToRegister = document.getElementById('link-to-register');
    const linkToLogin = document.getElementById('link-to-login');
    const subtitle = document.getElementById('auth-subtitle');
    const globalError = document.getElementById('global-error');
    
    const regPassword = document.getElementById('reg-password');
    const regConfirm = document.getElementById('reg-confirm');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    // 1. Bascule d'affichage des formulaires
    const toggleFormDisplay = (showForm, hideForm, title) => {
        globalError.style.display = 'none';
        hideForm.style.display = 'none';
        showForm.style.display = 'block';
        subtitle.textContent = title;
        showForm.querySelector('input').focus();
    };

    linkToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFormDisplay(formRegister, formLogin, "Formulaire d'Enregistrement Pédagogique");
    });

    linkToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFormDisplay(formLogin, formRegister, "Portail de Connexion Élèves");
    });

    // 2. Gestion des boutons d'affichage/masquage du mot de passe
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.add('visible');
                this.setAttribute('aria-label', 'Masquer le mot de passe');
            } else {
                input.type = 'password';
                this.classList.remove('visible');
                this.setAttribute('aria-label', 'Afficher le mot de passe');
            }
        });
    });

    // 3. Mesure en temps réel de la force du mot de passe
    regPassword.addEventListener('input', () => {
        const val = regPassword.value;
        let score = 0;

        if (!val) {
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            return;
        }

        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++; // Caractère spécial

        if (score <= 2) {
            strengthBar.style.width = '33%';
            strengthBar.className = 'strength-bar faible';
            strengthText.textContent = 'Sécurité faible 🔴';
        } else if (score <= 4) {
            strengthBar.style.width = '66%';
            strengthBar.className = 'strength-bar moyen';
            strengthText.textContent = 'Sécurité moyenne 🟡';
        } else {
            strengthBar.style.width = '100%';
            strengthBar.className = 'strength-bar fort';
            strengthText.textContent = 'Sécurité forte (Idéal) 🟢';
        }
    });

    // 4. Interception et validation stricte à la soumission
    formRegister.addEventListener('submit', (e) => {
        globalError.style.display = 'none';

        if (regPassword.value !== regConfirm.value) {
            e.preventDefault();
            showError("Erreur : La confirmation de ton code de securité ne correspond pas au mot de passe saisi.");
            regConfirm.focus();
        }
    });

    function showError(message) {
        globalError.textContent = message;
        globalError.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
