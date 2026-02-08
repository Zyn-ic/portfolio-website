"use client";

interface FooterSectionProps {
  name: string;
}

export default function FooterSection({ name }: FooterSectionProps) {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>
          &copy; 2024 {name}. Built with Next.js and deployed on
          <i> netlify.app</i>
        </p>
      </div>
    </footer>
  );
}
