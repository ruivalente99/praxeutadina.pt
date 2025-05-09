"use client";

import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <ScrollText className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Termos e Condições
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Por favor, leia atentamente os termos e condições de uso do nosso site.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto fancy-card p-6 md:p-8"
        >
          <div className="prose prose-lg max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este site, você aceita e concorda em cumprir estes termos e condições de uso.
              Se você não concordar com qualquer parte destes termos, não deverá usar nosso site.
            </p>

            <h2>2. Uso do Conteúdo</h2>
            <p>
              Todo o conteúdo presente neste site é protegido por direitos autorais e pertence à Praxe UTAD.
              Não é permitida a reprodução, distribuição ou modificação do conteúdo sem autorização prévia.
            </p>

            <h2>3. Conduta do Usuário</h2>
            <p>
              Os usuários devem se comportar de maneira respeitosa e não devem:
            </p>
            <ul>
              <li>Violar leis ou regulamentos aplicáveis</li>
              <li>Publicar conteúdo ofensivo ou inadequado</li>
              <li>Tentar acessar áreas restritas do site</li>
              <li>Interferir no funcionamento normal do site</li>
            </ul>

            <h2>4. Limitação de Responsabilidade</h2>
            <p>
              A Praxe UTAD não se responsabiliza por quaisquer danos diretos, indiretos, incidentais ou consequenciais
              resultantes do uso ou impossibilidade de uso deste site.
            </p>

            <h2>5. Modificações</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entram em vigor
              imediatamente após sua publicação no site.
            </p>

            <h2>6. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis de Portugal. Qualquer disputa relacionada a estes termos será
              submetida à jurisdição exclusiva dos tribunais portugueses.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}