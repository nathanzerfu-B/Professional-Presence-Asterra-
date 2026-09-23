import React, { useState } from 'react';
import { getInsights } from '../data';
import {
  PageHeader,
  Badge,
  Button,
  PageSeo,
} from '../components';
import { BookOpen, ArrowRight, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InsightsListingPage: React.FC = () => {
  const allArticles = getInsights();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Engineering & Technical', 'Sustainability & ESG', 'Market Reports'];

  const filteredArticles = allArticles.filter((a) => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = allArticles[0];

  return (
    <div className="w-full">
      <PageSeo
        title="Knowledge Center & Engineering Insights"
        description="Authoritative technical research whitepapers, material performance evaluations, and ESG circularity studies from Asterra Group."
        ogType="website"
      />

      {/* 1. ARCHITECTURAL PAGE HEADER */}
      <PageHeader
        eyebrow="Knowledge & Technical Publications"
        title="Engineering Insights, Metallurgy & Industry Analysis."
        description="Authoritative research whitepapers, material performance studies, and circular industrial strategy reports authored by Asterra's engineering directorship."
        breadcrumbs={[{ label: 'Insights', href: '/insights' }]}
        theme="evergreen"
      />

      {/* 2. SEARCH & DISCIPLINE FILTER BAR */}
      <section className="bg-white border-b border-border py-4 sm:py-6">
        <div className="container-corporate space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search technical papers, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-ivory-canvas/60 border border-border text-xs text-charcoal-body placeholder-charcoal-muted/70 focus:outline-hidden focus:border-evergreen focus:bg-white transition-all font-mono min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal-body p-1"
                  aria-label="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Chips (Touch Scrollable on Mobile) */}
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border shrink-0 min-h-[44px] flex items-center justify-center ${
                      isActive
                        ? 'bg-evergreen text-white border-evergreen font-bold shadow-xs ring-2 ring-mineral-teal/30 scale-[1.02]'
                        : 'bg-ivory-canvas/70 text-charcoal-body border-border hover:border-evergreen active:scale-95'
                    }`}
                    aria-pressed={isActive}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-charcoal-muted pt-2 border-t border-border px-1">
            <span>● Showing {filteredArticles.length} Technical Publications</span>
            <span className="hidden sm:inline">Peer-reviewed operational monographs</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LEAD WHITEPAPER (When viewing All and no search) */}
      {selectedCategory === 'All' && searchQuery === '' && featuredArticle && (
        <section className="py-8 sm:py-12 bg-ivory-canvas border-b border-border">
          <div className="container-corporate space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-mineral-teal" />
              <span className="font-mono text-xs text-mineral-teal uppercase font-bold tracking-wider">
                Featured Lead Monograph
              </span>
            </div>

            <div className="bg-white border border-border p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-xs">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="mono">{featuredArticle.category}</Badge>
                  <span className="text-xs font-mono text-charcoal-muted">
                    {featuredArticle.readTimeMinutes} Min Read • Published {featuredArticle.publishedDate}
                  </span>
                </div>

                <Link to={`/insights/${featuredArticle.slug}`} className="block group">
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-evergreen group-hover:text-mineral-teal transition-colors">
                    {featuredArticle.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-charcoal-body leading-relaxed">
                  {featuredArticle.subtitle}
                </p>

                {/* Key Takeaways */}
                {featuredArticle.keyTakeaways && (
                  <div className="p-3.5 sm:p-4 bg-ivory-canvas border border-border space-y-1.5">
                    <span className="font-mono text-[10px] text-evergreen uppercase font-bold block">
                      Executive Engineering Takeaway:
                    </span>
                    <p className="text-xs text-charcoal-body leading-relaxed">
                      {featuredArticle.keyTakeaways[0]}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="font-bold text-evergreen block">{featuredArticle.author.name}</span>
                    <span className="text-charcoal-muted text-[11px]">{featuredArticle.author.role}</span>
                  </div>
                  <Button
                    to={`/insights/${featuredArticle.slug}`}
                    variant="primary"
                    size="sm"
                    className="w-full sm:w-auto justify-center"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                  >
                    Read Technical Report
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="aspect-[16/11] overflow-hidden border border-border bg-ivory-canvas">
                  <img
                    src={featuredArticle.heroImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. EDITORIAL PUBLICATION GRID */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white border-b border-border">
        <div className="container-corporate space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/insights/${article.slug}`}
                className="bg-ivory-canvas/40 border border-border flex flex-col justify-between group hover:border-evergreen hover:bg-white transition-all shadow-xs overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-ivory-canvas border-b border-border">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge-mono text-[9px] bg-evergreen text-white border-mineral-teal">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-charcoal-muted">
                      <span>{article.publishedDate}</span>
                      <span>•</span>
                      <span>{article.readTimeMinutes} min read</span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-evergreen group-hover:text-mineral-teal transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-charcoal-body line-clamp-2 leading-relaxed">
                      {article.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <div className="border-t border-border pt-3 flex items-center justify-between text-xs font-mono min-h-[32px]">
                    <span className="text-charcoal-muted text-[11px]">By {article.author.name}</span>
                    <span className="text-evergreen font-bold group-hover:text-mineral-teal uppercase tracking-wider text-[11px] flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="py-12 sm:py-16 text-center space-y-3 bg-ivory-canvas border border-border">
              <p className="font-serif text-base sm:text-lg text-evergreen font-bold">No research papers match your search.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="text-xs font-mono text-mineral-teal underline uppercase font-bold cursor-pointer py-2 min-h-[44px]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. NEWSLETTER / RESEARCH SUBSCRIPTION */}
      <section className="py-12 sm:py-16 bg-evergreen text-white border-b border-evergreen-hover">
        <div className="container-corporate flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-mineral-teal font-bold block">
              Quarterly Metallurgy & Infrastructure Review
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Subscribe to direct technical bulletins from our engineering desk.
            </h3>
          </div>
          <Button
            to="/contact"
            variant="white"
            size="md"
            className="w-full md:w-auto justify-center"
            rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Join Publications Desk
          </Button>
        </div>
      </section>
    </div>
  );
};
