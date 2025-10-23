import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import type { DateSelectArg } from '@fullcalendar/core';
import { Loader2 } from 'lucide-react';

import CreateEventModal from '../components/event/CreateEventModal';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useEvents';
import '../../styles/calendar-theme.css';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  const { authController, eventController } = useAppContext();
  const { user, loading: loadingAuth } = useAuth(authController);
  const { events, loading: loadingEvents, error } = useEvents(eventController, user?.id);

  const handleSelect = (info: DateSelectArg) => {
    setSelectedInfo(info);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInfo(null);

    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.unselect();
    }
  };

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-400">
          Erro ao carregar eventos: {error}
        </div>
      </div>
    );
  }

  const isLoading = loadingAuth || loadingEvents;

  return (
    <div className="relative h-full">
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
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
        height="100%"
        events={events}
        select={handleSelect}
      />

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedInfo={selectedInfo}
      />
    </div>
  );
}
