import React, { FC } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointment } from '../../types';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onDateSelect: (selectInfo: any) => void;
  onAddAppointment: () => void;
  locale: any;
}

const AppointmentCalendar: FC<AppointmentCalendarProps> = ({
  appointments,
  onDateSelect,
  onAddAppointment,
  locale
}) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Randevu Takvimi</h5>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={onAddAppointment}
        >
          <FontAwesomeIcon icon={faCalendarPlus} className="me-2" />
          Yeni Randevu
        </Button>
      </Card.Header>
      <Card.Body className="p-2">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale={locale}
            selectable={true}
            selectMirror={true}
            select={onDateSelect}
            dayMaxEvents={true}
            weekends={true}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            allDaySlot={false}
            height="auto"
            contentHeight={300}
            eventMinHeight={20}
            slotDuration="00:30:00"
            events={appointments.map((app) => ({
              id: app.id,
              title: app.title,
              start: app.start,
              end: app.end,
              backgroundColor:
                app.type === 'checkup' ? '#1d8cf8' :
                app.type === 'vaccination' ? '#28a745' :
                app.type === 'surgery' ? '#dc3545' : '#6c757d'
            }))}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AppointmentCalendar; 