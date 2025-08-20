import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { fetchItems, selectItems } from './itemsSlice';
import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

export default function ItemsList({ query }: { query: string }) {
  const { items, favorites, status } = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filtered = items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p className="text-red-500">Error fetching items.</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filtered.map(item => (
        <ItemCard key={item.id} item={item} fav={favorites.includes(item.id)} />
      ))}
    </div>
  );
}
