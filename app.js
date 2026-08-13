import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBxt1S0Rn63tymkSa0CqqpQBi8fFgSKhoE",
    authDomain: "linkpush-e7bb6.firebaseapp.com",
    projectId: "linkpush-e7bb6",
    storageBucket: "linkpush-e7bb6.firebasestorage.app",
    messagingSenderId: "753138864517",
    appId: "1:753138864517:web:3df918ac7b3a861bdff4ec"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const botao = document.getElementById("participar");
const status = document.getElementById("status");


const idDispositivo =
    localStorage.getItem("idDispositivo") ||
    crypto.randomUUID();

localStorage.setItem(
    "idDispositivo",
    idDispositivo
);


botao.addEventListener("click", async () => {

    try {

        status.textContent =
            "Salvando cadastro...";


        const usuariosRef =
            collection(db, "usuarios");


        const consulta = query(
            usuariosRef,
            where("idDispositivo", "==", idDispositivo)
        );


        const resultado =
            await getDocs(consulta);


        if (!resultado.empty) {

            status.textContent =
                "Você já está cadastrado! ✅";

            return;
        }


        await addDoc(usuariosRef, {

            nome: "Usuário",

            idDispositivo:
                idDispositivo,

            dataCadastro:
                new Date().toISOString()

        });


        status.textContent =
            "Cadastro concluído! ✅";


    } catch (erro) {

        console.error(erro);

        status.textContent =
            "ERRO: " + erro.message;

    }

});