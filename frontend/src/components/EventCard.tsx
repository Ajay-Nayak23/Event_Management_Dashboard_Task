import React from 'react';
import { Calendar, MapPin, Users, Clock, DollarSign, Star } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onRegister?: (event: Event) => void;
  onEdit?: (event: Event) => void;
  isOrganizer?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister, onEdit, isOrganizer }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isFullyBooked = event.registered >= event.capacity;
  const registrationPercentage = (event.registered / event.capacity) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{event.title}</h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-2" />
            {event.registered} / {event.capacity} registered
          </div>
          {event.price > 0 && (
            <div className="flex items-center text-gray-500 text-sm">
              <DollarSign className="h-4 w-4 mr-2" />
              ${event.price}
            </div>
          )}
        </div>

        {/* Registration Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">Registration</span>
            <span className="text-gray-700 font-medium">{Math.round(registrationPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                registrationPercentage > 80 ? 'bg-red-500' : 
                registrationPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${registrationPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex space-x-3">
          {isOrganizer ? (
            <button
              onClick={() => onEdit?.(event)}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Edit Event
            </button>
          ) : (
            <button
              onClick={() => onRegister?.(event)}
              disabled={isFullyBooked}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isFullyBooked
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isFullyBooked ? 'Fully Booked' : event.price > 0 ? `Register - $${event.price}` : 'Register Free'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;