import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { BackIcon } from '../constants';

// --- Icons ---
const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const LoadingIcon: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const BotIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1 -1v-3l1 -1v-1a2 2 0 0 1 2 -2z" />
        <path d="M10 16h4" />
        <circle cx="8.5" cy="11.5" r=".5" fill="currentColor" />
        <circle cx="15.5" cy="11.5" r=".5" fill="currentColor" />
        <path d="M9 7l-1 -4" />
        <path d="M15 7l1 -4" />
    </svg>
);

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="10" r="3" />
        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
);


interface Message {
    role: 'user' | 'model';
    text: string;
}

interface RobotPembasmiProps {
    onBack: () => void;
}

const RobotPembasmi: React.FC<RobotPembasmiProps> = ({ onBack }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'Anda adalah Robot PEMBASMI, asisten virtual yang ramah dan informatif untuk organisasi advokat PERKUMPULAN BADAN ADVOKAT SOLIDARITAS MERDEKA INDONESIA (PEMBASMI). Tugas Anda adalah menjawab pertanyaan anggota dan publik tentang organisasi, layanannya, cara mendaftar, dan memberikan informasi umum terkait hukum di Indonesia. Selalu gunakan Bahasa Indonesia yang baik dan profesional.',
                },
            });
            setChat(chatSession);
            setMessages([
                { role: 'model', text: 'Halo! Saya Robot PEMBASMI. Ada yang bisa saya bantu terkait organisasi advokat PEMBASMI atau informasi hukum umum?' }
            ]);
        };
        initChat();
    }, []);

    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chat.sendMessageStream({ message: input });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-zinc-900 text-white font-sans">
             <header className="relative p-4 sm:p-6 text-center border-b border-zinc-700 bg-zinc-800/50">
                <button
                    onClick={onBack}
                    className="absolute top-1/2 left-5 -translate-y-1/2 z-[100] bg-zinc-700 text-white p-2 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                    aria-label="Kembali ke menu utama"
                >
                    <BackIcon />
                </button>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Robot <span className="text-amber-400">PEMBASMI</span>
                </h1>
                <p className="mt-1 text-sm text-zinc-400">Asisten virtual Anda</p>
            </header>
            
            <main ref={chatContainerRef} className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <BotIcon className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />}
                        <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-amber-500 text-zinc-900 rounded-br-lg' : 'bg-zinc-800 text-zinc-300 rounded-bl-lg'}`}>
                           <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        </div>
                         {msg.role === 'user' && <UserIcon className="h-8 w-8 text-zinc-400 flex-shrink-0 mt-1" />}
                    </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                     <div className="flex items-start gap-3 justify-start">
                        <BotIcon className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
                        <div className="max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-300 rounded-bl-lg">
                           <div className="flex items-center space-x-2">
                               <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                               <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-200"></div>
                               <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-400"></div>
                           </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="p-4 sm:p-6 border-t border-zinc-700 bg-zinc-900">
                <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ketik pesan Anda..."
                            disabled={isLoading}
                            className="w-full bg-zinc-800 text-white placeholder-zinc-500 p-4 pr-16 rounded-full border-2 border-zinc-700 focus:border-amber-500 focus:ring-0 focus:outline-none transition-colors disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-12 m-1.5 bg-amber-500 text-zinc-900 rounded-full hover:bg-amber-400 transition-colors disabled:bg-zinc-600 disabled:cursor-not-allowed"
                            aria-label="Kirim pesan"
                        >
                            {isLoading ? <LoadingIcon /> : <SendIcon />}
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    );
};

export default RobotPembasmi;