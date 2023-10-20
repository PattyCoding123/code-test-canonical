/**
 * This file contains type definitions for the WordPress REST API.
 */

// Type definitions for the WordPress REST API
interface BlogPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: RenderedObject;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedObject;
  content: ProtectedRenderedObject;
  excerpt: ProtectedRenderedObject;
  author: number;
  featured_media: string;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[]; // Use specific type if you know the structure
  categories: number[];
  tags: number[];
  topic: any[];
  group: any[];
  _event_location: string;
  _event_venue: string;
  _event_registration: string;
  _start_day: string;
  _start_month: string;
  _start_year: string;
  _end_day: string;
  _end_month: string;
  _end_year: string;
  _links: LinksObject;
  _embedded: EmbeddedObject;
}

// RenderedObject is used for title and content
interface RenderedObject {
  rendered: string;
}

// ProtectedRenderedObject is used for excerpt
interface ProtectedRenderedObject extends RenderedObject {
  protected: boolean;
}

// HrefObject is used for links
interface HrefObject {
  href: string;
}

// LinksObject is used for _links
interface LinksObject {
  self: HrefObject[];
  collection: HrefObject[];
  about: HrefObject[];
  author: EmbeddableHrefObject[];
  replies: EmbeddableHrefObject[];
  "version-history": HrefObject[];
  "predecessor-version": IdHrefObject[];
  "wp:attachment": HrefObject[];
  "wp:term": TaxonomyHrefObject[];
  curies: CuriesObject[];
}

// EmbeddedObject is used for _embedded
interface EmbeddableHrefObject extends HrefObject {
  embeddable: boolean;
}

// IdHrefObject is used for predecessor-version
interface IdHrefObject extends HrefObject {
  id: number;
}

// CuriesObject is used for curies
interface CuriesObject {
  name: string;
  href: string;
  templated: boolean;
}

// TaxonomyHrefObject is used for wp:term
interface TaxonomyHrefObject extends EmbeddableHrefObject {
  taxonomy: string;
}

// EmbeddedObject is used for _embedded
interface EmbeddedObject {
  author: Author[];
  "wp:term": Term[][];
}

// Author is used for _embedded.author
interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  user_job_title: string;
  user_website_title: string;
  user_google: string;
  user_twitter: string;
  user_facebook: string;
  user_photo: string;
  user_location: string;
  _links: LinksObject;
}

// Term is used for _embedded.wp:term
interface Term {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  _links: LinksObject;
}
