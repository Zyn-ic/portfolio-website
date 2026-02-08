"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ContactItem } from "../types";
import ContactIcon from "../components/ContactIcon";

interface ContactSectionProps {
  contacts: ContactItem[];
  onContactAction: (actionType: string, actionValue: string) => void;
}

export default function ContactSection({
  contacts,
  onContactAction,
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-12 md:py-16 px-4 scroll-mt-[3.25rem]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Interested in working together? Let's discuss your project and see how
          I can help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className="overflow-hidden hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <ContactIcon iconName={contact.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                <p className="text-muted-foreground mb-6 min-h-[3rem]">
                  {contact.description}
                </p>
                <Button
                  className="w-full"
                  onClick={() =>
                    onContactAction(contact.actionType, contact.actionValue)
                  }
                >
                  {contact.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
