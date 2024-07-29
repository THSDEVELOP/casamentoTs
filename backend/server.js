const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config(); // Carregar as variáveis do .env

// Verificar se as variáveis de ambiente foram carregadas corretamente
if (!process.env.MERCADO_PAGO_URL || !process.env.MERCADO_PAGO_TOKEN || !process.env.MERCADO_PAGO_CPF) {
  console.error('Variáveis de ambiente não carregadas corretamente.');
  process.exit(1);
}

const app = express();
const PORT = 5000; // Porta diferente da porta do seu app React

app.use(bodyParser.json());
app.use(cors()); // Usar o middleware cors

// Criar o servidor HTTP e o servidor WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Armazena os clientes WebSocket
let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
  });
});

app.post('/api/create_pix_payment', async (req, res) => {
  const { amount } = req.body;
  console.log('Valor recebido para o pagamento PIX:', amount);
  console.log('URL do Mercado Pago:', process.env.MERCADO_PAGO_URL);
  console.log('Token do Mercado Pago:', process.env.MERCADO_PAGO_TOKEN);

  try {
    const response = await axios.post(
      process.env.MERCADO_PAGO_URL,
      {
        transaction_amount: amount,
        description: 'Doação via PIX',
        payment_method_id: 'pix',
        payer: {
          email: 'sant.tharsys17@gmail.com',
          first_name: 'Tharsys',
          last_name: 'da Silva de Oliveira Santos',
          identification: {
            type: 'CPF',
            number: process.env.MERCADO_PAGO_CPF,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      }
    );
    console.log('Resposta do Mercado Pago:', response.data);
    res.json(response.data);

    // Simulação de um pagamento bem-sucedido após 5 segundos
    setTimeout(() => {
      clients.forEach(client => {
        client.send(JSON.stringify({ amount }));
      });
    }, 5000);

  } catch (error) {
    console.error('Erro ao criar pagamento PIX', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erro ao criar pagamento PIX' });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
