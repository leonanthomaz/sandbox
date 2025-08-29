import type { ProjectData } from "../types";

// Banners e logos
import thomaggioBanner from '@/assets/img/banner-thomaggio.jpg';
import firecloudBanner from '@/assets/img/banner-firecloud.jpg';
import chatbotBanner from '@/assets/img/banner-chatbot.jpg';

import thomaggioLogo from '@/assets/img/thomaggio.png';
import firecloudLogo from '@/assets/img/firecloud.png';

import { firecloudBackendTree } from "./tree_firecloud";
import { chatbotTree } from "./tree_chatbot";

export const projectsData: ProjectData = {
  thomaggio: {
    id: 'thomaggio',
    title: 'Thomaggio',
    logoImg: thomaggioLogo,
    bannerImg: thomaggioBanner,
    description: 'Sistema de delivery de pizzaria online',
    image: '@/assets/img/thomaggio.png',
    demoUrl: 'https://thomaggio-frontend.vercel.app',
    credentials: [
      {
        id: 'admin_system',
        role: 'Administrador do Sistema',
        username: 'admin_sys@thomaggio.com',
        password: 'admin_sys123',
        description: 'Acesso completo ao sistema'
      },
    ],
    dashboardUrl: 'https://thomaggio-admin.vercel.app',
    githubUrl: "https://github.com/leonanthomaz/thomaggio",
    apiDocs: 'https://thomaggio.onrender.com/docs'
  },
  firecloud: {
    id: 'firecloud',
    title: 'FireCloud',
    logoImg: firecloudLogo,
    bannerImg: firecloudBanner,
    description: 'Portal de chatbots para empresas',
    image: '@/assets/img/firecloud.png',
    demoUrl: 'https://firecloud.vercel.app',
    credentials: [
      {
        id: 'admin',
        role: 'Administrador',
        username: 'admin@firecloud.com',
        password: 'admin456',
        description: 'Acesso total à plataforma'
      },
      {
        id: 'empresa_plano',
        role: 'Empresa Cliente - Plano Mensal',
        username: 'empresa_plano@exemplo.com',
        password: 'empresa_plano123',
        description: 'Simulando uma empresa do Plano Básico'
      },
      {
        id: 'empresa_credito',
        role: 'Empresa Cliente - Plano Pré Pago',
        username: 'empresa_credito@exemplo.com',
        password: 'empresa_credito123',
        description: 'Simulando uma empresa do Plano Pré Pago'
      },
    ],
    tree: [firecloudBackendTree],
    dashboardUrl: 'https://firecloud-admin.vercel.app',
    githubUrl: "https://github.com/leonanthomaz/firecloud",
    apiDocs: 'https://firecloud-qui3.onrender.com/docs'
  },
  chatbot: {
    id: 'chatbot',
    title: 'Chatbot Inteligente',
    description: 'Protótipo de chatbot integrado à API da OpenAI para consumo de dados externos com NLP',
    tree: [chatbotTree],
    bannerImg: chatbotBanner,
    image: '@/assets/img/chatbot.png',
    demoUrl: 'https://chatbot.vercel.app',
    credentials: [
      {
        id: 'user_demo',
        api_key: "",
        description: 'Acesso para testar funcionalidades do chatbot',
        role: "",
        username: "",
        password: ""
      },
    ],
    githubUrl: "https://github.com/leonanthomaz/chatbot",
    apiDocs: 'https://chatbot-api.vercel.app/docs'
  }
};
