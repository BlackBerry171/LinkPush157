import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";


// 🔥 CONFIGURAÇÃO DO SEU FIREBASE

const firebaseConfig = {
    apiKey: "AIzaSyBxt1S0Rn63tymkSa0CqqpQBi8fFgSKhoE",
    authDomain: "linkpush-e7bb6.firebaseapp.com",
    projectId: "linkpush-e7bb6",
    storageBucket: "linkpush-e7bb6.firebasestorage.app",
    messagingSenderId: "753138864517",
    appId: "1:753138864517:web:3df918ac7b3a861bdff4ec"
};


// Inicializar Firebase

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const db = getFirestore(app);


// Elementos

const botao = document.getElementById("participar");
const status = document.getElementById("status");


// Quando o usuário clicar em OK

botao.addEventListener("click", async () => {
    
    console.log("BOTÃO ACESSAR FOI CLICADO!");
status.textContent = "Botão funcionando! ⚡";

    try {

        status.textContent =
            "Solicitando permissão...";

        // Pedir permissão para notificações

        const permissao =
            await Notification.requestPermission();

        if (permissao !== "granted") {

            status.textContent =
                "A permissão foi recusada.";

            return;
        }


        status.textContent =
            "Permissão concedida! 🔔";


// Salvar cadastro no Firestore
await addDoc(collection(db, "usuarios"), {
    nome: "Usuário",
    dataCadastro: new Date().toISOString()
});

status.textContent =
    "Cadastro concluído! ✅";

    } catch (erro) {

 