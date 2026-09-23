import React from 'react';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { ArrowRight, Phone } from 'lucide-react';

export interface CTABannerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  phoneNumber?: string;
  theme?: 'evergreen' | 'ivory';
  className?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  eyebrow = 'Direct Corporate & Procurement Engagement',
  title = 'Ready to discuss structural specifications or high-volume procurement?',
  description = 'Our division engineering and sales directorships provide prompt feasibility reviews, technical drawings evaluations, and formal RFQ proposals.',
  primaryBtnText = 'Submit Corporate Inquiry',
  primaryBtnLink = '/contact',
  secondaryBtnText = 'Division Capabilities',
  secondaryBtnLink = '/business',
  phoneNumber = '+251 (0) 11 555 0199',
  theme = 'evergreen',
  className = '',
}) => {
  const isEvergreen = theme === 'evergreen';

  return (
    <section
      className={`py-16 lg:py-20 border-y ${
        isEvergreen
          ? 'bg-evergreen text-white border-evergreen-hover'
          : 'bg-white text-charcoal-body border-border'
      } ${className}`}
    >
      <div className="container-corporate">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.2em] font-semibold px-3 py-1 border ${
                isEvergreen
                  ? 'bg-evergreen-hover text-white border-mineral-teal/50'
                  : 'bg-evergreen-subtle text-evergreen border-border'
              }`}
            >
              {eyebrow}
            </span>
          </div>

          <Heading
            as="h2"
            font="serif"
            size="display-md"
            color={isEvergreen ? 'white' : 'evergreen'}
            className="leading-tight"
          >
            {title}
          </Heading>

          <Text
            variant="lead"
            color={isEvergreen ? 'border' : 'body'}
            className="max-w-2xl mx-auto"
          >
            {description}
          </Text>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to={primaryBtnLink}
              variant={isEvergreen ? 'white' : 'primary'}
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {primaryBtnText}
            </Button>

            {secondaryBtnLink && (
              <Button
                to={secondaryBtnLink}
                variant={isEvergreen ? 'secondary' : 'secondary'}
                size="lg"
                className={isEvergreen ? 'text-white border-white/40 hover:bg-white/10 hover:border-white' : ''}
              >
                {secondaryBtnText}
              </Button>
            )}
          </div>

          {phoneNumber && (
            <p
              className={`font-mono text-xs pt-4 flex items-center justify-center gap-2 ${
                isEvergreen ? 'text-border' : 'text-charcoal-muted'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-mineral-teal" />
              <span>Direct Inquiries Hotline: </span>
              <a
                href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                className={`font-semibold ${isEvergreen ? 'text-white hover:underline' : 'text-evergreen hover:underline'}`}
              >
                {phoneNumber}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
