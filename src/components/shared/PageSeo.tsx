import React, { useEffect } from 'react';
import { SeoMetadata } from '../../types';

export interface PageSeoProps extends SeoMetadata {
  schemaType?: 'Corporation' | 'Article' | 'JobPosting' | 'WebPage';
}

export const PageSeo: React.FC<PageSeoProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/images/divisions/div01-hero.jpg',
  ogType = 'website',
  schemaJsonLd,
}) => {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = `${title} | Asterra Manufacturing Group`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update OpenGraph Tags
    const updateOg = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOg('og:title', fullTitle);
    updateOg('og:description', description);
    updateOg('og:image', ogImage);
    updateOg('og:type', ogType);

    // 4. Update Canonical
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // 5. Injected JSON-LD Schema
    const scriptId = 'page-json-ld';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const defaultCorpSchema = {
      '@context': 'https://schema.org',
      '@type': 'Corporation',
      name: 'Asterra Manufacturing Group',
      legalName: 'Asterra Industrial Manufacturing Share Company',
      url: window.location.origin,
      logo: `${window.location.origin}/logo.png`,
      foundingDate: '1998',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bole Sub-City, Industrial Zone 4',
        addressLocality: 'Addis Ababa',
        addressCountry: 'ET',
      },
      sameAs: [
        'https://linkedin.com/company/asterragroup',
        'https://twitter.com/asterragroup',
      ],
    };

    scriptTag.textContent = JSON.stringify(schemaJsonLd || defaultCorpSchema);
  }, [title, description, canonicalUrl, ogImage, ogType, schemaJsonLd]);

  return null;
};
