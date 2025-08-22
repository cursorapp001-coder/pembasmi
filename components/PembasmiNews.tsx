
import React, { useState, useMemo, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BackIcon } from '../constants';

// --- Icons ---
const SearchIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const GeneralLoadingIcon: React.FC = () => <svg className="animate-spin h-8 w-8 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const SummaryLoadingIcon: React.FC = () => <svg className="animate-spin h-5 w-5 text-zinc-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const SparkleIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 17.657l-2.828 2.828M17.657 6.343l2.828-2.828m-1.414 11.314L17.657 12m-2.828-2.828l-1.414 1.414M12 21v-4M4.222 11.802l-1.414-1.414M19.778 11.802l1.414-1.414M12 3v4" /></svg>;
const CloseIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const LinkIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;

interface PembasmiNewsProps {
    onBack: () => void;
}

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    category: string;
    date: string;
    fullContent: string;
}

interface Citation {
    web: {
        uri: string;
        title: string;
    };
}

const SummaryModal: React.FC<{ content: string; isLoading: boolean; onClose: () => void; }> = ({ content, isLoading, onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in-up">
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 w-full max-w-2xl">
            <header className="p-4 flex justify-between items-center border-b border-zinc-700">
                <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2"><SparkleIcon /> Ringkasan Pembasmi Virtual</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-700"><CloseIcon /></button>
            </header>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <SummaryLoadingIcon />
                    </div>
                ) : (
                    <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{content}</p>
                )}
            </div>
        </div>
    </div>
);

const NewsSkeletonLoader: React.FC = () => (
    <div className="space-y-12">
        {/* Featured Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-pulse">
            <div className="rounded-xl w-full h-80 bg-zinc-800"></div>
            <div className="space-y-4">
                <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
                <div className="h-8 bg-zinc-800 rounded w-full"></div>
                <div className="h-8 bg-zinc-800 rounded w-5/6"></div>
                <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-6 bg-zinc-800 rounded w-2/4"></div>
                <div className="h-10 bg-zinc-800 rounded w-1/3 mt-2"></div>
            </div>
        </div>
        {/* Latest Skeletons */}
        <div>
            <div className="h-8 bg-zinc-800 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 flex flex-col animate-pulse">
                        <div className="w-full h-48 bg-zinc-700"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-3 bg-zinc-700 rounded w-1/4"></div>
                            <div className="h-5 bg-zinc-700 rounded w-full"></div>
                            <div className="h-5 bg-zinc-700 rounded w-5/6"></div>
                            <div className="h-8 bg-zinc-700 rounded w-1/3 mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FullArticleView: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <article className="animate-fade-in-up max-w-4xl mx-auto">
        <img src={article.imageUrl} alt={article.title} className="w-full h-64 sm:h-96 object-cover rounded-xl mb-6 shadow-lg" />
        <div className="space-y-2 mb-4">
            <span className="text-sm font-bold text-amber-400 uppercase">{article.category}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{article.title}</h1>
            <p className="text-sm text-zinc-500">{article.date}</p>
        </div>
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {article.fullContent}
        </div>
    </article>
);


const PembasmiNews: React.FC<PembasmiNewsProps> = ({ onBack }) => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [citations, setCitations] = useState<Citation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const prompt = `Using Google Search, find 5-7 recent and trending news articles from Indonesian online news sources related to: hukum di Indonesia (Indonesian law), teknologi hukum (legal tech), berita organisasi advokat (advocate organization news), putusan Mahkamah Agung (Supreme Court rulings), and legislative updates. For each article, find a suitable, royalty-free stock image URL from a site like Unsplash, Pexels, or Pixabay. Format the entire response as a single, valid JSON array string. Each object in the array should have the following keys: 'id' (integer), 'title' (string), 'excerpt' (string, max 50 words), 'imageUrl' (string), 'category' (string, e.g., 'Hukum Pidana', 'Berita Organisasi'), 'date' (string, e.g., '25 Oktober 2023'), and 'fullContent' (string, the main content of the article).`;

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                    config: {
                        tools: [{ googleSearch: {} }],
                    },
                });

                let jsonString = response.text;
                // Clean up markdown code blocks if present
                if (jsonString.startsWith("```json")) {
                    jsonString = jsonString.substring(7, jsonString.length - 3).trim();
                } else if (jsonString.startsWith("```")) {
                    jsonString = jsonString.substring(3, jsonString.length - 3).trim();
                }

                const parsedText = JSON.parse(jsonString);
                setNewsArticles(parsedText);

                const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
                if (groundingChunks) {
                    setCitations(groundingChunks.filter((chunk): chunk is Citation => 'web' in chunk));
                }

            } catch (e) {
                console.error("Error fetching news:", e);
                setError("Gagal memuat berita. Pembasmi Virtual tidak dapat mengambil data saat ini. Silakan coba lagi nanti.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const categories = useMemo(() => {
        if (isLoading) return ['Semua'];
        return ['Semua', ...Array.from(new Set(newsArticles.map(n => n.category)))];
    }, [newsArticles, isLoading]);

    const filteredNews = useMemo(() => {
        return newsArticles
            .filter(article => activeCategory === 'Semua' || article.category === activeCategory)
            .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [newsArticles, activeCategory, searchTerm]);
    
    const handleSummarize = async (article: NewsArticle) => {
        setIsModalOpen(true);
        setIsSummaryLoading(true);
        setModalContent('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Anda adalah asisten editor yang handal. Ringkaslah artikel berita berikut menjadi 3-4 kalimat utama yang padat dan informatif. Artikel:\n\n${article.fullContent}`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setModalContent(response.text);
        } catch (e) {
            console.error(e);
            setModalContent('Gagal membuat ringkasan. Silakan coba lagi.');
        } finally {
            setIsSummaryLoading(false);
        }
    };

    const featuredArticle = filteredNews[0];
    const latestArticles = filteredNews.slice(1);

    return (
        <div className="bg-zinc-900 text-white min-h-screen font-sans">
            <header className="relative p-4 sm:p-6 text-center border-b border-zinc-700 bg-zinc-800/50 backdrop-blur-sm sticky top-0 z-10">
                <button
                    onClick={selectedArticle ? () => setSelectedArticle(null) : onBack}
                    className="absolute top-1/2 left-5 -translate-y-1/2 bg-zinc-700 text-white p-2 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                    aria-label="Kembali"
                >
                    <BackIcon />
                </button>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    Pembasmi <span className="text-amber-400">News</span>
                </h1>
                <p className="mt-1 text-sm text-zinc-400">Wawasan dan Berita Terkini dari Dunia Hukum</p>
            </header>

            <div className="max-w-7xl mx-auto p-4 sm:p-8">
                {selectedArticle ? (
                    <FullArticleView article={selectedArticle} />
                ) : (
                    <>
                        {/* Filters and Search */}
                        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === cat ? 'bg-amber-500 text-zinc-900' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><SearchIcon className="h-5 w-5 text-zinc-400" /></span>
                                <input type="text" placeholder="Cari berita..." onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-64 bg-zinc-800 border border-zinc-700 rounded-full py-2 px-4 pl-10 focus:ring-amber-500 focus:border-amber-500 text-white" />
                            </div>
                        </div>
                        
                        {isLoading ? (
                            <NewsSkeletonLoader />
                        ) : error ? (
                            <div className="text-center py-16 bg-zinc-800 rounded-lg">
                                <h3 className="text-xl font-semibold text-red-400">Terjadi Kesalahan</h3>
                                <p className="text-zinc-400 mt-2">{error}</p>
                            </div>
                        ) : filteredNews.length > 0 ? (
                            <div className="space-y-12">
                                {/* Featured Article */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                    <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="rounded-xl w-full h-80 object-cover shadow-lg" />
                                    <div className="space-y-4">
                                        <span className="text-sm font-bold text-amber-400 uppercase">{featuredArticle.category}</span>
                                        <h2 className="text-3xl font-bold text-white">{featuredArticle.title}</h2>
                                        <p className="text-zinc-400">{featuredArticle.excerpt}</p>
                                        <div className="flex items-center gap-4 pt-2">
                                            <button onClick={() => setSelectedArticle(featuredArticle)} className="text-white font-semibold hover:underline">Baca Selengkapnya &rarr;</button>
                                            <button onClick={() => handleSummarize(featuredArticle)} className="flex items-center gap-2 px-4 py-2 bg-zinc-700 text-amber-300 text-sm font-semibold rounded-lg hover:bg-zinc-600">
                                                <SparkleIcon/> Ringkas dengan Pembasmi Virtual
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Latest Articles */}
                                {latestArticles.length > 0 && (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 border-l-4 border-amber-500 pl-4">Berita Terbaru Lainnya</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {latestArticles.map(article => (
                                                <div key={article.id} className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 flex flex-col hover:border-amber-500 transition-colors">
                                                    <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
                                                    <div className="p-4 flex flex-col flex-grow">
                                                        <span className="text-xs font-bold text-amber-400 uppercase">{article.category}</span>
                                                        <h4 className="font-bold mt-2 flex-grow text-white">{article.title}</h4>
                                                        <p className="text-xs text-zinc-500 mt-2">{article.date}</p>
                                                        <div className="mt-4 flex items-center justify-between">
                                                            <button onClick={() => setSelectedArticle(article)} className="text-sm text-zinc-400 hover:text-white">Baca &rarr;</button>
                                                            <button onClick={() => handleSummarize(article)} className="flex items-center gap-1 px-3 py-1.5 bg-zinc-700 text-amber-300 text-xs font-semibold rounded-md hover:bg-zinc-600">
                                                                <SparkleIcon /> Ringkas
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Citations */}
                                {citations.length > 0 && (
                                    <div className="pt-12 mt-12 border-t border-zinc-800">
                                        <h3 className="text-lg font-bold mb-4 text-zinc-400">Sumber Berita Pembasmi Virtual</h3>
                                        <div className="space-y-2">
                                            {citations.map((citation, index) => (
                                                <a key={index} href={citation.web.uri} target="_blank" rel="noopener noreferrer" className="block p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-sm">
                                                    <div className="flex items-center text-amber-400">
                                                        <LinkIcon />
                                                        <span className="font-semibold truncate">{citation.web.title}</span>
                                                    </div>
                                                    <p className="text-xs text-zinc-500 truncate mt-1">{citation.web.uri}</p>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-semibold text-zinc-400">Tidak ada berita yang ditemukan.</h3>
                                <p className="text-zinc-500 mt-2">Coba ganti filter atau kata kunci pencarian Anda.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {!selectedArticle && isModalOpen && <SummaryModal content={modalContent} isLoading={isSummaryLoading} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default PembasmiNews;