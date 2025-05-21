"use client";

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Política de Privacidade
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Saiba como tratamos e protegemos os seus dados pessoais.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto fancy-card p-6 md:p-8"
        >
          <div className="prose prose-lg max-w-none">
            <h2>1. Recolha de Dados</h2>
            <p>
              Recolhemos apenas os dados pessoais necessários para fornecer nossos serviços:
            </p>
            <ul>
              <li>Nome e email para comunicação</li>
              <li>Dados de navegação para melhorar a experiência do usuário</li>
              <li>Informações fornecidas voluntariamente através de formulários</li>
            </ul>

            <h2>2. Uso dos Dados</h2>
            <p>
              Utilizamos seus dados pessoais para:
            </p>
            <ul>
              <li>Responder a suas mensagens e solicitações</li>
              <li>Enviar informações sobre eventos e atividades</li>
              <li>Melhorar nossos serviços e conteúdo</li>
            </ul>

            <h2>3. Proteção de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais
              contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>4. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência de navegação. Você pode controlar o uso de
              cookies através das configurações do seu navegador.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
              Você tem direito a:
            </p>
            <ul>
              <li>Acessar seus dados pessoais</li>
              <li>Solicitar a correção de dados incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>

            <h2>6. Contato</h2>
            <p>
              Para questões relacionadas à privacidade, entre em contato através do email:
              geral@praxeutadina.pt
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}