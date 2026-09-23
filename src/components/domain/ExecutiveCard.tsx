import React from 'react';
import { Link } from 'react-router-dom';
import { ExecutiveProfile } from '../../types';
import { ArrowRight, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export interface ExecutiveCardProps {
  executive: ExecutiveProfile;
  className?: string;
}

export const ExecutiveCard: React.FC<ExecutiveCardProps> = ({
  executive,
  className = '',
}) => {
  return (
    <div
      className={`card-corporate group overflow-hidden border border-border bg-white flex flex-col justify-between hover:border-evergreen/40 transition-all duration-300 ${className}`}
    >
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-canvas">
          <img
            src={executive.photo}
            alt={executive.name}
            className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="mono">{executive.department}</Badge>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono text-charcoal-muted border border-border">
            {executive.tenureYears} Yrs Tenure
          </div>
        </div>

        <div className="p-6 space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-mineral-teal block font-semibold">
            {executive.role}
          </span>

          <Heading as="h3" font="serif" size="heading-md" color="evergreen">
            {executive.name}
          </Heading>

          <Text variant="sm" color="body" className="line-clamp-3 leading-relaxed">
            {executive.bio}
          </Text>

          {executive.credentials.length > 0 && (
            <div className="pt-2 border-t border-border flex items-center gap-1.5 text-xs text-charcoal-muted truncate">
              <Award className="w-3.5 h-3.5 text-mineral-teal shrink-0" />
              <span className="truncate">{executive.credentials[0]}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 mt-2">
        <Link
          to={`/leadership/${executive.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-evergreen hover:text-mineral-teal transition-colors"
        >
          Executive Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
};
