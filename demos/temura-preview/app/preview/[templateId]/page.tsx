import {notFound} from 'next/navigation';
import {PREVIEW_DESIGNS} from '@/lib/preview-designs';
import {InvitationPreview} from '@/components/invitation/catalog-previews/invitation-preview';
export const dynamicParams=false;
export function generateStaticParams(){return PREVIEW_DESIGNS.map(d=>({templateId:d.id}));}
export default async function Preview({params}:{params:Promise<{templateId:string}>}){const {templateId}=await params;const design=PREVIEW_DESIGNS.find(d=>d.id===templateId);if(!design)notFound();return <InvitationPreview design={design}/>;}
