import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { Chatbot } from '../components/Chatbot';
import { ChatbotWrapper } from '../components/ChatbotWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Megh POS',
  description: 'Point of Sale System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative">
            {children}
            <ChatbotWrapper />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
