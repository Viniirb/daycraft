import { Fragment, useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';
import type { DateSelectArg } from '@fullcalendar/core';
import { useAppContext } from '../../../main/config/useAppContext';
import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../hooks/useEvents';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInfo: DateSelectArg | null;
};

export default function CreateEventModal({ isOpen, onClose, selectedInfo }: Props) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('tarefa');
  const [submitting, setSubmitting] = useState(false);

  const { authController, eventController } = useAppContext();
  const { user } = useAuth(authController);
  const { createEvent } = useEvents(eventController, user?.id);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setType('tarefa');
    }
  }, [isOpen]);

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedInfo || !user) return;

    setSubmitting(true);
    try {
      const success = await createEvent({
        title,
        type,
        start: selectedInfo.startStr,
        end: selectedInfo.endStr,
        allDay: selectedInfo.allDay,
        userId: user.id
      });

      if (success) {
        onClose();
      } else {
        alert('Erro ao salvar evento. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao salvar evento:', err);
      alert('Erro ao salvar evento. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Criar Novo Evento
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                <form onSubmit={handleSaveEvent} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      maxLength={200}
                      className="w-full rounded border-none bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Tipo
                    </label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full rounded border-none bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="tarefa">Tarefa</option>
                      <option value="lembrete">Lembrete</option>
                      <option value="data_especial">Data Especial</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={submitting}
                      className="rounded bg-gray-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-500 disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                      {submitting ? 'Salvando...' : 'Salvar'}
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
