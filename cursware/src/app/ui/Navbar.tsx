import Link from "next/link";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-cyan-500 text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">
            <span>Cursware</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link href="/cursos">
            <span className="hover:underline cursor-pointer">Cursos</span>
          </Link>
          <Link href="/estudiantes">
            <span className="hover:underline cursor-pointer">Estudiantes</span>
          </Link>
        </div>

        {/* Mobile Menu Icon (No functional toggle) */}
        <div className="lg:hidden text-2xl">
          <FiMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;