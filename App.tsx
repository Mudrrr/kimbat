import React, { useState, useEffect } from 'react';
import { ViewState, UserProfile } from './types';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import VideoPlayer from './components/VideoPlayer';
import Progress from './components/Progress';
import ExpertChat from './components/ExpertChat';
import { Play } from 'lucide-react';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>(ViewState.ONBOARDING);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Initialize theme from system preference or local storage (mocked here)
    useEffect(() => {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(isSystemDark ? 'dark' : 'light');
    }, []);

    // Apply theme class to document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleOnboardingComplete = (profile: Partial<UserProfile>) => {
        setUser(profile as UserProfile);
        setView(ViewState.DASHBOARD);
    };

    const renderContent = () => {
        if (!user && view !== ViewState.ONBOARDING) {
            setView(ViewState.ONBOARDING);
            return null;
        }

        switch (view) {
            case ViewState.ONBOARDING:
                return <Onboarding onComplete={handleOnboardingComplete} />;
            case ViewState.DASHBOARD:
                return user && <Dashboard user={user} onChangeView={setView} />;
            case ViewState.WORKOUT_PLAYER:
                return <VideoPlayer onBack={() => setView(ViewState.DASHBOARD)} />;
            case ViewState.PROGRESS:
                return <Progress isDark={theme === 'dark'} />;
            case ViewState.CHAT:
                return user && <ExpertChat user={user} />;
            case ViewState.PROGRAMS:
                return (
                    <div className="p-6 pb-24 dark:text-gray-100">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Программы</h1>
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-neutral-800 p-4 rounded-3xl border border-gray-100 dark:border-neutral-700 shadow-sm flex gap-4 transition-colors">
                                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🌱</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Основы здоровья</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">8 недель • Для начинающих</p>
                                    <div className="mt-3 flex gap-2">
                                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-md">Бесплатно</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-4 rounded-3xl border border-gray-100 dark:border-neutral-700 shadow-sm flex gap-4 relative overflow-hidden transition-colors">
                                <div className="absolute top-2 right-2 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full font-bold">PRO</div>
                                <div className="w-20 h-20 bg-secondary-100 dark:bg-secondary-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">💪</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Интимная гимнастика</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Продвинутый уровень</p>
                                    <button className="mt-3 text-xs bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                                        Купить за $29
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>View not found</div>;
        }
    };

    return (
        <Layout currentView={view} onChangeView={setView} theme={theme} toggleTheme={toggleTheme}>
            {renderContent()}
        </Layout>
    );
};

export default App;