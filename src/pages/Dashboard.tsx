import { useState, useMemo, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import type { DateSelectArg, EventInput } from '@fullcalendar/core';

import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

import CreateEventModal from '../components/CreateEventModal';
import '../calendar-theme.css';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [user, loadingAuth] = useAuthState(auth);
  const uid = user?.uid;
  const eventsQuery = query(
    collection(db, 'events'),
    where('userId', '==', uid || 'INVALID_UID_PLACEHOLDER'),
  );

  const [eventsSnapshot, loadingEvents, error] = useCollection(eventsQuery);

  const calendarEvents = useMemo(() => {
    if (!eventsSnapshot) return [];

    return eventsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        start: data.start,
        end: data.end,
        allDay: data.allDay,
        backgroundColor:
          data.type === 'tarefa'
            ? '#2563eb'
            : data.type === 'lembrete'
            ? '#16a34a'
            : '#ca8a04',
        borderColor:
          data.type === 'tarefa'
            ? '#2563eb'
            : data.type === 'lembrete'
            ? '#16a34a'
            : '#ca8a04',
      } as EventInput;
    });
  }, [eventsSnapshot]);

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
      <div className="text-red-400">
        Erro ao carregar eventos: {error.message}
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
        events={calendarEvents}
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