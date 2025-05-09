"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockTeamMembers } from '@/data/team';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* History Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-8">
            Sobre Nós
          </h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="fancy-card p-8">
              <p className="first-letter mb-6">
                A história da Universidade de Trás-os-Montes e Alto Douro (UTAD) está intrinsecamente ligada às tradições académicas portuguesas. Embora a UTAD tenha sido formalmente estabelecida em 1986, as suas raízes culturais e académicas são muito mais profundas.
              </p>
              <p className="mb-6">
                As tradições da UTAD refletem a alma da região duriense, incorporando elementos únicos da cultura local, como a viticultura, que se fundem com os rituais académicos tradicionais portugueses. As capas negras, símbolo da academia portuguesa, ganham aqui uma interpretação própria, marcada pela rusticidade e autenticidade característica do Alto Douro.
              </p>
              <p>
                Ao longo dos anos, a universidade desenvolveu um rico património imaterial, preservando ritos de passagem, canções, cerimónias e símbolos que criam um sentido de pertença e comunidade entre gerações de estudantes.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">
            Nossa Equipa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockTeamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="fancy-card p-6 text-center"
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
                <p className="font-semibold text-sm mb-1">{member.role}</p>
                <p className="text-foreground/70 text-sm mb-4">{member.praxeRole}</p>
               {/*  Create a quote component, small and differente letter */}
               { Boolean(member.bio) && <p className="text-sm text-foreground/70 mb-4">
                  <span className="font-playfair font-semibold text-lg">“</span>
                  {member.bio}
                  <span className="font-playfair font-semibold text-lg">”</span>
                </p>}
                <div className="flex justify-center space-x-3">
                  <Button size="icon" variant="outline" className="rounded-full" asChild>
                    <a href={`mailto:${member.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full" asChild>
                    <a href={member.social} target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}