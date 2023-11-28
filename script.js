const selectDe = document.getElementById("fromCurrency");
const selectPara = document.getElementById("toCurrency");
const botaoObterCotacao = document.getElementById("getQuote");
const divResultado = document.getElementById("result");

const moedas = ["usd", "eur", "brl", "gbp", "jpy", "cad", "btc", "eth"];

// Preencher a lista de seleção "Para" com as moedas
moedas.forEach(moeda => {
    const opcao = document.createElement("option");
    opcao.value = moeda;
    opcao.text = moeda.toUpperCase();
    selectPara.appendChild(opcao);
});

const apiUrl = "https://api.coingecko.com/api/v3/simple/price";

botaoObterCotacao.addEventListener("click", () => {
    const moedaDe = selectDe.value;
    const moedaPara = selectPara.value;
    const quantidade = parseFloat(document.getElementById("amount").value);

    if (isNaN(quantidade) || quantidade <= 0) {
        divResultado.innerText = "Insira uma quantidade válida.";
        return;
    }

    fetch(`${apiUrl}?ids=${moedaDe}&vs_currencies=${moedaPara}`)
        .then(response => response.json())
        .then(data => {
            const cotacao = data[moedaDe][moedaPara];
            const resultado = quantidade * cotacao;
            divResultado.innerText = `${quantidade} ${moedaDe.toUpperCase()} = ${resultado} ${moedaPara.toUpperCase()}`;
        })
        .catch(error => {
            divResultado.innerText = "Erro ao obter cotação.";
        });
});
