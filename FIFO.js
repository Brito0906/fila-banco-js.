//const prompt = require('prompt-sync')();

// FUNÇÃO DE MENSAGEM
function message(msg, timems = 2000) {
    console.log("\n" + msg);
    sleep(timems);
}

// FUNÇÃO SLEEP
function sleep(ms) {
    const start = Date.now();

    while (Date.now() - start < ms) {
        // espera
    }
}

// CLASSE FILA
class Queue {
    constructor() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const result = this.items[this.lowestCount];

        delete this.items[this.lowestCount];
        this.lowestCount++;

        return result;
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items[this.lowestCount];
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.count - this.lowestCount;
    }

    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return "";
        }

        let result = "";

        for (let i = this.lowestCount; i < this.count; i++) {
            result += this.items[i];

            if (i < this.count - 1) {
                result += " -> ";
            }
        }

        return result;
    }
}

// MAIN
let filaBanco = new Queue();
let option;

do {
    console.clear();

    console.log("======================================");
    console.log("   SIMULAÇÃO DE ATENDIMENTO - BANCO");
    console.log("======================================\n");

    console.log("FILA DE CLIENTES:");
    console.log("[" + filaBanco.toString() + "]\n");

    console.log("1 - Adicionar cliente");
    console.log("2 - Atender cliente");
    console.log("3 - Ver próximo cliente");
    console.log("4 - Quantidade de clientes");
    console.log("5 - Limpar fila");
    console.log("9 - Sair\n");

    option = parseInt(prompt("Escolha uma opção: "));

    switch (option) {

        case 1:
            let cliente = prompt("Digite o nome do cliente: ");

            filaBanco.enqueue(cliente);

            message("Cliente adicionado à fila!");
            break;

        case 2:
            let atendido = filaBanco.dequeue();

            if (atendido !== undefined) {
                message("Cliente atendido: " + atendido);
            } else {
                message("Não há clientes na fila!");
            }

            break;

        case 3:
            let proximo = filaBanco.peek();

            if (proximo !== undefined) {
                message("Próximo cliente: " + proximo);
            } else {
                message("Fila vazia!");
            }

            break;

        case 4:
            message("Clientes na fila: " + filaBanco.size());
            break;

        case 5:
            filaBanco.clear();

            message("Fila limpa com sucesso!");
            break;

        case 9:
            console.clear();
            console.log("Sistema encerrado!");
            break;

        default:
            message("Opção inválida!");
    }

} while (option !== 9);
