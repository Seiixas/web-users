import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <Image src="/logo.svg" width={200} height={200} alt="404" />
      <p className="text-lg text-center">
        Parece que você está perdido. A página que você está procurando não
        existe!
      </p>
      <Link href="/" className="text-blue-500">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
