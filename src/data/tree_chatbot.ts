import type { ProjectNode } from "../types";

export const chatbotTree: ProjectNode = {
  id: 'chatbot',
  name: 'Chatbot',
  type: 'folder',
  technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLModel', 'Docker', 'Spacy', 'OpenAI', 'TypeScript'],
  children: [
    {
      id: 'api',
      name: 'API',
      type: 'folder',
      children: [
        {
          id: 'chat-routes',
          name: 'chat/',
          type: 'folder',
          children: [
            { id: 'chat-py', name: 'chat.py', type: 'file' },
            { id: 'token-status-py', name: 'token_status.py', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'cache',
      name: 'Cache',
      type: 'folder',
      children: [
        { id: 'cache-py', name: 'cache.py', type: 'file' },
        { id: 'cache-manager-py', name: 'cache_manager.py', type: 'file' }
      ]
    },
    {
      id: 'configuration',
      name: 'Configuration',
      type: 'folder',
      children: [
        { id: 'settings-py', name: 'settings.py', type: 'file' }
      ]
    },
    {
      id: 'enums',
      name: 'Enums',
      type: 'folder',
      children: [
        { id: 'assistant-py', name: 'assistant.py', type: 'file' },
        { id: 'chat-py', name: 'chat.py', type: 'file' },
        { id: 'token-status-py', name: 'token_status.py', type: 'file' }
      ]
    },
    {
      id: 'exceptions',
      name: 'Exceptions',
      type: 'folder',
      children: [
        { id: 'chat-exception-py', name: 'chat_exception.py', type: 'file' },
        { id: 'spacy-error-py', name: 'spacy_error.py', type: 'file' }
      ]
    },
    {
      id: 'gateway',
      name: 'Gateway',
      type: 'folder',
      children: [
        {
          id: 'engine',
          name: 'Engine',
          type: 'folder',
          children: [
            { id: 'generate-response-py', name: 'generate_response.py', type: 'file' },
            { id: 'generate-response-fake-py', name: 'generate_response_fake.py', type: 'file' }
          ]
        },
        {
          id: 'handlers',
          name: 'Handlers',
          type: 'folder',
          children: [
            { id: 'handlers-py', name: 'handlers.py', type: 'file' }
          ]
        },
        {
          id: 'mock',
          name: 'Mock',
          type: 'folder',
          children: [
            { id: 'fake-sentiment-analysis-py', name: 'fake_sentiment_analysis.py', type: 'file' }
          ]
        },
        {
          id: 'nlp',
          name: 'NLP',
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
          name: 'Providers',
          type: 'folder',
          children: [
            { id: 'chatbot-provider-py', name: 'chatbot_provider.py', type: 'file' },
            { id: 'chatbot-provider-factory-py', name: 'chatbot_provider_factory.py', type: 'file' },
            {
              id: 'IA',
              name: 'IA',
              type: 'folder',
              children: [
                { id: 'deepseek-py', name: 'deepseek.py', type: 'file' },
                { id: 'gemini-py', name: 'gemini.py', type: 'file' },
                { id: 'openai-py', name: 'openai.py', type: 'file' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'helpers',
      name: 'Helpers',
      type: 'folder',
      children: [
        { id: 'helpers-py', name: 'helpers.py', type: 'file' },
        {
          id: 'chat-helpers',
          name: 'Chat',
          type: 'folder',
          children: [
            { id: 'get-assistant-py', name: 'get_assistant.py', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'models',
      name: 'Models',
      type: 'folder',
      children: [
        {
          id: 'chat-models',
          name: 'Chat',
          type: 'folder',
          children: [
            { id: 'assistant-py', name: 'assistant.py', type: 'file' },
            { id: 'chat-py', name: 'chat.py', type: 'file' },
            { id: 'interaction-py', name: 'interaction.py', type: 'file' },
            { id: 'sentiment-py', name: 'sentiment.py', type: 'file' }
          ]
        },
        {
          id: 'company-models',
          name: 'Company',
          type: 'folder',
          children: [
            { id: 'address-py', name: 'address.py', type: 'file' },
            { id: 'company-py', name: 'company.py', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'schemas',
      name: 'Schemas',
      type: 'folder',
      children: [
        {
          id: 'chat-schemas',
          name: 'Chat',
          type: 'folder',
          children: [
            { id: 'assistant-py', name: 'assistant.py', type: 'file' },
            { id: 'chat-py', name: 'chat.py', type: 'file' }
          ]
        },
        {
          id: 'company-schemas',
          name: 'Company',
          type: 'folder',
          children: [
            { id: 'address-py', name: 'address.py', type: 'file' },
            { id: 'company-py', name: 'company.py', type: 'file' },
            { id: 'register-py', name: 'register.py', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'utils',
      name: 'Utils',
      type: 'folder',
      children: [
        { id: 'chat-utils-py', name: 'chat_utils.py', type: 'file' },
        { id: 'company-utils-py', name: 'company_utils.py', type: 'file' },
        { id: 'hash-utils-py', name: 'hash_utils.py', type: 'file' },
        { id: 'spacy-utils-py', name: 'spacy_utils.py', type: 'file' }
      ]
    }
  ]
};
