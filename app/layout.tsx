import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import GlobalStyle from "@/public/styles/global";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import CommonProvider from "./redux/provider";

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip-Flutter",
  description: "설레는 국내 여행의 시작",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <GlobalStyle />
      <body className={noto.className}>
        <CommonProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </CommonProvider>
      </body>
    </html>
  );
}
