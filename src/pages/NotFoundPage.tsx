import React from 'react';
import {
  PageHeader,
  Heading,
  Text,
  Button,
  PageSeo,
} from '../components';
import { Home, Factory, FileText, Phone, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full">
      <PageSeo
        title="404 — Record Not Found"
        description="The requested page or document could not be located in our corporate directory."
        ogType="website"
      />
      <PageHeader
        eyebrow="404 // RESOURCE DIRECTORY NOT FOUND"
        title="The Requested Corporate Record Does Not Exist."
        description="The document, division specification, or case study you requested could not be located or may have been relocated during our infrastructure upgrade."
        breadcrumbs={[{ label: '404 Error' }]}
        theme="evergreen"
      />

      <section className="py-16 sm:py-20 lg:py-28 bg-ivory-canvas border-b border-border">
        <div className="container-corporate max-w-3xl text-center space-y-8">
          <div className="w-20 h-20 bg-white text-evergreen flex items-center justify-center mx-auto border-2 border-evergreen shadow-xs">
            <span className="font-mono font-bold text-2xl text-mineral-teal">404</span>
          </div>

          <div className="space-y-3">
            <Heading as="h2" font="serif" size="heading-lg" color="evergreen" className="text-xl sm:text-2xl">
              Navigate to Verified Operating Portals
            </Heading>
            <Text variant="body" color="body" className="text-xs sm:text-sm max-w-xl mx-auto">
              Please choose a verified corporate gateway below to return to active manufacturing specifications, case studies, or commercial tender desks:
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <Link
              to="/business"
              className="p-5 bg-white border border-border hover:border-evergreen transition-all space-y-2 block shadow-xs group"
            >
              <Factory className="w-6 h-6 text-mineral-teal group-hover:scale-110 transition-transform" />
              <div className="font-serif font-bold text-sm text-evergreen">Operating Divisions</div>
              <span className="text-[11px] text-charcoal-muted block">4 Plant Specifications &rarr;</span>
            </Link>

            <Link
              to="/projects"
              className="p-5 bg-white border border-border hover:border-evergreen transition-all space-y-2 block shadow-xs group"
            >
              <FileText className="w-6 h-6 text-mineral-teal group-hover:scale-110 transition-transform" />
              <div className="font-serif font-bold text-sm text-evergreen">Case Studies</div>
              <span className="text-[11px] text-charcoal-muted block">Delivered Contracts &rarr;</span>
            </Link>

            <Link
              to="/insights"
              className="p-5 bg-white border border-border hover:border-evergreen transition-all space-y-2 block shadow-xs group"
            >
              <BookOpen className="w-6 h-6 text-mineral-teal group-hover:scale-110 transition-transform" />
              <div className="font-serif font-bold text-sm text-evergreen">Technical Papers</div>
              <span className="text-[11px] text-charcoal-muted block">Applied Metallurgy &rarr;</span>
            </Link>

            <Link
              to="/contact"
              className="p-5 bg-white border border-border hover:border-evergreen transition-all space-y-2 block shadow-xs group"
            >
              <Phone className="w-6 h-6 text-mineral-teal group-hover:scale-110 transition-transform" />
              <div className="font-serif font-bold text-sm text-evergreen">Contact Desk</div>
              <span className="text-[11px] text-charcoal-muted block">Tenders & RFQs &rarr;</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to="/"
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4 mr-1" />}
              className="w-full sm:w-auto"
            >
              Return to Corporate Homepage
            </Button>
            <Button
              to="/contact"
              variant="secondary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              className="w-full sm:w-auto"
            >
              Report Broken Link to Desk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
