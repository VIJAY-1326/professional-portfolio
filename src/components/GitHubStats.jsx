import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, GitBranch, Star, Users } from 'lucide-react';

export default function GitHubStats({ statsData }) {
  const statCards = [
    {
      id: 'repos',
      icon: FolderGit2,
      value: statsData?.repos || '24+',
      label: 'Repositories',
      accentColor: '#22D3EE', // Cyan
      borderColor: 'rgba(34, 211, 238, 0.4)',
      glowColor: 'rgba(34, 211, 238, 0.2)'
    },
    {
      id: 'commits',
      icon: GitBranch,
      value: statsData?.commits || '56+',
      label: 'Commits',
      accentColor: '#8B5CF6', // Violet
      borderColor: 'rgba(139, 92, 246, 0.4)',
      glowColor: 'rgba(139, 92, 246, 0.2)'
    },
    {
      id: 'stars',
      icon: Star,
      value: statsData?.stars || '120+',
      label: 'Stars',
      accentColor: '#F59E0B', // Gold / Amber
      borderColor: 'rgba(245, 158, 11, 0.4)',
      glowColor: 'rgba(245, 158, 11, 0.2)'
    },
    {
      id: 'contributions',
      icon: Users,
      value: statsData?.contributions || '18+',
      label: 'Contributions',
      accentColor: '#10B981', // Emerald
      borderColor: 'rgba(16, 185, 129, 0.4)',
      glowColor: 'rgba(16, 185, 129, 0.2)'
    }
  ];

  return (
    <div className="github-stats-row">
      {statCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.id}
            className="github-stat-pill"
            style={{
              borderColor: card.borderColor,
              boxShadow: `0 4px 20px -5px ${card.glowColor}`
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -3, scale: 1.02 }}
          >
            <div 
              className="stat-icon-wrap" 
              style={{ 
                color: card.accentColor, 
                backgroundColor: `${card.accentColor}18` 
              }}
            >
              <IconComponent size={15} />
            </div>

            <div className="stat-text-group">
              <span className="stat-number">{card.value}</span>
              <span className="stat-caption">{card.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
