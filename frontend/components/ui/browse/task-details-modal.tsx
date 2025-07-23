"use client";
import React from 'react';
import { X, Star, Clock, DollarSign, MapPin, User, Calendar, ArrowLeft } from 'lucide-react';

interface Task {
  title: string;
  budget: number;
  deadline: string;
  duration?: string;
  fullDescription?: string;
  description?: string;
  skills?: string[];
  clientName?: string;
  clientRating: number;
  reviewsCount?: number;
  location?: string;
}

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, isOpen, onClose }) => {
  if (!isOpen || !task) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatBudget = (budget: number) => {
    if (budget >= 1000) {
      return `$${(budget / 1000).toFixed(0)}k`;
    }
    return `$${budget}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{task.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              Active
            </span>
            <span className="text-sm text-gray-500">Posted 2 days ago</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left Column - Existing Bid */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Existing Bid</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 mb-2">Bid for Mobile App Redesign for Fitness App</p>
                    <p className="text-gray-600 mb-3">Dear FitTech Solutions,</p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      I am excited about the opportunity to redesign your fitness app. With my experience in UX/UI design and mobile optimization, I'm confident in delivering a seamless and intuitive app for your users.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Why I'm a Great Fit:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li>• Fitness & Health Experience: I've worked on fitness apps, optimizing user journeys for better engagement.</li>
                          <li>• Design Tools Proficiency: Skilled in Figma, Sketch, and Adobe XD, with a portfolio showcasing high-quality designs.</li>
                          <li>• Mobile Optimization: Experienced in optimizing apps for iOS and Android.</li>
                          <li>• Usability Testing: I conduct usability tests and iterate designs based on user feedback.</li>
                          <li>• Brand Consistency: I ensure designs align with the brand's identity and maintain consistency.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Project Understanding:</p>
                        <p className="text-sm text-gray-700 mb-3">
                          I'll redesign key screens, enhance navigation, and ensure a user-friendly experience aligned with your brand.
                        </p>
                        
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Timeline & Budget:</p>
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            <li>• Phase 1: Research & Planning - Week 1-2</li>
                            <li>• Phase 2: Design & Prototyping - Week 3-4</li>
                            <li>Budget: $1,500 - $1,800</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mt-4">
                      Looking forward to collaborating!<br />
                      Best,<br />
                      [Your Name]<br />
                      [Contact Info]<br />
                      [Portfolio Link]
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tailor my bid with AI */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tailor my bid with AI</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 mb-2">Bid for Mobile App Redesign for Fitness App</p>
                    <p className="text-gray-600 mb-3">Dear FitTech Solutions,</p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      I am excited about the opportunity to redesign your fitness app. With my experience in UX/UI design and mobile optimization, I'm confident in delivering a seamless and intuitive app for your users.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Why I'm a Great Fit:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li>• Fitness & Health Experience: I've worked on fitness apps, optimizing user journeys for better engagement.</li>
                          <li>• Design Tools Proficiency: Skilled in Figma, Sketch, and Adobe XD, with a portfolio showcasing high-quality designs.</li>
                          <li>• Mobile Optimization: Experienced in optimizing apps for iOS and Android.</li>
                          <li>• Usability Testing: I conduct usability tests and iterate designs based on user feedback.</li>
                          <li>• Brand Consistency: I ensure designs align with the brand's identity and maintain consistency.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Project Understanding:</p>
                        <p className="text-sm text-gray-700 mb-3">
                          I'll redesign key screens, enhance navigation, and ensure a user-friendly experience aligned with your brand.
                        </p>
                        
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Timeline & Budget:</p>
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            <li>• Phase 1: Research & Planning - Week 1-2</li>
                            <li>• Phase 2: Design & Prototyping - Week 3-4</li>
                            <li>Budget: $1,500 - $1,800</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mt-4">
                      Looking forward to collaborating!<br />
                      Best,<br />
                      [Your Name]<br />
                      [Contact Info]<br />
                      [Portfolio Link]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="border-t border-gray-100 p-6 bg-white">
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-white border border-purple-300 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                Download
              </button>
              <button className="px-8 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;