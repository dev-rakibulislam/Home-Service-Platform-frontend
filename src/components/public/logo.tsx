import Image from "next/image";
import Link from "next/link";
import siteDetails from "./publicSiteData";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
      <div className="flex size-9 items-center justify-center">
        <Image
          src="/logo.png"
          alt="HealthCare logo"
          width={36}
          height={36}
          className="size-8 sm:size-9 lg:size-10"
        />
      </div>

      <span>{siteDetails.name}</span>
    </Link>
  );
}
