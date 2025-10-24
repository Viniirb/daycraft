import { Fragment, useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X, Calendar, Clock, Trash2, Plus, Check, Target, TrendingUp } from 'lucide-react';
import type { DateSelectArg } from '@fullcalendar/core';
import { useAppContext } from '../../../main/config/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../hooks/useEvents';
import { EventViewModel } from '../../view-models/EventViewModel';

type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInfo: DateSelectArg | null;
  selectedEvent?: EventViewModel | null;
};

type EventType = {
  value: string;
  label: string;
  icon: string;
  color: string;
};

const eventTypes: EventType[] = [
  { value: 'tarefa', label: 'Tarefa', icon: '✓', color: '#3b82f6' },
  { value: 'lembrete', label: 'Lembrete', icon: '🔔', color: '#f59e0b' },
  { value: 'data_especial', label: 'Data Especial', icon: '⭐', color: '#8b5cf6' },
  { value: 'reuniao', label: 'Reunião', icon: '👥', color: '#10b981' },
  { value: 'evento', label: 'Evento', icon: '🎉', color: '#ec4899' },
  { value: 'compromisso', label: 'Compromisso', icon: '📅', color: '#06b6d4' },
  { value: 'habito', label: 'Hábito', icon: '🎯', color: '#f97316' },
];

type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export default function CreateEventModal({ isOpen, onClose, selectedInfo, selectedEvent }: Props) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('tarefa');
  const [hasTime, setHasTime] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [recurrence, setRecurrence] = useState<RecurrenceType>('none');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [habitGoal, setHabitGoal] = useState(30); // Meta de dias para hábitos
  const [habitStreak, setHabitStreak] = useState(0); // Sequência atual
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { authController, eventController } = useAppContext();
  const { user } = useAuth(authController);
  const { createEvent, updateEvent, deleteEvent } = useEvents(eventController, user?.id);

  const isEditMode = !!selectedEvent;

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    setChecklist([...checklist, {
      id: Date.now().toString(),
      text: newChecklistItem.trim(),
      completed: false
    }]);
    setNewChecklistItem('');
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeChecklistItem = (id: string) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (isOpen) {
      if (selectedEvent) {
        // Edit mode - populate with existing event data
        setTitle(selectedEvent.title);
        setType(selectedEvent.extendedProps?.type || 'tarefa');

        // Check if event has time
        const eventHasTime = !selectedEvent.allDay;
        setHasTime(eventHasTime);

        if (eventHasTime && selectedEvent.start) {
          const start = new Date(selectedEvent.start);
          const end = selectedEvent.end ? new Date(selectedEvent.end) : new Date(start.getTime() + 60 * 60 * 1000);
          setStartTime(`${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`);
          setEndTime(`${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`);
        }

        // Load checklist if exists
        setChecklist(selectedEvent.extendedProps?.checklist || []);

        // Load habit data if exists
        setHabitGoal(selectedEvent.extendedProps?.habitGoal || 30);
        setHabitStreak(selectedEvent.extendedProps?.habitStreak || 0);
      } else {
        // Create mode - reset form
        setTitle('');
        setType('tarefa');
        setHasTime(false);
        setStartTime('09:00');
        setEndTime('10:00');
        setRecurrence('none');
        setChecklist([]);
        setHabitGoal(30);
        setHabitStreak(0);
      }
    }
  }, [isOpen, selectedEvent]);

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !user) return;

    setSubmitting(true);
    try {
      if (isEditMode && selectedEvent) {
        // Edit mode - update existing event
        let startStr: string;
        let endStr: string;
        let allDay: boolean;

        if (hasTime && selectedEvent.start) {
          const startDate = new Date(selectedEvent.start);
          const endDate = selectedEvent.end ? new Date(selectedEvent.end) : new Date(startDate);

          const [startHour, startMin] = startTime.split(':').map(Number);
          const [endHour, endMin] = endTime.split(':').map(Number);

          startDate.setHours(startHour, startMin, 0, 0);
          endDate.setHours(endHour, endMin, 0, 0);

          startStr = startDate.toISOString();
          endStr = endDate.toISOString();
          allDay = false;
        } else {
          startStr = typeof selectedEvent.start === 'string' ? selectedEvent.start : new Date(selectedEvent.start).toISOString();
          endStr = selectedEvent.end
            ? (typeof selectedEvent.end === 'string' ? selectedEvent.end : new Date(selectedEvent.end).toISOString())
            : startStr;
          allDay = selectedEvent.allDay || false;
        }

        const success = await updateEvent(selectedEvent.id, {
          title,
          type,
          start: startStr,
          end: endStr,
          allDay,
          checklist,
          recurrence,
          habitGoal: type === 'habito' ? habitGoal : undefined,
          habitStreak: type === 'habito' ? habitStreak : undefined,
        });

        if (success) {
          onClose();
        } else {
          alert('Erro ao atualizar evento. Tente novamente.');
        }
      } else if (selectedInfo) {
        // Create mode - create new event
        let startStr = selectedInfo.startStr;
        let endStr = selectedInfo.endStr;
        let allDay = selectedInfo.allDay;

        // If user wants to add time to an all-day event
        if (hasTime && selectedInfo.allDay) {
          const startDate = new Date(selectedInfo.start);
          const endDate = new Date(selectedInfo.start);

          const [startHour, startMin] = startTime.split(':').map(Number);
          const [endHour, endMin] = endTime.split(':').map(Number);

          startDate.setHours(startHour, startMin, 0, 0);
          endDate.setHours(endHour, endMin, 0, 0);

          startStr = startDate.toISOString();
          endStr = endDate.toISOString();
          allDay = false;
        }

        const success = await createEvent({
          title,
          type,
          start: startStr,
          end: endStr,
          allDay,
          userId: user.id,
          checklist,
          recurrence,
          habitGoal: type === 'habito' ? habitGoal : undefined,
          habitStreak: type === 'habito' ? habitStreak : undefined,
        });

        if (success) {
          onClose();
        } else {
          alert('Erro ao salvar evento. Tente novamente.');
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      alert(`Erro ao ${isEditMode ? 'atualizar' : 'salvar'} evento: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent || !user) return;

    const confirmed = confirm('Tem certeza que deseja excluir este evento?');
    if (!confirmed) return;

    setDeleting(true);
    try {
      const success = await deleteEvent(selectedEvent.id);
      if (success) {
        onClose();
      } else {
        alert('Erro ao excluir evento. Tente novamente.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      alert(`Erro ao excluir evento: ${errorMessage}`);
    } finally {
      setDeleting(false);
    }
  };

  const selectedEventType = eventTypes.find(et => et.value === type) || eventTypes[0];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-xl border border-white/10 bg-[#111111] shadow-2xl transition-all">
                {/* Header */}
                <div className="border-b border-white/5 p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <DialogTitle as="h3" className="text-xl font-bold text-white">
                        {isEditMode ? 'Editar Evento' : 'Criar Evento'}
                      </DialogTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditMode && (
                        <button
                          onClick={handleDeleteEvent}
                          disabled={deleting || submitting}
                          className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                          title="Excluir evento"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSaveEvent} className="p-6 space-y-5">
                  {/* Title Input */}
                  <div>
                    <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-300">
                      Título *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      maxLength={200}
                      placeholder="Digite o título do evento..."
                      className="w-full rounded-lg border border-white/5 bg-[#1a1a1a] p-3 text-white placeholder-gray-500 transition-all focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Event Type Selection */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-300">
                      Tipo de Evento *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {eventTypes.map((eventType) => (
                        <button
                          key={eventType.value}
                          type="button"
                          onClick={() => setType(eventType.value)}
                          className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-all ${
                            type === eventType.value
                              ? 'border-white/20 bg-white/5 shadow-lg'
                              : 'border-white/5 bg-[#1a1a1a] hover:border-white/10 hover:bg-white/5'
                          }`}
                        >
                          <span className="text-2xl">{eventType.icon}</span>
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: type === eventType.value ? eventType.color : '#a0a0a0'
                            }}
                          >
                            {eventType.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recurrence Selection */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Recorrência
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setRecurrence('none')}
                        className={`rounded-lg border p-2.5 text-xs font-medium transition-all ${
                          recurrence === 'none'
                            ? 'border-white/20 bg-white/5'
                            : 'border-white/5 bg-[#1a1a1a] hover:border-white/10 hover:bg-white/5'
                        }`}
                      >
                        🚫 Sem
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecurrence('daily')}
                        className={`rounded-lg border p-2.5 text-xs font-medium transition-all ${
                          recurrence === 'daily'
                            ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                            : 'border-white/5 bg-[#1a1a1a] text-gray-300 hover:border-white/10 hover:bg-white/5'
                        }`}
                      >
                        📅 Diário
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecurrence('weekly')}
                        className={`rounded-lg border p-2.5 text-xs font-medium transition-all ${
                          recurrence === 'weekly'
                            ? 'border-purple-500/50 bg-purple-500/10 text-purple-400'
                            : 'border-white/5 bg-[#1a1a1a] text-gray-300 hover:border-white/10 hover:bg-white/5'
                        }`}
                      >
                        🗓️ Semanal
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecurrence('monthly')}
                        className={`rounded-lg border p-2.5 text-xs font-medium transition-all ${
                          recurrence === 'monthly'
                            ? 'border-green-500/50 bg-green-500/10 text-green-400'
                            : 'border-white/5 bg-[#1a1a1a] text-gray-300 hover:border-white/10 hover:bg-white/5'
                        }`}
                      >
                        📆 Mensal
                      </button>
                    </div>
                  </div>

                  {/* Time Toggle */}
                  {((selectedInfo?.allDay) || (isEditMode && selectedEvent?.allDay)) && (
                    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-[#1a1a1a] p-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Clock className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Adicionar horário</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHasTime(!hasTime)}
                        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                          hasTime ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          style={{ left: hasTime ? '22px' : '2px' }}
                          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
                        />
                      </button>
                    </div>
                  )}

                  {/* Time Pickers */}
                  {hasTime && (
                    <div className="grid grid-cols-2 gap-3 animate-slide-down">
                      <div>
                        <label htmlFor="startTime" className="mb-2 block text-xs font-medium text-gray-400">
                          Início
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full rounded-lg border border-white/5 bg-[#1a1a1a] p-2.5 text-white transition-all focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="endTime" className="mb-2 block text-xs font-medium text-gray-400">
                          Término
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full rounded-lg border border-white/5 bg-[#1a1a1a] p-2.5 text-white transition-all focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  )}

                  {/* Checklist */}
                  {(type === 'tarefa' || type === 'compromisso') && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Lista de Tarefas
                      </label>

                      {/* Checklist Items */}
                      {checklist.length > 0 && (
                        <div className="space-y-1.5 max-h-40 overflow-y-auto rounded-lg border border-white/5 bg-[#1a1a1a] p-2">
                          {checklist.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2 rounded-md bg-[#111111] p-2 transition-colors hover:bg-white/5"
                            >
                              <button
                                type="button"
                                onClick={() => toggleChecklistItem(item.id)}
                                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-all ${
                                  item.completed
                                    ? 'border-green-500 bg-green-500/20'
                                    : 'border-white/20 hover:border-white/40'
                                }`}
                              >
                                {item.completed && <Check className="h-3 w-3 text-green-400" />}
                              </button>
                              <span
                                className={`flex-1 text-sm ${
                                  item.completed ? 'text-gray-500 line-through' : 'text-gray-300'
                                }`}
                              >
                                {item.text}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeChecklistItem(item.id)}
                                className="flex-shrink-0 text-gray-500 transition-colors hover:text-red-400"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Item Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newChecklistItem}
                          onChange={(e) => setNewChecklistItem(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addChecklistItem();
                            }
                          }}
                          placeholder="Adicionar item..."
                          className="flex-1 rounded-lg border border-white/5 bg-[#1a1a1a] p-2.5 text-sm text-white placeholder-gray-500 transition-all focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button
                          type="button"
                          onClick={addChecklistItem}
                          className="flex-shrink-0 rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-300 transition-all hover:bg-white/10"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Habit Tracker */}
                  {type === 'habito' && (
                    <div className="space-y-3 rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-500" />
                        <h4 className="font-semibold text-white">Tracking de Hábito</h4>
                      </div>

                      {/* Progress Bar */}
                      {isEditMode && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">Progresso</span>
                            <span className="font-semibold text-orange-400">
                              {habitStreak} / {habitGoal} dias
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-[#1a1a1a]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300"
                              style={{ width: `${Math.min((habitStreak / habitGoal) * 100, 100)}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <TrendingUp className="h-3 w-3" />
                            <span>
                              {habitStreak > 0
                                ? `${Math.round((habitStreak / habitGoal) * 100)}% completo`
                                : 'Comece seu hábito hoje!'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Goal Input */}
                      <div>
                        <label htmlFor="habitGoal" className="mb-2 block text-sm font-medium text-gray-300">
                          Meta de Dias
                        </label>
                        <input
                          type="number"
                          id="habitGoal"
                          value={habitGoal}
                          onChange={(e) => setHabitGoal(Math.max(1, parseInt(e.target.value) || 1))}
                          min="1"
                          max="365"
                          className="w-full rounded-lg border border-white/5 bg-[#1a1a1a] p-2.5 text-white transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                        <p className="mt-1 text-xs text-gray-400">
                          Quantos dias você quer manter este hábito?
                        </p>
                      </div>

                      {/* Streak Counter (only in edit mode) */}
                      {isEditMode && (
                        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#1a1a1a] p-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🔥</span>
                            <div>
                              <p className="text-sm font-medium text-white">Sequência Atual</p>
                              <p className="text-xs text-gray-400">Dias consecutivos</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setHabitStreak(Math.max(0, habitStreak - 1))}
                              className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 transition-all hover:bg-white/10"
                            >
                              <span className="text-lg">−</span>
                            </button>
                            <span className="min-w-[3rem] text-center text-2xl font-bold text-orange-400">
                              {habitStreak}
                            </span>
                            <button
                              type="button"
                              onClick={() => setHabitStreak(Math.min(habitGoal, habitStreak + 1))}
                              className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 transition-all hover:bg-white/10"
                            >
                              <span className="text-lg">+</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Selected Date Info */}
                  {(selectedInfo || selectedEvent) && (
                    <div className="rounded-lg border border-white/5 bg-[#1a1a1a] p-3">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {selectedInfo
                            ? new Date(selectedInfo.start).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              })
                            : selectedEvent?.start
                              ? new Date(selectedEvent.start).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })
                              : ''
                          }
                        </span>
                        {hasTime && (
                          <>
                            <span className="text-gray-600">•</span>
                            <Clock className="h-4 w-4" />
                            <span>{startTime} - {endTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={submitting || deleting}
                      className="rounded-lg border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || deleting}
                      style={{ backgroundColor: selectedEventType.color }}
                      className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100"
                    >
                      {submitting
                        ? (isEditMode ? 'Atualizando...' : 'Criando...')
                        : (isEditMode ? 'Atualizar Evento' : 'Criar Evento')
                      }
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
