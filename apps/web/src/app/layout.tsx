import './globals.css'; import type { ReactNode } from 'react';
export const metadata={title:'NexusOps',description:'SaaS B2B multitenant de demonstração'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
