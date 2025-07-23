"use client";
import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import logo from '../../../app/public/filter-icon.svg'

type Filters = {
  projectType?: string[];
  skills?: string[];
  availability?: string;
  location?: string;
  minRate?: string;
  maxRate?: string;
  currency?: string;
  rateType?: string;
  experience?: string;
  deadline?: string;
  [key: string]: any;
};

interface FiltersSidebarProps {
  onFiltersChange: (filterType: string, value: any) => void;
  filters: Filters;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ onFiltersChange, filters }) => {
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isRateOpen, setIsRateOpen] = useState(true);
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);
  const [isDeadlineOpen, setIsDeadlineOpen] = useState(true);

  const handleFilterChange = (filterType: string, value: string, checked: boolean | null = null) => {
      if (checked !== null) {
        // For checkboxes
        const currentValues = filters[filterType] || [];
        const newValues = checked 
          ? [...currentValues, value]
          : currentValues.filter((v: string) => v !== value);
        onFiltersChange(filterType, newValues);
      } else {
        // For other input types
        onFiltersChange(filterType, value);
      }
    };

  const clearAllFilters = () => {
    onFiltersChange('clear', null);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <span className="mr-2">
            <Image src={logo} alt="Filter Icon" width={24} height={24} />
          </span>
          Filters
        </h3>
        <button 
          onClick={clearAllFilters}
          className="text-sm font-medium  underline clear-button"
        >
          Clear
        </button>
      </div>

      {/* Time Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap space-x-2 space-y-2 items-center mb-4">
          <button className="px-4 py-1 text-sm border border-gray-300  text-gray-600 rounded-md">
            Today
          </button>
          <button className="px-6 py-1 text-sm border border-gray-300  text-gray-600 rounded-md">
            This Week
          </button>
          <button className="px-4 py-1 text-sm border border-gray-300 text-gray-600 rounded-md">
            Remote
          </button>
        </div>
      </div>

      {/* Project Type */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-900">Project type</h4>
          <button className="clear-button text-sm underline">Clear</button>
        </div>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600"
              checked={filters.projectType?.includes('hourly') || false}
              onChange={(e) => handleFilterChange('projectType', 'hourly', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Hourly</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600"
              checked={filters.projectType?.includes('fixedPrice') || false}
              onChange={(e) => handleFilterChange('projectType', 'fixedPrice', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Fixed Price</span>
          </label>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-900">Skills</h4>
          <button className="clear-button text-sm underline" onClick={clearAllFilters}>Clear</button>
        </div>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600"
              checked={filters.skills?.includes('uxDesign') || false}
              onChange={(e) => handleFilterChange('skills', 'uxDesign', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">UX Design</span>
          </label>
          <label className="flex items-center text-purple-600">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600"
              checked={filters.skills?.includes('aiPoweredSkillMatch') || false}
              onChange={(e) => handleFilterChange('skills', 'aiPoweredSkillMatch', e.target.checked)}
            />
            <span className="ml-2 text-sm">AI-Powered Skill Match</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600"
              checked={filters.skills?.includes('uxResign') || false}
              onChange={(e) => handleFilterChange('skills', 'uxResign', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">UX resign</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600"
              checked={filters.skills?.includes('figma') || false}
              onChange={(e) => handleFilterChange('skills', 'figma', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Figma</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600"
              checked={filters.skills?.includes('react') || false}
              onChange={(e) => handleFilterChange('skills', 'react', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">React</span>
          </label>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <button
          onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-bold text-gray-900">Availability</h4>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isAvailabilityOpen ? 'rotate-180' : ''}`} />
        </button>
        {isAvailabilityOpen && (
          <select 
            className="w-full p-2 purple-border rounded-md text-sm"
            value={filters.availability || 'fullTime'}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
          >
            <option value="fullTime">Full time</option>
            <option value="partTime">Part time</option>
            <option value="contract">Contract</option>
          </select>
        )}
      </div>

      {/* Location */}
      <div className="mb-6">
        <button
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-bold text-gray-900">Location</h4>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
        </button>
        {isLocationOpen && (
          <select 
            className="w-full p-2 purple-border rounded-md text-sm"
            value={filters.location || 'selectCountry'}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="selectCountry">Select Country</option>
            <option value="remote">Remote</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
        )}
      </div>

      {/* Rate */}
      <div className="mb-6">
        <button
          onClick={() => setIsRateOpen(!isRateOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-bold text-gray-900">Rate</h4>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isRateOpen ? 'rotate-180' : ''}`} />
        </button>
        {isRateOpen && (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="$Min"
                className=" px-2 purple-border rounded-md text-sm w-20 text-center"
                value={filters.minRate || ''}
                onChange={(e) => handleFilterChange('minRate', e.target.value)}
              />
              <input
                type="number"
                placeholder="$Max"
                className=" p-2  text-center purple-border rounded-md text-sm w-20"
                value={filters.maxRate || ''}
                onChange={(e) => handleFilterChange('maxRate', e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <select 
                className="flex-1 p-2 purple-border rounded-md text-sm"
                value={filters.currency || 'USD'}
                onChange={(e) => handleFilterChange('currency', e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
              <select 
                className="flex-1 p-2 purple-border rounded-md text-sm"
                value={filters.rateType || 'perHour'}
                onChange={(e) => handleFilterChange('rateType', e.target.value)}
              >
                <option value="perHour">Per hour</option>
                <option value="perProject">Per project</option>
                <option value="perDay">Per day</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="mb-6">
        <button
          onClick={() => setIsExperienceOpen(!isExperienceOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-bold text-gray-900">Experience</h4>
          <ChevronDown className={`w-4 h-4 purple-border transition-transform ${isExperienceOpen ? 'rotate-180' : ''}`} />
        </button>
        {isExperienceOpen && (
          <select 
            className="w-full p-2 purple-border rounded-md text-sm"
            value={filters.experience || 'senior'}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="senior">Senior (5+ years)</option>
            <option value="mid">Mid-level (2-5 years)</option>
            <option value="junior">Junior (0-2 years)</option>
          </select>
        )}
      </div>

      {/* Deadline */}
      <div className="mb-6">
        <button
          onClick={() => setIsDeadlineOpen(!isDeadlineOpen)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-bold text-gray-900">Deadline</h4>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDeadlineOpen ? 'rotate-180' : ''}`} />
        </button>
        {isDeadlineOpen && (
          <div className="space-y-2">
            <input
              type="date"
              className="w-full p-2 purple-border rounded-md text-sm"
              value={filters.deadline || ''}
              onChange={(e) => handleFilterChange('deadline', e.target.value)}
            />
            <p className="text-xs text-gray-500">Less left</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersSidebar;