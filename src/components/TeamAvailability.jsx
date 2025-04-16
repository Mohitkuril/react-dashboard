// src/components/TeamAvailability.jsx
import { useState } from 'react';

function TeamAvailability() {
  const [currentMonth, setCurrentMonth] = useState('August 2023');
  
  const team = [
    { id: 1, name: 'Emily Johnson', color: 'bg-blue-400' },
    { id: 2, name: 'Michael Brown', color: 'bg-green-400' },
    { id: 3, name: 'David Wilson', color: 'bg-yellow-400' },
    { id: 4, name: 'Sarah Davis', color: 'bg-purple-400' },
  ];
  
  // Calendar data - simplified for demo
  const calendar = [
    // Week 1
    [
      { day: 30, events: [] },
      { day: 31, events: [] },
      { day: 1, events: [
        { id: 1, member: 'Emily Johnson', title: 'Kick-Off Meeting', color: 'bg-blue-400' }
      ]},
      { day: 2, events: [
        { id: 2, member: 'David Wilson', title: 'Design Research', color: 'bg-yellow-400' }
      ]},
      { day: 3, events: [] },
      { day: 4, events: [] },
      { day: 5, events: [] },
    ],
    // Week 2
    [
      { day: 6, events: [] },
      { day: 7, events: [
        { id: 3, member: 'Michael Brown', title: 'API Dev', color: 'bg-green-400' }
      ]},
      { day: 8, events: [
        { id: 4, member: 'Michael Brown', title: 'API Dev', color: 'bg-green-400' }
      ]},
      { day: 9, events: [
        { id: 5, member: 'Michael Brown', title: 'API Dev', color: 'bg-green-400' },
        { id: 6, member: 'Sarah Davis', title: 'Sprint Review', color: 'bg-purple-400' }
      ]},
      { day: 10, events: [] },
      { day: 11, events: [] },
      { day: 12, events: [] },
    ],
    // Week 3
    [
      { day: 13, events: [] },
      { day: 14, events: [] },
      { day: 15, events: [
        { id: 7, member: 'Team', title: 'Sprint Planning', color: 'bg-red-400' }
      ]},
      { day: 16, events: [
        { id: 8, member: 'Sarah', title: 'Product Review', color: 'bg-purple-400' }
      ]},
      { day: 17, events: [] },
      { day: 18, events: [] },
      { day: 19, events: [] },
    ],
    // Week 4 (partial)
    [
      { day: 20, events: [] },
      { day: 21, events: [] },
      { day: 22, events: [] },
      { day: 23, events: [] },
      { day: 24, events: [] },
      { day: 25, events: [] },
      { day: 26, events: [] },
    ],
    // Week 5 (partial)
    [
      { day: 27, events: [] },
      { day: 28, events: [] },
      { day: 29, events: [] },
      { day: 30, events: [] },
      { day: 31, events: [] },
      { day: 1, events: [] },
      { day: 2, events: [] },
    ]
  ];
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">Team Availability</h2>
        <div className="flex items-center">
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="mx-4 text-gray-700">{currentMonth}</span>
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-center text-xs font-medium text-gray-500 uppercase">
              <th className="px-2 py-2">Sun</th>
              <th className="px-2 py-2">Mon</th>
              <th className="px-2 py-2">Tue</th>
              <th className="px-2 py-2">Wed</th>
              <th className="px-2 py-2">Thu</th>
              <th className="px-2 py-2">Fri</th>
              <th className="px-2 py-2">Sat</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, weekIndex) => (
              <tr key={weekIndex} className="text-center">
                {week.map((day, dayIndex) => (
                  <td key={dayIndex} className="border p-1 h-24 w-24 align-top">
                    <div className="flex flex-col h-full">
                      <div className="text-sm p-1 text-gray-500">{day.day}</div>
                      <div className="flex-grow overflow-y-auto">
                        {day.events.map(event => (
                          <div 
                            key={event.id} 
                            className={`${event.color} text-xs p-1 mb-1 rounded-sm truncate text-white`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {team.map(member => (
          <div key={member.id} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${member.color} mr-1`}></div>
            <span className="text-sm text-gray-700">{member.name}</span>
          </div>
        ))}
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
          <span className="text-sm text-gray-700">Team Events</span>
        </div>
      </div>
    </div>
  );
}

export default TeamAvailability;