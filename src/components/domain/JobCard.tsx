import React from 'react';
import { Link } from 'react-router-dom';
import { JobOpportunity } from '../../types';
import { ArrowRight, MapPin, Briefcase, Calendar } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export interface JobCardProps {
  job: JobOpportunity;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ job, className = '' }) => {
  return (
    <div
      className={`card-corporate p-6 sm:p-8 border border-border bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-evergreen/40 transition-all duration-300 ${className}`}
    >
      <div className="space-y-3 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="mono">{job.department}</Badge>
          <span className="text-xs font-mono text-charcoal-muted">{job.division}</span>
        </div>

        <Heading as="h3" font="serif" size="heading-md" color="evergreen">
          {job.title}
        </Heading>

        <Text variant="sm" color="body" className="line-clamp-2">
          {job.summary}
        </Text>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-charcoal-muted pt-1">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-mineral-teal" />
            {job.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-mineral-teal" />
            {job.employmentType}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-mineral-teal" />
            Closes: {job.closingDate}
          </span>
        </div>
      </div>

      <div className="shrink-0 flex items-center">
        <Link
          to={`/careers/${job.slug}`}
          className="btn-secondary text-xs w-full sm:w-auto text-center"
        >
          View Position & Apply <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </div>
    </div>
  );
};
