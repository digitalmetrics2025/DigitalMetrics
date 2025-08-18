import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from './LoginForm';
import UserManagement from './UserManagement';
import { 
  BarChart3, 
  Users, 
  Mail, 
  MessageSquare, 
  Settings, 
  LogOut,
  Home,
  TrendingUp,
  FileText,
  Star,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  getClientSubmissions,
  getContactSubmissions,
  getNewsletterSubscriptions,
  getClientFeedbacks,
  updateSubmissionStatus,
  deleteSubmission,
  updateNewsletterStatus,
  deleteNewsletterSubscription,
  addClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
  toggleFeedbackStatus,
  ClientSubmission,
  ContactSubmission,
  ClientFeedback
} from '../services/firebaseService';

const AdminPanel: React.FC = () => {
  const { user, userProfile, logout, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    clientSubmissions: [] as ClientSubmission[],
    contactSubmissions: [] as ContactSubmission[],
    newsletterSubscriptions: [] as any[],
    clientFeedbacks: [] as ClientFeedback[]
  });

  // If user is not authenticated, show login form
  if (!user || !userProfile) {
    return <LoginForm />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, permission: 'view_all_data' },
    { id: 'leads', label: 'Client Leads', icon: Users, permission: 'view_all_data' },
    { id: 'contacts', label: 'Contact Forms', icon: Mail, permission: 'view_all_data' },
    { id: 'newsletter', label: 'Newsletter', icon: MessageSquare, permission: 'view_all_data' },
    { id: 'feedback', label: 'Client Feedback', icon: Star, permission: 'view_all_data' },
    { id: 'users', label: 'User Management', icon: Settings, permission: 'manage_users' }
  ];

  const filteredTabs = tabs.filter(tab => hasPermission(tab.permission));

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [clientRes, contactRes, newsletterRes, feedbackRes] = await Promise.all([
        getClientSubmissions(),
        getContactSubmissions(),
        getNewsletterSubscriptions(),
        getClientFeedbacks()
      ]);

      setData({
        clientSubmissions: clientRes.success ? clientRes.data : [],
        contactSubmissions: contactRes.success ? contactRes.data : [],
        newsletterSubscriptions: newsletterRes.success ? newsletterRes.data : [],
        clientFeedbacks: feedbackRes.success ? feedbackRes.data : []
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (type: 'clientSubmissions' | 'contactSubmissions', id: string, status: string) => {
    try {
      await updateSubmissionStatus(type, id, status as any);
      fetchAllData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (type: 'clientSubmissions' | 'contactSubmissions', id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteSubmission(type, id);
        fetchAllData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-900/20 text-blue-400';
      case 'contacted': return 'bg-yellow-900/20 text-yellow-400';
      case 'in-progress': return 'bg-purple-900/20 text-purple-400';
      case 'completed': return 'bg-green-900/20 text-green-400';
      case 'closed': return 'bg-gray-900/20 text-gray-400';
      default: return 'bg-slate-900/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Bell className="h-4 w-4" />;
      case 'contacted': return <MessageSquare className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const renderDashboard = () => {
    const stats = [
      {
        title: 'Client Leads',
        value: data.clientSubmissions.length,
        change: '+12%',
        icon: Users,
        color: 'from-blue-600 to-blue-400'
      },
      {
        title: 'Contact Forms',
        value: data.contactSubmissions.length,
        change: '+8%',
        icon: Mail,
        color: 'from-green-600 to-green-400'
      },
      {
        title: 'Newsletter Subs',
        value: data.newsletterSubscriptions.length,
        change: '+15%',
        icon: MessageSquare,
        color: 'from-purple-600 to-purple-400'
      },
      {
        title: 'Client Reviews',
        value: data.clientFeedbacks.length,
        change: '+5%',
        icon: Star,
        color: 'from-yellow-600 to-yellow-400'
      }
    ];

    const recentActivity = [
      ...data.clientSubmissions.slice(0, 3).map(item => ({
        type: 'Client Lead',
        name: item.name,
        email: item.email,
        time: item.createdAt?.toDate().toLocaleDateString() || 'Unknown',
        status: item.status
      })),
      ...data.contactSubmissions.slice(0, 2).map(item => ({
        type: 'Contact Form',
        name: item.name,
        email: item.email,
        time: item.createdAt?.toDate().toLocaleDateString() || 'Unknown',
        status: item.status
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.name}</p>
                    <p className="text-slate-400 text-sm">{activity.type} • {activity.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm">{activity.time}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSubmissions = (submissions: (ClientSubmission | ContactSubmission)[], type: 'clientSubmissions' | 'contactSubmissions') => {
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {type === 'clientSubmissions' ? 'Client Leads' : 'Contact Forms'}
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200">
                <Search className="h-4 w-4 text-slate-400" />
              </button>
              <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200">
                <Filter className="h-4 w-4 text-slate-400" />
              </button>
              <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200">
                <Download className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{submission.name}</div>
                      <div className="text-sm text-slate-400">{submission.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-300">{submission.company || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={submission.status}
                      onChange={(e) => handleStatusUpdate(type, submission.id!, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(submission.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {submission.createdAt?.toDate().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-400 hover:text-green-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(type, submission.id!)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'leads':
        return renderSubmissions(data.clientSubmissions, 'clientSubmissions');
      case 'contacts':
        return renderSubmissions(data.contactSubmissions, 'contactSubmissions');
      case 'newsletter':
        return (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter Subscriptions</h3>
            <div className="space-y-2">
              {data.newsletterSubscriptions.map((sub, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-white">{sub.email}</span>
                  <span className="text-slate-400 text-sm">
                    {sub.subscribedAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'feedback':
        return (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Client Feedback</h3>
            <div className="space-y-4">
              {data.clientFeedbacks.map((feedback) => (
                <div key={feedback.id} className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{feedback.clientName}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{feedback.clientTitle} at {feedback.clientCompany}</p>
                  <p className="text-slate-400 text-sm">{feedback.testimonial}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 border-r border-slate-700">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white mb-6">CRM Admin Panel</h1>
            
            {/* User Info */}
            <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{userProfile.name}</div>
                  <div className="text-slate-400 text-xs capitalize">{userProfile.role.replace('_', ' ')}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {filteredTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {filteredTabs.find(tab => tab.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-slate-400">
                Welcome back, {userProfile.name}. Here's what's happening with your business today.
              </p>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;