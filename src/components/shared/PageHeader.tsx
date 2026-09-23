import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  theme?: 'evergreen' | 'ivory';
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  theme = 'evergreen',
  children,
  className = '',
}) => {
  const isEvergreen = theme === 'evergreen';

  return (
    <section
      className={`py-12 lg:py-20 border-b ${
        isEvergreen
          ? 'bg-evergreen text-white border-evergreen-hover'
          : 'bg-white text-charcoal-body border-border'
      } ${className}`}
    >
      <div className="container-corporate space-y-6">
        {breadcrumbs && (
          <Breadcrumbs
            items={breadcrumbs}
            theme={isEvergreen ? 'dark' : 'light'}
            className="mb-2"
          />
        )}

        <div className="max-w-4xl space-y-4">
          {eyebrow && (
            <Badge
              variant={isEvergreen ? 'dark' : 'mono'}
              className="mb-2"
            >
              {eyebrow}
            </Badge>
          )}

          <Heading
            as="h1"
            font="serif"
            size="display-lg"
            color={isEvergreen ? 'white' : 'evergreen'}
            className="leading-tight text-balance"
          >
            {title}
          </Heading>

          {description && (
            <Text
              variant="lead"
              color={isEvergreen ? 'border' : 'body'}
              className="text-reading"
            >
              {description}
            </Text>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};
