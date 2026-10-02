import { cn } from "cn"
import type { HTMLAttributes } from "react"

function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <article data-slot="card" className={cn("site-card", className)} {...props} />
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-header" className={cn("site-card__header", className)} {...props} />
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 data-slot="card-title" className={cn("site-card__title type-heading-4", className)} {...props} />
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="card-description" className={cn("site-card__description type-body-sm", className)} {...props} />
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-content" className={cn("site-card__content", className)} {...props} />
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-footer" className={cn("site-card__footer", className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
