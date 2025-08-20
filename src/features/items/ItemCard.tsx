import { useAppDispatch } from '../../hooks/reduxHooks';
import { toggleFavorite } from './itemsSlice';
import type { Item } from './itemsSlice';

export default function ItemCard({ item, fav }: { item: Item; fav: boolean }) {
  const dispatch = useAppDispatch();
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{item.title}</h2>
      <p>{item.body}</p>
      <button
        onClick={() => dispatch(toggleFavorite(item.id))}
        className={`mt-2 px-3 py-1 rounded ${fav ? 'bg-red-500' : 'bg-gray-300'}`}
      >
        {fav ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
}
