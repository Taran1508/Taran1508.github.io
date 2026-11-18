import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-fg/10 py-8">
      <div className="container-page flex flex-col items-start justify-between gap-4 text-sm text-fg/55 sm:flex-row sm:items-center">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 font-medium">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
          <a href={profile.snapchat} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">Snapchat</a>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-accent">Email</a>
          <a href="#" className="transition-colors hover:text-accent">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
