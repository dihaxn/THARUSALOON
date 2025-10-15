import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getServices, createService, updateUser } from '../../lib/api';

const ServiceManagement = () => {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    durationMinutes: '',
    category: 'MAKEUP',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const servicesData = await getServices();
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        durationMinutes: parseInt(formData.durationMinutes),
        isActive: true
      };

      if (editingService) {
        // Update existing service
        await updateService(editingService.id, serviceData);
      } else {
        // Create new service
        await createService(serviceData, token);
      }

      // Reset form and reload services
      setFormData({
        name: '',
        description: '',
        price: '',
        durationMinutes: '',
        category: 'MAKEUP',
        imageUrl: ''
      });
      setShowForm(false);
      setEditingService(null);
      loadServices();
    } catch (error) {
      setError(error.message || 'Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price.toString(),
      durationMinutes: service.durationMinutes.toString(),
      category: service.category,
      imageUrl: service.imageUrl || ''
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      durationMinutes: '',
      category: 'MAKEUP',
      imageUrl: ''
    });
    setShowForm(false);
    setEditingService(null);
    setError('');
  };

  const filteredServices = services.filter(service => {
    if (filter === 'all') return true;
    return service.category === filter;
  });

  const categories = [
    { value: 'MAKEUP', label: 'Makeup', icon: '💄' },
    { value: 'HAIR', label: 'Hair', icon: '💇‍♀️' },
    { value: 'PACKAGE', label: 'Package', icon: '✨' },
    { value: 'CONSULTATION', label: 'Consultation', icon: '💬' },
    { value: 'TRIAL', label: 'Trial', icon: '🎭' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Service Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Add New Service
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filter === 'all'
              ? 'bg-pink-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Services
        </button>
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setFilter(category.value)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === category.value
                ? 'bg-pink-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map(service => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {categories.find(c => c.value === service.category)?.icon || '✨'}
                </span>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">{service.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{service.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-500">Duration:</span>
                <span className="ml-1 text-slate-900">{service.durationMinutes} min</span>
              </div>
              <div>
                <span className="font-medium text-slate-500">Price:</span>
                <span className="ml-1 text-slate-900 font-semibold">LKR {service.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className={`text-xs px-2 py-1 rounded-full ${
                service.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {service.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                      placeholder="e.g., Bridal Makeup"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      name="durationMinutes"
                      value={formData.durationMinutes}
                      onChange={handleInputChange}
                      required
                      min="15"
                      max="480"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                      placeholder="60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Price (LKR) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                      placeholder="45000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                      placeholder="Describe the service in detail..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                  >
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
