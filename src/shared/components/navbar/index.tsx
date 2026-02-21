import { Link } from 'react-router-dom';
import { useNavbar } from './useNavbar';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
  const {
    session,
    loading,
    scrolled,
    menuOpen,
    setMenuOpen,
    handleAuthAction,
    isActive,
    isLoginPage,
  } = useNavbar();

  if (loading) return <nav className="h-16" />;

  return (
    <>
      <nav className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-2 bg-white/80 backdrop-blur-xl shadow-sm border-b border-rose-100' : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">

            <Link to="/" className="flex items-center gap-3">
              <span className="text-xl font-black text-rose-600 tracking-tighter italic">
                Re-Evolución
              </span>
            </Link>

            <NavbarDesktop
              session={!!session}
              isActive={isActive}
              isLoginPage={isLoginPage}
              handleAuthAction={handleAuthAction}
            />

            <NavbarMobile
              session={!!session}
              isActive={isActive}
              isLoginPage={isLoginPage}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              handleAuthAction={handleAuthAction}
            />

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
