import { Link, usePage } from '@inertiajs/react';
import logo from '../../assets/exprilliant-with-text.webp';
import axios from 'axios';
import { LocalizedText } from '@/Types/locale';
import { User } from '@/Types';

const MobileNavbar = () => {
  const { localeData, auth } = usePage<{ localeData: { data: LocalizedText }; auth: { user: User | null } }>().props;
  const { navbar } = localeData.data;

  const handleLogout = async () => {
    await axios.post('/logout');
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100 md:hidden">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {!auth.user && (
              <li>
                <Link href="/register">{navbar.register}</Link>
              </li>
            )}
            {!auth.user && (
              <li>
                <Link href="/login">{navbar.login_nav}</Link>
              </li>
            )}
            {auth.user && (
              <li onClick={handleLogout}>
                <Link href="#">{navbar.logout}</Link>
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
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl">
          <img src={logo} alt="Exprilliant" className="h-8" />
        </Link>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default MobileNavbar;
