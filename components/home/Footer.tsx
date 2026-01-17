import Image from "next/image";
import {
  Facebook,
  Instagram,
  X,
  Youtube,
  Linkedin,
  Briefcase,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#e5e5e5]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <Image
          src="/assets/logo.png"
          alt="VirifiAd logo"
          width={120}
          height={40}
        />

        <h2 className="text-xl font-medium text-gray-800">
          Sign in as businesses
        </h2>

        <button className="flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 text-gray-800">
          <Briefcase size={18} />
          Sign Up
        </button>
      </div>

      <hr className="border-gray-300" />

      {/* Main footer content */}
      <div className="grid grid-cols-4 gap-12 px-10 py-10 text-gray-800">
        {/* Column 1 */}
        <div>
          <p className="mb-4 font-medium">
            Download VirifiAd app now
          </p>

          <div className="flex gap-3">
            <Image
              src="/assets/google-play.png"
              alt="Google Play"
              width={130}
              height={40}
            />
            <Image
              src="/assets/app-store.png"
              alt="App Store"
              width={130}
              height={40}
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          <p>Home</p>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Blogs</p>
          <p>FAQ</p>
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          <p>Letter from founder and co-founder</p>
          <p>Terms and conditions</p>
          <p>Privacy policy</p>
          <p>Career</p>
        </div>

        {/* Column 4 */}
        <div>
          <p className="mb-4 font-medium">
            Follow us on
          </p>

          <div className="flex gap-4">
            <Facebook />
            <Instagram />
            <X />
            <Youtube />
            <Linkedin />
          </div>
        </div>
      </div>
    </footer>
  );
}
