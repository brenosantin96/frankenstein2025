// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://localhost:7127'; // URL da sua API backend

// Configura o Axios para ignorar erros de certificado SSL em desenvolvimento
const axiosConfig = {
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: process.env.NODE_ENV === 'production', // Ignora apenas em desenvolvimento
    }),
};

export async function GET(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Token not provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extrai o token após "Bearer "

    try {
        // Decodifica o token para extrair o userId
        const decoded: any = jwtDecode(token);
        console.log('DECODED: ', decoded);

        const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        if (!userId) {
            return NextResponse.json({ error: 'Token inválido: userId não encontrado' }, { status: 401 });
        }

        // Monta a URL da API externa com o userId
        const apiUrl = `${API_URL}/Task/user/${userId}/tasks`;

        // Faz a requisição à API externa para buscar as tarefas
        const response = await axios.get(apiUrl, {
            ...axiosConfig,
            headers: {
                Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
            },
        });

        // Retorna as tarefas para o frontend
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Erro ao buscar tarefas' }, { status: 500 });
    }
}