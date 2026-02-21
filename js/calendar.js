// Configuração do Calendário Profissional
const mesesNomes = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

flatpickr("#calendario-button, #month-select", {
    locale: "pt", // Traduz para português
    dateFormat: "F/Y", // Formato: Janeiro/2024
    disableMobile: "true", // Garante que o visual apareça no celular também
    static: false, // Garante que ele não fique "preso" ao fluxo do HTML
    appendTo: document.body, // Força o calendário a ser criado no final do HTML 
    allowInput: true, // Impede que o Flatpickr tente "controlar" o input via CSS interno
    plugins: [
        new monthSelectPlugin({
            shorthand: false, // Se true, exibe "Jan", se false, "Janeiro"
            dateFormat: "F/Y", // Formato que será enviado para o input
            altFormat: "F/Y",
            theme: "dark" // Mantém o tema escuro
        })
    ],
    // Configura para selecionar apenas Mês e Ano (padrão contábil)
    onReady: function(selectedDates, dateStr, instance) {
        // Estilização extra para combinar com o PROTOCOL
        instance.calendarContainer.style.fontFamily = "Inter";
    },
    
    onChange: function(selectedDates, dateStr) {
        if (selectedDates.length === 0) return;

        const dataSelecionada = selectedDates[0];
       
        // Quando o usuário escolhe, preenche o campo de busca automaticamente
        const inputBusca = document.getElementById('month-select');
        const dataSearch = document.getElementById('data-search');
        if (inputBusca) {
            inputBusca.value = dateStr;
            
            // Efeito visual de foco
            dataSearch.style.borderColor = "#2ecc71";
            setTimeout(() => dataSearch.style.borderColor = "", 1000);
        }
         // 1. Preenche o campo de busca (ex: Janeiro/2026)
        const mesAtualStr = mesesNomes[dataSelecionada.getMonth()];
        const anoAtualStr = dataSelecionada.getFullYear();
        inputBusca.value = `${mesAtualStr}/${anoAtualStr}`;

        // 2. Lógica para atualizar os 12 meses anteriores
        atualizarMeses(dataSelecionada);
    }
});

function atualizarMeses(dataReferencia) {
    const mesesRBT = document.querySelectorAll('.dados-rbt form h4');
    const mesesFS = document.querySelectorAll('.dados-fs form h4');

    let mesesAnteriores = [];
    for (let i = 12; i >= 1; i--) {
        let d = new Date(dataReferencia.getFullYear(), dataReferencia.getMonth() - i, 1);
        mesesAnteriores.push(`${mesesNomes[d.getMonth()]}/${d.getFullYear()}`);
    }

    const aplicarAnimacao = (elementos) => { //momento em que é atribuido o mês para o h4
        elementos.forEach((h4, index) => {
            const novoTexto = mesesAnteriores[index];
            
            // Criamos o HTML interno com a span
            h4.innerHTML = `<span class="atualizando-texto">${novoTexto}</span>`;

            // Opcional: Efeito cascata (um mês após o outro)
            const span = h4.querySelector('span');
            span.style.animationDelay = `${index * 0.03}s`;
        });
    };

    aplicarAnimacao(mesesRBT);
    aplicarAnimacao(mesesFS);
}