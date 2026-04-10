import EarthquakeCard from './EarthquakeCard';

export default function EarthquakeList({ quakes }) {
  if (!quakes || quakes.length === 0) {
    return (
      <div className="text-center text-slate-500 py-8 text-sm">
        গত ২৪ ঘণ্টায় কাছাকাছি কোনো ভূমিকম্প রেকর্ড হয়নি।
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {quakes.slice(0, 20).map((quake) => (
        <EarthquakeCard key={quake.id} quake={quake} />
      ))}
    </div>
  );
}