import { Bookmark } from 'lucide-react';

interface FavoriteProps {
    onToggle: () => void;
    isFavorite: boolean;
}
export default function Favourite({ isFavorite, onToggle }: FavoriteProps) {
    return (
        <div className="flex items-center justify-center ">
            <button
                onClick={onToggle}
                className="flex items-center gap-3 px-5 py-2 bg-white rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-fit"
            >
                <Bookmark
                    className={`w-6 h-6 transition-all duration-300 cursor-pointer ${
                        isFavorite
                            ? 'fill-yellow-400 stroke-yellow-400'
                            : 'fill-none stroke-gray-400'
                    }`}
                />
                <span className="text-[18px] font-[500] text-gray-700">
                    {isFavorite ? 'Added to favourite' : 'Add to favourite'}
                </span>
            </button>
        </div>
    );
}
