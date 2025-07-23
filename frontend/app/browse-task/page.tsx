"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/ui/browse/navbar';
import FiltersSidebar from '../../components/ui/browse/filters-slidebar';
import TaskCard from '../../components/ui/browse/task-card';
import  TaskDetailsModal  from '../../components/ui/browse/task-details-modal';
import AISearchComponent from '../../components/ui/browse/ai-powered-search';
import  Footer  from '../../components/ui/browse/footer';



 export type ProjectTask = {
  matchPercentage: number;
  id: number;
  title: string;
  budget: number;
  deadline: string;
  description: string;
  fullDescription?: string;
  clientRating: number;
  reviewsCount: number;
  clientName?: string;
  location?: string;
  skills: string[];
  isAiOptimized: boolean;
  duration?: string;
};

const MainTaskBrowser = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ProjectTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  type Filters = {
    projectType?: string[];
    skills?: string[];
    minRate?: string;
    maxRate?: string;
  };
  
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock task data - Fixed with all required properties
  const mockTasks: ProjectTask[] = [
    {
      matchPercentage: 95,
      id: 1,
      title: "Mobile App Redesign for Fitness App",
      budget: 1500,
      deadline: "6 weeks",
      description: "6 weeks Redesign the user interface for an existing fitness tracking app. Focus on improving navigation and making the app more intuitive for users of all fitness levels. Ensure the design aligns with the brand's modern and dynamic image.",
      fullDescription: "We are looking for a talented UI/UX designer to redesign our existing fitness tracking mobile application. The current app has over 50,000 active users but we've received feedback that the navigation is confusing and the interface feels outdated.\n\nThe project involves:\n- Complete UI overhaul while maintaining brand consistency\n- Improving user flow and navigation\n- Creating a more intuitive onboarding experience\n- Designing new features for social fitness tracking\n- Ensuring accessibility compliance\n\nWe need someone who understands fitness app users and can create an engaging, motivational interface that encourages daily use.",
      clientRating: 4.5,
      reviewsCount: 23,
      clientName: "FitTech Solutions",
      location: "San Francisco, CA",
      skills: ["UX Design", "UI Design", "Figma", "Mobile Design"],
      isAiOptimized: true,
      duration: "6 weeks"
    },
    {
      matchPercentage: 88,
      id: 2,
      title: "Mobile App Redesign for Fitness App",
      budget: 1500,
      deadline: "6 weeks",
      description: "6 weeks Redesign the user interface for an existing fitness tracking app. Focus on improving navigation and making the app more intuitive for users of all fitness levels. Ensure the design aligns with the brand's modern and dynamic image.",
      clientRating: 4.5,
      reviewsCount: 15,
      clientName: "FitTech Solutions",
      location: "San Francisco, CA",
      skills: ["UX Design", "React", "Mobile Development"],
      isAiOptimized: true,
      duration: "6 weeks"
    },
    {
      matchPercentage: 82,
      id: 3,
      title: "Mobile App Redesign for Fitness App",
      budget: 1500,
      deadline: "6 weeks", 
      description: "6 weeks Redesign the user interface for an existing fitness tracking app. Focus on improving navigation and making the app more intuitive for users of all fitness levels. Ensure the design aligns with the brand's modern and dynamic image.",
      clientRating: 4.5,
      reviewsCount: 8,
      clientName: "FitTech Solutions",
      location: "San Francisco, CA",
      skills: ["UX Design", "Figma", "Prototyping"],
      isAiOptimized: true,
      duration: "6 weeks"
    },
    {
      matchPercentage: 90,
      id: 4,
      title: "Mobile App Redesign for Fitness App",
      budget: 1500,
      deadline: "6 weeks",
      description: "6 weeks Redesign the user interface for an existing fitness tracking app. Focus on improving navigation and making the app more intuitive for users of all fitness levels. Ensure the design aligns with the brand's modern and dynamic image.",
      clientRating: 4.5,
      reviewsCount: 31,
      clientName: "FitTech Solutions",
      location: "San Francisco, CA",
      skills: ["UX Design", "React Native", "API Integration"],
      isAiOptimized: true,
      duration: "6 weeks"
    },
    {
      matchPercentage: 75,
      id: 5,
      title: "Mobile App Redesign for Fitness App",
      budget: 1500,
      deadline: "6 weeks",
      description: "6 weeks Redesign the user interface for an existing fitness tracking app. Focus on improving navigation and making the app more intuitive for users of all fitness levels. Ensure the design aligns with the brand's modern and dynamic image.",
      clientRating: 4.5,
      reviewsCount: 12,
      clientName: "FitTech Solutions",
      location: "San Francisco, CA",
      skills: ["UX Design", "User Research", "Wireframing"],
      isAiOptimized: false,
      duration: "6 weeks"
    }
  ];

  useEffect(() => {
    // Simulate loading tasks
    setIsLoading(true);
    setTimeout(() => {
      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = tasks;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply other filters
    if (filters.projectType && filters.projectType.length > 0) {
      // Filter by project type logic
    }

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(task =>
        filters.skills && filters.skills.some(skill => 
          task.skills.some(taskSkill => 
            taskSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (filters.minRate && filters.maxRate) {
      filtered = filtered.filter(task => 
        task.budget >= parseInt(filters.minRate ?? "0") && 
        task.budget <= parseInt(filters.maxRate ?? "0")
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filters, searchQuery]);

  const handleFiltersChange = (filterType: string, value: null) => {
    if (filterType === 'clear') {
      setFilters({});
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const handleSearch = (query: React.SetStateAction<string>, isAiMode: any) => {
    setSearchQuery(query);
    if (isAiMode) {
      // Simulate AI processing
      setIsLoading(true);
      setTimeout(() => {
        // AI would process and potentially reorder results
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSmartFilter = (suggestion: React.SetStateAction<string>) => {
    setSearchQuery(suggestion);
    setIsLoading(true);
    setTimeout(() => {
      // AI would apply smart filters based on the suggestion
      setIsLoading(false);
    }, 800);
  };

  const handleTaskClick = (task: ProjectTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Welcome Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Elini 👋
            </h1>
            <p className="text-gray-600">Let's discover some projects for you.</p>
          </div>

          {/* AI Search Component */}
          <AISearchComponent 
            onSearch={handleSearch}
            onSmartFilter={handleSmartFilter}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <FiltersSidebar 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {/* Tasks List */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Discovered Projects
              </h2>
              <div className="flex items-center space-x-4">
           
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>Sort job</option>
                  <option>Sort by Budget (High to Low)</option>
                  <option>Sort by Budget (Low to High)</option>
                  <option>Sort by Deadline</option>
                  <option>Sort by Client Rating</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mr-3"></div>
                  <span className="text-gray-600">Finding the best projects for you...</span>
                </div>
              </div>
            )}

            {/* Tasks Grid */}
            {!isLoading && (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onTaskClick={handleTaskClick}
                  />
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No projects match your criteria</div>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={() => handleFiltersChange('clear', null)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
        {/* Footer */}
        <Footer/>
       
   
    </div>
    
  );
};

export default MainTaskBrowser;