import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getMessaging,
    getToken
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// 🔥 CONFIGURAÇÃO DO FIREBASE

const firebaseConfig = {
    apiKey: "AIzaSyBxt1S0Rn63tymkSa0CqqpQBi8fFgSKhoE",
    authDomain: "linkpush-e7bb6.firebaseapp.com",
    projectId: "linkpush-e7bb6",
    storageBucket: "linkpush-e7bb6.firebasestorage.app",
    messagingSenderId: "753138864517",
    appId: "1:753138864517:web:3df918ac7b3a861bdff4ec"
};


// 🔥 INICIA FIREBASE

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const db = getFirestore(app);


// 🔘 BOTÃO ACESSAR

const botao = document.getElementById("participar");

const status = document.getElementById("status");


// Quando clicar no botão

botao.addEventListener("click", async () => {

    try {

        // Verifica se já está cadastrado

        if (localStorage.getItem("linkpush_cadastrado") === "sim") {

            status.textContent = "Você já está cadastrado! ✅";

            return;
        }


        // 🔔 Verifica suporte a notificações

        if (!("Notification" in window)) {

            status.textContent =
                "Seu navegador não suporta notificações.";

            return;
        }


        // 🔔 Solicita permissão

        const permissao =
            await Notification.requestPermission();


        if (permissao !== "granted") {

            status.textContent =
                "Permissão para notificações não concedida.";

            return;
        }


        // ⚙️ Verifica Service Worker

        if (!("serviceWorker" in navigator)) {

            status.textContent =
                "Seu navegador não suporta Service Worker.";

            return;
        }


        // 📡 Registra o Service Worker

        const registro =
            await navigator.serviceWorker.register(
                "./firebase-messaging-sw.js"
            );


        // 🔥 Pega o token FCM

        const token =
            await getToken(messaging, {
                serviceWorkerRegistration: registro
            });


        if (!token) {

            status.textContent =
                "Não foi possível obter o token.";

            return;
        }


        console.log("FCM Token:", token);


        // 💾 Salva no Firestore

        await setDoc(
            doc(db, "usuarios", token),
            {
                token: token,
                nome: "Usuário",
                criadoEm: serverTimestamp()
            }
        );


        // ✅ Marca o aparelho como cadastrado

        localStorage.setItem(
            "linkpush_cadastrado",
            "sim"
        );


        // 🎉 Finalizado

        status.textContent =
            "Cadastro concluído! 🔥✅";


    } catch (erro) {

        console.error(
            "Erro no cadastro:",
            erro
        );

        status.textContent =
            "Erro ao realizar o cadastro ❌";

    }

});
