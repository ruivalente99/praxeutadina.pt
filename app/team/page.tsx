"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const mockTeamMembers = [
  {
    id: 1,
    name: 'Dr. António Santos',
    role: 'Dux Maximus',
    praxeRole: 'Imperador da Praxe Utadina',
    course: 'Doutoramento em Enologia',
    level: 1,
    bio: 'Como Dux Maximus, Dr. Santos é a autoridade máxima da Praxe Utadina na UTAD, guardião das tradições mais antigas e mentor das novas gerações.',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    email: 'dux.maximus@academia-utad.pt',
    social: 'https://linkedin.com'
  },
  {
    id: 2,
    name: 'Dra. Maria Carvalho',
    role: 'Magistra Traditionis',
    praxeRole: 'Guardiã das Tradições',
    course: 'Mestrado em História Medieval',
    level: 2,
    bio: 'Especialista em rituais académicos históricos, a Dra. Carvalho mantém vivas as tradições seculares da nossa academia.',
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
    email: 'magistra@academia-utad.pt',
    social: 'https://linkedin.com'
  },
  {
    id: 3,
    name: 'Dr. João Ribeiro',
    role: 'Custos Vinearum',
    praxeRole: 'Mestre do Vinho',
    course: 'Doutoramento em Viticultura',
    level: 2,
    bio: 'Responsável pela produção do vinho académico e pelas tradições enológicas da UTAD.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    email: 'vinearum@academia-utad.pt',
    social: 'https://linkedin.com'
  },
  {
    id: 4,
    name: 'Dr. Paulo Almeida',
    role: 'Magister Ceremoniarum',
    praxeRole: 'Mestre de Cerimónias',
    course: 'Mestrado em Tradições Académicas',
    level: 3,
    bio: 'Coordena todas as cerimónias oficiais e garante que os rituais sejam realizados com a devida solenidade.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    email: 'ceremonias@academia-utad.pt',
    social: 'https://linkedin.com'
  },
  {
    id: 5,
    name: 'Dra. Sofia Mendes',
    role: 'Chronicatrix',
    praxeRole: 'Cronista Oficial',
    course: 'Doutoramento em Literatura Medieval',
    level: 3,
    bio: 'Documenta a história e os eventos da academia, preservando as narrativas para as futuras gerações.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    email: 'cronica@academia-utad.pt',
    social: 'https://linkedin.com'
  },
  {
    id: 6,
    name: 'Dra. Ana Duarte',
    role: 'Custos Insignium',
    praxeRole: 'Guardiã dos Símbolos',
    course: 'Mestrado em Heráldica',
    level: 3,
    bio: 'Preserva e interpreta os símbolos, brasões e insígnias académicas da UTAD.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    email: 'insignias@academia-utad.pt',
    social: 'https://linkedin.com'
  }
];

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const filteredMembers = mockTeamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.praxeRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  interface MembersByLevel {
    [key: string]: typeof mockTeamMembers
  }
  
  const membersByLevel = filteredMembers.reduce<MembersByLevel>((acc, member) => {
      if (!acc[member.level]) {
        acc[member.level] = [];
      }
      acc[member.level].push(member);
      return acc;
    }, {});

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Equipa da Praxe Utadina
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Conheça a estrutura hierárquica da Praxe Utadina da UTAD
          </p>
        </header>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
            <Input
              type="search"
              placeholder="Pesquisar por nome ou cargo..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Hierarchy Pyramid */}
        <div className="max-w-6xl mx-auto">
          {Object.entries(membersByLevel)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([level, members]: [string, any[]]) => (
              <div key={level} className="mb-12">
                <div 
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${members.length}, minmax(0, 1fr))`,
                  }}
                >
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`fancy-card p-4 text-center cursor-pointer transition-transform hover:scale-105 ${
                        selectedMember === member.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedMember(member.id === selectedMember ? null : member.id)}
                    >
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <h3 className="font-playfair font-semibold text-lg mb-1">{member.name}</h3>
                      <p className="text-primary font-semibold text-sm mb-1">{member.role}</p>
                      <p className="text-foreground/70 text-sm mb-2">{member.praxeRole}</p>
                      <p className="text-foreground/60 text-xs">{member.course}</p>

                      {selectedMember === member.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4 pt-4 border-t border-border/30"
                        >
                          <p className="text-sm text-foreground/80 mb-4">{member.bio}</p>
                          <div className="flex justify-center space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="outline" className="rounded-full" asChild>
                                    <a href={`mailto:${member.email}`}>
                                      <Mail className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Enviar email</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="outline" className="rounded-full" asChild>
                                    <a href={member.social} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Ver perfil</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}