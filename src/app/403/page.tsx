import Image from "next/image";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <Image src="/logo.svg" width={200} height={200} alt="404" />
      <p className="text-lg text-center">
        Você não tem privilégios suficientes para acessar esta página.
        <br /> Se você acha que isso é um erro, entre em contato com o
        administrador do sistema.
      </p>
      <Link href="/" className="text-blue-500">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
