import { useEffect, useState } from 'react';
import { Input, Select, Pagination, Skeleton } from 'antd';
// mock data shape differs from the project's `Recipe` interface.
// Keep the mock typed locally to avoid TypeScript mismatch with app interfaces.
type LocalRecipe = {
    id: number;
    title: string;
    author: string;
    category: string;
    image: string;
    likes: number;
    energy: number;
    fat: number;
    carbs: number;
    protein: number;
};
import { CardRecipe } from '../components/CardRecipe';

const { Search } = Input;
const { Option } = Select;

const mockRecipes: LocalRecipe[] = [
    {
        id: 1,
        title: 'Turmeric Roasted Cauliflower Salad (lowfodmap)',
        author: 'Joana Jardim',
        category: 'Vegetarian dishes',
        image: 'https://picsum.photos/600/400?random=1',
        likes: 37,
        energy: 143,
        fat: 6,
        carbs: 18,
        protein: 5,
    },
    {
        id: 2,
        title: 'Vegetable & Egg Scramble (lowfodmap)',
        author: 'Joana Jardim',
        category: 'Diabetic Friendly',
        image: 'https://picsum.photos/600/400?random=2',
        likes: 33,
        energy: 87,
        fat: 4,
        carbs: 8,
        protein: 6,
    },
    {
        id: 3,
        title: 'Green Beans With Tofu and Roasted Peanuts (lowfodmap)',
        author: 'Joana Jardim',
        category: 'Vegetarian dishes',
        image: 'https://picsum.photos/600/400?random=3',
        likes: 22,
        energy: 99,
        fat: 6,
        carbs: 5,
        protein: 6,
    },
    {
        id: 4,
        title: 'Berry Almond Smoothie (full fat milk)',
        author: 'Joana Jardim',
        category: 'Desserts',
        image: 'https://picsum.photos/600/400?random=4',
        likes: 13,
        energy: 106,
        fat: 6,
        carbs: 5,
        protein: 9,
    },
];

export const MainHome = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Filters / UI state
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<'all' | string>('all');
    const [sortBy, setSortBy] = useState<'relevance' | 'energy' | 'protein' | 'likes' | 'title'>('relevance');

    const pageSize = 4;

    useEffect(() => {
        document.title = 'Home - Nutrium';

        // Simulate API call
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5 seconds loading

        return () => clearTimeout(timer);
    }, []);

    // When filters change reset to first page
    useEffect(() => {
        setCurrentPage(1);
    }, [query, category, sortBy]);

    const renderSkeletons = () => {
        return Array.from({ length: 4 }).map((_, index) => (
            <Skeleton active key={index} avatar paragraph={{ rows: 4 }} title />
        ));
    };

    // Derived filtered + sorted data
    const normalizedQuery = query.trim().toLowerCase();

    const filteredRecipes = mockRecipes
        .filter((r) => {
            if (category !== 'all') {
                if (!r.category) return false;
                if (r.category.toLowerCase() !== category.toLowerCase()) return false;
            }

            if (!normalizedQuery) return true;

            const inTitle = r.title?.toLowerCase().includes(normalizedQuery);
            const inAuthor = r.author?.toLowerCase().includes(normalizedQuery);
            const inCategory = r.category?.toLowerCase().includes(normalizedQuery);
            return Boolean(inTitle || inAuthor || inCategory);
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'energy':
                    return (b.energy ?? 0) - (a.energy ?? 0);
                case 'protein':
                    return (b.protein ?? 0) - (a.protein ?? 0);
                case 'likes':
                    return (b.likes ?? 0) - (a.likes ?? 0);
                case 'title':
                    return (a.title ?? '').localeCompare(b.title ?? '');
                case 'relevance':
                    default: {
                        // Simple relevance: title match first, then author, then category
                        const aScore = (a.title?.toLowerCase().includes(normalizedQuery) ? 3 : 0) + (a.author?.toLowerCase().includes(normalizedQuery) ? 2 : 0) + (a.category?.toLowerCase().includes(normalizedQuery) ? 1 : 0);
                        const bScore = (b.title?.toLowerCase().includes(normalizedQuery) ? 3 : 0) + (b.author?.toLowerCase().includes(normalizedQuery) ? 2 : 0) + (b.category?.toLowerCase().includes(normalizedQuery) ? 1 : 0);
                        return bScore - aScore;
                    }
            }
        });

    const total = filteredRecipes.length;
    const paginated = filteredRecipes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-[98%] flex flex-col justify-center mx-auto my-[1%]">
            {/* Title */}
            <h3 className="text-xl font-[500] text-gray-800 mb-1">Home</h3>
            <p className="text-gray-500 mb-4">Explore, browse, and manage your dashboard</p>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Search
                    placeholder="Search title, author or category"
                    allowClear
                    enterButton
                    className="md:w-1/2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onSearch={(value) => setQuery(value)}
                />

                <Select value={sortBy} onChange={(v) => setSortBy(v)} className="md:w-1/4 w-full">
                    <Option value="relevance">Sort: Relevance</Option>
                    <Option value="energy">Sort: Energy (desc)</Option>
                    <Option value="protein">Sort: Protein (desc)</Option>
                    <Option value="likes">Sort: Likes (desc)</Option>
                    <Option value="title">Sort: Title (A-Z)</Option>
                </Select>

                <Select value={category} onChange={(v) => setCategory(v)} className="md:w-1/4 w-full">
                    <Option value="all">All categories</Option>
                    {/* derive categories from data to keep in sync with mock */}
                    {[...new Set(mockRecipes.map((r) => r.category))].map((cat) => (
                        <Option key={cat} value={cat}>
                            {cat}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Recipes Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px,580px))',
                    gap: '30px',
                    width: '100%',
                    boxSizing: 'border-box',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {loading ? renderSkeletons() : paginated.map((recipe) => <CardRecipe data={recipe} key={recipe.id} />)}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
            </div>
        </div>
    );
};
