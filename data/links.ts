import {
  Book,
  History,
  ImageIcon,
  ShoppingBag,
  FileQuestion,
  FileText,
  Calendar,
  CalendarDays,
  Globe,
  Instagram,
  LinkIcon,
} from "lucide-react";
import { title } from "node:process";

export const menuItems = [
  { name: "Início", href: "/", icon: Book },
  { name: "Sobre Nós", href: "/about-us", icon: History },
  { name: "Galeria", href: "/gallery", icon: ImageIcon },
  { name: "Blog", href: "/blog", icon: Book },
  { name: "Links", href: "/links", icon: LinkIcon },
  { name: "Arquivo", href: "/archive", icon: FileText },
  { name: "Calendário", href: "/calendar", icon: Calendar },
  { name: "Loja", href: "/shop", icon: ShoppingBag },
  { name: "Contacto", href: "/contact", icon: FileQuestion },
];

export const pageLinks = [
  {
    title: "Sobre Nós",
    description: "Conheça nossa história e equipa",
    icon: History,
    href: "/about-us",
    color: "bg-bordeaux",
  },
  {
    title: "Galeria",
    description: "Momentos eternizados em imagens",
    icon: ImageIcon,
    href: "/gallery",
    color: "bg-oldGold",
  },
  {
    title: "Blog",
    description: "Artigos e crónicas académicas",
    icon: Book,
    href: "/blog",
    color: "bg-bordeaux",
  },
  {
    title: "Links",
    description: "Links importantes da academia",
    icon: LinkIcon,
    href: "/links",
    color: "bg-brown",
  },
  {
    title: "Arquivo",
    description: "Documentos históricos e materiais",
    icon: FileText,
    href: "/archive",
    color: "bg-oldGold",
  },
  {
    title: "Calendário",
    description: "Eventos e celebrações",
    icon: Calendar,
    href: "/calendar",
    color: "bg-bordeaux",
  },
];

export const links = [
  {
    title: "UTAD Oficial",
    url: "https://www.utad.pt",
    icon: Globe,
    description: "Site oficial da Universidade de Trás-os-Montes e Alto Douro",
    category: "institucional",
  },
  {
    title: "Conselho de Veteranos da UTAD",
    url: "https://cvutad.pt",
    icon: Globe,
    description: "Página oficial do Conselho de Veteranos da UTAD",
    category: "tradição",
  },
  {
    title: "AAUTAD",
    url: "https://aautad.pt",
    icon: Globe,
    description:
      "Associação Académica da Universidade de Trás-os-Montes e Alto Douro",
    category: "institucional",
  },
  {
    title: "Tautad",
    url: "https://www.instagram.com/tautad/",
    icon: Instagram,
    description: "Tuna Mista da Universidade de Trás-os-Montes e Alto Douro",
    category: "culturais",
  },
  {
    title: "Imperialis Serenatum Tunix",
    url: "https://www.instagram.com/imperialis_oficial/",
    icon: Instagram,
    description: "Tuna Masculina da U. Trás-os-Montes e Alto Douro",
    category: "culturais",
  },
  {
    title: "Transmontuna",
    url: "https://www.instagram.com/transmontuna/",
    icon: Instagram,
    description: "Tuna Universitária de Trás-os-Montes e Alto Douro",
    category: "culturais",
  },
  {
    title: "Vibratuna",
    url: "https://www.instagram.com/vibratuna/",
    icon: Instagram,
    description: "Tuna Feminina da UTAD 🐭 | Vila Real",
    category: "culturais",
  },
];

export const categories = [
  { id: "all", name: "Todos" },
  { id: "institucional", name: "Institucional" },
  { id: "tradição", name: "Tradição" },
  { id: "culturais", name: "Culturais" },
];
