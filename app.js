const status = document.getElementById("status");

status.textContent =
    "Verificando permissão...";

if (!("Notification" in window)) {

    status.textContent =
        "Notification não disponível ❌";

} else {

    status.textContent =
        "Notification.permission = " +
        Notification.permission;

}
