import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { getExpertResponse } from '../services/geminiService';
import { Send, User, Bot, Loader2 } from 'lucide-react';

interface ExpertChatProps {
    user: UserProfile;
}

const ExpertChat: React.FC<ExpertChatProps> = ({ user }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            sender: 'expert',
            text: `Здравствуйте, ${user.name}! Я ваш виртуальный помощник по женскому здоровью. Задайте мне любой вопрос о тренировках или самочувствии.`,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        const context = `Имя: ${user.name}, Цели: ${user.goals.join(', ')}, Диагноз: ${user.hasDiagnosis ? 'Есть' : 'Нет'}`;
        
        try {
            const responseText = await getExpertResponse(userMsg.text, context);
            const expertMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'expert',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, expertMsg]);
        } catch (error) {
            // Error handling usually done in service
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
            <div className="bg-white dark:bg-neutral-800 p-4 shadow-sm border-b border-gray-100 dark:border-neutral-700 z-10 pr-14 transition-colors">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors">Чат с экспертом 👩‍⚕️</h1>
                <p className="text-xs text-gray-400 dark:text-gray-400">ИИ-ассистент Школы женского здоровья</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary-100 dark:bg-primary-900/50' : 'bg-secondary-100 dark:bg-secondary-900/50'}`}>
                            {msg.sender === 'user' ? <User size={16} className="text-primary-600 dark:text-primary-300" /> : <Bot size={16} className="text-secondary-600 dark:text-secondary-300" />}
                        </div>
                        
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-colors ${
                            msg.sender === 'user' 
                                ? 'bg-primary-500 text-white rounded-tr-none' 
                                : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-neutral-700 rounded-tl-none'
                        }`}>
                            {msg.text}
                            <div className={`text-[10px] mt-2 text-right ${msg.sender === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center">
                            <Bot size={16} className="text-secondary-600 dark:text-secondary-300" />
                        </div>
                        <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-neutral-700 shadow-sm flex items-center gap-2 transition-colors">
                            <Loader2 size={16} className="animate-spin text-secondary-500" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">Печатает...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700 transition-colors">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-900 p-2 rounded-2xl border border-gray-200 dark:border-neutral-700 transition-colors">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Напишите ваш вопрос..."
                        className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-gray-700 dark:text-white placeholder-gray-400"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!inputText.trim() || isLoading}
                        className="p-2 bg-primary-500 rounded-xl text-white shadow-md hover:bg-primary-600 disabled:opacity-50 disabled:shadow-none transition-all"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="text-[10px] text-center text-gray-400 mt-2">
                    Не является медицинской консультацией. В случае острой боли обратитесь к врачу.
                </p>
            </div>
        </div>
    );
};

export default ExpertChat;