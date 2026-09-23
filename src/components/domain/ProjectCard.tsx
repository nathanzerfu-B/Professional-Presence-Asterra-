import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectCaseStudy } from '../../types';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export interface ProjectCardProps {
  project: ProjectCaseStudy;
  layout?: 'grid' | 'featured';
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  layout = 'grid',
  className = '',
}) => {
  const isFeatured = layout === 'featured';

  if (isFeatured) {
    return (
      <div
        className={`card-corporate group overflow-hidden border border-border bg-white hover:border-evergreen/40 transition-all duration-300 ${className}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-ivory-canvas">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="mono">{project.sector}</Badge>
              {project.isFlagship && (
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 bg-evergreen text-white">
                  Flagship Delivery
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-mono text-charcoal-muted border-b border-border pb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-mineral-teal" />
                  {project.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-mineral-teal" />
                  {project.year}
                </span>
              </div>

              <Heading as="h3" font="serif" size="heading-lg" color="evergreen">
                {project.title}
              </Heading>

              <Text variant="body" color="body">
                {project.subtitle}
              </Text>

              {/* Key Results Band */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                {project.results.slice(0, 2).map((res, i) => (
                  <div key={i} className="border-l-2 border-mineral-teal pl-3 py-0.5">
                    <div className="font-serif font-bold text-xl text-evergreen">{res.metric}</div>
                    <span className="font-mono text-[10px] uppercase text-charcoal-muted block">{res.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs text-charcoal-body font-mono">Client: {project.client}</span>
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-evergreen hover:text-mineral-teal transition-colors"
              >
                Read Case Study <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card-corporate group overflow-hidden border border-border bg-white flex flex-col justify-between hover:border-evergreen/40 transition-all duration-300 ${className}`}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-ivory-canvas">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="mono">{project.sector}</Badge>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-muted">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-mineral-teal" />
              {project.location}
            </span>
            <span>{project.year}</span>
          </div>

          <Heading as="h3" font="serif" size="heading-md" color="evergreen">
            {project.title}
          </Heading>

          <Text variant="sm" color="body" className="line-clamp-2">
            {project.subtitle}
          </Text>

          {project.results.length > 0 && (
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs font-mono text-charcoal-muted">{project.results[0].label}:</span>
              <span className="font-serif font-bold text-sm text-evergreen">{project.results[0].metric}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 mt-2">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-evergreen hover:text-mineral-teal transition-colors"
        >
          View Impact Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
};
