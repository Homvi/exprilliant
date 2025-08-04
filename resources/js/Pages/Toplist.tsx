import { User } from '@/Types';
import { Trophy, Medal } from 'lucide-react';

interface ToplistPropTypes {
  users: User[];
}

const Toplist = ({ users }: ToplistPropTypes) => {
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="text-yellow-500" size={24} />;
      case 1:
        return <Medal className="text-gray-400" size={20} />;
      case 2:
        return <Medal className="text-amber-600" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Top Players</h1>

        <ol className="w-full space-y-3">
          {users.map((user, id) => (
            <li
              key={user.id}
              className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:scale-102 animate-fadeIn"
              style={{
                animationDelay: `${id * 100}ms`
              }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-4">
                {getMedalIcon(id) || <span className="font-semibold text-gray-600">{id + 1}</span>}
              </div>

              <div className="flex-grow text-left">
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>

              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <span className="font-semibold text-blue-600">{user.experience.toLocaleString()} XP</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Toplist;
