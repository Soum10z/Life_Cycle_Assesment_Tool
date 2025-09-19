import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { LCAResponse } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: LCAResponse;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  // Generate comparison data for all routes
  const generateRouteComparisons = () => {
    const currentRoute = data.scenario.split(' ')[0];
    
    // Simulated data for different routes based on material type
    const routeData = {
      'Recycled': {
        carbonFootprint: data.material === 'Aluminium' ? 0.89 : 0.74,
        circularityScore: 92,
        resourceEfficiency: 90
      },
      'Both': {
        carbonFootprint: data.material === 'Aluminium' ? 8.64 : 2.58,
        circularityScore: 48,
        resourceEfficiency: 55
      },
      'Ore': {
        carbonFootprint: data.material === 'Aluminium' ? 16.90 : 4.84,
        circularityScore: 8,
        resourceEfficiency: 15
      }
    };

    return {
      current: currentRoute,
      routes: routeData
    };
  };

  const routeComparisons = generateRouteComparisons();

  // Carbon Footprint Pie Chart Data
  const carbonFootprintData = {
    labels: ['Recycled Route', 'Mixed Route (Both)', 'Virgin Route (Ore)'],
    datasets: [
      {
        label: 'Carbon Footprint (kg CO₂e)',
        data: [
          routeComparisons.routes.Recycled.carbonFootprint,
          routeComparisons.routes.Both.carbonFootprint,
          routeComparisons.routes.Ore.carbonFootprint
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Green for recycled
          'rgba(59, 130, 246, 0.8)',  // Blue for mixed
          'rgba(239, 68, 68, 0.8)'    // Red for virgin
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(239, 68, 68, 0.9)'
        ]
      }
    ]
  };

  // Circularity Score Pie Chart Data
  const circularityData = {
    labels: ['Recycled Route', 'Mixed Route (Both)', 'Virgin Route (Ore)'],
    datasets: [
      {
        label: 'Circularity Score',
        data: [
          routeComparisons.routes.Recycled.circularityScore,
          routeComparisons.routes.Both.circularityScore,
          routeComparisons.routes.Ore.circularityScore
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(239, 68, 68, 0.9)'
        ]
      }
    ]
  };

  // Resource Efficiency Pie Chart Data
  const resourceEfficiencyData = {
    labels: ['Recycled Route', 'Mixed Route (Both)', 'Virgin Route (Ore)'],
    datasets: [
      {
        label: 'Resource Efficiency (%)',
        data: [
          routeComparisons.routes.Recycled.resourceEfficiency,
          routeComparisons.routes.Both.resourceEfficiency,
          routeComparisons.routes.Ore.resourceEfficiency
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(239, 68, 68, 0.9)'
        ]
      }
    ]
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const dataset = context.dataset.label;
            
            if (dataset === 'Carbon Footprint (kg CO₂e)') {
              return `${label}: ${value.toFixed(2)} kg CO₂e`;
            } else if (dataset === 'Resource Efficiency (%)') {
              return `${label}: ${value}%`;
            } else {
              return `${label}: ${value}/100`;
            }
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000
    }
  };

  const getCurrentRouteIndicator = (routeName: string) => {
    return routeComparisons.current === routeName ? ' (Current)' : '';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Route Comparison Analysis</h3>
          <p className="text-slate-300">Comparative performance across all manufacturing routes</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-400 font-medium text-sm">
            Current: {routeComparisons.current} Route
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Carbon Footprint Pie Chart */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">
            Carbon Footprint Comparison
          </h4>
          <div className="h-64 relative">
            <Pie data={carbonFootprintData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-300">
              Current Route: <span className="text-blue-400 font-semibold">
                {data.environmentalImpacts.carbonFootprint.toFixed(2)} kg CO₂e
              </span>
            </p>
          </div>
        </div>

        {/* Circularity Score Pie Chart */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">
            Circularity Score Comparison
          </h4>
          <div className="h-64 relative">
            <Pie data={circularityData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-300">
              Current Route: <span className="text-blue-400 font-semibold">
                {Math.round(data.circularityMetrics.circularityScore * 100)}/100
              </span>
            </p>
          </div>
        </div>

        {/* Resource Efficiency Pie Chart */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-600/30">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">
            Resource Efficiency Comparison
          </h4>
          <div className="h-64 relative">
            <Pie data={resourceEfficiencyData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-300">
              Current Route: <span className="text-blue-400 font-semibold">
                {Math.round(data.circularityMetrics.resourceEfficiency * 100)}%
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Route Performance Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <h5 className="text-green-400 font-semibold">Recycled Route{getCurrentRouteIndicator('Recycled')}</h5>
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <p>Carbon: {routeComparisons.routes.Recycled.carbonFootprint.toFixed(2)} kg CO₂e</p>
            <p>Circularity: {routeComparisons.routes.Recycled.circularityScore}/100</p>
            <p>Efficiency: {routeComparisons.routes.Recycled.resourceEfficiency}%</p>
          </div>
        </div>

        <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full" />
            <h5 className="text-blue-400 font-semibold">Mixed Route{getCurrentRouteIndicator('Both')}</h5>
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <p>Carbon: {routeComparisons.routes.Both.carbonFootprint.toFixed(2)} kg CO₂e</p>
            <p>Circularity: {routeComparisons.routes.Both.circularityScore}/100</p>
            <p>Efficiency: {routeComparisons.routes.Both.resourceEfficiency}%</p>
          </div>
        </div>

        <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <h5 className="text-red-400 font-semibold">Virgin Route{getCurrentRouteIndicator('Ore')}</h5>
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <p>Carbon: {routeComparisons.routes.Ore.carbonFootprint.toFixed(2)} kg CO₂e</p>
            <p>Circularity: {routeComparisons.routes.Ore.circularityScore}/100</p>
            <p>Efficiency: {routeComparisons.routes.Ore.resourceEfficiency}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;