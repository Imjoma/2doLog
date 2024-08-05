import { Antonio } from "next/font/google";

const antonio = Antonio({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer
      className={`${antonio.className}  max-w-screen-xl p-6 my-6  mx-auto`}
    >
      <p>Built with Next.js and Tailwind CSS, deployed with Vercel.</p>
      <p>
        © 2024{" "}
        <a
          className=" hover:text-blue-500"
          href="https://jomaipio.vercel.app/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Jose Maria Ipio
        </a>
      </p>
    </footer>
  );
};

export default Footer;
