import NavLinks from './NavLinks';

interface NavbarMobileProps {
  session: boolean;
  isActive: (path: string) => boolean;
  isLoginPage: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  handleAuthAction: () => void;
}

const NavbarMobile = ({
  session,
  isActive,
  isLoginPage,
  menuOpen,
  setMenuOpen,
  handleAuthAction,
}: NavbarMobileProps) => {
  return (
    <>
      {/* Right side of navbar bar */}
      <div className="flex md:hidden items-center gap-3">
        {!isLoginPage && !session && (
          <button
            onClick={handleAuthAction}
            className="px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md active:scale-95 transition-all"
          >
            Iniciar Sesión
          </button>
        )}

        {session && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 transition-all active:scale-95"
          >
            <span className={`block w-5 h-0.5 bg-rose-500 rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-rose-500 rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-rose-500 rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        )}
      </div>

      {/* Overlay + slide-down panel */}
      {session && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className={`fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm transition-all duration-300 md:hidden ${
              menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          />

          <div className={`fixed top-0 left-0 right-0 z-[95] md:hidden transition-all duration-500 ease-in-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="bg-white/95 backdrop-blur-xl shadow-xl border-b border-rose-100 pt-24 pb-8 px-6">
              <NavLinks isActive={isActive} variant="mobile" menuOpen={menuOpen} />

              {!isLoginPage && (
                <button
                  onClick={handleAuthAction}
                  className="mt-6 w-full py-4 rounded-2xl font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all active:scale-[0.98]"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarMobile;
