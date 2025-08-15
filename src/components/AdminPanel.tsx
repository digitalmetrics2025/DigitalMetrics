import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import UserManagement from './UserManagement';
import { 
  Database, 
  Upload, 
  Users, 
  Mail, 
  MessageSquare, 
  Calendar,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  Star,
  Save,
  ToggleLeft,
  ToggleRight,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Phone,
  Building,
  DollarSign,
  Tag,
  RefreshCw,
  Download,
  BarChart3,
  X,
  LogOut,
  Shield
} from 'lucide-react';
import { 
  getClientSubmissions, 
  getContactSubmissions, 
  updateSubmissionStatus,
  deleteSubmission,
  getNewsletterSubscriptions,
  updateNewsletterStatus,
  deleteNewsletterSubscription,
  getClientFeedbacks,
  addClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
  toggleFeedbackStatus,
  ClientFeedback,
  ClientSubmission,
  ContactSubmission
} from '../services/firebaseService';
import { addMockDataToFirestore } from '../utils/mockData';

interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: any;
  status: string;
}

const AdminPanelContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { userProfile, logout, hasPermission } = useAuth();
  const [clientSubmissions, setClientSubmissions] = useState<ClientSubmission[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<any[]>([]);
  const [clientFeedbacks, setClientFeedbacks] = useState<ClientFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<ClientFeedback | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    title: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
    isActive: true,
    metrics: {
      metric1: '',
      metric2: '',
      metric3: ''
    }
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  // Reset feedback form
  const resetFeedbackForm = () => {
    setFeedbackForm({
      name: '',
      title: '',
      company: '',
      content: '',
      rating: 5,
      image: '',
      isActive: true,
      metrics: {
        metric1: '',
        metric2: '',
        metric3: ''
      }
    });
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [clientResult, contactResult, newsletterResult, feedbackResult] = await Promise.all([
        getClientSubmissions(),
        getContactSubmissions(),
        getNewsletterSubscriptions(),
        getClientFeedbacks()
      ]);

      if (clientResult.success) {
        setClientSubmissions(clientResult.data || []);
      }
      if (contactResult.success) {
        setContactSubmissions(contactResult.data || []);
      }
      if (newsletterResult.success) {
        setNewsletterSubscriptions(newsletterResult.data || []);
      }
      if (feedbackResult.success) {
        setClientFeedbacks(feedbackResult.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data from database');
      setMessageType('error');
    }
    setIsLoading(false);
  };

  const handleAddMockData = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await addMockDataToFirestore();
      
      if (result.success) {
        setMessageType('success');
        setMessage(`Successfully added mock data! 
          • ${result.counts?.clientSubmissions} client submissions
          • ${result.counts?.contactSubmissions} contact submissions  
          • ${result.counts?.newsletterSubscriptions} newsletter subscriptions`);
        
        // Refresh data after adding mock data
        setTimeout(() => {
          fetchAllData();
        }, 1000);
      } else {
        setMessageType('error');
        setMessage(`Failed to add mock data: ${result.error}`);
      }
    } catch (error) {
      setMessageType('error');
      setMessage(`Error: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const handleStatusUpdate = async (type: 'clientSubmissions' | 'contactSubmissions', id: string, newStatus: string) => {
    try {
      const result = await updateSubmissionStatus(type, id, newStatus as any);
      if (result.success) {
        setMessage('Status updated successfully!');
        setMessageType('success');
        fetchAllData(); // Refresh data
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error updating status');
      setMessageType('error');
    }
  };

  const handleDelete = async (type: 'clientSubmissions' | 'contactSubmissions', id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const result = await deleteSubmission(type, id);
        if (result.success) {
          setMessage('Entry deleted successfully!');
          setMessageType('success');
          fetchAllData(); // Refresh data
          setTimeout(() => setMessage(''), 3000);
        }
      } catch (error) {
        setMessage('Error deleting entry');
        setMessageType('error');
      }
    }
  };

  const handleNewsletterStatusUpdate = async (id: string, newStatus: 'active' | 'unsubscribed') => {
    try {
      const result = await updateNewsletterStatus(id, newStatus);
      if (result.success) {
        setMessage('Newsletter status updated successfully!');
        setMessageType('success');
        fetchAllData(); // Refresh data
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error updating newsletter status');
      setMessageType('error');
    }
  };

  const handleNewsletterDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this newsletter subscription?')) {
      try {
        const result = await deleteNewsletterSubscription(id);
        if (result.success) {
          setMessage('Newsletter subscription deleted successfully!');
          setMessageType('success');
          fetchAllData(); // Refresh data
          setTimeout(() => setMessage(''), 3000);
        }
      } catch (error) {
        setMessage('Error deleting newsletter subscription');
        setMessageType('error');
      }
    }
  };

  // Feedback handlers
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const feedbackData = {
        ...feedbackForm,
        metrics: Object.values(feedbackForm.metrics).filter(m => m.trim() !== '')
      };

      let result;
      if (editingFeedback) {
        result = await updateClientFeedback(editingFeedback.id!, feedbackData);
      } else {
        result = await addClientFeedback(feedbackData);
      }

      if (result.success) {
        setMessage(`Feedback ${editingFeedback ? 'updated' : 'added'} successfully!`);
        setMessageType('success');
        setShowFeedbackForm(false);
        setEditingFeedback(null);
        resetFeedbackForm();
        fetchAllData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error ${editingFeedback ? 'updating' : 'adding'} feedback: ${result.error}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`Error ${editingFeedback ? 'updating' : 'adding'} feedback`);
      setMessageType('error');
    }

    setIsLoading(false);
  };

  const handleEditFeedback = (feedback: ClientFeedback) => {
    setEditingFeedback(feedback);
    setFeedbackForm({
      name: feedback.name,
      title: feedback.title,
      company: feedback.company,
      content: feedback.content,
      rating: feedback.rating,
      image: feedback.image || '',
      isActive: feedback.isActive,
      metrics: {
        metric1: feedback.metrics?.[0] || '',
        metric2: feedback.metrics?.[1] || '',
        metric3: feedback.metrics?.[2] || ''
      }
    });
    setShowFeedbackForm(true);
  };

  const handleDeleteFeedback = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const result = await deleteClientFeedback(id);
        if (result.success) {
          setMessage('Feedback deleted successfully!');
          setMessageType('success');
          fetchAllData();
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage('Error deleting feedback');
          setMessageType('error');
        }
      } catch (error) {
        setMessage('Error deleting feedback');
        setMessageType('error');
      }
    }
  };

  const handleToggleFeedbackStatus = async (id: string, currentStatus: boolean) => {
    try {
      const result = await toggleFeedbackStatus(id, !currentStatus);
      if (result.success) {
        setMessage(`Feedback ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
        setMessageType('success');
        fetchAllData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error updating feedback status');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error updating feedback status');
      setMessageType('error');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-600';
      case 'contacted': return 'bg-yellow-600';
      case 'in-progress': return 'bg-purple-600';
      case 'completed': return 'bg-green-600';
      case 'closed': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'contacted': return <Phone className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <Trash2 className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const filteredClientSubmissions = clientSubmissions.filter(submission => {
    const matchesSearch = submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredContactSubmissions = contactSubmissions.filter(submission => {
    const matchesSearch = submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSubmissions = clientSubmissions.length + contactSubmissions.length;
  const newSubmissions = [...clientSubmissions, ...contactSubmissions].filter(s => s.status === 'new').length;
  const inProgressSubmissions = [...clientSubmissions, ...contactSubmissions].filter(s => s.status === 'in-progress').length;
  const completedSubmissions = [...clientSubmissions, ...contactSubmissions].filter(s => s.status === 'completed').length;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    ...(hasPermission('view_all_data') ? [
      { id: 'clients', label: 'Client Submissions', icon: Users },
      { id: 'contacts', label: 'Contact Forms', icon: MessageSquare },
      { id: 'newsletter', label: 'Newsletter', icon: Mail }
    ] : []),
    ...(hasPermission('manage_users') ? [
      { id: 'users', label: 'User Management', icon: Shield }
    ] : []),
    { id: 'tools', label: 'Tools', icon: Database }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'closed', label: 'Closed' }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">CRM Admin Panel</h1>
              <span className="text-sm text-slate-400">
                Welcome, {userProfile?.name}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-white">{userProfile?.name}</div>
                <div className="text-xs text-slate-400 capitalize">{userProfile?.role.replace('_', ' ')}</div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">CRM Dashboard</h1>
                <p className="text-slate-400">Manage leads, contacts, and submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchAllData}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`rounded-xl p-4 border mb-6 ${
            messageType === 'success' 
              ? 'bg-green-900/20 border-green-600/50 text-green-300' 
              : 'bg-red-900/20 border-red-600/50 text-red-300'
          }`}>
            <div className="flex items-start space-x-3">
              {messageType === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              )}
              <div className="whitespace-pre-line">{message}</div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{totalSubmissions}</div>
                    <div className="text-slate-400 text-sm">Total Submissions</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-600/20 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{newSubmissions}</div>
                    <div className="text-slate-400 text-sm">New Leads</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{inProgressSubmissions}</div>
                    <div className="text-slate-400 text-sm">In Progress</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-600/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{completedSubmissions}</div>
                    <div className="text-slate-400 text-sm">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[...clientSubmissions, ...contactSubmissions]
                  .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
                  .slice(0, 5)
                  .map((submission, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-slate-700/30 rounded-lg">
                      <div className={`p-2 rounded-lg ${getStatusColor(submission.status)} text-white`}>
                        {getStatusIcon(submission.status)}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{submission.name}</div>
                        <div className="text-slate-400 text-sm">{submission.email}</div>
                      </div>
                      <div className="text-slate-400 text-sm">
                        {formatDate(submission.createdAt)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Client Submissions Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {/* Client Submission Stats Chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{clientSubmissions.length}</div>
                    <div className="text-slate-400 text-xs">Total Entries</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {clientSubmissions.filter(s => {
                        const today = new Date();
                        const submissionDate = s.createdAt?.toDate ? s.createdAt.toDate() : new Date(s.createdAt);
                        return submissionDate.toDateString() === today.toDateString();
                      }).length}
                    </div>
                    <div className="text-slate-400 text-xs">Today Entries</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-600/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {clientSubmissions.filter(s => s.status === 'new').length}
                    </div>
                    <div className="text-slate-400 text-xs">New</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-600/20 rounded-lg">
                    <Phone className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {clientSubmissions.filter(s => s.status === 'contacted').length}
                    </div>
                    <div className="text-slate-400 text-xs">Contacted</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {clientSubmissions.filter(s => s.status === 'in-progress').length}
                    </div>
                    <div className="text-slate-400 text-xs">In Progress</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {clientSubmissions.filter(s => s.status === 'completed').length}
                    </div>
                    <div className="text-slate-400 text-xs">Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-600/20 rounded-lg">
                    <Trash2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {clientSubmissions.filter(s => s.status === 'closed').length}
                    </div>
                    <div className="text-slate-400 text-xs">Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Submissions List */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-white">Client Submissions ({filteredClientSubmissions.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="text-left p-4 text-slate-300 font-medium">Client</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Services</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Budget</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Date</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClientSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-t border-slate-700/50 hover:bg-slate-700/20">
                        <td className="p-4">
                          <div>
                            <div className="text-white font-medium">{submission.name}</div>
                            <div className="text-slate-400 text-sm">{submission.email}</div>
                            {submission.company && (
                              <div className="text-slate-500 text-xs">{submission.company}</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {submission.services?.slice(0, 2).map((service, idx) => (
                              <span key={idx} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
                                {service}
                              </span>
                            ))}
                            {submission.services?.length > 2 && (
                              <span className="text-slate-400 text-xs">+{submission.services.length - 2} more</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-green-400 font-medium">{submission.budget || 'N/A'}</span>
                        </td>
                        <td className="p-4">
                          <select
                            value={submission.status}
                            onChange={(e) => handleStatusUpdate('clientSubmissions', submission.id!, e.target.value)}
                            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(submission.status)} border-none focus:ring-2 focus:ring-blue-400`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">
                          {formatDate(submission.createdAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedEntry(submission);
                                setIsModalOpen(true);
                              }}
                              className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors duration-200"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('clientSubmissions', submission.id!)}
                              className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredClientSubmissions.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No client submissions found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Submissions Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {/* Contact Submission Stats Chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{contactSubmissions.length}</div>
                    <div className="text-slate-400 text-xs">Total Entries</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {contactSubmissions.filter(s => {
                        const today = new Date();
                        const submissionDate = s.createdAt?.toDate ? s.createdAt.toDate() : new Date(s.createdAt);
                        return submissionDate.toDateString() === today.toDateString();
                      }).length}
                    </div>
                    <div className="text-slate-400 text-xs">Today Entries</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-600/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {contactSubmissions.filter(s => s.status === 'new').length}
                    </div>
                    <div className="text-slate-400 text-xs">New</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-600/20 rounded-lg">
                    <Phone className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {contactSubmissions.filter(s => s.status === 'contacted').length}
                    </div>
                    <div className="text-slate-400 text-xs">Contacted</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {contactSubmissions.filter(s => s.status === 'in-progress').length}
                    </div>
                    <div className="text-slate-400 text-xs">In Progress</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {contactSubmissions.filter(s => s.status === 'completed').length}
                    </div>
                    <div className="text-slate-400 text-xs">Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-600/20 rounded-lg">
                    <Trash2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">
                      {contactSubmissions.filter(s => s.status === 'closed').length}
                    </div>
                    <div className="text-slate-400 text-xs">Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Submission Stats Chips */}

            {/* Filters */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Submissions List */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-white">Contact Submissions ({filteredContactSubmissions.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="text-left p-4 text-slate-300 font-medium">Contact</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Service</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Budget</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Date</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContactSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-t border-slate-700/50 hover:bg-slate-700/20">
                        <td className="p-4">
                          <div>
                            <div className="text-white font-medium">{submission.name}</div>
                            <div className="text-slate-400 text-sm">{submission.email}</div>
                            {submission.company && (
                              <div className="text-slate-500 text-xs">{submission.company}</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                            {submission.service || 'N/A'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-green-400 font-medium">{submission.budget || 'N/A'}</span>
                        </td>
                        <td className="p-4">
                          <select
                            value={submission.status}
                            onChange={(e) => handleStatusUpdate('contactSubmissions', submission.id!, e.target.value)}
                            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(submission.status)} border-none focus:ring-2 focus:ring-blue-400`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">
                          {formatDate(submission.createdAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedEntry(submission);
                                setIsModalOpen(true);
                              }}
                              className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors duration-200"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('contactSubmissions', submission.id!)}
                              className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredContactSubmissions.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No contact submissions found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            {/* Newsletter Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-600/20 rounded-lg">
                    <Mail className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{newsletterSubscriptions.filter(s => s.status === 'active').length || 0}</div>
                    <div className="text-slate-400 text-sm">Active Subscribers</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-600/20 rounded-lg">
                    <Users className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{newsletterSubscriptions.filter(s => s.status === 'unsubscribed').length || 0}</div>
                    <div className="text-slate-400 text-sm">Unsubscribed</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{newsletterSubscriptions.length || 0}</div>
                    <div className="text-slate-400 text-sm">Total Subscriptions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscriptions List */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-white">Newsletter Subscriptions ({newsletterSubscriptions.length || 0})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="text-left p-4 text-slate-300 font-medium">Email</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Subscribed Date</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletterSubscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-t border-slate-700/50 hover:bg-slate-700/20">
                        <td className="p-4">
                          <div className="text-white font-medium">{subscription.email}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={subscription.status}
                            onChange={(e) => handleNewsletterStatusUpdate(subscription.id, e.target.value as 'active' | 'unsubscribed')}
                            className={`px-3 py-1 rounded-full text-white text-sm font-medium border-none focus:ring-2 focus:ring-blue-400 ${
                              subscription.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="unsubscribed">Unsubscribed</option>
                          </select>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">
                          {formatDate(subscription.subscribedAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedEntry(subscription);
                                setIsModalOpen(true);
                              }}
                              className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors duration-200"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleNewsletterDelete(subscription.id)}
                              className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {newsletterSubscriptions.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No newsletter subscriptions found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && hasPermission('manage_users') && (
          <UserManagement />
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-8">
            {/* Client Feedbacks Management */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Settings className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Client Feedbacks Management</h3>
                </div>
                <button
                  onClick={() => {
                    resetFeedbackForm();
                    setEditingFeedback(null);
                    setShowFeedbackForm(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Feedback</span>
                </button>
              </div>

              {/* Feedback Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{clientFeedbacks.length}</div>
                  <div className="text-xs text-slate-400">Total Feedbacks</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {clientFeedbacks.filter(f => f.isActive).length}
                  </div>
                  <div className="text-xs text-slate-400">Active</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {clientFeedbacks.filter(f => !f.isActive).length}
                  </div>
                  <div className="text-xs text-slate-400">Inactive</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {clientFeedbacks.length > 0 ? 
                      (clientFeedbacks.reduce((sum, f) => sum + f.rating, 0) / clientFeedbacks.length).toFixed(1) 
                      : '0'
                    }
                  </div>
                  <div className="text-xs text-slate-400">Avg Rating</div>
                </div>
              </div>

              {/* Feedbacks List */}
              <div className="space-y-4">
                {clientFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {feedback.image && (
                          <img 
                            src={feedback.image} 
                            alt={feedback.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-medium">{feedback.name}</h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                                />
                              ))}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feedback.isActive 
                                ? 'bg-green-600/20 text-green-400' 
                                : 'bg-gray-600/20 text-gray-400'
                            }`}>
                              {feedback.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-slate-400 text-sm mb-1">{feedback.title} at {feedback.company}</p>
                          <p className="text-slate-300 text-sm line-clamp-2">{feedback.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleToggleFeedbackStatus(feedback.id!, feedback.isActive)}
                          className="p-2 hover:bg-slate-600 rounded-lg transition-colors duration-200"
                          title={feedback.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {feedback.isActive ? (
                            <ToggleRight className="h-5 w-5 text-green-400" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditFeedback(feedback)}
                          className="p-2 hover:bg-slate-600 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteFeedback(feedback.id!)}
                          className="p-2 hover:bg-slate-600 rounded-lg transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {clientFeedbacks.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No client feedbacks found. Add your first feedback!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {isModalOpen && selectedEntry && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50 shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700/50 p-6 flex items-center justify-between rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Entry Details</h2>
                  <p className="text-slate-400">View submission information</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-slate-400 hover:text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white">{selectedEntry.name}</div>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white">{selectedEntry.email}</div>
                    </div>
                  </div>

                  {selectedEntry.phone && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Phone</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white">{selectedEntry.phone}</div>
                    </div>
                  )}

                  {selectedEntry.company && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Company</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white">{selectedEntry.company}</div>
                    </div>
                  )}

                  {/* Services (for client submissions) */}
                  {selectedEntry.services && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Services</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.services.map((service: string, idx: number) => (
                          <span key={idx} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Service (for contact submissions) */}
                  {selectedEntry.service && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Service Interest</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white">{selectedEntry.service}</div>
                    </div>
                  )}

                  {selectedEntry.budget && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Budget</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-green-400 font-medium">{selectedEntry.budget}</div>
                    </div>
                  )}

                  {selectedEntry.timeline && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Timeline</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white">{selectedEntry.timeline}</div>
                    </div>
                  )}

                  {selectedEntry.source && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Source</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white">{selectedEntry.source}</div>
                    </div>
                  )}

                  {selectedEntry.message && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Message</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-white whitespace-pre-wrap">{selectedEntry.message}</div>
                    </div>
                  )}

                  {/* Status and Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Status</label>
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-white text-sm font-medium ${getStatusColor(selectedEntry.status)}`}>
                        {getStatusIcon(selectedEntry.status)}
                        <span className="capitalize">{selectedEntry.status}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Submitted</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-slate-300 text-sm">{formatDate(selectedEntry.createdAt)}</div>
                    </div>
                  </div>

                  {/* Newsletter specific fields */}
                  {selectedEntry.subscribedAt && (
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Subscribed Date</label>
                      <div className="bg-slate-700 rounded-lg p-3 text-slate-300 text-sm">{formatDate(selectedEntry.subscribedAt)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Form Modal */}
        {showFeedbackForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50 shadow-2xl">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700/50 p-6 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-xl font-bold text-white">
                  {editingFeedback ? 'Edit' : 'Add'} Client Feedback
                </h3>
                <button
                  onClick={() => {
                    setShowFeedbackForm(false);
                    setEditingFeedback(null);
                    resetFeedbackForm();
                  }}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-slate-400 hover:text-white" />
                </button>
              </div>
              
              <form onSubmit={handleFeedbackSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={feedbackForm.title}
                      onChange={(e) => setFeedbackForm({...feedbackForm, title: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="CEO, Founder, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={feedbackForm.company}
                      onChange={(e) => setFeedbackForm({...feedbackForm, company: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Company Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Rating *
                    </label>
                    <select
                      value={feedbackForm.rating}
                      onChange={(e) => setFeedbackForm({...feedbackForm, rating: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={feedbackForm.image}
                    onChange={(e) => setFeedbackForm({...feedbackForm, image: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Testimonial Content *
                  </label>
                  <textarea
                    value={feedbackForm.content}
                    onChange={(e) => setFeedbackForm({...feedbackForm, content: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                    placeholder="Write the client's testimonial here..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Success Metrics (Optional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={feedbackForm.metrics.metric1}
                      onChange={(e) => setFeedbackForm({
                        ...feedbackForm, 
                        metrics: {...feedbackForm.metrics, metric1: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="e.g., +340% Revenue"
                    />
                    <input
                      type="text"
                      value={feedbackForm.metrics.metric2}
                      onChange={(e) => setFeedbackForm({
                        ...feedbackForm, 
                        metrics: {...feedbackForm.metrics, metric2: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="e.g., 2.5M Visitors"
                    />
                    <input
                      type="text"
                      value={feedbackForm.metrics.metric3}
                      onChange={(e) => setFeedbackForm({
                        ...feedbackForm, 
                        metrics: {...feedbackForm.metrics, metric3: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="e.g., 8.3% Conversion"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={feedbackForm.isActive}
                    onChange={(e) => setFeedbackForm({...feedbackForm, isActive: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-slate-300 text-sm">
                    Display this feedback on the website
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>{editingFeedback ? 'Update' : 'Save'} Feedback</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFeedbackForm(false);
                      setEditingFeedback(null);
                      resetFeedbackForm();
                    }}
                    className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <ProtectedRoute>
      <AdminPanelContent />
    </ProtectedRoute>
  );
};

export default AdminPanel;