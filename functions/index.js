const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// 🚀 FUNÇÃO MANUAL (chamada pelo botão no painel)
exports.enviarAgora = functions.https.onRequest(async (req, res) => {
    // 🔓 Libera CORS para o seu painel
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
        return;
    }

    try {
        // 1️⃣ Busca todos os tokens cadastrados
        const snapshot = await admin.firestore().collection('usuarios').get();
        const tokens = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.token) tokens.push(data.token);
        });

        if (tokens.length === 0) {
            res.status(200).json({ success: false, message: 'Nenhum usuário cadastrado.' });
            return;
        }

        // 2️⃣ Pega a mensagem e o link enviados pelo painel
        const { mensagem, link } = req.body;
        const bodyText = mensagem || 'Clique para ver a novidade!';
        const url = link || 'https://blackberry171.github.io/LinkPush157/';

        // 3️⃣ Monta o push
        const payload = {
            data: {
                link: url,          // 📎 Link que vai abrir no Chrome
                title: '🔔 Nova Atualização',
                body: bodyText       // 🗯 Mensagem que vai aparecer
            },
            tokens: tokens
        };

        // 4️⃣ Dispara para todos os celulares
        const resposta = await admin.messaging().sendEachForMulticast(payload);

        res.status(200).json({
            success: true,
            successCount: resposta.successCount,
            failureCount: resposta.failureCount
        });

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
