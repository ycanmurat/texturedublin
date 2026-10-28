import { carpentryContent } from './carpentry.ts';
import { furnitureContent } from './furniture.ts';
import { signageContent } from './signage.ts';
import type { ServiceContent } from './helpers.ts';

export type { ServiceContent } from './helpers.ts';
export const serviceContent: Record<string, ServiceContent> = { ...furnitureContent, ...carpentryContent, ...signageContent };
