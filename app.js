const status = document.getElementById("status");
const botao = document.getElementById("participar");

botao.addEventListener("click", async () => {

    status.textContent =
        "TESTE 1 — clique recebido ✅";

    try {

        status.textContent =
            "TESTE 2 — verificando Notification...";

        if (!("Notification" in window)) {

            status.textContent =
                "TESTE 3 — Notification não existe ❌";

            return;
        }

        status.textContent =
            "TESTE 3 — Notification existe ✅";

        const permissao =
            await Notification.requestPermission();

        status.textContent =
            "RESULTADO: " + permissao;

    } catch (erro) {

        status.textContent =
            "ERRO: " + erro.message;

        console.error(erro);
    }

});
