import NavLinks from './NavLinks';

interface NavbarDesktopProps {
  session: boolean;
  isActive: (path: string) => boolean;
  isLoginPage: boolean;
  handleAuthAction: () => void;
}

const NavbarDesktop = ({ session, isActive, isLoginPage, handleAuthAction }: NavbarDesktopProps) => {
  return (
    <div className="hidden md:flex items-center gap-4">
      {session && (
        <NavLinks isActive={isActive} variant="desktop" />
      )}

      {!isLoginPage && (
        <button
          onClick={handleAuthAction}
          className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105 active:scale-95 ${
            session
              ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
          }`}
        >
          {session ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </button>
      )}
    </div>
  );
};

export default NavbarDesktop;
