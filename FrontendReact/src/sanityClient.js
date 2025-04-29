import {createClient} from '@sanity/client';

export default createClient({
  projectId: '9exo6070',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-04-29', 
});