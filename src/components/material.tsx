import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const CeramicMaterialsDashboard = () => {
  // 材料数据
  const materials = {
    'ZrO2': {
      name: 'ZrO2 (氧化锆)',
      fractureToughness: 6.5,
      hardness: 9,
      density: 6.0,
      thermalConductivity: 2,
      thermalExpansion: 10,
      heatCapacity: 5,
      resistivity: 8,
      dielectricConstant: 6,
      dielectricStrength: 7,
      corrosionResistance: 9,
      applications: '制造陶瓷刀具'
    },
    'Si3N4': {
      name: 'Si3N4 (氮化硅)',
      fractureToughness: 5.5,
      hardness: 8,
      density: 3.2,
      thermalConductivity: 8,
      thermalExpansion: 3,
      heatCapacity: 6,
      resistivity: 9,
      dielectricConstant: 8,
      dielectricStrength: 8,
      corrosionResistance: 8,
      applications: '高温工具及优异断裂韧性耐腐蚀冲击性'
    },
    'SiC': {
      name: 'SiC (碳化硅)',
      fractureToughness: 4.5,
      hardness: 9.5,
      density: 3.1,
      thermalConductivity: 9,
      thermalExpansion: 4,
      heatCapacity: 7,
      resistivity: 3,
      dielectricConstant: 9,
      dielectricStrength: 9,
      corrosionResistance: 9,
      applications: '耐腐蚀性强，耐热性优异的轻质材'
    },
    'Al2O3': {
      name: 'Al2O3 (氧化铝)',
      fractureToughness: 3.5,
      hardness: 7,
      density: 3.9,
      thermalConductivity: 6,
      thermalExpansion: 8,
      heatCapacity: 8,
      resistivity: 10,
      dielectricConstant: 7,
      dielectricStrength: 6,
      corrosionResistance: 7,
      applications: '使用最广泛的陶瓷材料'
    }
  };

  // 属性配置
  const propertyConfig = {
    mechanical: {
      title: '机械特性',
      properties: ['fractureToughness', 'hardness', 'density'],
      labels: ['断裂韧性', '硬度(耐磨性)', '比重(密度)'],
      chartTitle: '机械性能对比',
      colors: ['#3498db', '#e74c3c', '#f39c12']
    },
    thermal: {
      title: '热学性能',
      properties: ['thermalConductivity', 'thermalExpansion', 'heatCapacity'],
      labels: ['导热系数', '热膨胀系数', '热容'],
      chartTitle: '热学性能对比',
      colors: ['#e67e22', '#d35400', '#c0392b']
    },
    electrical: {
      title: '电学特性',
      properties: ['resistivity', 'dielectricConstant', 'dielectricStrength'],
      labels: ['体积电阻', '介电常数', '介电强度'],
      chartTitle: '电学性能对比',
      colors: ['#9b59b6', '#8e44ad', '#673ab7']
    },
    chemical: {
      title: '化学性能',
      properties: ['corrosionResistance'],
      labels: ['耐酸性'],
      chartTitle: '化学性能对比',
      colors: ['#27ae60']
    },
    overview: {
      title: '综合对比',
      properties: ['fractureToughness', 'hardness', 'thermalConductivity', 'resistivity'],
      labels: ['断裂韧性', '硬度', '导热系数', '电阻率'],
      chartTitle: '综合性能对比',
      colors: ['#3498db', '#e74c3c', '#f39c12', '#9b59b6']
    }
  };

  const [currentTab, setCurrentTab] = useState('mechanical');

  // 生成柱状图数据
  const generateBarData = () => {
    const config = propertyConfig[currentTab];
    return Object.keys(materials).map(key => {
      const material = materials[key];
      const dataPoint = { name: key };
      config.properties.forEach((prop, index) => {
        dataPoint[config.labels[index]] = material[prop] || 0;
      });
      return dataPoint;
    });
  };

  // 生成雷达图数据
  const generateRadarData = () => {
    const config = propertyConfig[currentTab];
    return config.labels.map((label, index) => {
      const dataPoint = { property: label };
      Object.keys(materials).forEach(key => {
        const material = materials[key];
        dataPoint[key] = material[config.properties[index]] || 0;
      });
      return dataPoint;
    });
  };

  // 生成摘要数据
  const generateSummaryData = () => {
    const config = propertyConfig[currentTab];
    return config.properties.map((prop, index) => {
      const values = Object.values(materials).map(mat => mat[prop] || 0);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
      
      return {
        label: config.labels[index],
        avg,
        min,
        max,
        range: `${min}-${max}`
      };
    });
  };

  // 获取数值对应的样式类
  const getValueClass = (value) => {
    if (value >= 7) return 'text-green-600 font-semibold';
    if (value >= 5) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const tabButtons = [
    { key: 'mechanical', label: '机械特性' },
    { key: 'thermal', label: '热学性能' },
    { key: 'electrical', label: '电学特性' },
    { key: 'chemical', label: '化学性能' },
    { key: 'overview', label: '综合对比' }
  ];

  const barData = generateBarData();
  const radarData = generateRadarData();
  const summaryData = generateSummaryData();
  const config = propertyConfig[currentTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700 p-5">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-3">陶瓷材料性能数据分析</h1>
          <p className="text-lg text-gray-600">交互式材料属性对比与可视化平台</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-2 shadow-inner">
            {tabButtons.map(tab => (
              <button
                key={tab.key}
                onClick={() => setCurrentTab(tab.key)}
                className={`px-6 py-3 mx-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentTab === tab.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform -translate-y-0.5'
                    : 'text-gray-600 hover:bg-gray-200 hover:transform hover:-translate-y-0.5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((summary, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
              <h3 className="text-gray-800 mb-3 font-medium">{summary.label}</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {summary.avg}
              </div>
              <small className="text-gray-500">平均值 ({summary.range})</small>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{config.chartTitle}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '10px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
                  }}
                />
                <Legend />
                {config.labels.map((label, index) => (
                  <Bar 
                    key={label}
                    dataKey={label} 
                    fill={config.colors[index]}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{config.title} - 雷达图</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis 
                  dataKey="property" 
                  tick={{ fontSize: 11, fill: '#666' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 10]} 
                  tick={{ fontSize: 10, fill: '#999' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '10px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
                  }}
                />
                <Legend />
                {Object.keys(materials).map((key, index) => {
                  const hue = index * 90;
                  return (
                    <Radar
                      key={key}
                      name={key}
                      dataKey={key}
                      stroke={`hsl(${hue}, 70%, 50%)`}
                      fill={`hsla(${hue}, 70%, 60%, 0.3)`}
                      strokeWidth={2}
                    />
                  );
                })}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{config.title} - 详细数据</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <th className="px-4 py-4 text-left rounded-l-lg font-semibold">材料名称</th>
                  {config.labels.map(label => (
                    <th key={label} className="px-4 py-4 text-center font-semibold">{label}</th>
                  ))}
                  <th className="px-4 py-4 text-center rounded-r-lg font-semibold">应用特点</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(materials).map(([key, material], index) => (
                  <tr 
                    key={key}
                    className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:transform hover:scale-[1.01]"
                  >
                    <td className="px-4 py-4 font-semibold text-gray-800">{material.name}</td>
                    {config.properties.map(prop => {
                      const value = material[prop] || 0;
                      return (
                        <td key={prop} className={`px-4 py-4 text-center ${getValueClass(value)}`}>
                          {value}
                        </td>
                      );
                    })}
                    <td className="px-4 py-4 text-center text-gray-700">{material.applications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeramicMaterialsDashboard;