import React from 'react';
import { Link } from 'react-router-dom';
import { BusinessUnit } from '../../types';
import { ArrowRight, CheckCircle2, Factory } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export interface BusinessUnitCardProps {
  unit: BusinessUnit;
  layout?: 'grid' | 'featured';
  className?: string;
}

export const BusinessUnitCard: React.FC<BusinessUnitCardProps> = ({
  unit,
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
          <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-ivory-canvas">
            <img
              src={unit.heroImage}
              alt={unit.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="division">{unit.divisionCode}</Badge>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <span className="font-mono text-xs text-charcoal-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-mineral-teal" />
                  {unit.facilityLocation}
                </span>
                <span className="font-mono text-xs font-semibold text-evergreen bg-evergreen-subtle px-2.5 py-0.5 border border-[#D1DCD8]">
                  Cap: {unit.annualCapacity}
                </span>
              </div>

              <Heading as="h3" font="serif" size="heading-lg" color="evergreen">
                {unit.name}
              </Heading>

              <Text variant="body" color="body">
                {unit.overview}
              </Text>

              <div className="pt-2">
                <h4 className="font-mono text-[11px] uppercase tracking-widest text-charcoal-muted font-bold mb-2">
                  Key Technical Capabilities:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-body">
                  {unit.capabilities.slice(0, 4).map((cap) => (
                    <li key={cap.id} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-mineral-teal shrink-0 mt-0.5" />
                      <span className="truncate">{cap.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-xs font-mono text-charcoal-muted">
                {unit.workforceCount}
              </span>
              <Link
                to={`/business/${unit.slug}`}
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-evergreen hover:text-mineral-teal transition-colors group-hover:translate-x-0.5"
              >
                Division Specs & Plant Tours <ArrowRight className="w-4 h-4 ml-1.5" />
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
            src={unit.heroImage}
            alt={unit.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="division">{unit.divisionCode}</Badge>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-mono font-semibold text-evergreen border border-border">
            {unit.annualCapacity}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal-muted block">
            {unit.facilitySizeSqM} Covered Facility
          </span>

          <Heading as="h3" font="serif" size="heading-md" color="evergreen">
            {unit.name}
          </Heading>

          <Text variant="sm" color="body" className="line-clamp-3">
            {unit.tagline}
          </Text>

          <div className="pt-2 border-t border-border">
            <ul className="space-y-1.5 text-xs text-charcoal-body">
              {unit.capabilities.slice(0, 3).map((cap) => (
                <li key={cap.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-mineral-teal shrink-0" />
                  <span className="truncate">{cap.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 mt-2">
        <Link
          to={`/business/${unit.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-evergreen hover:text-mineral-teal transition-colors"
        >
          Explore Division <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
};
