import { Link, usePage } from '@inertiajs/react';
import logo from '../../assets/exprilliant-with-text.webp';
import axios from 'axios';

const Navbar = () => {
  const { localeData, auth } = usePage<{ localeData: { data: LocalizedText }; auth: any }>().props;

  const { navbar } = localeData.data;

  const handleLogout = async () => {
    await axios.post('/logout');
    window.location.reload();
  };

  const isFontSizeLarge = false;

  return (
    <div className="navbar bg-base-100 font-nova border-b-[1px] py-4 border-[#05213819] relative top-0 z-40 hidden md:flex">
      <div className="flex-1">
        <Link href="/" className={`btn btn-ghost ${isFontSizeLarge ? 'text-3xl' : 'text-xl'}`}>
          <img src={logo} alt="Exprilliant" className="h-12" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className={`menu menu-horizontal px-1 ${isFontSizeLarge ? 'text-xl' : ''}`}>
          {!auth.user && (
            <>
              <li>
                <Link href="/register">{navbar.register}</Link>
              </li>
              <li>
                <Link href="/login">{navbar.login_nav}</Link>
              </li>
            </>
          )}
          {auth.user && (
            <li onClick={handleLogout}>
              <a href="#">{navbar.logout}</a>
            </li>
          )}
          {auth.user && (
            <li>
              <Link href="/request-new-expression">{navbar.request_new_expression}</Link>
            </li>
          )}
          {auth.user?.email === 'adam.honvedo@gmail.com' && (
            <li>
              <Link href="/admin/unvalidated-expressions">Validate expressions</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
