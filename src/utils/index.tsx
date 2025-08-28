import type { ProjectData } from "../types";

export const projectsData: ProjectData = {
  thomaggio: {
    id: 'thomaggio',
    title: 'Thomaggio',
    description: 'Sistema de delivery de pizzaria online',
    image: '@/assets/img/thomaggio.png',
    demoUrl: 'https://thomaggio.vercel.app',
    credentials: [
      {
        id: 'admin_system',
        role: 'Administrador do Sistema',
        username: 'admin_sys@thomaggio.com',
        password: 'admin_sys123',
        description: 'Acesso completo ao sistema'
      },
      {
        id: 'admin',
        role: 'Administrador Comum',
        username: 'admin@thomaggio.com',
        password: 'admin123',
        description: 'Acesso parcial ao sistema'
      },
    ],
    apiDocs: 'https://api.thomaggio.com/docs'
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
      {
        id: 'cliente_empresa',
        role: 'Cliente da Empresa',
        username: '',
        password: '',
        description: 'Acesse http://teste.com'
      },
    ],
    apiDocs: 'https://firecloud-qui3.onrender.com/docs'
  }
};