document.getElementById("status").textContent =
    "app.js funcionando! ⚡";

const botao = document.getElementById("participar");

botao.addEventListener("click", () => {
    document.getElementById("status").textContent =
        "Clique recebido! ⚡";
});
