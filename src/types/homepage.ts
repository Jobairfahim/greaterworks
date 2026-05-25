export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  focalPoint: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImpactSectionData {
  id: number;
  impactSectionTitle: string;
  impactSectionClientRetentionRate: number;
  impactSectionProjectsDelivered: number;
  impactSectionUsersWorldwide: number;
  impactSectionExperience: number;
}

export interface IndustrySectionData {
  id: number;
  industrySectionTitle: string;
  industrySectionDetails: string;
}

export interface IndustryDetail {
  id: number;
  details: string;
}

export interface Industry {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  details: IndustryDetail[];
  image: ImageData;
}

export interface SelectedWorkSectionData {
  id: number;
  selectedWorkTitle: string;
  selectedWorkYears: string;
}

export interface SelectedWork {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageData | null;
}

export interface TestimonialSectionData {
  id: number;
  testimonialSectionTitle: string;
  testimonialAverageRating: number;
}

export interface Testimonial {
  id: number;
  documentId: string;
  feedback: string;
  rating: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageData | null;
}

export interface BannarSectionData {
  id: number;
  bannarTitle: string;
  bannarDescription: string;
  bannarRating: number;
  brandsTitle: string;
  bannarVideoUrl: string;
  bannarIntroVideoUrl: string;
  brandsImages: ImageData[];
}

export interface ContactSectionData {
  id: number;
  contactTitle: string;
  contactSubTitle: string;
  contactDescription: string;
  contactTagline: string;
  contactSupportEmail: string;
  contactDetails: { id: number; details: string }[];
}

export interface EngagementModelSectionData {
  id: number;
  engagementModelTitle: string;
  engagementModelImage: ImageData;
}

export interface EngagementModelDetail {
  id: number;
  details: string;
}

export interface EngagementModel {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  details: EngagementModelDetail[];
}

export interface OnDemandSectionData {
  id: number;
  onDemandDetails: { id: number; details: string }[];
}

export interface TechStackSectionData {
  id: number;
  techStackTitle: string;
  techStackDescription: string;
  techStackTechNumber: number;
  techStackImage: ImageData;
}

export interface ServiceItem {
  id: number;
  documentId: string;
  serviceTitle: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ServiceSectionData {
  id: number;
  serviceTitle: string;
  serviceDiscripction: string; // Note: spelt as 'serviceDiscripction' on Strapi
  serviceTagline: string;
  serviceImage: ImageData | null;
  services?: ServiceItem[];
}

export interface HomepageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  impactSection: ImpactSectionData;
  industrySection: IndustrySectionData;
  selectedWorkSection: SelectedWorkSectionData;
  testimonialSection: TestimonialSectionData;
  bannarSection: BannarSectionData;
  contactSection: ContactSectionData;
  engagementModelSection: EngagementModelSectionData;
  onDemandSection: OnDemandSectionData;
  techStackSection: TechStackSectionData;
  serviceSection?: ServiceSectionData;
}

