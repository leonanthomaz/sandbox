import type { ProjectNode } from "../types";

export const firecloudBackendTree: ProjectNode = {
  id: 'backend',
  name: 'Backend Python',
  type: 'folder',
  technologies: [
    'Python', 
    'FastAPI', 
    'PostgreSQL', 
    'Mercado Pago', 
    'Websockets', 
    'Google APIs', 
    'Web', 
    'NLP', 
    'Docker'
  ],
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
                  children: [
                    { id: 'analytics-py', name: 'analytics.py', type: 'file' }
                  ]
                },
                {
                  id: 'chat',
                  name: 'chat/',
                  type: 'folder',
                  children: [
                    { id: 'assistant-py', name: 'assistant.py', type: 'file' },
                    { id: 'chat-py', name: 'chat.py', type: 'file' },
                    { id: 'interaction-py', name: 'interaction.py', type: 'file' },
                    { id: 'token-status-py', name: 'token_status.py', type: 'file' }
                  ]
                },
                {
                  id: 'company-routes',
                  name: 'company/',
                  type: 'folder',
                  children: [
                    { id: 'company-py', name: 'company.py', type: 'file' },
                    { id: 'home-py', name: 'home.py', type: 'file' },
                    { id: 'register-py', name: 'register.py', type: 'file' }
                  ]
                },
                {
                  id: 'credit-routes',
                  name: 'credit/',
                  type: 'folder',
                  children: [
                    { id: 'credit-py', name: 'credit.py', type: 'file' }
                  ]
                },
                {
                  id: 'finance-routes',
                  name: 'finance/',
                  type: 'folder',
                  children: [
                    { id: 'finance-py', name: 'finance.py', type: 'file' },
                    { id: 'finance-category-py', name: 'finance_category.py', type: 'file' }
                  ]
                },
                {
                  id: 'google-routes',
                  name: 'google/',
                  type: 'folder',
                  children: [
                    { id: 'google-calendar-py', name: 'google_calendar.py', type: 'file' }
                  ]
                },
                {
                  id: 'payment-routes',
                  name: 'payment/',
                  type: 'folder',
                  children: [
                    { id: 'payment-py', name: 'payment.py', type: 'file' },
                    { id: 'payment-pix-py', name: 'payment_pix.py', type: 'file' }
                  ]
                },
                {
                  id: 'plan-routes',
                  name: 'plan/',
                  type: 'folder',
                  children: [
                    { id: 'plan-py', name: 'plan.py', type: 'file' }
                  ]
                },
                {
                  id: 'product-routes',
                  name: 'product/',
                  type: 'folder',
                  children: [
                    { id: 'category-product-py', name: 'category_product.py', type: 'file' },
                    { id: 'product-py', name: 'product.py', type: 'file' }
                  ]
                },
                {
                  id: 'schedule-routes',
                  name: 'schedule/',
                  type: 'folder',
                  children: [
                    { id: 'schedule-py', name: 'schedule.py', type: 'file' },
                    { id: 'schedule-slot-py', name: 'schedule_slot.py', type: 'file' }
                  ]
                },
                {
                  id: 'service-routes',
                  name: 'service/',
                  type: 'folder',
                  children: [
                    { id: 'category-service-py', name: 'category_service.py', type: 'file' },
                    { id: 'service-py', name: 'service.py', type: 'file' }
                  ]
                },
                {
                  id: 'user-routes',
                  name: 'user/',
                  type: 'folder',
                  children: [
                    { id: 'users-py', name: 'users.py', type: 'file' }
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
                  id: 'engine',
                  name: 'engine/',
                  type: 'folder',
                  children: [
                    { id: 'generate-response-py', name: 'generate_response.py', type: 'file' },
                    { id: 'generate-response-fake-py', name: 'generate_response_fake.py', type: 'file' }
                  ]
                },
                {
                  id: 'handlers',
                  name: 'handlers/',
                  type: 'folder',
                  children: [
                    { id: 'handlers-py', name: 'handlers.py', type: 'file' }
                  ]
                },
                {
                  id: 'mock',
                  name: 'mock/',
                  type: 'folder',
                  children: [
                    { id: 'fake-sentiment-analysis-py', name: 'fake_sentiment_analysis.py', type: 'file' }
                  ]
                },
                {
                  id: 'nlp',
                  name: 'nlp/',
                  type: 'folder',
                  children: [
                    { id: 'context-classifier-py', name: 'context_classifier.py', type: 'file' },
                    { id: 'context-filter-py', name: 'context_filter.py', type: 'file' },
                    { id: 'intent-classifier-py', name: 'intent_classifier.py', type: 'file' },
                    { id: 'profanity-level-py', name: 'profanity_level.py', type: 'file' },
                    { id: 'sentiment-classifier-py', name: 'sentiment_classifier.py', type: 'file' }
                  ]
                },
                {
                  id: 'providers',
                  name: 'providers/',
                  type: 'folder',
                  children: [
                    { id: 'chatbot-provider-py', name: 'chatbot_provider.py', type: 'file' },
                    { id: 'chatbot-provider-factory-py', name: 'chatbot_provider_factory.py', type: 'file' }
                  ]
                },
                {
                  id: 'IA',
                  name: 'IA/',
                  type: 'folder',
                  children: [
                    { id: 'deepseek-py', name: 'deepseek.py', type: 'file' },
                    { id: 'gemini-py', name: 'gemini.py', type: 'file' },
                    { id: 'openai-py', name: 'openai.py', type: 'file' }
                  ]
                }
              ]
            },
            {
              id: 'payment-gateway',
              name: 'payment/',
              type: 'folder',
              children: []
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
          children: [
            {
              id: 'email-service',
              name: 'email/',
              type: 'folder',
              children: [
                { id: 'templates', name: 'templates/', type: 'folder' }
              ]
            },
            {
              id: 'report-service',
              name: 'report/',
              type: 'folder',
              children: [
                { id: 'templates', name: 'templates/', type: 'folder' }
              ]
            }
          ]
        },
        {
          id: 'tasks',
          name: 'tasks/',
          type: 'folder',
          children: [
            {
              id: 'scheduler',
              name: 'scheduler/',
              type: 'folder',
              children: [
                { id: 'scheduler-py', name: 'scheduler.py', type: 'file' }
              ]
            },
            {
              id: 'websockets',
              name: 'websockets/',
              type: 'folder',
              children: [
                { id: 'payment-ws-py', name: 'payment_ws.py', type: 'file' },
                { id: 'routes-py', name: 'routes.py', type: 'file' },
                { id: 'ws-manager-py', name: 'ws_manager.py', type: 'file' }
              ]
            }
          ]
        },
        {
          id: 'utils',
          name: 'utils/',
          type: 'folder',
          children: [
            { id: 'chat-utils-py', name: 'chat_utils.py', type: 'file' },
            { id: 'company-utils-py', name: 'company_utils.py', type: 'file' },
            { id: 'hash-utils-py', name: 'hash_utils.py', type: 'file' },
            { id: 'password-hash-py', name: 'password_hash.py', type: 'file' },
            { id: 'payment-utils-py', name: 'payment_utils.py', type: 'file' },
            { id: 'redis-utils-py', name: 'redis_utils.py', type: 'file' },
            { id: 'register-utils-py', name: 'register_utils.py', type: 'file' },
            { id: 'spacy-utils-py', name: 'spacy_utils.py', type: 'file' },
            { id: 'user-utils-py', name: 'user_utils.py', type: 'file' }
          ]
        },
        {
          id: 'auth',
          name: 'auth/',
          type: 'folder',
          children: [
            { id: 'auth-py', name: 'auth.py', type: 'file' }
          ]
        },
        {
          id: 'cache',
          name: 'cache/',
          type: 'folder',
          children: [
            { id: 'cache-py', name: 'cache.py', type: 'file' },
            { id: 'cache-manager-py', name: 'cache_manager.py', type: 'file' }
          ]
        },
        {
          id: 'configuration',
          name: 'configuration/',
          type: 'folder',
          children: [
            { id: 'settings-py', name: 'settings.py', type: 'file' }
          ]
        },
        {
          id: 'database',
          name: 'database/',
          type: 'folder',
          children: [
            { id: 'connection-py', name: 'connection.py', type: 'file' },
            { id: 'populate-py', name: 'populate.py', type: 'file' }
          ]
        },
        {
          id: 'enums',
          name: 'enums/',
          type: 'folder',
          children: [
            { id: 'assistant-py', name: 'assistant.py', type: 'file' },
            { id: 'chat-py', name: 'chat.py', type: 'file' },
            { id: 'company-py', name: 'company.py', type: 'file' },
            { id: 'credit-py', name: 'credit.py', type: 'file' },
            { id: 'payment-py', name: 'payment.py', type: 'file' },
            { id: 'register-py', name: 'register.py', type: 'file' },
            { id: 'token-status-py', name: 'token_status.py', type: 'file' }
          ]
        },
        {
          id: 'exceptions',
          name: 'exceptions/',
          type: 'folder',
          children: [
            { id: 'chat-exception-py', name: 'chat_exception.py', type: 'file' },
            { id: 'spacy-error-py', name: 'spacy_error.py', type: 'file' }
          ]
        },
        {
          id: 'helpers',
          name: 'helpers/',
          type: 'folder',
          children: [
            { id: 'helpers-py', name: 'helpers.py', type: 'file' },
            { id: 'chat', name: 'chat/', type: 'folder', children: [{ id: 'get-assistant-py', name: 'get_assistant.py', type: 'file' }] }
          ]
        },
        {
          id: 'integration',
          name: 'integration/',
          type: 'folder',
          children: [
            { id: 'mercado-pago-py', name: 'mercado_pago.py', type: 'file' },
            { id: 'r2service-py', name: 'R2Service.py', type: 'file' }
          ]
        },
        {
          id: 'middleware',
          name: 'middleware/',
          type: 'folder',
          children: [
            { id: 'admin-py', name: 'admin.py', type: 'file' }
          ]
        },
        {
          id: 'schemas',
          name: 'schemas/',
          type: 'folder',
          children: [
            { id: 'auth/auth-py', name: 'auth.py', type: 'file' },
            { id: 'chat/assistant-py', name: 'assistant.py', type: 'file' },
            { id: 'chat/chat-py', name: 'chat.py', type: 'file' },
            { id: 'company/address-py', name: 'address.py', type: 'file' },
            { id: 'company/company-py', name: 'company.py', type: 'file' },
            { id: 'company/register-py', name: 'register.py', type: 'file' },
            { id: 'credit/credit-py', name: 'credit.py', type: 'file' },
            { id: 'finance/finance-py', name: 'finance.py', type: 'file' },
            { id: 'finance/finance-category-py', name: 'finance_category.py', type: 'file' },
            { id: 'payment/payment-py', name: 'payment.py', type: 'file' },
            { id: 'plan/plan-py', name: 'plan.py', type: 'file' },
            { id: 'product/category-product-py', name: 'category_product.py', type: 'file' },
            { id: 'product/product-py', name: 'product.py', type: 'file' },
            { id: 'schedule/google-schedule-py', name: 'google_schedule.py', type: 'file' },
            { id: 'schedule/schedule-py', name: 'schedule.py', type: 'file' },
            { id: 'schedule/schedule-slot-py', name: 'schedule_slot.py', type: 'file' },
            { id: 'service/category-service-py', name: 'category_service.py', type: 'file' },
            { id: 'service/service-py', name: 'service.py', type: 'file' },
            { id: 'user/user-py', name: 'user.py', type: 'file' }
          ]
        }
      ]
    }
  ]
};
