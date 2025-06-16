'use client';

import { useEffect, useState } from 'react';
import { fetchStats } from '../services/apiService';

type ParseStatistics = {
    totalParsed: number;
    totalFailed: number;
    lastSuccess: string | null;
    lastFailure: string | null;
    avgParseDurationMs: number | null;
};

const Footer = () => {
    const [stats, setStats] = useState<ParseStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchStats();
                setStats(data);
            } catch {
                // Ошибка уже показана toast-ом
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    return (
        <footer style={{ padding: '1rem', background: '#f2f2f2', fontSize: '0.9rem', marginTop: 'auto' }}>
            {loading && <div>Загрузка статистики...</div>}
            {stats && (
                <div>
                    <div>✅ Успешно разобрано: {stats.totalParsed}</div>
                    <div>❌ Ошибок: {stats.totalFailed}</div>
                    <div>📈 Ср. время разбора: {stats.avgParseDurationMs?.toFixed(2)} мс</div>
                    <div>🕒 Последний успех: {stats.lastSuccess ? new Date(stats.lastSuccess).toLocaleString() : '—'}</div>
                    <div>🕒 Последняя ошибка: {stats.lastFailure ? new Date(stats.lastFailure).toLocaleString() : '—'}</div>
                </div>
            )}
        </footer>
    );
};

export default Footer;