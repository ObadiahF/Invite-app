import { MainNav } from "@/components/main-nav";
import { useParams } from "react-router-dom";
export function SiteHeader() {
  return (
    <div className="grid">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={[
            {
              title: "Stop Messages",
              href: '/stop'
            },
            {
              title: "Invite Friend",
              href: '/'
            }, 
            {
              title: "Create Event",
              href: '/create'
            }, 
          ]} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
