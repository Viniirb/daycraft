import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { Loader2 } from 'lucide-react';

import CreateEventModal from '../components/event/CreateEventModal';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useEvents';
import { EventViewModel } from '../view-models/EventViewModel';
import '../../styles/calendar-theme.css';

export default function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventViewModel | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  const { authController, eventController } = useAppContext();
  const { user, loading: loadingAuth } = useAuth(authController);
  const { events, loading: loadingEvents, error } = useEvents(eventController, user?.id);

  const handleSelect = (info: DateSelectArg) => {
    setSelectedInfo(info);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setSelectedInfo(null);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInfo(null);
    setSelectedEvent(null);

    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.unselect();
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="animate-slide-up rounded-lg border border-red-500/20 bg-[#111111] p-6 text-red-400">
          Erro ao carregar eventos: {error}
        </div>
      </div>
    );
  }

  const isLoading = loadingAuth || loadingEvents;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Page Header - Animated */}
        <div className="mb-8 animate-slide-down">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Calendário
          </h1>
          <p className="text-lg text-gray-400">
            Organize seus eventos e compromissos
          </p>
        </div>

        {/* Calendar Container - Animated */}
        <div className="animate-slide-up rounded-lg border border-white/5 bg-[#111111] p-6" style={{ animationDelay: '100ms' }}>
          <div className="relative">
            {isLoading && (
              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <p className="text-sm text-gray-400">Carregando eventos...</p>
                </div>
              </div>
            )}

            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              locales={[ptBrLocale]}
              locale="pt-br"
              editable={true}
              selectable={true}
              navLinks={true}
              dayMaxEvents={true}
              height="auto"
              contentHeight="auto"
              events={events}
              select={handleSelect}
              eventClick={handleEventClick}
            />
          </div>
        </div>
      </div>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedInfo={selectedInfo}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}
