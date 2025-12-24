
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles, X, ChevronRight } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  onClose?: () => void;
}

const SUGGESTIONS = [
    "Lịch tập lớp cộng đồng?",
    "Lớp trị liệu đau lưng?",
    "Học phí kèm 1:1?",
    "Bài tập giảm mỡ bụng?",
    "Yoga cho người mới?"
];

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Namaste! Tôi là Aivy (IVS Celestech). Tôi có thể giúp gì cho việc tập luyện Yoga của bạn hôm nay?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for context (last 5 messages)
    const historyStrings = messages.slice(-5).map(m => `${m.role === 'user' ? 'User' : 'Aivy'}: ${m.text}`);

    const responseText = await sendMessageToGemini(userMsg.text, historyStrings);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white md:rounded-2xl shadow-2xl border border-purple-100 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-luv-primary to-luv-secondary p-4 flex items-center justify-between text-white shadow-sm shrink-0">
        <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
                <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
            <h3 className="font-bold text-base leading-tight">Aivy Assistant</h3>
            <p className="text-[10px] text-white/90">Powered by IVS Celestech</p>
            </div>
        </div>
        {onClose && (
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
            </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 shadow-sm text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-luv-primary text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-luv-primary" />
                    <span className="text-xs text-gray-500">Aivy đang trả lời...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (Visible if not loading) */}
      {!isLoading && (
        <div className="px-4 pb-2 bg-gray-50/50 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
            {SUGGESTIONS.map((sug, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleSend(sug)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-purple-100 rounded-full text-xs text-luv-dark hover:bg-luv-primary hover:text-white transition-colors shadow-sm"
                >
                    {sug}
                </button>
            ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Hỏi Aivy..."
            className="flex-1 bg-gray-100 border-0 rounded-full pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-luv-primary focus:bg-white transition-all outline-none text-sm text-gray-700 placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 bg-luv-primary hover:bg-luv-dark text-white p-1.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
