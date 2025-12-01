import React from 'react';
import { ViewState } from '../types';
import { Home, PlayCircle, BarChart2, MessageCircle, Moon, Sun } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    currentView: ViewState;
    onChangeView: (view: ViewState) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView, theme, toggleTheme }) => {
    // Hide navigation on Onboarding and Video Player
    const hideNav = currentView === ViewState.ONBOARDING || currentView === ViewState.WORKOUT_PLAYER;

    const navItems = [
        { id: ViewState.DASHBOARD, icon: Home, label: 'Главная' },
        { id: ViewState.PROGRAMS, icon: PlayCircle, label: 'Курсы' },
        { id: ViewState.PROGRESS, icon: BarChart2, label: 'Прогресс' },
        { id: ViewState.CHAT, icon: MessageCircle, label: 'Эксперт' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 font-sans mx-auto max-w-lg shadow-2xl overflow-hidden relative transition-colors duration-300">
            {/* Theme Toggle Button - Floating top right */}
            {!hideNav && (
                <button 
                    onClick={toggleTheme}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm shadow-sm text-gray-600 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            )}

            <main className="flex-1 overflow-y-auto">
                {children}
            </main>

            {!hideNav && (
                <div className="bg-white dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700 px-6 py-2 pb-5 flex justify-between items-center z-40 fixed bottom-0 w-full max-w-lg transition-colors duration-300">
                    {navItems.map((item) => {
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onChangeView(item.id)}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                                    isActive ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
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