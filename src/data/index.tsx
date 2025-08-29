import type { ProjectData } from "../types";

export const projectsData: ProjectData = {
  thomaggio: {
    id: 'thomaggio',
    title: 'Thomaggio',
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
    tree: [
      {
        id: 'backend',
        name: 'Backend Python',
        type: 'folder',
        technologies: ['Python', 'FastAPI', 'PostgreSQL'],
        children: [
          {
            id: 'app',
            name: 'app/',
            type: 'folder',
            children: [
              {
                id: 'api',
                name: 'api/',
                type: 'folder',
                description: 'Todas as rotas da API',
                children: [
                  {
                    id: 'routes',
                    name: 'routes/',
                    type: 'folder',
                    children: [
                      {
                        id: 'admin',
                        name: 'admin/',
                        type: 'folder',
                        description: 'Rotas administrativas',
                        children: [
                          { id: 'company-py', name: 'company.py', type: 'file' },
                          { id: 'users-py', name: 'users.py', type: 'file' }
                        ]
                      },
                      {
                        id: 'analytics',
                        name: 'analytics/',
                        type: 'folder',
                        description: 'Análises e métricas',
                        children: [
                          { id: 'analytics-py', name: 'analytics.py', type: 'file' }
                        ]
                      },
                      {
                        id: 'chat',
                        name: 'chat/',
                        type: 'folder',
                        description: 'Sistema de chat principal',
                        children: [
                          { id: 'assistant-py', name: 'assistant.py', type: 'file' },
                          { id: 'chat-py', name: 'chat.py', type: 'file' },
                          { id: 'interaction-py', name: 'interaction.py', type: 'file' }
                        ]
                      },
                      {
                        id: 'company-routes',
                        name: 'company/',
                        type: 'folder',
                        description: 'Gestão de empresas',
                        children: [
                          { id: 'company-route-py', name: 'company.py', type: 'file' },
                          { id: 'register-py', name: 'register.py', type: 'file' }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 'gateway',
                name: 'gateway/',
                type: 'folder',
                description: 'Integrações e provedores externos',
                children: [
                  {
                    id: 'chatbot-gateway',
                    name: 'chatbot/',
                    type: 'folder',
                    children: [
                      {
                        id: 'nlp',
                        name: 'nlp/',
                        type: 'folder',
                        description: 'Processamento de linguagem natural',
                        children: [
                          { id: 'context-classifier', name: 'context_classifier.py', type: 'file' },
                          { id: 'sentiment-classifier', name: 'sentiment_classifier.py', type: 'file' }
                        ]
                      },
                      {
                        id: 'providers',
                        name: 'providers/',
                        type: 'folder',
                        description: 'Provedores de IA',
                        children: [
                          { id: 'openai-py', name: 'openai.py', type: 'file' },
                          { id: 'gemini-py', name: 'gemini.py', type: 'file' }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 'models',
                name: 'models/',
                type: 'folder',
                description: 'Modelos de banco de dados',
                children: [
                  { id: 'chat-models', name: 'chat/', type: 'folder' },
                  { id: 'company-models', name: 'company/', type: 'folder' },
                  { id: 'user-models', name: 'user/', type: 'folder' }
                ]
              },
              {
                id: 'services',
                name: 'services/',
                type: 'folder',
                description: 'Serviços externos',
                children: [
                  {
                    id: 'email-service',
                    name: 'email/',
                    type: 'folder',
                    children: [
                      { id: 'templates', name: 'templates/', type: 'folder' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'database',
            name: 'database/',
            type: 'folder',
            description: 'Configuração do banco de dados',
            children: [
              { id: 'connection-py', name: 'connection.py', type: 'file' }
            ]
          }
        ]
      },
      {
        id: 'frontend',
        name: 'Frontend',
        type: 'folder',
        technologies: ['React', 'TypeScript', 'Material-UI'],
        description: 'Interface do usuário'
      },
    ],
    dashboardUrl: 'https://firecloud-admin.vercel.app',
    githubUrl: "https://github.com/leonanthomaz/firecloud",
    apiDocs: 'https://firecloud-qui3.onrender.com/docs'
  },
  chatbot: {
    id: 'chatbot',
    title: 'Chatbot Inteligente',
    description: 'Protótipo de chatbot integrado à API da OpenAI para consumo de dados externos com NLP',
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
