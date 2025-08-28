export interface ChatPostParams {
  companyId?: number;
  apiKey?: string;
  model?: string;
  temperature?: number;
  message: string;
  maxTokens?: number;
  chatCode?: string | null;
}

export interface ChatRatingParams {
  chatId: number;
  rating?: number | null;
}

export interface ChatResponse {
  token_usage: any;
  useful_context: {
    user_response: string;
    system_response?: any;
    sentiment?: any;
    main_intent?: any;
    intent?: any;
    timestamp: string;
    metadata?: any;       // opcional
    token_usage?: number; // opcional
  };
  status: number;
  chat_code?: string;
}


export interface SystemResponse {
  function?: string;
  data?: any;
  schedule?: any;
  [key: string]: any;
}

export interface ChatResponseTest {
  useful_context: {
    user_response: string;
    system_response?: any;
    sentiment?: any;
    main_intent?: any;
    intent?: any;
    timestamp?: string;
    metadata?: any;       // opcional
    token_usage?: number; // opcional
  };
  status?: number;
  chat_code?: string;
  token_usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export interface ChatMessage {
  sender: string;
  text: string;
  timestamp?: string;
  sentiment?: string | null;
}