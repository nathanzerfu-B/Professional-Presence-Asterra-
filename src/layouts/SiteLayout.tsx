import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp, Phone, ArrowRight, Layers, FileText, Users, BookOpen, Briefcase, Info } from 'lucide-react';
import { businessUnits, company } from '../data';

const NAV_LINKS = [
  { label: 'About Us', href: '/about', index: '01', icon: Info },
  { label: 'Operating Divisions', href: '/business', index: '02', icon: Layers, hasDropdown: true },
  { label: 'Case Studies', href: '/projects', index: '03', icon: FileText },
  { label: 'Leadership', href: '/leadership', index: '04', icon: Users },
  { label: 'Insights & Research', href: '/insights', index: '05', icon: BookOpen },
  { label: 'Careers & Academy', href: '/careers', index: '06', icon: Briefcase },
];

export const SiteLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close mobile menu & dropdown on route change, scroll to top
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track window scroll for Back-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-canvas text-charcoal-body font-sans relative">
      {/* 0. WCAG ACCESSIBLE SKIP LINK */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-evergreen focus:text-white focus:border-2 focus:border-mineral-teal focus:font-mono focus:text-xs focus:shadow-lg"
      >
        Skip to main content &rarr;
      </a>

      {/* 1. TOP UTILITY BAR (Tablet & Desktop) */}
      <div className="bg-evergreen text-border text-[11px] font-mono border-b border-evergreen-hover py-2 hidden md:block">
        <div className="container-corporate flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="font-bold text-white tracking-wide">ASTERRA MANUFACTURING GROUP S.C.</span>
            <span>•</span>
            <span className="text-mineral-teal">EN 1090-2 EXC3 // ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-border/80">Industrial Zone 4, Addis Ababa</span>
            <span>•</span>
            <a
              href={`tel:${company.contact.phonePrimary.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors font-bold text-white flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-mineral-teal" />
              <span>{company.contact.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-border shadow-sm">
        <div className="container-corporate flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Asterra Home">
            <div className="w-10 h-10 bg-evergreen text-white flex items-center justify-center font-serif font-bold text-xl border-2 border-evergreen group-hover:bg-evergreen-hover transition-colors shadow-xs">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg text-evergreen tracking-tight leading-none">
                ASTERRA
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-charcoal-muted mt-0.5 font-bold">
                Manufacturing Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `text-xs font-semibold uppercase tracking-[0.1em] transition-colors py-2 flex items-center gap-1 min-h-[44px] ${
                          isActive || location.pathname.startsWith('/business')
                            ? 'text-evergreen font-bold border-b-2 border-evergreen'
                            : 'text-charcoal-body hover:text-evergreen'
                        }`
                      }
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </NavLink>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white border border-border shadow-xl py-2 mt-1 z-50 animate-fadeIn">
                        <div className="px-4 py-2 border-b border-border/60 bg-ivory-canvas/60">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal-muted font-bold">
                            Operating Divisions Directory
                          </span>
                        </div>
                        {businessUnits.map((u) => (
                          <Link
                            key={u.slug}
                            to={`/business/${u.slug}`}
                            className="block px-4 py-2.5 hover:bg-ivory-canvas transition-colors border-b border-border/30 last:border-0"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-mineral-teal uppercase">
                                {u.divisionCode}
                              </span>
                              <span className="font-serif font-bold text-xs text-evergreen">
                                {u.name.split('—')[1] || u.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-charcoal-muted line-clamp-1 mt-0.5">
                              {u.tagline}
                            </p>
                          </Link>
                        ))}
                        <div className="p-2 border-t border-border bg-ivory-canvas/30 text-center">
                          <Link
                            to="/business"
                            className="font-mono text-[10px] uppercase tracking-wider text-evergreen font-bold hover:underline inline-flex items-center gap-1"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span>Explore All 4 Plant Blueprints</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-xs font-semibold uppercase tracking-[0.1em] transition-colors py-2 relative min-h-[44px] flex items-center ${
                      isActive
                        ? 'text-evergreen font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-evergreen'
                        : 'text-charcoal-body hover:text-evergreen'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Header Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact" className="btn-primary text-xs py-2.5 px-4 shadow-sm">
              Submit Corporate RFQ
            </Link>
          </div>

          {/* High-Contrast Mobile & Tablet Hamburger Bar */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/contact"
              className="text-[11px] font-mono font-bold uppercase tracking-wider bg-ivory-canvas text-evergreen px-3 py-2 border-2 border-evergreen hover:bg-evergreen hover:text-white transition-all min-h-[44px] flex items-center"
            >
              RFQ Desk
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`min-h-[44px] px-3.5 py-2 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 border-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                mobileMenuOpen
                  ? 'bg-mineral-teal text-white border-mineral-teal'
                  : 'bg-evergreen text-white border-evergreen hover:bg-evergreen-hover'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-5 h-5 text-white shrink-0" />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 text-white shrink-0" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. FULL-SCREEN HIGH-CONTRAST MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-evergreen text-white flex flex-col justify-between overflow-y-auto lg:hidden animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="sticky top-0 z-10 bg-evergreen-active border-b-2 border-mineral-teal/40 px-5 py-4 flex items-center justify-between shadow-md">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white text-evergreen flex items-center justify-center font-serif font-bold text-lg">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base text-white tracking-tight leading-none">
                  ASTERRA GROUP
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-mineral-teal font-semibold">
                  Navigation Directory
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 bg-white text-evergreen font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white hover:bg-mineral-teal hover:text-white transition-colors cursor-pointer min-h-[40px]"
              aria-label="Close Navigation Drawer"
            >
              <X className="w-4 h-4" />
              <span>CLOSE</span>
            </button>
          </div>

          <div className="p-5 sm:p-8 space-y-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-border/80 border-b border-white/15 pb-3">
              <span className="text-mineral-teal uppercase font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-mineral-teal animate-pulse" />
                <span>Select Corporate Destination</span>
              </span>
              <span>6 Modules</span>
            </div>

            <nav className="space-y-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-4 border-2 flex items-center justify-between transition-all min-h-[52px] ${
                    isActive
                      ? 'bg-mineral-teal text-white border-mineral-teal font-bold shadow-md'
                      : 'bg-white/5 text-white border-white/15 hover:bg-white/10 hover:border-white/30'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-mineral-teal font-bold px-1.5 py-0.5 bg-black/30">
                    //00
                  </span>
                  <span className="font-serif text-base font-bold">Home Overview</span>
                </div>
                {location.pathname === '/' ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-evergreen font-bold">
                    CURRENT
                  </span>
                ) : (
                  <ArrowRight className="w-4 h-4 opacity-70" />
                )}
              </NavLink>

              {NAV_LINKS.map((link) => {
                const isActive = location.pathname.startsWith(link.href);
                const IconComponent = link.icon;

                return (
                  <div key={link.href} className="space-y-1">
                    <div
                      className={`border-2 flex items-stretch justify-between transition-all ${
                        isActive
                          ? 'bg-mineral-teal/20 border-mineral-teal shadow-sm'
                          : 'bg-white/5 border-white/15 hover:bg-white/10'
                      }`}
                    >
                      <NavLink
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-4 flex-1 flex items-center justify-between min-h-[52px]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-mineral-teal font-bold px-1.5 py-0.5 bg-black/30">
                            //{link.index}
                          </span>
                          <IconComponent className="w-4 h-4 text-mineral-teal shrink-0" />
                          <span className={`font-serif text-base ${isActive ? 'font-bold text-white' : 'text-border'}`}>
                            {link.label}
                          </span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-mineral-teal text-white font-bold mr-2">
                            ACTIVE
                          </span>
                        )}
                      </NavLink>

                      {link.hasDropdown && (
                        <button
                          type="button"
                          onClick={() => setMobileDivisionsOpen(!mobileDivisionsOpen)}
                          className="px-4 border-l border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center cursor-pointer text-white"
                          aria-label="Toggle Operating Divisions Submenu"
                          aria-expanded={mobileDivisionsOpen}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 text-mineral-teal ${
                              mobileDivisionsOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {link.hasDropdown && mobileDivisionsOpen && (
                      <div className="pl-3 pr-1 py-2 space-y-1.5 border-l-2 border-mineral-teal ml-4 animate-fadeIn">
                        <div className="text-[10px] font-mono text-mineral-teal font-bold uppercase tracking-wider px-2 py-0.5">
                          Four Operating Plant Blueprints:
                        </div>
                        {businessUnits.map((u) => (
                          <Link
                            key={u.slug}
                            to={`/business/${u.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-xs font-mono text-white flex items-center justify-between min-h-[44px]"
                          >
                            <span className="font-bold text-mineral-teal">{u.divisionCode}</span>
                            <span className="truncate ml-2 text-white font-sans text-xs font-medium">
                              {u.name.split('—')[1] || u.name}
                            </span>
                            <ArrowRight className="w-3 h-3 text-border/60 shrink-0 ml-1" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="p-5 sm:p-8 bg-evergreen-active border-t-2 border-mineral-teal/40 space-y-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full p-3.5 bg-mineral-teal text-white border-2 border-mineral-teal font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-mineral-teal/90 transition-all min-h-[48px]"
            >
              <span>Submit Commercial RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${company.contact.phonePrimary.replace(/\s+/g, '')}`}
              className="w-full p-3 bg-white/10 text-white border border-white/20 hover:bg-white/20 font-mono text-xs flex items-center justify-center gap-2 min-h-[44px] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-mineral-teal" />
              <span>Direct Dispatch: {company.contact.phonePrimary}</span>
            </a>
          </div>
        </div>
      )}

      {/* 4. PAGE OUTLET WITH MAIN ANCHOR */}
      <main id="main-content" className="flex-1 focus:outline-hidden" tabIndex={-1}>
        <Outlet />
      </main>

      {/* 5. FLOATING BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-evergreen text-white border-2 border-mineral-teal shadow-xl hover:bg-evergreen-hover active:scale-95 transition-all animate-fadeIn flex items-center justify-center cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="Scroll back to top of page"
          title="Back to top"
        >
          <ChevronUp className="w-5 h-5 text-mineral-teal" />
        </button>
      )}

      {/* 6. FOOTER */}
      <footer className="bg-evergreen-active text-white border-t border-evergreen-hover pt-16 pb-12">
        <div className="container-corporate space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Column 1: Brand & Charter */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white text-evergreen flex items-center justify-center font-serif font-bold text-xl">
                  A
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-white">
                    ASTERRA
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-mineral-teal">
                    Manufacturing Group S.C.
                  </div>
                </div>
              </div>

              <p className="text-xs text-border/85 leading-relaxed">
                East Africa’s premier diversified industrial manufacturing group. Operating 4 synchronized production facilities across 68,000 m² of covered plant infrastructure.
              </p>

              <div className="pt-2 text-xs font-mono text-border/70 space-y-1">
                <div>Share Company Reg. No. 09-412</div>
                <div>Industrial Zone 4, Addis Ababa, Ethiopia</div>
              </div>
            </div>

            {/* Column 2: Operating Divisions */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-mineral-teal">
                Operating Divisions
              </h4>
              <ul className="space-y-2 text-xs text-border/85">
                {businessUnits.map((unit) => (
                  <li key={unit.slug}>
                    <Link
                      to={`/business/${unit.slug}`}
                      className="hover:text-mineral-teal transition-colors flex items-center gap-1.5 py-1"
                    >
                      <span className="font-mono text-[10px] text-mineral-teal font-bold">{unit.divisionCode}</span>
                      <span>{unit.name.split('—')[1] || unit.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Corporate Modules */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-mineral-teal">
                Directorship Portals
              </h4>
              <ul className="space-y-2 text-xs text-border/85">
                <li><Link to="/about" className="hover:text-mineral-teal transition-colors py-1 block">Corporate Story</Link></li>
                <li><Link to="/projects" className="hover:text-mineral-teal transition-colors py-1 block">Case Studies Archive</Link></li>
                <li><Link to="/leadership" className="hover:text-mineral-teal transition-colors py-1 block">Governance & Board</Link></li>
                <li><Link to="/insights" className="hover:text-mineral-teal transition-colors py-1 block">Applied Metallurgy</Link></li>
                <li><Link to="/careers" className="hover:text-mineral-teal transition-colors py-1 block">Apprenticeship Academy</Link></li>
                <li><Link to="/contact" className="hover:text-mineral-teal transition-colors py-1 block">Commercial Tender Desk</Link></li>
              </ul>
            </div>

            {/* Column 4: Quality & Dispatch Desks */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-mineral-teal">
                Compliance & Direct Desks
              </h4>
              <div className="space-y-2 text-xs text-border/85 font-mono">
                <div>
                  <span className="text-border/60 block text-[10px]">TENDER ESTIMATION:</span>
                  <a href={`mailto:${company.contact.procurementEmail}`} className="text-white hover:underline">
                    {company.contact.procurementEmail}
                  </a>
                </div>
                <div>
                  <span className="text-border/60 block text-[10px]">EXECUTIVE DESK:</span>
                  <a href={`mailto:${company.contact.generalEmail}`} className="text-white hover:underline">
                    {company.contact.generalEmail}
                  </a>
                </div>
                <div>
                  <span className="text-border/60 block text-[10px]">DISPATCH TELEPHONE:</span>
                  <a href={`tel:${company.contact.phonePrimary.replace(/\s+/g, '')}`} className="text-white font-bold hover:underline">
                    {company.contact.phonePrimary}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hairline */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-border/60">
            <div>
              &copy; {new Date().getFullYear()} Asterra Manufacturing Group S.C. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors py-1">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-white transition-colors py-1">Terms of RFQ</Link>
              <span>•</span>
              <span>ISO 9001:2015 & EN 1090-2</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
