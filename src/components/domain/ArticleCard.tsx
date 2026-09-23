import React from 'react';
import { Link } from 'react-router-dom';
import { InsightArticle } from '../../types';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export interface ArticleCardProps {
  article: InsightArticle;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  className = '',
}) => {
  return (
    <article
      className={`card-corporate group overflow-hidden border border-border bg-white flex flex-col justify-between hover:border-evergreen/40 transition-all duration-300 ${className}`}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-ivory-canvas">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="mono">{article.category}</Badge>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-mineral-teal" />
              {article.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-mineral-teal" />
              {article.readTimeMinutes} Min Read
            </span>
          </div>

          <Heading as="h3" font="serif" size="heading-md" color="evergreen" className="group-hover:text-mineral-teal transition-colors">
            {article.title}
          </Heading>

          <Text variant="sm" color="body" className="line-clamp-3 leading-relaxed">
            {article.summary}
          </Text>
        </div>
      </div>

      <div className="p-6 pt-0 mt-2 border-t border-border/60 flex items-center justify-between">
        <span className="text-xs text-charcoal-muted truncate">By {article.author.name}</span>
        <Link
          to={`/insights/${article.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-evergreen hover:text-mineral-teal transition-colors shrink-0 ml-2"
        >
          Read Paper <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </article>
  );
};
