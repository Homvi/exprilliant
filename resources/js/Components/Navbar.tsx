import { Link, usePage } from '@inertiajs/react';
import logo from '../../assets/exprilliant-with-text.webp';
import axios from 'axios';
import { LocalizedText } from '@/Types/locale';
import BurgerMenu from './BurgerMenu';

const Navbar = () => {
  const { localeData, auth } = usePage<{ localeData: { data: LocalizedText }; auth: any }>().props;

  const { navbar } = localeData.data;

  const handleLogout = async () => {
    await axios.post('/logout');
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100 font-nova border-b-[1px] py-4 border-[#05213819] relative top-0 z-40 hidden md:flex">
      <div className="flex-1">
        <Link href="/" className='btn btn-ghost text-xl'>
          <img src={logo} alt="Exprilliant" className="h-12" />
        </Link>

      </div>
      <div className="flex-none">
        <BurgerMenu />
      </div>
    </div>
  );
};

export default Navbar;
