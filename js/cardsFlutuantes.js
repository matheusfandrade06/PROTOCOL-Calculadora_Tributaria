// ------------Configurações dos Cards Flutuantes-------------------//

//1. Cards à Esquerda
const cardflutuante = document.getElementById("card-flutuante");

const buttons = document.querySelectorAll('.tipos button, .mei-total, .sn-total, .pf-total, .ic-clone, .irpf-pf-clone, .inss-pf-clone, .inss-mei-clone, .irpf-mei-clone,.mei-clone');

function cardPositionLeft(event) {
    const buttonCard = event.currentTarget;
    const rect = buttonCard.getBoundingClientRect();

    // 2. FORÇAR LEITURA: offsetHeight obriga o navegador a ler a altura REAL do conteúdo novo
    const cardHeight = cardflutuante.offsetHeight; 
    const cardWidth = cardflutuante.offsetWidth;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight; // Altura da janela visível

    // --- CÁLCULO VERTICAL CENTRALIZADO ---
    // (Topo do botão + Metade da altura do botão + Scroll) - Metade da altura do Card
    let topPosition = (rect.top + scrollY + (rect.height / 2)) - (cardHeight / 2);
    // --- CÁLCULO HORIZONTAL (Sua lógica original com ajuste) ---
    let leftPosition;
    if (rect.left < cardWidth) {leftPosition = rect.right + 15;} 
    else {leftPosition = rect.left - cardWidth - 15;}

    // Trava simples top: não deixa o card sumir para cima da janela
    if (topPosition < scrollY + 10) topPosition = scrollY + 10;
    // Trava simples bot: não deixa o card descer para fora da janela
    if (topPosition + cardHeight > scrollY + viewportHeight - 10) topPosition = (scrollY + viewportHeight) - cardHeight - 10;  // (scrollY + viewportHeight) é o limite de baixo da tela do utilizador

    // 3. APLICAÇÃO FINAL
    cardflutuante.style.top = `${topPosition}px`;
    cardflutuante.style.left = `${leftPosition}px`;
}

function cardRemoveLeft(){
    cardflutuante.classList.remove('active');
    cardflutuante.style.top = "";
    cardflutuante.style.left = "";
}

buttons.forEach(btn => {
    btn.addEventListener('mouseleave', cardRemoveLeft);
});

//Cards à Direita
const buttonsRight = document.querySelectorAll('#servico, #medico, #advogado, #contabilidade,#academia, #representante, #corretagem, #transporte, #academia, .fa-calendar,#rbt12-title img, #fs12-title img, #fs-description, #rbt-description, .pj, .sn, .mei, .inss-sn-clone, .irpf-sn-clone, .sn-clone');

function cardPositionRight(event){ 
    const buttonCard = event.currentTarget;
    const rect = buttonCard.getBoundingClientRect();

    // 2. FORÇAR LEITURA: offsetHeight obriga o navegador a ler a altura REAL do conteúdo novo
    const cardHeight = cardflutuante.offsetHeight; 
    const cardWidth = cardflutuante.offsetWidth;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight; // Altura da janela visível
    const viewportWidth = window.innerWidth; // largura da janela visível

    // --- CÁLCULO VERTICAL CENTRALIZADO ---
    // (Topo do botão + Metade da altura do botão + Scroll) - Metade da altura do Card
    let topPosition = (rect.top + scrollY + (rect.height / 2)) - (cardHeight / 2);
    // --- CÁLCULO HORIZONTAL (Sua lógica original com ajuste) ---
    let leftPosition;
    if ((viewportWidth - rect.right) < cardWidth) {leftPosition = rect.left - cardWidth - 15;} 
    else {leftPosition = rect.right + 15;}
    
    // Trava simples top: não deixa o card sumir para cima da janela
    if (topPosition < scrollY + 10) topPosition = scrollY + 10;
    // Trava simples bot: não deixa o card descer para fora da janela
    if (topPosition + cardHeight > scrollY + viewportHeight - 10) topPosition = (scrollY + viewportHeight) - cardHeight - 10;  // (scrollY + viewportHeight) é o limite de baixo da tela do utilizador

    cardflutuante.style.top = `${topPosition}px`;
    cardflutuante.style.left = `${leftPosition}px`;
}

function cardRemoveRight(){
    cardflutuante.classList.remove('active');
    cardflutuante.style.top = "";
    cardflutuante.style.left = "";
}

buttonsRight.forEach(btn => {
    btn.addEventListener('mouseleave', cardRemoveRight);
});

const comercioTipo = document.querySelector("#comercio");
// Comercio Button
comercioTipo.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Estabelecimento Comercial';
    document.querySelector('.titulo-card img').src = 'img/comercio-icon.png';
    document.querySelector('.description').textContent = 'O comércio é focado na circulação de mercadorias. No Simples Nacional, a alíquota inicial é de 4% (Anexo I), unificando impostos como o ICMS estadual, IRPJ, CSLL, etc.';
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const servicoTipo = document.querySelector("#servico");
// Servico Button
servicoTipo.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Prestação de serviço';
    document.querySelector('.titulo-card img').src = 'img/servico-icon.png';
    document.querySelector('.description').textContent = ' Atividades de serviços em geral. No Simples Nacional, a alíquota inicial é de 6% (Anexo III), unificando impostos como o ISS, IRPJ, CSLL, etc.';
    cardflutuante.classList.add('active');
    cardPositionRight(e);
})

//Medico subtipo Button
const medico = document.querySelector("#medico")
medico.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Serviços Médicos';
    document.querySelector('.titulo-card img').src = 'img/medico.png';
    document.querySelector('.description').textContent = `Abrange atividades de: Consultas, exames, cirurgias e serviços hospitalares ou ambulatoriais. Essa categoria se enquadra no Anexo V, portanto sendo sujeita ao Fator R.\n
     Alíquota: Inicia em 15,5% (Anexo V), podendo cair para 6% (Anexo III) se a folha/pró-labore for maior que 28% do faturamento. \n`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//advogado subtipo Button
const advogado = document.querySelector("#advogado")
advogado.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Serviços Advocatícios';
    document.querySelector('.titulo-card img').src = 'img/advocacia.png';
    document.querySelector('.description').textContent = `o diferencial dessa opção é o enquadramento obrigatório no Anexo IV, que possui uma regra de INSS diferente dos demais.\n
    Alíquota inicial de 4,5% sobre o faturamento no DAS, com o INSS Patronal (20%) sendo pago por fora do DAS.`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//contabilidade subtipo Button
const contabilidade = document.querySelector("#contabilidade")
contabilidade.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Contabilidade';
    document.querySelector('.titulo-card img').src = `img/contabilidade.png`;
    document.querySelector('.description').textContent = `Atividade enquadrada no Anexo III. Tendo Alíquota inicial fixa de 6% sobre o faturamento bruto.\n
    Atividade isenta de Fator R, garantindo tributação reduzida.`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//construcao subtipo Button
const construcao = document.querySelector("#construcao")
construcao.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Construção Civil';
    document.querySelector('.titulo-card img').src = 'img/construção.png';
    document.querySelector('.description').textContent = `Alíquota inicial de 4,5% no DAS. 
    INSS Patronal (20%) e RAT (1% a 3%) são pagos por fora do DAS. Sujeito à retenção de 11% de INSS na fatura em casos de cessão de mão de obra.`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//estetica subtipo Button
const estetica = document.querySelector("#estetica")
estetica.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Serviços Estéticos';
    document.querySelector('.titulo-card img').src = 'img/estetica.png';
    document.querySelector('.description').textContent = `Atividades de estética Abrange clínicas de estética, salões de beleza e cuidados com a pele. Essas atividades são enquadradas no Anexo III, tendo alíquota inicial de 6% sobre o faturamento. \n
    OBS: Não depende de Fator R e permite o uso da "Lei do Salão-Parceiro`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//ensino subtipo Button
const ensino = document.querySelector("#ensino")
ensino.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Educação e Treinamento';
    document.querySelector('.titulo-card img').src = 'img/ensino.png';
    document.querySelector('.description').textContent = `Abrange as atividades de: cursos livres, treinamentos e escolas de idiomas.
    Se enquadra no Anexo III, tendo alíquota inicial de 6% sobre o faturamento.`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//academia subtipo Button
const academia = document.querySelector("#academia")
academia.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Academia e Ginástica';
    document.querySelector('.titulo-card img').src = 'img/academia.png';
    document.querySelector('.description').textContent = `Abrange as atividades de: Musculação, pilates, dança, artes marciais e centros de atividades físicas. É enquadrada no Anexo III (alíquota inicial de 6%)`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//representante subtipo Button
const representante = document.querySelector("#representante")
representante.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'representante Comercial';
    document.querySelector('.titulo-card img').src = 'img/representante.png';
    document.querySelector('.description').textContent = `Abrange as atividades de: Mediação de negócios, agenciamento de mercadorias e vendas técnicas. Essas atividades são enquadradas no Anexo V, com alíquota inicial de 15,5%.
    Fator R: Pode cair para 6% (Anexo III) se a folha/pró-labore for 28% do faturamento.\n 
    • Não é permitido atuar como MEI para esta atividade (deve ser ME ou EPP)`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//software subtipo Button
const software = document.querySelector("#software")
software.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'Desenvolvedor de Software';
    document.querySelector('.titulo-card img').src = 'img/software.png';
    document.querySelector('.description').textContent = `Abrange as atividades de: Programação, suporte técnico, web design, consultoria em TI e licenciamento. Com Tributação no Anexo V (15,5%), mas pode ser reduzida para o Anexo III (6%) com o Fator R. \n
    A redução ocorre se os gastos com folha/pró-labore forem maiores que 28% do faturamento.\n
    • MEI: Não é permitido para desenvolvimento(CNAE 6201-5/00), apenas para Suporte (CNAE 6209-1/00).`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//manutencao subtipo Button
const manutencao = document.querySelector("#manutencao")
manutencao.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'manutencao e Reparo';
    document.querySelector('.titulo-card img').src = 'img/manutenção.png';
    document.querySelector('.description').textContent = `Abrange as atividades de: Reparos elétricos, hidráulicos, mecânicos, pintura e manutenção de equipamentos. Com Tributação no Anexo III (alíquota inicial de 6% sobre o faturamento).`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//transporte subtipo Button
const transporte = document.querySelector("#transporte")
transporte.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'transporte de passageiros';
    document.querySelector('.titulo-card img').src = 'img/motorista.png';
    document.querySelector('.description').textContent = `Abrange as atividades de: turismo, fretamento, táxi, Motorista de aplicativo e transporte municipal. sendo tributado,No Simples Nacional, no Anexo III, com alíquota de 6%. 
    OBS: O vantajoso para essa categoria é o MEI (Especialmente para motoristas de Aplicativo).
    `;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

//limpeza subtipo Button
const limpeza = document.querySelector("#limpeza")
limpeza.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'limpeza e  vigilância';
    document.querySelector('.titulo-card img').src = 'img/limpeza.png';
    document.querySelector('.description').textContent = `Abrange as atividades de: Limpeza predial, conservação, zeladoria e vigilância armada ou desarmada. Enquadrada no Anexo IV (alíquota inicial de 4,5%) `;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})


//Calendário de Apuração Button
const calendar = document.querySelector(".fa-calendar")


//Receita Bruta input Button
const fsInput = document.querySelector("#fs-description")


//Folha salarial input Button
const rbtInput = document.querySelector("#rbt-description")


//Folha salarial dos ultimos 12 meses Button
const fs12 = document.querySelector("#fs12-title img")
fs12.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'FS12';
    document.querySelector('.titulo-card img').src = 'img/pessoal.png';
    document.querySelector('.description').textContent = `A Folha de Salários acumulada nos últimos 12 meses (FS12) representa o somatório de todos os gastos com folha de pagamento, encargos sociais e pró-labore realizados por uma empresa no período de um ano anterior ao mês de apuração.\n
    É o componente essencial para o benefício tributário de diversas atividades. Ao dividir a FS12 pela RBT12, obtém-se um percentual; se este for igual ou superior a 28%, a empresa pode migrar do Anexo V (15,5%) para o Anexo III (6%), reduzindo significativamente a carga tributária.`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})


//Receita Bruta dos ultimos 12 meses Button
const rbt12 = document.querySelector("#rbt12-title img")
rbt12.addEventListener('mouseenter', (e) => {
document.querySelector('.titulo-card h3').textContent = 'RBT-12';
    document.querySelector('.titulo-card img').src = 'img/valor.png';
    document.querySelector('.description').textContent = `A Receita Bruta Total acumulada nos últimos 12 meses (RBT12) é o índice fundamental utilizado pela Receita Federal para determinar o enquadramento, a alíquota e o limite de permanência de uma empresa nos regimes simplificados. Ela representa o somatório dos faturamentos brutos mensais que precedem o período de apuração atual.\n
    No MEI: A RBT12 serve como o termômetro de permanência no regime. Embora o limite seja anual, o monitoramento do acumulado é vital para prever o desenquadramento obrigatório caso o teto de R$ 81.000 (ou o valor proporcional vigente) seja ultrapassado.`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const pjValue = document.querySelector('.pj');

const snValue = document.querySelector('.sn');

const meiValue = document.querySelector('.mei');

//RESULTADOS - EXPLICAÇÕES E JUSTIFICATIVAS
const total_pf = document.querySelector(".pf-total")
let ic_escohido = document.querySelector('.ic p');
total_pf.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = 'Custo total como Pessoa Física';
    document.querySelector('.titulo-card img').src = 'img/valor.png';
    document.querySelector('.description').innerHTML = `Representa o custo tributário ao atuar apenas pelo CPF. para o Cálculo comparativo foi somado: \n\n-INSS Autônomo (20% sobre o faturamento, limitado ao teto);\n-IRPF (com dedução do INSS) conforme a tabela progressiva;\n -<span class="variavel-citada">${ic_escohido.textContent}</span> aplicada sobre o Faturamento mensal preenchido` ;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const inss_pf_clone = document.querySelector(".inss-pf-clone")
inss_pf_clone.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = 'Valor do INSS (Pessoa Física)';
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `contribuição previdenciária obrigatória do autônomo pode ser feita de duas Maneiras:\n
    1º opção (Simplificada): para pessoas que desejam economizar no INSS, recebendo apenas o direito de se aposentar por idade, recebendo um salário Mínimo. Paga-se referente a <span class="variavel-citada">${dados.aliqINSSsimplificado*100}%</span> sobre o valor do salário Mínimo.\n
    2º Opção (Normal): Para pessoas que desejam se aposentar por tempo de contribuição e com o auxilio maior que o salário Mínimo.  Paga-se o INSS sobre o Faturamento Mensal, com alíquota de <span class="variavel-citada">${dados.aliqINSSnormal*100}%</span>, via GPS (Guia da Previdência Social) mensalmente. Sendo o valor limitado ao teto previdenciário de <span class="variavel-citada">${formatarMoeda(dados.tetoINSS.toFixed(2))}</span>\n
    - Base de Cálculo (simplificado):\n <span class="variavel-citada">${formatarMoeda(dados.salarioMinimo.toFixed(2))}</span>
    - Alíquota(simplificado): <span class="variavel-citada">${dados.aliqINSSsimplificado*100}%</span>.\n
    - Base de Cálculo (Normal):\n <span class="variavel-citada">${formatarMoeda(dados.faturamentoMes.toFixed(2))}</span>
    - Alíquota(Normal): <span class="variavel-citada">${dados.aliqINSSnormal*100}%</span>\n`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const irpf_pf_clone = document.querySelector(".irpf-pf-clone")
irpf_pf_clone.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = 'Valor do IRPF (Pessoa Física)';
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `Para o cálculo, foi utilizado a base líquida (faturamento total menos o valor já pago de INSS). será utilizado o Cálculo Mensal para equiparar os custos.\n Sobre esse saldo, aplica-se a tabela progressiva da Receita Federal, subtraindo a parcela a deduzir permitida para a sua faixa de renda.\n
    - Faixa do IRPF: <span class="variavel-citada">${dados.faixaIRPF_pf}</span>
    Alíquota: <span class="variavel-citada">${(dados.aliqIRPF_sn*100).toFixed(2)}%</span>  |  Dedução: <span class="variavel-citada">${formatarMoeda((dados.deducaoIRPF_sn).toFixed(2))}</span>
    --------------------------------------
    *Deduções da BC (INSS): (<span class="variavel-citada">${formatarMoeda(dados.inssPF.toFixed(2))}</span>)
    - Base de Cálculo: <span class="variavel-citada">${formatarMoeda(dados.bcIRPFpf.toFixed(2))}</span>`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const iss_card = document.querySelector(".ic-clone")
iss_card.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = `Valor do ${ic_escohido.textContent}`;
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `Tributação sobre o consumo, sendo obrigatório o pagamento para autônomo que pratica a respectiva atividade.\n\nNo cálculo da Pessoa Física, aplica-se a alíquota correspondente sobre o faturamento bruto para simular o custo que o autônomo deve recolher para estar em conformidade com a prefeitura ou estado.
    - Aliquota: <span class="variavel-citada">${dados.aliq_ic_escolhido*100}%</span>;
    - Base de cálculo: <span class="variavel-citada">${formatarMoeda(dados.faturamentoMes.toFixed(2))}</span>`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const sn_total = document.querySelector(".sn-total")
sn_total.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = `Custo total do Simples Nacional`;
    document.querySelector('.titulo-card img').src = 'img/valor.png';
    document.querySelector('.description').innerHTML = `Consolida todos os custos para receber em um CNPJ com benefícios tributários e com todos os direitos previdenciários garantidos:\n\n - A guia DAS (imposto sobre o faturamento da empresa)\n - Os encargos do sócio (INSS e IRPF). \n\nEste regime possui diversos fatores que causam a variação do custo, como exemplo: O Fator R, onde ao manter 28% do faturamento em folha, sua alíquota de imposto cai de 15,5% para apenas 6%; O valor do faturamento Bruto influencia também e o tipo de atividade.`;
    cardflutuante.classList.add('active');
    cardPositionRight(e);
})

const inss_sn_clone = document.querySelector(".inss-sn-clone")
inss_sn_clone.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = 'Valor do INSS (Simples Nacional)';
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `Contribuição previdenciária calculada exclusivamente sobre o seu Pró-labore (salário do sócio), aplicando uma alíquota fixa de 11%. (Anexos I, II, III e V) 
    Para pessoas que desejam se aposentar por tempo de contribuição e com o auxilio maior que o salário Mínimo: é possível adotar o Regime Normal do INSS, com a aliquota complementar de 9% sobre o Pro-labore declarado pago via GPS. Essa Opção é semelhante ao INSS de PF, sendo menos custoso.
    Para Anexo 4: o CPP é calculado por Fora, sendo aplicado 20% sobre o Pro-labore(+1-3% de RAT).\n
    - Base de Cálculo (Normal):\n <span class="variavel-citada">${formatarMoeda((dados.fs12/12).toFixed(2))}</span>
    - Alíquota(Normal): <span class="variavel-citada">${dados.aliqINSSnormal*100}%</span>\n
    - Base de Cálculo (simplificado):\n <span class="variavel-citada">${formatarMoeda(dados.salarioMinimo.toFixed(2))}</span>
    - Alíquota(simplificado): <span class="variavel-citada">${dados.aliqINSSsimplificado*100}%</span>.`;
    cardflutuante.classList.add('active');
    cardPositionRight(e);
})

const irpf_sn_clone = document.querySelector(".irpf-sn-clone")
irpf_sn_clone.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = 'Valor do IRPF (Simples Nacional)';
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `Considerando-se um autonomo como simples nacional, o IRPF terá como base de cálculo(BC) o valor do Pró-labore declarado, deduzindo o INSS já descontado. O sistema aplica a tabela progressiva, garantindo que você pague apenas sobre o rendimento líquido do trabalho.\n
    - Faixa do IRPF: <span class="variavel-citada">${dados.faixaIRPF_sn}</span>
     Alíquota: <span class="variavel-citada">${(dados.aliqIRPF_sn*100).toFixed(2)}%</span>  |  Dedução: <span class="variavel-citada">${formatarMoeda((dados.deducaoIRPF_sn).toFixed(2))}</span>
    --------------------------------------
    *Deduções da BC (INSS): (<span class="variavel-citada">${formatarMoeda(dados.inssSN.toFixed(2))}</span>)
    - (BC)Base de Cálculo: <span class="variavel-citada">${formatarMoeda(dados.bcIRPFsn.toFixed(2))}</span>`;
    cardflutuante.classList.add('active');
    cardPositionRight(e);
})

const sn_card = document.querySelector(".sn-clone")
sn_card.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = `Valor do DAS (Simples Nacional)`;
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `Diferente do MEI, o DAS do Simples Nacional é variável. Ele unifica até oito impostos (como IRPJ, CSLL, PIS, COFINS, ISS e ICMS) em uma única guia. O cálculo é feito aplicando a alíquota efetiva sobre o faturamento bruto do mês, baseando-se no anexo em que sua atividade se enquadra e no seu faturamento acumulado.\n
    Anexo: <span class="variavel-citada"> ${dados.anexoSN} </span> | <span class="variavel-citada">${dados.faixaSN}º </span> Faixa
    Aliquota: <span class="variavel-citada">${(dados.aliq_sn*100).toFixed(2)}% </span> | Dedução: <span class="variavel-citada">${formatarMoeda(dados.deducao_sn.toFixed(2))} </span>
    Aliquota Efetiva: <span class="variavel-citada">${(dados.aliqEfetiva*100).toFixed(2)}% </span>
    Base de Cálculo: <span class="variavel-citada">${formatarMoeda(dados.faturamentoMes.toFixed(2))} </span>
    `;
    cardflutuante.classList.add('active');
    cardPositionRight(e);
})

const mei_total = document.querySelector(".mei-total")
mei_total.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = `Custo total do MEI`;
    document.querySelector('.titulo-card img').src = 'img/valor.png';
    document.querySelector('.description').innerHTML = `soma da guia DAS fixa mensal com o eventual IRPF calculado sobre o lucro distribuído.\n É a opção mais econômica do sistema, ideal para quem fatura até R$ 81.000,00 por ano e busca o menor custo tributário possível com cobertura previdenciária.`;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const inss_mei_clone = document.querySelector(".inss-mei-clone")
inss_mei_clone.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = 'Valor do INSS Complementar (MEI)';
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `Valor destinado à sua aposentadoria e benefícios. Uma parte já está fixa na guia DAS. O sistema considera também a complementação de 15% para que você atinja a contribuição total de 20%, garantindo o direito à aposentadoria por tempo de contribuição, e não apenas por idade. Entretanto, como é opcional .\n
    - Base de Cálculo (Normal):\n <span class="variavel-citada">${formatarMoeda(dados.faturamentoMes.toFixed(2))}</span>
    - Alíquota(Normal): <span class="variavel-citada">${dados.aliqINSSnormal*100}%</span>\n
    - Base de Cálculo (simplificado):\n <span class="variavel-citada">${formatarMoeda(dados.salarioMinimo.toFixed(2))}</span>
    - Alíquota(simplificado): <span class="variavel-citada">${dados.aliqINSSsimplificado*100}%</span>. `;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const irpf_mei_clone = document.querySelector(".irpf-mei-clone")
irpf_mei_clone.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = 'Valor do IRPF (MEI)';
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `Considerando-se um autonomo como MEI, o IRPF terá como base de cálculo(BC) o valor do Pró-labore declarado, deduzindo o INSS já descontado e a regra de isenção (8% para Comércio e 32% para serviços) exclusiva para MEI.\n
    - Faixa do IRPF: <span class="variavel-citada">${dados.faixaIRPF_mei}</span>
     Alíquota: <span class="variavel-citada">${(dados.aliqIRPF_mei*100).toFixed(2)}%</span> | Dedução: <span class="variavel-citada">${formatarMoeda((dados.isencao_irpf_mei).toFixed(2))}</span>
    ---------------------------------------
    *Deduções da BC(MEI):\n (<span class="variavel-citada">${formatarMoeda(dados.isencao_irpf_mei.toFixed(2))} | ${dados.percentual_escolhido}</span>)
    *Deduções da BC (INSS):\n (<span class="variavel-citada">${formatarMoeda(dados.isencao_irpf_mei.toFixed(2))}</span>)
    - (BC)Base de Cálculo: <span class="variavel-citada">${formatarMoeda(dados.bcIRPFmei.toFixed(2))}</span>
    `;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

const mei_card = document.querySelector(".mei-clone")
mei_card.addEventListener('mouseenter', (e) => {
    document.querySelector('.titulo-card h3').innerHTML = `Valor do DAS (MEI)`;
    document.querySelector('.titulo-card img').src = 'img/imposto.png';
    document.querySelector('.description').innerHTML = `documento único de arrecadação do MEI. Possui um valor fixo mensal que engloba o INSS, o ISS (Serviços) e o ICMS (Comércio).\n Independentemente do quanto você faturar no mês (dentro do limite), o valor da guia permanece o mesmo, garantindo sua regularidade fiscal e direitos previdenciários de forma simplificada.\n\n - Valor fixo Mensal: R$ 81,05 `;
    cardflutuante.classList.add('active');
    cardPositionLeft(e);
})

