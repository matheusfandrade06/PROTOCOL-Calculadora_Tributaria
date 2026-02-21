let dados = {
    sn: 0,
    mei: 0,
    iss: 0,
    icms: 0,
    icmsST: 0,
    icmsFCP: 0,
    inssSN: 0,
    inssMEI: 0,
    inssPF: 0,
    inssPF_simplificado: 0,
    inssPF_normal: 0,
    irpfSN: 0,
    irpfMEI: 0,
    irpfPF: 0,
    rbt12: 0,
    fs12: 0,
    aliqEfetiva: 0,
    fatorR: 0,
    faturamentoMes: 0,
    totalMEI: 0,
    totalSN: 0,
    totalPF: 0,
    // Bases de Cálculos--------
    salarioMinimo: 1621, 
    anexoChave: 0,
    tetoINSS: 988.09,
    tetoMEI: 81000,
    bcINSSmei: 0,
    bcINSSsn: 0,
    bcINSSpf: 0,
    bcIRPFmei: 0,
    isencao_irpf_mei: 0,
    bcIRPFsn: 0,
    bcIRPFpf: 0,
    anexoSN: 0,
    // C) Alíquotas: 
    aliqINSSnormal: 0.20,
    aliqINSSsimplificado: 0.11,
    aliqINSScomplementar: 0.15,
    aliqRAT: 0.01,
    aliqISS: 0.05,
    aliqICMS: 0.205,
    aliqICMSst: 0,
    aliqICMSfcp: 0.27,
    aliq_ic_escolhido: 0,
    percentualIsencaoMEI_comercio: 0.08,
    percentualIsencaoMEI_servico: 0.32,
    percentualIsencaoMEI_transporte: 0.16,
    percentual_escolhido: 0,
    anexoChave: 0,
    aliqIRPF_pf: 0,
    faixaIRPF_pf: 0,
    deducaoIRPF_pf: 0,
    aliqIRPF_sn: 0,
    faixaIRPF_sn: 0,
    deducaoIRPF_sn: 0,
    aliqIRPF_mei: 0,
    faixaIRPF_mei: 0,
    deducaoIRPF_mei: 0,
    faixaSN: 0,
    aliq_sn: 0,
    deducao_sn: 0,
    //D) Gráfico low(-50%)
    baixaReceitaPercentual: 0.5,
    ISSlow: 0,
    ICMSlow: 0,
    IRPFMEIlow: 0,
    IRPFSNlow: 0,
    IRPFPFlow: 0,
    INSSMEIlow: 0,
    INSSSNlow: 0,
    INSSPFlow: 0,
    MEIlow: 0,
    SNlow: 0,
    SNlowTOTAL: 0,
    MEIlowTOTAL: 0,
    PFlowTOTAL: 0,
    //E) Gráfico high(+50%)
    altaReceitaPercentual: 1.5,
    ISShigh: 0,
    ICMShigh: 0,
    IRPFMEIhigh: 0,
    IRPFSNhigh: 0,
    IRPFPFhigh: 0,
    INSSMEIhigh: 0,
    INSSSNhigh: 0,
    INSSPFhigh: 0,
    MEIhigh: 0,
    SNhigh: 0,
    SNhighTOTAL: 0,
    MEIhighTOTAL: 0,
    PFhighTOTAL: 0
}
//------------------- I) TABELAS DE CÁLCULO -------------------  
const tabelasSimples = {
    anexo1: [ // Comércio
        { limite: 180000, aliq: 0.04, deducao: 0 },
        { limite: 360000, aliq: 0.073, deducao: 5940 },
        { limite: 720000, aliq: 0.095, deducao: 13860 },
        { limite: 1800000, aliq: 0.107, deducao: 22500 },
        { limite: 3600000, aliq: 0.143, deducao: 87300 },
        { limite: 4800000, aliq: 0.19, deducao: 378000 }
    ],
    anexo3: [ // Serviços (Locação, Manutenção, etc.)
        { limite: 180000, aliq: 0.06, deducao: 0 },
        { limite: 360000, aliq: 0.112, deducao: 9360 },
        { limite: 720000, aliq: 0.135, deducao: 17640 },
        { limite: 1800000, aliq: 0.16, deducao: 35640 },
        { limite: 3600000, aliq: 0.21, deducao: 125640 },
        { limite: 4800000, aliq: 0.33, deducao: 648000 }
    ],
    anexo4: [// Serviços (construção civil, advocacia, etc)

        { limite: 180000, aliq: 0.045, deducao: 0 },
        { limite: 360000, aliq: 0.09, deducao: 8100 },
        { limite: 720000, aliq: 0.102, deducao: 12420 },
        { limite: 1800000, aliq: 0.14, deducao: 39780 },
        { limite: 3600000, aliq: 0.22, deducao: 183780 },
        { limite: 4800000, aliq: 0.33, deducao: 828000 }
       
    ],
    anexo5: [// Serviços (Representante comercial, Software, etc)

        { limite: 180000, aliq: 0.155, deducao: 0 },
        { limite: 360000, aliq: 0.18, deducao: 4500 },
        { limite: 720000, aliq: 0.195, deducao: 9900 },
        { limite: 1800000, aliq: 0.205, deducao: 17100 },
        { limite: 3600000, aliq: 0.23, deducao: 62100 },
        { limite: 4800000, aliq: 0.305, deducao: 540000 }
    ],
    anexo1st: [ // Tabela para o ST
        { limite: 180000, aliq: 0.04, deducao: 0, reparticaoICMS: 0.34 },
        { limite: 360000, aliq: 0.073, deducao: 5940, reparticaoICMS: 0.34 },
        { limite: 720000, aliq: 0.095, deducao: 13860, reparticaoICMS: 0.335 },
        { limite: 1800000, aliq: 0.107, deducao: 22500, reparticaoICMS: 0.335 },
        { limite: 3600000, aliq: 0.143, deducao: 87300, reparticaoICMS: 0.335 },
        { limite: 4800000, aliq: 0.19, deducao: 378000, reparticaoICMS: 0.0 } //ICMS calculado por fora do Simples
    ],
    anexo1fcp: [ // Tabela para o Superfulo + FCP 
        { limite: 180000, aliq: 0.04, deducao: 0 },
        { limite: 360000, aliq: 0.073, deducao: 5940 },
        { limite: 720000, aliq: 0.095, deducao: 13860 },
        { limite: 1800000, aliq: 0.107, deducao: 22500 },
        { limite: 3600000, aliq: 0.143, deducao: 87300 },
        { limite: 4800000, aliq: 0.19, deducao: 378000 }
    ]
    // Adicione os outros anexos conforme necessário
};
const dadosAnexos = { // Dicionário com as informações dos anexos presentes na lista de sub-tipos. Esse Dicionário tem como objetivo alinhar o layout de RESULTADOS com as opções escolhidas anteriormente
    'anexo1': { nome: 'Anexo I', img: 'img/anexo1.png' }, // Comércio
    'anexo1st': { nome: 'Anexo I', img: 'img/anexo1.png' }, // Comércio
    'anexo3': { nome: 'Anexo III', img: 'img/anexo3.png' }, // Serviços
    'anexo4': { nome: 'Anexo IV', img: 'img/anexo4.png' }, // Limpeza/Vigilância
    'anexo5': { nome: 'Anexo V', img: 'img/anexo5.png' }   // Intelectuais
};
const mapeamentoAnexos = { //FALTA COMPLETAR
    // Comércio
    'comercio-geral': 'anexo1',
    'roupa': 'anexo1',   
    'higiene': 'anexo1st',   
    'auto-pecas': 'anexo1st',   
    'material-construcao': 'anexo1st', 
    'limpeza': 'anexo1st',     
    'restaurant': 'anexo1st',    
    'joias': 'anexo1fcp',      
    // Serviços
    'medico': 'anexo5',
    'advogado': 'anexo4',
    'contabilidade': 'anexo3',
    'construcao': 'anexo4',
    'estetica': 'anexo3',
    'ensino': 'anexo3',
    'academia': 'anexo3',
    'representante': 'anexo5',
    'software': 'anexo5',
    'manutencao': 'anexo3',
    'transporte': 'anexo3',
    'limpeza': 'anexo4'
};

const tabelaIRPF = [ //Tabela do Imposto de renda MENSAL(2026)
    { limite: 2428.8, aliq: 0, deducao: 0 },
    { limite: 2826.65, aliq: 0.075, deducao: 182.16 },
    { limite: 3751.05, aliq: 0.15, deducao: 394.16 },
    { limite: 4664.68, aliq: 0.225, deducao: 675.49 },
    { limite: 9999.99, aliq: 0.275, deducao: 908.73 } //não tem limite
]

const tabelaINSS = [ //Tabela do Imposto de renda MENSAL(2026)
    { limite: 1621.00, aliq: 0.075, deducao: 0 },
    { limite: 2902.84, aliq: 0.09, deducao: 24.32 },
    { limite: 4354.27, aliq: 0.12, deducao: 111.40 },
    { limite: 8475.55, aliq: 0.14, deducao: 198.49 } //não tem limite
]
let meuGrafico = null; // Variável global para controlar a instância do gráfico
//A) Função para formatar o valor como Moeda Brasileira (R$)
function formatarMoeda(valor) {
    // 1. Se o valor for vazio ou apenas espaços, retorna vazio e para aqui
    if (!valor || valor.trim() === "") return "";

    // 2. Remove tudo que não for número
    let apenasNumeros = valor.replace(/\D/g, ""); //OBS: o /\D/ significa--> / /: delimitadores  && \D: metacaractere que significa 'tudo que não é um digito'| Também é conhecido com 'regex'

    // Se o usuário apagou todos os números, retorna vazio para mostrar o placeholder
    if (apenasNumeros.length === 0) return "";

    // 4. Converte para decimal (centavos)
    let valorDecimal = (parseInt(apenasNumeros) / 100).toFixed(2);
    
    // 5. Formata para o padrão brasileiro
    return "R$ " + valorDecimal.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // OBS: a expressão: [replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")] serve para colocar os '.' de milhar no número. conhecida como 'lookahead';
}

//B) Função para converter a string formatada de volta para número (utilizada para cálculos que usam <divs> de total — que foram formatadas pela função 'formatarMoeda()')
function converterParaNumero(stringMoeda) {
    if (!stringMoeda) return 0;
    return parseFloat(stringMoeda.replace(/\D/g, "")) / 100; // Remove tudo que não é número e converte para float. divide por 100, porque quando ele receber a string(ex: R$1.500,00), o código irá remover a virgula e o valor ficará: 150000, o que estaria errado com o valor original. por isso, dividimos por 100 para que os valores dos centavos permanecam como decimais.

}

//C) Função para Calcular o Fator R
function atualizarFatorR() {
    const RBTtotal = document.getElementById('total-rbt');
    const FStotal = document.getElementById('total-fs');
    const displayFatorR = document.getElementById('fatorr');
    const MEIvalor = document.getElementById('mei');

    if (!RBTtotal || !FStotal || !displayFatorR) return;

    //1. Obtemos os valores numéricos dos textos das divs de total
    const rbt12 = converterParaNumero(RBTtotal.textContent);
    const fs12 = converterParaNumero(FStotal.textContent);

    if (rbt12 > 0) {
        // Fator R = Folha dos ultimos 12 meses / Receita bruta dos ultimos 12 meses
        const fatorR = (fs12 / rbt12) * 100;
        dados.fatorR = fatorR/100;
        displayFatorR.textContent = fatorR.toFixed(2).replace('.', ',') + "%";

    } else {
        displayFatorR.textContent = "0,00%";
        displayFatorR.style.color = "";
    }
}

//D) Função que soma todos os inputs de faturamento e atualiza o total
function atualizarTotal(dadosInput, total) {
    
    let soma = 0;
    dadosInput.forEach(input => { //1) a função recebe uma lista de inputs como variável(dadosInput) e utilizando essa lista, usa dessa estrutura de repetição para somar os valores e salvar dentro de uma variável(soma)
        soma += converterParaNumero(input.value);
    });

    if (total) { //2) condicional para verificar que o elemento(total) existe
        total.textContent = soma.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        atualizarFatorR();
        atualizarClonesTotais();
    }
}

//E) Função para clonar uma div(total) - copiar a informação de uma <div> e colar em outra
function atualizarClonesTotais() {
    // 1. Seleciona os originais
    const originalRBT = document.getElementById('total-rbt');
    const originalFS = document.getElementById('total-fs');
    const originalIC = document.getElementById('ic');
    const originalINSSmei = document.getElementById('inss-mei');
    const originalINSSpf = document.getElementById('inss-pf');
    const originalINSSsn = document.getElementById('inss-sn');
    const originalIRPFmei = document.getElementById('irpf-mei');
    const originalIRPFsn = document.getElementById('irpf-sn');
    const originalIRPFpf = document.getElementById('irpf-pf');
    const originalSN = document.getElementById('sn');
    const originalMEI = document.getElementById('mei');

    // 2. Seleciona os destinos
    const destinoRBT = document.getElementById('total-rbt-clone');
    const destinoFS = document.getElementById('total-fs-clone');
    const destinoIC = document.getElementById('ic-clone');
    const destinoINSSmei = document.getElementById('inss-mei-clone');
    const destinoINSSpf = document.getElementById('inss-pf-clone');
    const destinoINSSsn = document.getElementById('inss-sn-clone');
    const destinoIRPFsn = document.getElementById('irpf-sn-clone');
    const destinoIRPFmei = document.getElementById('irpf-mei-clone');
    const destinoIRPFpf = document.getElementById('irpf-pf-clone');
    const destinoSN = document.getElementById('sn-clone');
    const destinoMEI = document.getElementById('mei-clone');


    // 3. Limpa os destinos e injeta o clone
    // O true no cloneNode garante que o texto (R$ 0,00) vá junto
    destinoRBT.innerHTML = '';
    destinoRBT.appendChild(originalRBT.cloneNode(true)); //3.1) o cloneNode(true) é o responsável por realizar uma cópia idêntica da <div> para a outra. porém deve se atentar que até o ID é copiado de um para o outro. podendo causar BUGs futuros;

    destinoFS.innerHTML = '';
    destinoFS.appendChild(originalFS.cloneNode(true));

    destinoIC.innerHTML = '';
    destinoINSSmei.innerHTML = '';
    destinoINSSpf.innerHTML = '';
    destinoINSSsn.innerHTML = '';
    destinoIRPFsn.innerHTML = '';
    destinoIRPFmei.innerHTML = '';
    destinoIRPFpf.innerHTML = '';
    destinoSN.innerHTML = '';
    destinoMEI.innerHTML = '';
    destinoIC.appendChild(originalIC.cloneNode(true));
    destinoINSSmei.appendChild(originalINSSmei.cloneNode(true));
    destinoINSSpf.appendChild(originalINSSpf.cloneNode(true));
    destinoINSSsn.appendChild(originalINSSsn.cloneNode(true));
    destinoIRPFsn.appendChild(originalIRPFsn.cloneNode(true));
    destinoIRPFmei.appendChild(originalIRPFmei.cloneNode(true));
    destinoIRPFpf.appendChild(originalIRPFpf.cloneNode(true));
    destinoSN.appendChild(originalSN.cloneNode(true));
    destinoMEI.appendChild(originalMEI.cloneNode(true));
}

//F) Função para animar uma barra de carregamento
function atualizarProgressoVisual(seletorContainer) {
    const container = document.querySelector(seletorContainer);

    if (!container) return;

    //1. Seleciona apenas os inputs de dados, que serão utilizados para calcular a porcentagem de progresso no preenchimento
    const inputs = container.querySelectorAll('form input');
    const totalInputs = inputs.length; //1.1 variável que possui o número de inputs na div(será o denominador do cálculo de porcentagem de preenchimento)

    //2. Cálculo para Contar apenas os inputs que foram preenchidos
    const preenchidos = Array.from(inputs).filter(input => { //2.1 esse código cria uma variável(preenchidos) que irá conter o número de inputs preenchidos pelo usuário. Para isso, ele cria uma lista(array) que Filtra os inputs que estão vazios(valorLimpo !== ""), e então retorna a quantidade total de inputs que estão preenchidos(.length);
     const valorLimpo = input.value;
     return valorLimpo !== "" && valorLimpo !== "0" && valorLimpo !== "00";
    }).length; //OBS: Esse código apenas funciona porque, anteriormente, as funções de converterParaNumero() e formatarMoeda() já transforma os inputs em apenas números. caso isso não acontecesse, os inputs de texto também contariam como 'preenchidos' por essa função;

    //3. Calcula a porcentagem
    const porcentagem = (preenchidos / totalInputs) * 100;

    //4. Aplica a variável CSS no container específico. 
    container.style.setProperty('--progresso', `${porcentagem}%`); //OBS: Neste código, a porcentagem influencia no Height do pseudo-elemento ::before da <div>, causando a impressão visual que ele está 'mudando de cor', mas na verdade é apenas o ::before aumentando seu 'height' conforme a porcentagem aumenta.

    // BÔNUS. Cria uma configuração exclusiva para a <div> após completa
    if (porcentagem === 100) {
        container.classList.add('completo');
    } else {
        container.classList.remove('completo');
    }
}

//G) Função Principal dos Eventos de Input - Uma função que ordena e chama outras funções
function gerenciarEntrada(e, listaInputs, displayTotal) { //obs: no javascript, o 'e' é utilizado como abreviação para 'event', sendo utilizado para pegar informações salvas após a ocorrência de um evento;
    let input = e.target; //1. Essa função será executada sempre que um input for digitado. portanto, a variável 'input' salvará aonde foi o preenchido esse input
    let valor = input.value; //1.1. A variável 'valor', salvará o valor preenchido no input alvo;

    // 2. a Função formatará o valor preenchido no input
    if (valor == "" || valor == "R$ " || valor == "R$ 0,00") { input.value = ""; }
    else {input.value = formatarMoeda(valor);} //2.1 Esse trecho tem como objetivo fazer com que inputs vazios/apagados não seja considerados 'preenchidos', garantido o funcionamento correto da função anterior[atualizarProgressoVisual()];

    // 3. Atualiza os cálculos (Soma, total e Impostos)
    if (listaInputs && displayTotal) {
        atualizarTotal(listaInputs, displayTotal);
    }
    calcularImpostos();

}

//E) Chamada das funções: RBT12 e FS12
const inputsRBT = document.querySelectorAll('.dados-rbt form input');
inputsRBT.forEach(input => {
    input.placeholder = "R$ 0,00";
    input.autocomplete = "off";
    input.addEventListener('input', (e) => {
        gerenciarEntrada(e, inputsRBT, document.getElementById('total-rbt')); //1. Essa chamada basicamente ordena: [o valor do input que será formatado(e) | a lista de valores que serão somados no total | a localização do Total]
        atualizarProgressoVisual('#rbt12'); //1.1 Chamada para criar a barra de progresso na div pai(ancestral) dos inputs
        atualizarClonesTotais();
    });
});
const inputsFS = document.querySelectorAll('.dados-fs form input');
inputsFS.forEach(input => {
    input.placeholder = "R$ 0,00";
    input.autocomplete = "off";
    input.addEventListener('input', (e) => {
        gerenciarEntrada(e, inputsFS, document.getElementById('total-fs'));
        atualizarProgressoVisual('#fs12');
        atualizarClonesTotais();
    });
});

//F) Inputs Principais (Faturamento do Mês Atual)
const inputrbt = document.querySelectorAll('.valor-rbt-input');
inputrbt.forEach(input => {
    input.type = "text";
    input.placeholder = "R$ 0,00";
    input.addEventListener('input', (e) => { 
        atualizarValorProLabore();
        gerenciarEntrada(e,inputrbt, document.getElementById('rm-clone')); //1. como esse input não possui um total, ele apenas replica o valor da Receita Mensal em 'RESULTADOS' com a função atualizartotal()
        atualizarClonesTotais();
        dados.faturamentoMes = converterParaNumero(document.querySelector('.valor-rbt-input')?.value || "0");
    });
});

inss_PF_escolha.addEventListener('click', e => {
    inss_PF_escolha.classList.toggle('inss_normal');
    if (inss_PF_escolha.classList == 'show inss_normal'){document.querySelector('#inss-escolha-pf').innerHTML = 'Normal (20%)';}
    else {document.querySelector('#inss-escolha-pf').innerHTML = 'Simplificado (11%)';}
    calcularImpostos();
    atualizarClonesTotais();
})
inss_MEI_escolha.addEventListener('click', e => {
    inss_MEI_escolha.classList.toggle('inss_complementar');
    if (inss_MEI_escolha.classList == 'show inss_complementar'){document.querySelector('#inss-escolha-mei').innerHTML = 'Complementar (15%)';}
    else {document.querySelector('#inss-escolha-mei').innerHTML = 'Incluso no MEI';}
    calcularImpostos();
    atualizarClonesTotais();
})

inss_SN_escolha.addEventListener('click', e => {
    inss_SN_escolha.classList.toggle('inss_normal');
    if (inss_SN_escolha.classList == 'show inss_normal'){document.querySelector('#inss-escolha-sn').innerHTML = 'Complementar (9%)';}
    else {document.querySelector('#inss-escolha-sn').innerHTML = 'Simplificado (11%)';}
    calcularImpostos();
    atualizarClonesTotais();
})
//G) Aplicar a atualização do Progresso nos dados-principais
const inputsPrincipais = document.querySelectorAll('.valor-rbt-input, .form-search'); //1. Como o input do mês(.form-search) foge da normalidade dos outros inputs de valores, não é possivel realizar a chamada da função: atualizarProgressoVisual('#dados-principais') junto de outras funções sem que ocorra outros bugs. Por isso foi criado essa const(inputsPrincipais) apenas para chamar essa função para que os dois inputs sejam contabilizados na porcentagem de preenchimento 
inputsPrincipais.forEach(input => {
    input.addEventListener('input', (e) => {
        atualizarProgressoVisual('#dados-principais');
    });
});


//H) Impede o refresh de qualquer <form> no data-inputs  --------------- 
const formInputs = document.querySelectorAll('.data-inputs form');
formInputs.forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); //OBS: O procedimento padrão de um <form> sempre que é apertado ENTER, é reiniciar a página. Esse código previne isso.
    });
});

function IC(faturamentoMes){
    const botaoSubtipo = document.querySelector('#subtipos-servico button.selected, #subtipos-comercio button.selected');
    let anexoChave = mapeamentoAnexos[botaoSubtipo.id];
    const paragrafo = document.querySelector('.ic p');
    const paragrafoClone = document.querySelector('.ic-clone p');
    paragrafo.textContent = "ISS: ";
    paragrafoClone.textContent = "ISS: ";
    // 1. Cálculo do ISS
    let valorISS = faturamentoMes * dados.aliqISS;
    dados.iss = valorISS;
    dados.aliq_ic_escolhido = dados.aliqISS;
    dados.ISSlow = (faturamentoMes* dados.baixaReceitaPercentual) * dados.aliqISS;
    dados.ISShigh = (faturamentoMes* dados.altaReceitaPercentual) * dados.aliqISS;
    document.getElementById('ic').textContent = formatarMoeda(valorISS.toFixed(2));
    
    if (anexoChave === 'anexo1'){
      let valorICMS = faturamentoMes * dados.aliqICMS;
      dados.aliq_ic_escolhido = dados.dados.aliqICMS;
      dados.icms = valorICMS;
      dados.ICMSlow = (faturamentoMes* dados.baixaReceitaPercentual) * dados.aliqICMS;
      dados.ICMShigh = (faturamentoMes * dados.altaReceitaPercentual) * dados.aliqICMS;
      document.getElementById('ic').textContent = formatarMoeda(valorICMS.toFixed(2));
      paragrafo.textContent = "ICMS: ";
      paragrafoClone.textContent = "ICMS: ";
    } else if (anexoChave === 'anexo1st'){
      let valorICMS = faturamentoMes * dados.aliqICMSst;
      dados.aliq_ic_escolhido = dados.aliqICMSst;
      dados.icms = valorICMS
      dados.ICMSlow = (faturamentoMes* dados.baixaReceitaPercentual) * dados.aliqICMSst;
      dados.ICMShigh = (faturamentoMes * dados.altaReceitaPercentual) * dados.aliqICMSst;
      document.getElementById('ic').textContent = formatarMoeda(valorICMS.toFixed(2));
      paragrafo.textContent = "ICMS-ST: ";
      paragrafoClone.textContent = "ICMS-ST: ";
    } else if (anexoChave === 'anexo1fcp'){
      let valorICMS = faturamentoMes * dados.aliqICMSfcp;
      dados.aliq_ic_escolhido = dados.aliqICMSfcp;
      dados.icms = valorICMS
      dados.ICMSlow = (faturamentoMes* dados.baixaReceitaPercentual) * dados.aliqICMSfcp;
      dados.ICMShigh = (faturamentoMes * dados.altaReceitaPercentual) * dados.aliqICMSfcp;
      document.getElementById('ic').textContent = formatarMoeda(valorICMS.toFixed(2));
      paragrafo.textContent = "ICMS: ";
      paragrafoClone.textContent = "ICMS: ";
    }
}

function INSS(faturamentoMes){
    // 1. Configurações de 2026 (Valores simulados)
    // 2. INSS Patronal (Custo da Empresa - Exclusivo Anexo IV)
    let inssEmpresa = 0;
    const botaoSubtipo = document.querySelector('#subtipos-servico button.selected, #subtipos-comercio button.selected');
    let AnexoTipo = mapeamentoAnexos[botaoSubtipo.id];
    const fs12 = converterParaNumero(document.getElementById('total-fs').textContent);
    dados.fs12 = fs12;
    const fsMedia  = fs12/12;
    let valorINSS = 0;

    // 2. Cálculo do INSS (PF)
    if (inss_PF_escolha.classList == 'show inss_normal') {
        // Plano Normal: 20% sobre o rendimento (limitado ao teto)
        let calculoNormal = faturamentoMes * dados.aliqINSSnormal;
        dados.inssPF = Math.min(calculoNormal, dados.tetoINSS);
        valorINSS =  dados.inssPF;
        dados.INSSPFlow = Math.min(((faturamentoMes* dados.baixaReceitaPercentual) * dados.aliqINSSnormal),dados.tetoINSS); 
        dados.INSSPFhigh = Math.min(((faturamentoMes* dados.altaReceitaPercentual) * dados.aliqINSSnormal),dados.tetoINSS);
        
    } else {
        // Plano Simplificado: 11% fixo sobre o salário mínimo
        dados.inssPF = dados.salarioMinimo * dados.aliqINSSsimplificado;
        valorINSS = dados.inssPF;
        dados.INSSPFlow = valorINSS;
        dados.INSSPFhigh = valorINSS;
        
    }
    dados.inssPF_simplificado = dados.salarioMinimo * dados.aliqINSSsimplificado;
    dados.inssPF_normal = dados.salarioMinimo * dados.aliqINSSsimplificado;

    // 2. Cálculo do INSS (MEI)
    let valorINSSmei = 0;
    if (inss_MEI_escolha.classList == 'show inss_complementar') {
      valorINSSmei = dados.salarioMinimo * dados.aliqINSScomplementar;
      if (dados.rbt12 > dados.tetoMEI) {valorINSSmei = 0;} //condicional MEI
      dados.inssMEI = valorINSSmei;
      dados.INSSMEIlow = valorINSSmei;
      dados.INSSMEIhigh = valorINSSmei;
    } else { valorINSSmei = 0; dados.inssMEI = valorINSSmei; dados.INSSMEIlow = valorINSSmei; dados.INSSMEIhigh = valorINSSmei;}
    

    // 2.3 Cálculo do INSS (SN)
    let valorINSSsn = 0;
    if (inss_SN_escolha.classList == 'show inss_normal') {
     valorINSSsn = fsMedia*dados.aliqINSSnormal;
     dados.inssSN = valorINSSsn;
     dados.INSSSNhigh = (fsMedia*dados.altaReceitaPercentual)* dados.aliqINSSnormal;
     dados.INSSSNlow = (fsMedia*dados.baixaReceitaPercentual)* dados.aliqINSSnormal;
   
     if (dados.INSSSNlow > (dados.tetoINSS *dados.aliqINSSnormal)) {dados.INSSSNlow = dados.tetoINSS*dados.aliqINSSsimplificado;}
     if (valorINSSsn > (dados.tetoINSS *dados.aliqINSSnormal)) {
         valorINSSsn = dados.tetoINSS*dados.aliqINSSnormal;
         dados.inssSN = valorINSSsn;
         dados.INSSSNhigh = valorINSSsn;
        }
    } else {
     valorINSSsn = fsMedia*dados.aliqINSSsimplificado;
     dados.inssSN = valorINSSsn;
     dados.INSSSNhigh = (fsMedia*dados.altaReceitaPercentual)* dados.aliqINSSsimplificado;
     dados.INSSSNlow = (fsMedia*dados.baixaReceitaPercentual)* dados.aliqINSSsimplificado;
   
     if (dados.INSSSNlow > (dados.tetoINSS *dados.aliqINSSsimplificado)) {dados.INSSSNlow = dados.tetoINSS*dados.aliqINSSsimplificado;}
     if (valorINSSsn > (dados.tetoINSS *dados.aliqINSSsimplificado)) {
      valorINSSsn = dados.tetoINSS*dados.aliqINSSsimplificado;
      dados.inssSN = valorINSSsn;
      dados.INSSSNhigh = valorINSSsn;
     }
    }
    //3. Salvando os valores no Layout e nos *Dados*
    document.getElementById('inss-sn').textContent = formatarMoeda(valorINSSsn.toFixed(2));
    document.getElementById('inss-pf').textContent = formatarMoeda(valorINSS.toFixed(2));
    if (dados.rbt12<dados.tetoMEI){document.getElementById('inss-mei').textContent = formatarMoeda(valorINSSmei.toFixed(2));}
    else{document.getElementById('inss-mei').textContent = 'N/A' }
    if (AnexoTipo == 'anexo4') {
      const cpp = fsMedia * dados.aliqINSSnormal; // 20% fixo da empresa
      const rat = fsMedia * dados.aliqRAT; // 1% de RAT
      inssEmpresa = cpp + rat;
      valorINSSsn += inssEmpresa;
      dados.inssSN += inssEmpresa;
      dados.INSSSNhigh += (dados.inssSN*dados.altaReceitaPercentual);
      dados.INSSSNlow += (dados.inssSN*dados.baixaReceitaPercentual);
      document.getElementById('inss-sn').textContent = formatarMoeda(valorINSSsn.toFixed(2));
    }
    
}
//IC = Imposto sobre o Consumo
function IRPF(faturamentoMes){
    // 1. Cálculo do IRPF (Tabela Progressiva)
    let deducaoIC = converterParaNumero((document.getElementById('ic').textContent));
    let deducaoINSSpf = converterParaNumero((document.getElementById('inss-pf').textContent));
    const fs12 = converterParaNumero(document.getElementById('total-fs').textContent);
    const fsMedia  = fs12/12;
    let deducaoINSSsn = converterParaNumero((document.getElementById('inss-sn').textContent)); 
    let deducaoINSSmei = converterParaNumero((document.getElementById('inss-mei').textContent));
    const botaoSubtipo = document.querySelector('#subtipos-servico button.selected, #subtipos-comercio button.selected');
    anexoChave = mapeamentoAnexos[botaoSubtipo.id];
    dados.anexoChave = anexoChave;
    
    
    //2. Calculo do IRPF (PF)
    let baseIRPFpf = faturamentoMes - deducaoINSSpf //O INSS desconta na BC do IRPF
    dados.bcIRPFpf = baseIRPFpf;
    let valorIRPFpf = 0;
    if (baseIRPFpf<= tabelaIRPF[0].limite) {valorIRPFpf=0; dados.aliqIRPF_pf = tabelaIRPF[0].aliq; dados.faixaIRPF_pf= '1º Faixa'; dados.deducaoIRPF_pf = tabelaIRPF[0].deducao}
    else if (baseIRPFpf<= tabelaIRPF[1].limite) {valorIRPFpf=(baseIRPFpf*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao; dados.aliqIRPF_pf = tabelaIRPF[1].aliq; dados.faixaIRPF_pf= '2º Faixa'; dados.deducaoIRPF_pf = tabelaIRPF[1].deducao}
    else if (baseIRPFpf<= tabelaIRPF[2].limite) {valorIRPFpf=(baseIRPFpf*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao; dados.aliqIRPF_pf = tabelaIRPF[2].aliq; dados.faixaIRPF_pf= '3º Faixa'; dados.deducaoIRPF_pf = tabelaIRPF[2].deducao}
    else if (baseIRPFpf<= tabelaIRPF[3].limite) {valorIRPFpf=(baseIRPFpf*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao; dados.aliqIRPF_pf = tabelaIRPF[3].aliq; dados.faixaIRPF_pf= '4º Faixa'; dados.deducaoIRPF_pf = tabelaIRPF[3].deducao}
    else if (baseIRPFpf> tabelaIRPF[3].limite) {valorIRPFpf=(baseIRPFpf*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao;dados.aliqIRPF_pf = tabelaIRPF[4].aliq; dados.faixaIRPF_pf= '5º Faixa'; dados.deducaoIRPF_pf = tabelaIRPF[4].deducao}
    dados.irpfPF = valorIRPFpf;
    document.getElementById('irpf-pf').textContent = formatarMoeda(valorIRPFpf.toFixed(2));

    //2.1 Cálculo do IRPF (SN)
    let baseIRPFsn = fsMedia - deducaoINSSsn //O INSS desconta na BC do IRPF
    dados.bcIRPFsn = baseIRPFsn;
    let valorIRPFsn = 0;
    if (baseIRPFsn<= tabelaIRPF[0].limite) {valorIRPFsn=0; dados.aliqIRPF_sn = tabelaIRPF[0].aliq; dados.faixaIRPF_sn= '1º Faixa'; dados.deducaoIRPF_sn = tabelaIRPF[0].deducao}
    else if (baseIRPFsn<= tabelaIRPF[1].limite) {valorIRPFsn=(baseIRPFsn*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao; dados.aliqIRPF_sn = tabelaIRPF[1].aliq; dados.faixaIRPF_sn= '2º Faixa'; dados.deducaoIRPF_sn = tabelaIRPF[1].deducao}
    else if (baseIRPFsn<= tabelaIRPF[2].limite) {valorIRPFsn=(baseIRPFsn*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao; dados.aliqIRPF_sn = tabelaIRPF[2].aliq; dados.faixaIRPF_sn= '3º Faixa'; dados.deducaoIRPF_sn = tabelaIRPF[2].deducao}
    else if (baseIRPFsn<= tabelaIRPF[3].limite) {valorIRPFsn=(baseIRPFsn*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao; dados.aliqIRPF_sn = tabelaIRPF[3].aliq; dados.faixaIRPF_sn= '4º Faixa'; dados.deducaoIRPF_sn = tabelaIRPF[3].deducao}
    else if (baseIRPFsn<= tabelaIRPF[4].limite) {valorIRPFsn=(baseIRPFsn*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao; dados.aliqIRPF_sn = tabelaIRPF[4].aliq; dados.faixaIRPF_sn= '5º Faixa'; dados.deducaoIRPF_sn = tabelaIRPF[4].deducao}
    dados.irpfSN = valorIRPFsn;
    document.getElementById('irpf-sn').textContent = formatarMoeda(valorIRPFsn.toFixed(2));
    
    //2.1 Cálculo do IRPF (MEI)
    let percentualIsencaoMEI = 0;
    if  (anexoChave ==='anexo1' || anexoChave ==='anexo1st' || anexoChave ==='anexo1fcp'){percentualIsencaoMEI = dados.percentualIsencaoMEI_comercio; dados.percentual_escolhido = 'Comércio(8%)' } // percentual de isenção: 8% para Comércio 
    else if(botaoSubtipo == 'transporte') {percentualIsencaoMEI = dados.percentualIsencaoMEI_transporte; dados.percentual_escolhido = 'Transporte(16%)'} // percentual de isenção: 16% para transporte de passageiros 
    else if(anexoChave ==='anexo3' || anexoChave ==='anexo4' || anexoChave ==='anexo5')
     {percentualIsencaoMEI = dados.percentualIsencaoMEI_servico; dados.percentual_escolhido = 'Serviço(32%)' } // percentual de isenção: 32% para serviços

    let valorIsentoMEI = faturamentoMes * percentualIsencaoMEI 
    dados.isencao_irpf_mei = valorIsentoMEI;
    let baseIRPFmei = faturamentoMes - deducaoINSSmei - valorIsentoMEI//O INSS e a parcela isenta desconta na BC do IRPF
    dados.bcIRPFmei = baseIRPFmei;
    let valorIRPFmei = 0;
    if (baseIRPFmei<= tabelaIRPF[0].limite) {valorIRPFmei=0; dados.aliqIRPF_mei = tabelaIRPF[0].aliq; dados.faixaIRPF_mei= '1º Faixa'; dados.deducaoIRPF_mei = tabelaIRPF[0].deducao}
    else if (baseIRPFmei<= tabelaIRPF[1].limite) {valorIRPFmei=(baseIRPFmei*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao; dados.aliqIRPF_mei = tabelaIRPF[1].aliq; dados.faixaIRPF_mei= '2º Faixa'; dados.deducaoIRPF_mei = tabelaIRPF[1].deducao}
    else if (baseIRPFmei<= tabelaIRPF[2].limite) {valorIRPFmei=(baseIRPFmei*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao; dados.aliqIRPF_mei = tabelaIRPF[2].aliq; dados.faixaIRPF_mei= '3º Faixa'; dados.deducaoIRPF_mei = tabelaIRPF[2].deducao}
    else if (baseIRPFmei<= tabelaIRPF[3].limite) {valorIRPFmei=(baseIRPFmei*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao; dados.aliqIRPF_mei = tabelaIRPF[3].aliq; dados.faixaIRPF_mei= '4º Faixa'; dados.deducaoIRPF_mei = tabelaIRPF[3].deducao}
    else if (baseIRPFmei<= tabelaIRPF[4].limite) {valorIRPFmei=(baseIRPFmei*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao; dados.aliqIRPF_mei = tabelaIRPF[4].aliq; dados.faixaIRPF_mei= '5º Faixa'; dados.deducaoIRPF_mei = tabelaIRPF[4].deducao}
    dados.irpfMEI = valorIRPFmei;
    if (dados.rbt12<dados.tetoMEI){document.getElementById('irpf-mei').textContent = formatarMoeda(valorIRPFmei.toFixed(2));} 
    else {document.getElementById('irpf-mei').textContent = 'N/A';}


    //3. Cálculo dos Mínimos (LOW)
    //3.1. (PF)
    let baseIRPFpfLOW = (faturamentoMes* dados.baixaReceitaPercentual) - dados.INSSPFlow;
    let IRPFpfLOW = 0;
    if (baseIRPFpfLOW<= tabelaIRPF[0].limite) {IRPFpfLOW=0}
    else if (baseIRPFpfLOW<= tabelaIRPF[1].limite) {IRPFpfLOW=(baseIRPFpfLOW*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao;}
    else if (baseIRPFpfLOW<= tabelaIRPF[2].limite) {IRPFpfLOW=(baseIRPFpfLOW*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao; }
    else if (baseIRPFpfLOW<= tabelaIRPF[3].limite) {IRPFpfLOW=(baseIRPFpfLOW*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao;}
    else if (baseIRPFpfLOW> tabelaIRPF[3].limite) {IRPFpfLOW=(baseIRPFpfLOW*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao; }
    dados.IRPFPFlow = IRPFpfLOW;

    //3.2 (SN)
    let baseIRPFsnLOW = (fsMedia*dados.baixaReceitaPercentual) - dados.INSSSNlow;
    let IRPFsnLOW = 0;
    if (baseIRPFsnLOW<= tabelaIRPF[0].limite) {IRPFsnLOW=0}
    else if (baseIRPFsnLOW<= tabelaIRPF[1].limite) {IRPFsnLOW=(baseIRPFsnLOW*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao;}
    else if (baseIRPFsnLOW<= tabelaIRPF[2].limite) {IRPFsnLOW=(baseIRPFsnLOW*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao}
    else if (baseIRPFsnLOW<= tabelaIRPF[3].limite) {IRPFsnLOW=(baseIRPFsnLOW*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao}
    else if (baseIRPFsnLOW<= tabelaIRPF[4].limite) {IRPFsnLOW=(baseIRPFsnLOW*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao}
    dados.IRPFSNlow = IRPFsnLOW;

    //3.3 (MEI)
    let valorIsentoMEIlow = (faturamentoMes*dados.baixaReceitaPercentual) * percentualIsencaoMEI;
    let baseIRPFmeiLOW = (faturamentoMes*dados.baixaReceitaPercentual) - dados.INSSMEIlow - valorIsentoMEIlow;
    let valorIRPFmeiLOW = 0;
    if (baseIRPFmeiLOW<= tabelaIRPF[0].limite) {valorIRPFmeiLOW=0}
    else if (baseIRPFmeiLOW<= tabelaIRPF[1].limite) {valorIRPFmeiLOW=(baseIRPFmeiLOW*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao;}
    else if (baseIRPFmeiLOW<= tabelaIRPF[2].limite) {valorIRPFmeiLOW=(baseIRPFmeiLOW*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao}
    else if (baseIRPFmeiLOW<= tabelaIRPF[3].limite) {valorIRPFmeiLOW=(baseIRPFmeiLOW*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao}
    else if (baseIRPFmeiLOW<= tabelaIRPF[4].limite) {valorIRPFmeiLOW=(baseIRPFmeiLOW*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao}
    dados.IRPFMEIlow = valorIRPFmeiLOW;
    if ((faturamentoMes* dados.baixaReceitaPercentual)*12 > dados.tetoMEI) {dados.IRPFMEIlow = 0;} //condicional MEI


    //4. Cálculo dos Máximos (HIGH)
    //4.1. (PF)
    let baseIRPFpfHIGH = (faturamentoMes* dados.altaReceitaPercentual) - dados.INSSPFhigh;
    let IRPFpfHIGH = 0;
    if (baseIRPFpfHIGH<= tabelaIRPF[0].limite) {IRPFpfHIGH=0}
    else if (baseIRPFpfHIGH<= tabelaIRPF[1].limite) {IRPFpfHIGH=(baseIRPFpfHIGH*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao;}
    else if (baseIRPFpfHIGH<= tabelaIRPF[2].limite) {IRPFpfHIGH=(baseIRPFpfHIGH*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao; }
    else if (baseIRPFpfHIGH<= tabelaIRPF[3].limite) {IRPFpfHIGH=(baseIRPFpfHIGH*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao;}
    else if (baseIRPFpfHIGH> tabelaIRPF[3].limite) {IRPFpfHIGH=(baseIRPFpfHIGH*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao; }
    dados.IRPFPFhigh = IRPFpfHIGH;

    //4.2 (SN)
    let baseIRPFsnHIGH = (fsMedia*dados.altaReceitaPercentual) - dados.INSSSNhigh; 
    let IRPFsnHIGH = 0;
    if (baseIRPFsnHIGH<= tabelaIRPF[0].limite) {IRPFsnHIGH=0}
    else if (baseIRPFsnHIGH<= tabelaIRPF[1].limite) {IRPFsnHIGH=(baseIRPFsnHIGH*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao;}
    else if (baseIRPFsnHIGH<= tabelaIRPF[2].limite) {IRPFsnHIGH=(baseIRPFsnHIGH*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao}
    else if (baseIRPFsnHIGH<= tabelaIRPF[3].limite) {IRPFsnHIGH=(baseIRPFsnHIGH*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao}
    else if (baseIRPFsnHIGH<= tabelaIRPF[4].limite) {IRPFsnHIGH=(baseIRPFsnHIGH*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao}
    dados.IRPFSNhigh = IRPFsnHIGH;

    //4.3 (MEI)
    let valorIsentoMEIhigh = (faturamentoMes*dados.altaReceitaPercentual) * percentualIsencaoMEI;
    let baseIRPFmeiHIGH = (faturamentoMes*dados.altaReceitaPercentual) - dados.INSSMEIhigh - valorIsentoMEIhigh;
    console.log('base IRPF do mei(high): ', baseIRPFmeiHIGH);
    let valorIRPFmeiHIGH = 0;
    if (baseIRPFmeiHIGH<= tabelaIRPF[0].limite) {valorIRPFmeiHIGH=0}
    else if (baseIRPFmeiHIGH<= tabelaIRPF[1].limite) {valorIRPFmeiHIGH=(baseIRPFmeiHIGH*tabelaIRPF[1].aliq)-tabelaIRPF[1].deducao;}
    else if (baseIRPFmeiHIGH<= tabelaIRPF[2].limite) {valorIRPFmeiHIGH=(baseIRPFmeiHIGH*tabelaIRPF[2].aliq)-tabelaIRPF[2].deducao}
    else if (baseIRPFmeiHIGH<= tabelaIRPF[3].limite) {valorIRPFmeiHIGH=(baseIRPFmeiHIGH*tabelaIRPF[3].aliq)-tabelaIRPF[3].deducao}
    else if (baseIRPFmeiHIGH<= tabelaIRPF[4].limite) {valorIRPFmeiHIGH=(baseIRPFmeiHIGH*tabelaIRPF[4].aliq)-tabelaIRPF[4].deducao}
    dados.IRPFMEIhigh = valorIRPFmeiHIGH;
    if ((faturamentoMes* dados.altaReceitaPercentual)*12 > dados.tetoMEI) {dados.IRPFMEIhigh = 0}; //condicional MEI

}

function calculoMEI(rbt12){
    // valor do MEI
    if (rbt12<dados.tetoMEI){
        const valorMEI = 81.05;
        dados.mei = valorMEI;
        dados.MEIlow = valorMEI;
        if ((dados.faturamentoMes*dados.baixaReceitaPercentual)*12 > dados.tetoMEI) {dados.MEIlow = 0;} //condicional MEI
        dados.MEIhigh = valorMEI;
        if ((dados.faturamentoMes*dados.altaReceitaPercentual)*12 > dados.tetoMEI) {dados.MEIhigh = 0;} //condicional MEI
        console.log('RBT12 DO HIGH: ', (dados.faturamentoMes*dados.altaReceitaPercentual)*12);
        document.getElementById('mei').textContent = formatarMoeda(valorMEI.toFixed(2));
    } else{
        dados.mei = 0;
        dados.MEIlow = 0;
        dados.MEIhigh = 0;
        document.getElementById('mei').textContent = 'N/A';
    }
}
//J) Função do cálculo dos impostos(PF, SN e MEI) - Coração do site
function calcularImpostos() {
    const rbt12 = converterParaNumero(document.getElementById('total-rbt').textContent);
    dados.rbt12 = rbt12;
    const faturamentoMes = converterParaNumero(document.querySelector('.valor-rbt-input')?.value || "0");
    const botaoSubtipo = document.querySelector('#subtipos-servico button.selected, #subtipos-comercio button.selected');
    const fatorRShow = document.querySelector('#aliquota-fatorr');
    const tabelaFS12 = document.querySelector('#fs12');
    const fs12 = converterParaNumero(document.getElementById('total-fs').textContent);
    let totalPF = 0;
    let totalSN = 0;
    let totalMEI = 0;

    //CALCULANDO O SIMPLES
    if (!botaoSubtipo) return;
    // 1. Identifica o anexo base utilizando a informação da opção(botão) selecionado e o dicionario(mapeamentoAnexos) das opções
    let anexoChave = mapeamentoAnexos[botaoSubtipo.id];
    dados.anexoChave = anexoChave;

    // 2. Regra do Fator R (Troca automática de Anexo V para III)
    if (anexoChave === 'anexo5') {
        fatorRShow.classList.add('show');
        tabelaFS12.classList.add('show');

        const fatorR = rbt12 > 0 ? (fs12 / rbt12) : 0;
        
        if (fatorR >= 0.28) { anexoChave = 'anexo3';} // Benefício do Fator R 
    }
    else{fatorRShow.classList.remove('show');tabelaFS12.classList.remove('show');}
    
    // 3. Atualiza a UI da seção de Resultados (Imagem e Descrição)
    const infoAnexo = dadosAnexos[anexoChave];
    const iconAnexo = document.getElementById('icon-anexo');
    const descAnexo = document.querySelector('.anexo-description');
    if (infoAnexo) {
        if (iconAnexo) iconAnexo.src = infoAnexo.img;
        if (descAnexo) descAnexo.textContent = infoAnexo.nome;
    }
    dados.anexoSN = descAnexo.textContent
    // 4. Cálculos Fiscais (Alíquota Efetiva) - (SN)!important
    if (rbt12 > 0) {
        const tabela = tabelasSimples[anexoChave];
        const faixa = tabela.find(f => rbt12 <= f.limite) || tabela[tabela.length - 1]; // constante que armazena a faixa(linha) do anexo selecionado.
        dados.faixaSN = tabela.findIndex(f => rbt12 <= f.limite) + 1;
        if (dados.faixaSN === 0) dados.faixaSN = 5;
        dados.aliq_sn = faixa.aliq;
        dados.deducao_sn = faixa.deducao;
        let aliqEfetiva = ((rbt12 * faixa.aliq) - faixa.deducao) / rbt12;
        dados.aliqEfetiva = aliqEfetiva;
        // Atualiza % na tela
        document.getElementById('efetiva').textContent = (aliqEfetiva * 100).toFixed(2).replace('.', ',') + "%";
        if (anexoChave == 'anexo1st'){
          const aliquotaICMS_ST_SN = aliqEfetiva * faixa.reparticaoICMS;
          aliqEfetiva = aliqEfetiva-aliquotaICMS_ST_SN;
          dados.aliqEfetiva = aliqEfetiva;
          document.getElementById('efetiva').textContent = (aliqEfetiva * 100).toFixed(2).replace('.', ',') + "%";
        }
        // Valor do Simples Nacional (SN)
        
        const valorSN = faturamentoMes * aliqEfetiva;
        dados.sn = valorSN;
        document.getElementById('sn').textContent = formatarMoeda(valorSN.toFixed(2));
        
        dados.faturamentoMes = faturamentoMes;
        IC(faturamentoMes);
        INSS(faturamentoMes);
        IRPF(faturamentoMes);
        calculoMEI(rbt12);
    }
    //4.1 Aliquota Efetiva (LOW)
    if ((rbt12*dados.baixaReceitaPercentual) > 0) {
        const tabela = tabelasSimples[anexoChave];
        const faixa = tabela.find(f => (rbt12*dados.baixaReceitaPercentual) <= f.limite) || tabela[tabela.length - 1];


        let aliqEfetivaLOW = (((rbt12*dados.baixaReceitaPercentual) * faixa.aliq) - faixa.deducao) / (rbt12*dados.baixaReceitaPercentual);
        if (anexoChave == 'anexo1st'){
          const aliquotaICMS_ST_SN = aliqEfetivaLOW * faixa.reparticaoICMS;
          aliqEfetivaLOW = aliqEfetivaLOW-aliquotaICMS_ST_SN;
        }
        const valorSNlow = (faturamentoMes*dados.baixaReceitaPercentual) * aliqEfetivaLOW;
        dados.SNlow = valorSNlow;
        
    }
    //4.2 Aliquota Efetiva (HIGH)
    if ((rbt12*dados.altaReceitaPercentual) > 0) {
        const tabela = tabelasSimples[anexoChave];
        const faixa = tabela.find(f => (rbt12*dados.altaReceitaPercentual) <= f.limite) || tabela[tabela.length - 1];


        let aliqEfetivaHIGH = (((rbt12*dados.altaReceitaPercentual) * faixa.aliq) - faixa.deducao) / (rbt12*dados.altaReceitaPercentual);
        if (anexoChave == 'anexo1st'){
          const aliquotaICMS_ST_SN = aliqEfetivaHIGH * faixa.reparticaoICMS;
          aliqEfetivaHIGH = aliqEfetivaHIGH-aliquotaICMS_ST_SN;
        }
        const valorSNhigh = (faturamentoMes*dados.altaReceitaPercentual) * aliqEfetivaHIGH;
        dados.SNhigh = valorSNhigh;
        
    }


    // 4. Somar os Impostos na aba dos resultados
     let meiText = document.getElementById('mei').textContent;
    // Verifica se o MEI é um número válido antes de somar
    if (meiText.includes("R$")) {
      let valorINSSmei = converterParaNumero(document.getElementById('inss-mei').textContent);
      let valorIRPFmei = converterParaNumero(document.getElementById('irpf-mei').textContent);
      let valorMEI = converterParaNumero(meiText);
      totalMEI = valorMEI + valorINSSmei + valorIRPFmei; // Não está mais somando o INSS Complementar
      dados.totalMEI = totalMEI;
      document.getElementById('mei-total').textContent = formatarMoeda(totalMEI.toFixed(2)); 
    } else {
    dados.totalMEI = 0;
    document.getElementById('mei-total').textContent = "RBT12 maior que o Limite permitido";
    }
    
    // TOTAL - SIMPLES NACIONAL
    let snText = document.getElementById('sn').textContent;
    if (snText.includes("R$")) {
      let valorINSSsn = converterParaNumero(document.getElementById('inss-sn').textContent);
      let valorIRPFsn = converterParaNumero(document.getElementById('irpf-sn').textContent);
      let valorSN = converterParaNumero(snText);
      totalSN = valorSN + valorIRPFsn + valorINSSsn;
      dados.totalSN = totalSN;
      document.getElementById('sn-total').textContent = formatarMoeda(totalSN.toFixed(2)); 
    } else {
    dados.totalSN = 0;
    document.getElementById('sn-total').textContent = "N/A";
    }
    // TOTAL - PESSOA FISICA
    let ic = document.getElementById('ic').textContent;
    if (ic.includes("R$")) {
      let valorINSSpf = converterParaNumero(document.getElementById('inss-pf').textContent);
      let valorIRPFpf = converterParaNumero(document.getElementById('irpf-pf').textContent);
      let valorPF = converterParaNumero(ic);
      totalPF = valorPF + valorIRPFpf + valorINSSpf;
      dados.totalPF = totalPF;
      document.getElementById('pf-total').textContent = formatarMoeda(totalPF.toFixed(2)); 
    } else {
    dados.totalPF = 0;
    document.getElementById('pf-total').textContent = "N/A";
    }
    
    atualizarGraficoSimulacao(totalSN, totalPF, totalMEI);
}

//K) Função de limpeza de dados dos botões de RESET
function configurarReset(idBotao, seletorContainer, tipo) {
    const botao = document.getElementById(idBotao);
    if (!botao) return;

    botao.addEventListener('click', () => {
        const container = document.querySelector(seletorContainer);
        if (!container) return;

        // 1. Limpa todos os inputs daquela seção específica
        const inputs = container.querySelectorAll('input');
        inputs.forEach(input => {
           input.value = ""; 
           // Forçamos o navegador a entender que o valor mudou para disparar o cálculo
           input.dispatchEvent(new Event('input')); 
        });

        // 2. Reseta o display de total (se houver um span de total na seção)
        const displayTotal = document.getElementById(`total-${tipo}`);
        if (displayTotal) displayTotal.textContent = "R$ 0,00";

        // 3. Atualiza o Fator R e os Impostos para refletirem a limpeza
        if (typeof atualizarFatorR === "function") atualizarFatorR();
        if (typeof calcularImpostos === "function") calcularImpostos();

        // 4. Reseta o efeito visual de preenchimento (background)
        // Passamos o seletor da div que tem o ::before
        if (tipo === 'rbt' || tipo === 'fs' ) {
            atualizarProgressoVisual(`.${tipo}12`);
        } else {atualizarProgressoVisual(`.dados-principais`);}
    });
}
// Ativando os três botões
configurarReset('main-reset', '#dados-principais', 'main');
configurarReset('rbt-reset', '#rbt12', 'rbt');
configurarReset('fs-reset', '#fs12', 'fs');

//L) Função do Botão de Replicar input
function replicar(listaReplicar){  
    if (!listaReplicar) return;

    const inputs = listaReplicar.querySelectorAll('form input');
    if (inputs.length === 0) return;

    // 1. Pega o valor do primeiro input
    const primeiroValor = inputs[0].value;

    // Se o primeiro estiver vazio, não faz nada;
    if (primeiroValor === "") return;

    // 2. Replica para os outros 11
    inputs.forEach((input, index) => {
        if (index > 0) { // Pula o primeiro para não sobrescrever o que já está lá
            input.value = primeiroValor;
                
                // 3. GATILHO CRUCIAL: Dispara o evento 'input' manualmente
                // Isso faz com que a função gerenciarEntrada() seja chamada para cada campo
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
}
const rbtReplicate = document.getElementById('rbt-replicate');
const rbt12Inputs = document.querySelector('#rbt12');
rbtReplicate.addEventListener('click', () => {
    replicar(rbt12Inputs);
});
const fsReplicate = document.getElementById('fs-replicate');
const fs12Inputs = document.querySelector('#fs12');
fsReplicate.addEventListener('click', () => {
    replicar(fs12Inputs);
});

// Lógica do Gráfico
Chart.register(ChartDataLabels);
function atualizarGraficoSimulacao(valorSN, valorPF, valorMEI) {
    const ctx = document.getElementById('grafico').getContext('2d');
    const RBTtotal = document.getElementById('total-rbt');  
    if (dados.iss==0){
        dados.PFlowTOTAL = dados.ICMSlow + dados.INSSPFlow + dados.IRPFPFlow;
        dados.PFhighTOTAL = dados.ICMShigh + dados.INSSPFhigh + dados.IRPFPFhigh;
    }
    else{
        dados.PFlowTOTAL = dados.ISSlow + dados.INSSPFlow + dados.IRPFPFlow;
        dados.PFhighTOTAL = dados.ISShigh + dados.INSSPFhigh + dados.IRPFPFhigh;
    }
    dados.SNlowTOTAL = dados.SNlow + dados.INSSSNlow + dados.IRPFSNlow;
    dados.SNhighTOTAL = dados.SNhigh + dados.INSSSNhigh + dados.IRPFSNhigh;
    
    dados.MEIlowTOTAL = dados.MEIlow + dados.IRPFMEIlow;
    dados.MEIhighTOTAL = dados.MEIhigh + dados.IRPFMEIhigh;

        // logs das variáveis “marcadas”
    console.log('dados.INSSPFlow: ', dados.INSSPFlow);
    console.log('dados.INSSPFhigh: ', dados.INSSPFhigh);
    console.log('dados.INSSSNlow: ', dados.INSSSNlow);
    console.log('dados.INSSSNhigh: ', dados.INSSSNhigh);
    console.log('dados.INSSMEIlow: ', dados.INSSMEIlow);
    console.log('dados.INSSMEIhigh: ', dados.INSSMEIhigh);

    console.log('dados.IRPFPFlow: ', dados.IRPFPFlow);
    console.log('dados.IRPFPFhigh: ', dados.IRPFPFhigh);
    console.log('dados.IRPFSNlow: ', dados.IRPFSNlow);
    console.log('dados.IRPFSNhigh: ', dados.IRPFSNhigh);
    console.log('dados.IRPFMEIlow: ', dados.IRPFMEIlow);
    console.log('dados.IRPFMEIhigh: ', dados.IRPFMEIhigh);
    
    console.log('dados.iss: ', dados.iss);
    console.log('dados.ISShigh: ', dados.ISShigh);
    console.log('dados.ISSlow: ', dados.ISSlow);
    console.log('dados.ICMSlow: ', dados.ICMSlow);
    console.log('dados.ICMShigh: ', dados.ICMShigh);
    console.log('dados.SNlow: ', dados.SNlow);
    console.log('dados.SNhigh: ', dados.SNhigh);
    console.log('dados.MEIlow: ', dados.MEIlow);
    console.log('dados.MEIhigh: ', dados.MEIhigh);

    console.log('dados.PFlowTOTAL: ', dados.PFlowTOTAL);
    console.log('dados.PFhighTOTAL: ', dados.PFhighTOTAL);
    console.log('dados.SNlowTOTAL: ', dados.SNlowTOTAL);
    console.log('dados.SNhighTOTAL: ', dados.SNhighTOTAL);
    console.log('dados.MEIlowTOTAL: ', dados.MEIlowTOTAL);
    console.log('dados.MEIhighTOTAL: ', dados.MEIhighTOTAL);

    if (!RBTtotal) return;

    // Obtemos os valores numéricos dos textos das divs de total
    const rbt12 = converterParaNumero(RBTtotal.textContent);

    // Destrói o gráfico anterior se ele existir para evitar sobreposição
    if (meuGrafico) {
        meuGrafico.destroy();
    }
    // Dados das linhas (Redução 50%, Valor Atual, Aumento 50%)
    const dadosSN = [dados.SNlowTOTAL, valorSN, dados.SNhighTOTAL];
    const dadosPF = [dados.PFlowTOTAL, valorPF, dados.PFhighTOTAL];
    const dadosMEI = [dados.MEIlowTOTAL, valorMEI, dados.MEIhighTOTAL] ;

    meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Baixa Receita(-50%)', 'Receita Atual', 'Alta Receita(+50%)'],
            datasets: [
                {
                    label: 'Simples Nacional',
                    data: dadosSN,
                    borderColor: '#f1c40f',
                    backgroundColor: 'rgba(241, 196, 15, 0.25)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    datalabels: { align: 'end', anchor: 'end' } // Posiciona abaixo do ponto
                },
                {
                    label: 'Pessoa Física (PF)',
                    data: dadosPF,
                    borderColor: '#9b59b6', 
                    backgroundColor: 'rgba(155, 89, 182, 0.25)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    datalabels: { align: 'end', anchor: 'end' } // Posiciona acima do ponto
                },
                {
                    label: 'Microempreendedor Individual (MEI)',
                    data: dadosMEI,
                    borderColor:  (rbt12 <dados.tetoMEI)? '#5cb659':'#b65959',
                    backgroundColor: (rbt12 <dados.tetoMEI)? 'rgba(108, 182, 89, 0.25)':'rgba(182, 89, 89, 0.1)',//a cor abaixo da linha
                    borderWidth: 3,
                    borderDash: [5, 5], //linha tracejada
                    tension: 0.3, //Controla a curvatura da linha(suavidade dos angulos)
                    fill: true, // faz com que o backgroundColor apareça
                    datalabels: { align: 'start', anchor: 'start' }
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // Mantém a proporção que você definiu
            devicePixelRatio: 2,       // Força o dobro da resolução para ficar nítido no print
            scales: {y: { beginAtZero: true }}, //evita que o gráfico não começe no 0, e altere a percepção do gráfico
            layout: {
             padding: 10,
            }, 
            plugins: {
                legend: { labels: { color: '#fff', padding: 15,}},
                datalabels: { //valor acima da linha
                    color: '#fff',
                    font: { weight: 'bold', size: 10 },
                    backgroundColor: (context) => {return context.dataset.backgroundColor;},
                    borderColor: (context) => {return context.dataset.borderColor;},
                    borderRadius: 4,
                    padding: 4,
                    formatter: (value) => {
                        // Usa a lógica de formatação BRL do projeto
                        return value.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL',
                            maximumFractionDigits: 0 // Remove centavos para não poluir
                        });
                    }
                }
            },
            scales: { //escala da lateral esquerda do gráfico
                y: {
                    ticks: { 
                        color: '#fff',
                        padding: 25,
                        callback: (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    border: {display: true, color: 'rgba(255, 255, 255, 0.2)', width: 1},
                },
                x: {
                    ticks: { color: '#fff', padding: 20, },
                    grid: { display: true, color: 'rgba(255, 255, 255, 0.2)' },
                    border: {display: true, color: 'rgba(255, 255, 255, 0.2)', width: 1},
                    
                }
            }
        }
    });

}

function baixarPNG() {
    const elemento = document.querySelector(".resultados");

    html2canvas(elemento, {
        scale: 2, // Aumenta a qualidade da imagem (Retina)
        backgroundColor: "exact", // Garante que o fundo fique nulo
        useCORS: true, // Necessário se houver imagens externas
        ignoreElements: (el) => el.id === 'btn-relatorio'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Relatorio-PROTOCOL.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

async function baixarPDF() {
    const { jsPDF } = window.jspdf;
    const elemento = document.querySelector(".resultados");

    // Tira a "foto" da div
    const canvas = await html2canvas(elemento, {
         scale: 2,
         ignoreElements: (el) => el.id === 'btn-relatorio'
    });
    const imgData = canvas.toDataURL('image/png');

    // Cria o PDF no formato A4
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Calcula as proporções para caber no A4
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("relatorio-PROTOCOL.pdf");
}

