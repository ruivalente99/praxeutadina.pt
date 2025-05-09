"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categoryColors, events, months } from '@/data/events';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="fancy-heading text-4xl md:text-5xl font-playfair font-bold">
            Calendário de Eventos
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Acompanhe os próximos eventos e celebrações da Praxe UTAD
          </p>
        </header>

        {/* Month Navigation */}
        <div className="flex items-center justify-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousMonth}
            className="mr-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl font-playfair font-semibold">
            {months[currentMonth]} {currentYear}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="ml-4"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Events List */}
        <div className="max-w-4xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="fancy-card p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-playfair font-semibold mr-3">
                          {event.title}
                        </h3>
                        <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-foreground/70 mb-4">
                        {event.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="flex items-center text-foreground/60">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('pt-PT')}
                        </div>
                        <div className="flex items-center text-foreground/60">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-foreground/60">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-foreground/60">
                          <Users className="h-4 w-4 mr-2" />
                          {event.attendees} participantes
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <a href={event.link} target="_blank" rel="noopener noreferrer">
                          Inscrever-me
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-foreground/60">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <p>Não há eventos programados para este mês.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}