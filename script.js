    (function(){
      const form = document.getElementById('contactForm');

      // remove erros antigos
      function clearAllErrors(){
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      }

      function clearErrorFor(element){
        element.classList.remove('error');
        const next = element.nextElementSibling;
        if (next && next.classList.contains('error-message')) next.remove();
      }

      function showError(element, message){
    
        element.classList.add('error');

        const existing = element.nextElementSibling;
        if (existing && existing.classList.contains('error-message')) return;

        const div = document.createElement('div');
        div.className = 'error-message';
        div.textContent = message;
        element.insertAdjacentElement('afterend', div);
      }

      // validação
      form.addEventListener('submit', function(ev){
        ev.preventDefault();
        clearAllErrors();

        let isValid = true;

        const firstName = document.getElementById('firstName');
        const lastName  = document.getElementById('lastName');
        const email     = document.getElementById('email');
        const message   = document.getElementById('message');
        const queryGroup = document.getElementById('queryGroup');
        const consentWrapper = document.querySelector('.checkbox');
        const consent = document.getElementById('consent');

        // Nome
        if (!firstName.value.trim()) {
          showError(firstName, 'Este campo é obrigatório');
          isValid = false;
        }

        // Sobrenome
        if (!lastName.value.trim()) {
          showError(lastName, 'Este campo é obrigatório');
          isValid = false;
        }

        // Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
          showError(email, 'Este campo é obrigatório');
          isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
          showError(email, 'Please enter a valid email address');
          isValid = false;
        }

        // Consulta
        const checkedQuery = document.querySelector("input[name='queryType']:checked");
        if (!checkedQuery) {
          showError(queryGroup, 'Por favor, selecione um tipo de consulta');
          isValid = false;
        } else {
          // marcar visual do radio-item selecionado
          // isso será tratado pelos event listeners abaixo ao mudar
        }

        // Messagem
        if (!message.value.trim()) {
          showError(message, 'Este campo é obrigatório');
          isValid = false;
        }

        // checkbox
        if (!consent.checked) {
          showError(consentWrapper, 'Para enviar este formulário, por favor, concorde em ser contatado');
          isValid = false;
        }

        if (!isValid) {
        
          const firstError = document.querySelector('.error-message');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }

        alert('Form submitted successfully!');
        form.reset();
        // limpar estado visual 
        document.querySelectorAll('.radio-item.selected').forEach(it => it.classList.remove('selected'));
      });

      // limpar erros dinamicamente ao digitar/selecionar 
      ['firstName','lastName','email','message'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', function(){
          clearErrorFor(el);
        });
      });

      // marcar caixa selecionada e remover erro
      document.querySelectorAll("input[name='queryType']").forEach(radio => {
        radio.addEventListener('change', function(e){
          // remove erro do grupo
          const group = document.getElementById('queryGroup');
          clearErrorFor(group);

          // marcar visualmente o radio-item correspondente
          document.querySelectorAll('.radio-item').forEach(it => it.classList.remove('selected'));
          const radioItem = radio.closest('.radio-item');
          if (radioItem) radioItem.classList.add('selected');
        });

        // melhorar clique: se o usuário clicar na .radio-item, ativar o radio
        const item = radio.closest('.radio-item');
        if (item) {
          item.addEventListener('click', function(ev){
            // evitar que o clique no input dispare duas vezes
            const innerRadio = item.querySelector("input[type='radio']");
            if (innerRadio && !innerRadio.checked) {
              innerRadio.checked = true;
              innerRadio.dispatchEvent(new Event('change', { bubbles: true }));
            }
          });
        }
      });

      // limpa erro
      const consent = document.getElementById('consent');
      consent.addEventListener('change', function(){
        clearErrorFor(document.querySelector('.checkbox'));
      });

    })();