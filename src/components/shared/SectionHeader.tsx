import React from 'react';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLink?: {
    label: string;
    href: string;
  };
  alignment?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actionLink,
  alignment = 'left',
  theme = 'light',
  className = '',
}) => {
  const isCenter = alignment === 'center';
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center max-w-3xl mx-auto' : 'items-start text-left'
      } ${className}`}
    >
      {eyebrow && (
        <Badge
          variant={isDark ? 'dark' : 'mono'}
          className="mb-4"
        >
          {eyebrow}
        </Badge>
      )}

      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className={isCenter ? 'w-full' : 'max-w-3xl'}>
          <Heading
            as="h2"
            font="serif"
            size="display-md"
            color={isDark ? 'white' : 'evergreen'}
            className="mb-4"
          >
            {title}
          </Heading>

          {description && (
            <Text
              variant="lead"
              color={isDark ? 'border' : 'body'}
              className="text-reading"
            >
              {description}
            </Text>
          )}
        </div>

        {!isCenter && actionLink && (
          <div className="shrink-0 mt-2 md:mt-0">
            <Link
              to={actionLink.href}
              className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider transition-colors group ${
                isDark ? 'text-white hover:text-mineral-teal' : 'text-evergreen hover:text-mineral-teal'
              }`}
            >
              <span>{actionLink.label}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
