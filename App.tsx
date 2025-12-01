import React, { useState } from 'react';
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
                return <Progress />;
            case ViewState.CHAT:
                return user && <ExpertChat user={user} />;
            case ViewState.PROGRAMS:
                // Simple placeholder for programs list to keep within file limit
                return (
                    <div className="p-6 pb-24">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Программы</h1>
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4">
                                <div className="w-20 h-20 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🌱</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Основы здоровья</h3>
                                    <p className="text-xs text-gray-500 mt-1">8 недель • Для начинающих</p>
                                    <div className="mt-3 flex gap-2">
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">Бесплатно</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 relative overflow-hidden">
                                <div className="absolute top-2 right-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">PRO</div>
                                <div className="w-20 h-20 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">💪</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Интимная гимнастика</h3>
                                    <p className="text-xs text-gray-500 mt-1">Продвинутый уровень</p>
                                    <button className="mt-3 text-xs bg-primary-500 text-white px-3 py-1.5 rounded-lg shadow-sm">
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
        <Layout currentView={view} onChangeView={setView}>
            {renderContent()}
        </Layout>
    );
};

export default App;