import React, { useState, useRef, useEffect } from 'react';
import {
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  Coffee,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'suggestion';
  suggestions?: string[];
};

type ChatbotProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const quickReplies = [
  { text: "Show today's sales", icon: BarChart3 },
  { text: "Add new product", icon: ShoppingCart },
  { text: "Check inventory", icon: Coffee },
  { text: "View customers", icon: Users },
  { text: "Help & Support", icon: HelpCircle },
  { text: "System settings", icon: Settings }
];

const aiResponses = {
  greeting: [
    "Hello! I'm your AI restaurant assistant. How can I help you today?",
    "Hi there! Ready to optimize your restaurant operations?",
    "Welcome! I'm here to help with your POS system. What would you like to know?"
  ],
  sales: [
    "Today's sales are looking great! You've made RM 2,847 so far with 89 orders. Peak hour was 12-1 PM with RM 420 in sales.",
    "Your sales performance is up 12.5% compared to yesterday. The Margherita Pizza is your top seller today!",
    "Sales analytics show strong performance in the lunch category. Would you like me to show detailed reports?"
  ],
  inventory: [
    "Your inventory levels look good overall. However, I notice Pepperoni Pizza ingredients are running low - consider reordering within 2 days.",
    "Current stock status: 15 items in good supply, 3 items low stock, 0 out of stock. AI recommends restocking Mozzarella cheese.",
    "Inventory optimization suggests increasing Margherita Pizza stock by 25% based on demand forecasting."
  ],
  customers: [
    "You have 2,847 registered members with 89% retention rate. 156 new customers joined this month!",
    "Customer insights show VIP customers prefer premium items. Consider promoting your dessert menu to this segment.",
    "Loyalty program is performing well with 18% increase in repeat customers. Top tier: Gold members."
  ],
  help: [
    "I can help you with: Sales analytics, Inventory management, Customer insights, Order processing, Staff scheduling, and System settings. What interests you?",
    "Need assistance? I can guide you through: Adding products, Processing orders, Managing staff, Viewing reports, or System configuration.",
    "I'm equipped with AI capabilities for: Predictive analytics, Customer behavior analysis, Inventory optimization, and fraud detection. How can I assist?"
  ]
};

export function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI-powered restaurant assistant. I can help you with sales analytics, inventory management, customer insights, and much more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('sales') || message.includes('revenue') || message.includes('earnings')) {
      return aiResponses.sales[Math.floor(Math.random() * aiResponses.sales.length)];
    } else if (message.includes('inventory') || message.includes('stock') || message.includes('product')) {
      return aiResponses.inventory[Math.floor(Math.random() * aiResponses.inventory.length)];
    } else if (message.includes('customer') || message.includes('member') || message.includes('loyalty')) {
      return aiResponses.customers[Math.floor(Math.random() * aiResponses.customers.length)];
    } else if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return aiResponses.help[Math.floor(Math.random() * aiResponses.help.length)];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
    } else {
      return `I understand you're asking about "${userMessage}". Let me analyze your restaurant data... Based on current trends, I recommend focusing on your top-performing items and optimizing inventory levels. Would you like specific insights about sales, customers, or operations?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // Text-to-speech would be implemented here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-chatbot-primary/20 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-chatbot-primary to-chatbot-secondary rounded-t-2xl text-white">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold">AI Assistant</h3>
              <p className="text-xs text-white/80">Powered by Advanced LLM</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSpeech}
              className={`p-2 rounded-lg transition-colors ${
                isSpeaking ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 h-[400px] overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-chatbot-primary text-white' 
                        : 'bg-gradient-to-r from-chatbot-primary to-chatbot-secondary text-white'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-chatbot-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-chatbot-primary to-chatbot-secondary flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, 3).map((reply, index) => {
                  const Icon = reply.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply.text)}
                      className="flex items-center space-x-1 px-3 py-1 bg-chatbot-primary/10 text-chatbot-primary rounded-full text-xs hover:bg-chatbot-primary/20 transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                      <span>{reply.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your restaurant..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-chatbot-primary focus:border-transparent transition-all duration-300"
                  />
                  <button
                    onClick={toggleVoice}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                      isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-chatbot-primary'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-3 bg-gradient-to-r from-chatbot-primary to-chatbot-secondary text-white rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}