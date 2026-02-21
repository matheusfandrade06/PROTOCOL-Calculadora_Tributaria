const mobileBtn = document.querySelector(".btn-mobile");
const navlinks = document.getElementById("nav-links");
const icon = document.querySelector(".btn-mobile i");
mobileBtn.addEventListener('click', () => {
    navlinks.classList.toggle('show');
    icon.classList.toggle('fa-times');
    icon.classList.toggle('fa-bars');
})

const loginBtn = document.querySelector(".btn-login");
const loginbox = document.getElementById("login-box");
const passwordbox = document.getElementById("password-box");
loginBtn.addEventListener('click', () => {
    loginbox.classList.toggle('show');
    passwordbox.classList.toggle('show');
})

//A) Função de Seleção de Opções/Botões
function selectButton(event, containerSelector) {//*)Essa função tem como objetivo possibilitar a marcação e desmarcação de Opções/Botões. partindo da lógica que: sempre que uma opção é selecionada, as demais são desmarcadas para não atrapalhar no cálculo. 
    const clickedButton = event.currentTarget; //1) a função recebe o alvo(botão) do evento(click) que ocasionou o início da função;
    const container = clickedButton.closest (containerSelector); // 2) a Função Armazena o container Pai(Ancestral) do 'alvo'. Isso significa que essa variável irá conter todas as opções(botões) disponíveis para escolha no local em que o alvo foi selecionado;
    
    if(container) {
        const buttons = container.querySelectorAll('button'); //3) A função transferiu todas as opções(Botões) que estavam no Container pai(ancestral) para esta variável, incluindo o próprio alvo. criando uma Lista de Opções(Botões);
        buttons.forEach(btn => { //4) Neste trecho, a Função irá rodar uma estrutura de repetição para cada item da lista montada anteriormente;
            if(btn !== clickedButton){ //4.1) A função identifica se a opção(botão) analisada é o 'alvo' preenchido inicialmente;
            btn.classList.remove('selected'); //4.2) caso não seja, a função ira remover a class='selected' caso ela tenha. fazendo com que nenhuma outra Opção(botão) esteja selecionada quando o 'alvo' receber a class='selected'; 
            } 
        });
        clickedButton.classList.toggle('selected'); //5) Após verificar todas as Opções(botões) que não são o 'alvo', a função segue até o momento em que adiciona a class='selected' no 'alvo'. OBS: A utilização do 'toggle' possibilita a ação de desmarcar a opção ja selecionada;
    }
}

//B)Função de Atualizar Escolha
function atualizarUIResultados(botao, iconSelected, descriptionSelected) { //Essa função tem como objetivo: Duplicar a opção(botão) escolhido em outra DIV  nesse site, essa funcionalidade será usada para montar um Layout intuitivo com um relatório demonstrando as escolhas preenchidas e os valores calculados;
    const imgBotao = botao.querySelector('img');
    const textoBotao = botao.textContent; // Pega o texto do botão
    
    const iconeDestino = document.getElementById(iconSelected) || document.querySelector(`.${iconSelected}`); // Essa condicional OU(||) serve para que: mesmo que a div de descrição seja 'id' ou 'class', a função funcionará
    const descricaoDestino = document.querySelector(`.${descriptionSelected}`) || document.getElementById(descriptionSelected);

    if (imgBotao && iconeDestino) {
        iconeDestino.src = imgBotao.src;
    }
    
    if (textoBotao && descricaoDestino) {
        descricaoDestino.textContent = textoBotao;
    }
}

//C) Botões de tipo - possuem a Função de fazer a troca de Grid (Comercio/serviço)
const servicoSelected = document.getElementById("servico");
const comercioSelected = document.getElementById("comercio");
const gridServico = document.getElementById("subtipos-servico");
const gridComercio = document.getElementById("subtipos-comercio");
const gridSubtipos = document.getElementById("sub-tipo");
const resultsType = document.querySelector("type-selected");
const resultsSubType = document.querySelector("subtype-selected");
const anexoSelect = document.querySelector("anexo-selected");
const typeButtons = document.querySelectorAll('.opcoes button');
typeButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        // 1. Primeiro, marca o botão como selecionado
        selectButton(event, '.opcoes');

        const selectedButton = document.querySelector('.opcoes button.selected');
        if (!selectedButton) { // 2. Verifica se ainda existe algum botão selecionado no container
            //2.1 Se nenhum botão estiver selecionado, esconde todos os grids
            gridServico.classList.remove('show');
            gridComercio.classList.remove('show');
            gridSubtipos.classList.remove('show');
        } else {
            // 3. Se houver seleção, decide qual grid mostrar
            if (comercioSelected.classList.contains('selected')) {
                gridServico.classList.remove('show');
                gridComercio.classList.add('show');
                gridSubtipos.classList.add('show');
            } else if (servicoSelected.classList.contains('selected')) {
                gridComercio.classList.remove('show');
                gridServico.classList.add('show');
                gridSubtipos.classList.add('show');
            }
        }

        if (btn.classList.contains('selected')) { //4. Verifica se o botão clicado possui a class='selected' e então executa a função anterior;
            atualizarUIResultados(btn, 'results-type-icon', 'results-type-description');
        }
    });
});

const MEISelected = document.getElementById('escolha-mei');
const SNSelected = document.getElementById('escolha-sn');
const PFSelected = document.getElementById('escolha-pf');
const escolhaIC = document.querySelector(".ic");
const escolhaINSSmei = document.querySelector(".inss-mei");
const escolhaINSSsn = document.querySelector(".inss-sn");
const escolhaINSSpf = document.querySelector(".inss-pf");
const escolhaIRPFmei = document.querySelector(".irpf-mei");
const escolhaIRPFsn = document.querySelector(".irpf-sn");
const escolhaIRPFpf = document.querySelector(".irpf-pf");
const escolhaSN = document.querySelector(".sn");
const escolhaMEI = document.querySelector(".mei");
const chooseButtons = document.querySelectorAll('#escolha-tipo button');
const inss_PF_escolha = document.getElementById('opcao-inss-pf');
const inss_MEI_escolha = document.getElementById('opcao-inss-mei');
const inss_SN_escolha = document.getElementById('opcao-inss-sn');
console.log('choose buttons', chooseButtons);
chooseButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        // 1. Primeiro, marca o botão como selecionado
        selectButton(event, '#escolha-tipo');

        const selectedButton = document.querySelector('#escolha-tipo button.selected');
        if (!selectedButton) { // 2. Verifica se ainda existe algum botão selecionado no container
            //2.1 Se nenhum botão estiver selecionado, esconde todos os grids
            escolhaIC.classList.remove('show');
            escolhaINSSmei.classList.remove('show');
            escolhaINSSpf.classList.remove('show');
            escolhaINSSsn.classList.remove('show');
            escolhaIRPFmei.classList.remove('show');
            escolhaIRPFpf.classList.remove('show');
            escolhaIRPFsn.classList.remove('show');
            escolhaSN.classList.remove('show');
            escolhaMEI.classList.remove('show');
            inss_PF_escolha.classList.remove('show');
            inss_SN_escolha.classList.remove('show');
            inss_MEI_escolha.classList.remove('show');
        } else {
            // 3. Se houver seleção, decide qual grid mostrar
            if (MEISelected.classList.contains('selected')) {
             escolhaIC.classList.remove('show');
             escolhaINSSmei.classList.add('show');
             escolhaINSSpf.classList.remove('show');
             escolhaINSSsn.classList.remove('show');
             inss_PF_escolha.classList.remove('show');
             inss_MEI_escolha.classList.add('show');
             inss_SN_escolha.classList.remove('show');
             escolhaIRPFmei.classList.add('show');
             escolhaIRPFpf.classList.remove('show');
             escolhaIRPFsn.classList.remove('show');
             escolhaSN.classList.remove('show');
             escolhaMEI.classList.add('show');
            } else if (SNSelected.classList.contains('selected')) {
             escolhaIC.classList.remove('show');
             escolhaINSSmei.classList.remove('show');
             escolhaINSSpf.classList.remove('show');
             escolhaINSSsn.classList.add('show');
             escolhaIRPFmei.classList.remove('show');
             escolhaIRPFpf.classList.remove('show');
             escolhaIRPFsn.classList.add('show');
             escolhaSN.classList.add('show');
             escolhaMEI.classList.remove('show');
             inss_PF_escolha.classList.remove('show');
             inss_MEI_escolha.classList.remove('show');
             inss_SN_escolha.classList.add('show');
            } else if (PFSelected.classList.contains('selected')) {
             escolhaIC.classList.add('show');
             escolhaINSSmei.classList.remove('show');
             escolhaINSSpf.classList.add('show');
             escolhaINSSsn.classList.remove('show');
             escolhaIRPFmei.classList.remove('show');
             escolhaIRPFpf.classList.add('show');
             escolhaIRPFsn.classList.remove('show');
             escolhaSN.classList.remove('show');
             escolhaMEI.classList.remove('show');
             inss_PF_escolha.classList.add('show');
             inss_MEI_escolha.classList.remove('show');
             inss_SN_escolha.classList.remove('show');
            }
        }

    });
});

//D) Selecionar o Botão do subtipos (.subtipos-grid)
const subTypeSelect = document.querySelectorAll('#subtipos-servico button, #subtipos-comercio button');
subTypeSelect.forEach(btn => { //1. Criação de uma estrutura de repetição na variável que contém a lista das opções(botões) disponíveis.
    btn.addEventListener('click', (event) => { //1.1 nessa estrutura de repetição, ela adiciona uma 'escuta' em cada opção(botão), que será acionada sempre que ela for clicada/selecionada.
        selectButton(event, '#sub-tipo'); //1.2 após identificar que uma opção(botão) foi Clicada/selecionada, a função executará a função selectButton para definir que apenas essa opção(botão) esteja como 'escolhida'(selected) 

        if (btn.classList.contains('selected')) {
         atualizarUIResultados(btn, 'results-subtype-icon', 'results-subtype-description'); //2. Após executar o selectButton(), a função confirma que a opção(botão) está com o status(class) de escolhido(selected) e então parte para executar as outras duas funções 
         calcularImpostos();
         atualizarClonesTotais();
        }
    });
});

//F) slider do Pro-labore
const slider = document.getElementById('sliderProLabore');
const display = document.getElementById('valorPercentual');
const infoFatorR = document.getElementById('infoFatorR');
slider.addEventListener('input', (e) => {
    const valor = e.target.value; 
    display.textContent = `${valor}%`;

    atualizarValorProLabore();
    calcularImpostos(); 
    atualizarClonesTotais();
    // Dica visual: muda a cor da mensagem se atingir os 28%
    if (valor >= 28) {
        infoFatorR.style.color = "green";
        infoFatorR.textContent = "✅ Fator R Ativado (Anexo III)";
    } else {
        infoFatorR.style.color = "#cc0000";
        infoFatorR.textContent = "⚠️ Abaixo de 28% (Anexo V - Mais imposto)";
    }
});

//G) Preenchimento automático da FS12 a partir do Pro-labore + Receita Mensal
function atualizarValorProLabore() {
    const faturamentoInput = document.querySelector('.valor-rbt-input'); // Ajuste o ID se necessário
    const slider = document.getElementById('sliderProLabore');
    const campoDestino = document.getElementById('valor-fs-1');
    
    if (faturamentoInput && slider && campoDestino) {
        const faturamento = converterParaNumero(faturamentoInput.value) || 0;
        const percentual = parseFloat(slider.value) / 100;
        const listaReplicar = document.querySelector('#fs12');

        // Executa o cálculo: Faturamento * (Percentual / 100)
        const resultado = faturamento * percentual;
        // Preenche o campo de destino formatando para 2 casas decimais
        campoDestino.value = formatarMoeda(resultado.toFixed(2));
        
        replicar(listaReplicar);
        
    }
}


