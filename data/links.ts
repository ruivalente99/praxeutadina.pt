import { Book, History, ImageIcon, Link as LinkIcon, ShoppingBag, FileQuestion, FileText, Calendar, CalendarDays, Globe } from 'lucide-react';
import { title } from 'node:process';

export const menuItems = [
  { name: 'Início', href: '/', icon: Book, },
  { name: 'Sobre Nós', href: '/about-us', icon: History },
  { name: 'Galeria', href: '/gallery', icon: ImageIcon },
  { name: 'Blog', href: '/blog', icon: Book },
  { name: 'Links', href: '/links', icon: LinkIcon },
  { name: 'Arquivo', href: '/archive', icon: FileText },
  { name: 'Calendário', href: '/calendar', icon: Calendar },
  { name: 'Loja', href: '/shop', icon: ShoppingBag },
  { name: 'Contacto', href: '/contact', icon: FileQuestion },
];

export const pageLinks = [
  {
    title: 'Sobre Nós',
    description: 'Conheça nossa história e equipa',
    icon: History,
    href: '/about-us',
    color: 'bg-bordeaux'
  },
  {
    title: 'Galeria',
    description: 'Momentos eternizados em imagens',
    icon: ImageIcon ,
    href: '/gallery',
    color: 'bg-oldGold'
  },
  {
    title: 'Blog',
    description: 'Artigos e crónicas académicas',
    icon: Book,
    href: '/blog',
    color: 'bg-bordeaux'
  },
  {
    title: 'Links',
    description: 'Links importantes da academia',
    icon: LinkIcon,
    href: '/links',
    color: 'bg-brown'
  },
  {
    title: 'Arquivo',
    description: 'Documentos históricos e materiais',
    icon: FileText,
    href: '/archive',
    color: 'bg-oldGold'
  },
  {
    title: 'Calendário',
    description: 'Eventos e celebrações',
    icon: Calendar,
    href: '/calendar',
    color: 'bg-bordeaux'
  }
];

export const links = [
  {
    title: 'UTAD Oficial',
    url: 'https://www.utad.pt',
    icon: Globe,
    description: 'Site oficial da Universidade de Trás-os-Montes e Alto Douro',
    category: 'institucional'
  },
  {
    title: 'Conselho de Veteranos da UTAD',
    url: 'cvutad.pt',
    icon: Globe,
    description: 'Página oficial do Conselho de Veteranos da UTAD',
    category: 'tradição'
  },
  {
    title: "AAUTAD",
    url: 'aautad.pt',
    icon: Globe,
    description: 'Associação Académica da Universidade de Trás-os-Montes e Alto Douro',
    category: 'institucional'
  }

];

export const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'institucional', name: 'Institucional' },
  { id: 'académico', name: 'Académico' },
  { id: 'tradição', name: 'Tradição' },
  { id: 'serviços', name: 'Serviços' }
];