import React from 'react';
import { ViewState } from '../types';
import { Home, PlayCircle, BarChart2, MessageCircle } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    currentView: ViewState;
    onChangeView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
    // Hide navigation on Onboarding and Video Player
    const hideNav = currentView === ViewState.ONBOARDING || currentView === ViewState.WORKOUT_PLAYER;

    const navItems = [
        { id: ViewState.DASHBOARD, icon: Home, label: 'Главная' },
        { id: ViewState.PROGRAMS, icon: PlayCircle, label: 'Курсы' },
        { id: ViewState.PROGRESS, icon: BarChart2, label: 'Прогресс' },
        { id: ViewState.CHAT, icon: MessageCircle, label: 'Эксперт' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans mx-auto max-w-lg shadow-2xl overflow-hidden relative">
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>

            {!hideNav && (
                <div className="bg-white border-t border-gray-100 px-6 py-2 pb-5 flex justify-between items-center z-40 fixed bottom-0 w-full max-w-lg">
                    {navItems.map((item) => {
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onChangeView(item.id)}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                                    isActive ? 'text-primary-500' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <item.icon 
                                    size={24} 
                                    strokeWidth={isActive ? 2.5 : 2} 
                                    fill={isActive ? 'currentColor' : 'none'}
                                    className={isActive ? 'text-primary-500/20' : ''}
                                />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Layout;