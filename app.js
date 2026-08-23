import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    doc
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getMessaging,
    getToken
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";


const firebaseConfig = {
    apiKey: "AIzaSyBxt1S0Rn63tymkSa0CqqpQBi8fFgSKhoE",
    authDomain: "linkpush-e7bb6.firebaseapp.com",
    projectId: "linkpush-e7bb6",
    storageBucket: "linkpush-e7bb6.firebasestorage.app",
    messagingSenderId: "753138864517",
    appId: "1:753138864517:web:3df918ac7b3a861bdff4ec"
};


const VAPID_KEY =
"BJnO93rvUsdi05nwRn0p2FPSSBtg3tyn4VAEnbDPb0zj_8XbDZlZ3BliGPZ4LNpWbAYeGQPeXiCdnK_uYEO2RU0";


const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);

const messaging =
    getMessaging(app);


const botao =
    document.getElementById("participar");

const status =
    document.getElementById("status");


const idDispositivo =
    localStorage.getItem("idDispositivo") ||
    crypto.randomUUID();


localStorage.setItem(
    "idDispositivo",
    idDispositivo
);


botao.addEventListener(
    "click",
    async () => {

        try {

            status.textContent =
                "Solicitando permissão...";


            /*
             * 1 — PEDIR PERMISSÃO
             */

            const permissao =
                await Notification.requestPermission();


            if (permissao !== "granted") {

                status.textContent =
                    "Notificações não autorizadas ❌";

                return;
            }


            /*
             * 2 — REGISTRAR SERVICE WORKER
             */

            const registro =
                await navigator.serviceWorker.register(
                    "/LinkPush157/firebase-messaging-sw.js"
                );


            /*
             * 3 — OBTER TOKEN FCM
             */

            status.textContent =
                "Ativando notificações...";


            const token =
                await getToken(
                    messaging,
                    {
                        vapidKey: VAPID_KEY,
                        serviceWorkerRegistration:
                            registro
                    }
                );


            if (!token) {

                status.textContent =
                    "Não foi possível obter o token ❌";

                return;
            }


            /*
             * 4 — PROCURAR USUÁRIO
             */

            status.textContent =
                "Salvando cadastro...";


            const usuariosRef =
                collection(
                    db,
                    "usuarios"
                );


            const consulta =
                query(
                    usuariosRef,
                    where(
                        "idDispositivo",
                        "==",
                        idDispositivo
                    )
                );


            const resultado =
                await getDocs(
                    consulta
                );


            /*
             * 5 — SE JÁ EXISTE
             */

            if (!resultado.empty) {

                const documento =
                    resultado.docs[0];


                await updateDoc(
                    doc(
                        db,
                        "usuarios",
                        documento.id
                    ),
                    {
                        fcmToken: token,
                        notificacoes: true
                    }
                );


                status.textContent =
                    "Você já está cadastrado! 🔔✅";

                return;
            }


            /*
             * 6 — NOVO CADASTRO
             */

            await addDoc(
                usuariosRef,
                {

                    nome:
                        "Usuário",

                    idDispositivo:
                        idDispositivo,

                    fcmToken:
                        token,

                    notificacoes:
                        true,

                    dataCadastro:
                        new Date().toISOString()

                }
            );


            status.textContent =
                "Cadastro concluído! 🔔✅";


        } catch (erro) {

            console.error(erro);

            status.textContent =
                "ERRO: " +
                erro.message;

        }

    }
);
