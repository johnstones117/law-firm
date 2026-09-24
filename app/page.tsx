import { prisma } from "@/lib/prisma";
import HomeSections from "@/components/HomeSections";

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  const [practiceAreas, attorneys, caseStudies, articles, testimonials] =
    await Promise.all([
      prisma.practiceArea.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.attorney.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.caseStudy.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.article.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
      prisma.testimonial.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);

  return (
    <HomeSections
      practiceAreas={practiceAreas}
      attorneys={attorneys}
      caseStudies={caseStudies}
      articles={articles}
      testimonials={testimonials}
    />
  );
}
