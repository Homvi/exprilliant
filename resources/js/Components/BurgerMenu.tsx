import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/Components/ui/menubar';
import { LocalizedText } from '@/types/locale';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Menu } from 'lucide-react';

const BurgerMenu = () => {
  const { localeData, auth } = usePage<{ localeData: { data: LocalizedText }; auth: any }>().props;

  const { navbar } = localeData.data;

  const handleLogout = async () => {
    await axios.post('/logout');
    window.location.reload();
  };

  return (
    <Menubar className="border-none shadow-none">
      <MenubarMenu >
        <MenubarTrigger>
          <Menu size={32} className="rotate-90" />
        </MenubarTrigger>
        <MenubarContent className='mr-3' >
          {/* unauthenticated */}
          {!auth.user && (
            <>
              <Link href="/register">
                <MenubarItem>{navbar.register}</MenubarItem>
              </Link>
              <Link href="/login">
                <MenubarItem>{navbar.login_nav}</MenubarItem>
              </Link>
            </>
          )}

          {/* authenticated */}
          {auth.user && <MenubarItem onClick={handleLogout}>{navbar.logout}</MenubarItem>}
          {auth.user && (
            <Link href="/request-new-expression">
              <MenubarItem>{navbar.request_new_expression}</MenubarItem>
            </Link>
          )}
          {auth.user?.email === 'adam.honvedo@gmail.com' && (
            <Link href="/admin/unvalidated-expressions">
              <MenubarItem>Validate expressions</MenubarItem>
            </Link>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default BurgerMenu;
