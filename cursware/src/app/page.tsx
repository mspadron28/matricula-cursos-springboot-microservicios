
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FiTarget, FiTrendingUp } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Cursware</h1>
        <Image
          src="/images/learning-illustration.png"
          alt="Learning illustration"
          width={400}
          height={300}
          className="mx-auto mb-6"
        />
        <Link href="/cursos" passHref>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg">
            Empezar
          </Button>
        </Link>
      </header>

      {/* Informative Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
          <CardHeader>
            <FiTarget className="text-4xl text-blue-600 mb-4" />
            <CardTitle className="text-xl font-bold">Nuestra Misión</CardTitle>
          </CardHeader>
          <CardDescription className="text-gray-600 text-center">
            Empoderar a estudiantes y profesionales con cursos de software de alta calidad para potenciar sus carreras.
          </CardDescription>
        </Card>

        <Card className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
          <CardHeader>
            <FiTrendingUp className="text-4xl text-green-600 mb-4" />
            <CardTitle className="text-xl font-bold">Nuestra Visión</CardTitle>
          </CardHeader>
          <CardDescription className="text-gray-600 text-center">
            Ser la plataforma líder en aprendizaje de software, inspirando progreso y desarrollo continuo.
          </CardDescription>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
