import React from 'react';
import { Plus, TrendingUp, Users, Calendar, DollarSign, BarChart3 } from 'lucide-react';
import { Event, User } from '../types';

interface DashboardProps {
  user: User;
  events: Event[];
  onCreateEvent: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, events, onCreateEvent }) => {
  const isOrganizer = user.role === 'organizer';

  const userStats = isOrganizer
    ? {
        totalEvents: events.length,
        totalRegistrations: events.reduce((sum, event) => sum + event.registered, 0),
        revenue: events.reduce((sum, event) => sum + (event.registered * event.price), 0),
        avgRegistrations: events.length > 0 ? Math.round(events.reduce((sum, event) => sum + event.registered, 0) / events.length) : 0,
      }
    : {
        registeredEvents: 3,
        upcomingEvents: 2,
        completedEvents: 1,
        totalSpent: 150,
      };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-indigo-100 text-lg">
              {isOrganizer 
                ? 'Ready to create amazing events?'
                : 'Discover exciting events happening around you.'
              }
            </p>
          </div>
          {isOrganizer && (
            <button
              onClick={onCreateEvent}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isOrganizer ? (
          <>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalEvents}</p>
                </div>
                <div className="bg-indigo-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+12%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalRegistrations}</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+8%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${userStats.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+23%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Avg. Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.avgRegistrations}</p>
                </div>
                <div className="bg-orange-100 rounded-full p-3">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+5%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Registered Events</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.registeredEvents}</p>
                </div>
                <div className="bg-indigo-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Upcoming Events</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.upcomingEvents}</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Completed Events</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.completedEvents}</p>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${userStats.totalSpent}</p>
                </div>
                <div className="bg-orange-100 rounded-full p-3">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isOrganizer ? 'Recent Event Activity' : 'Your Recent Activity'}
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {isOrganizer 
                      ? `New registration for "Tech Conference 2024"`
                      : `Registered for "Design Workshop"`
                    }
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-indigo-600">
                  {isOrganizer ? '+1 Registration' : 'Confirmed'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;