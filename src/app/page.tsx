import HomePage from "@/features/home/HomePage";
import aboutDataRaw from "@/data/about.json";
import projectsDataRaw from "@/data/projects.json";
import contactDataRaw from "@/data/contact.json";
import type { AboutData, ContactItem, Project } from "@/features/home/types";

export default function Page() {
  return (
    <HomePage
      aboutData={aboutDataRaw as AboutData}
      projectsData={projectsDataRaw as Project[]}
      contactData={contactDataRaw as ContactItem[]}
    />
  );
}
