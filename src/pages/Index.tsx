import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ParticleBackground />
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-6" />
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-heading font-bold mb-6">Bienvenue chez AR Engineering</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Plateforme de collaboration pour l'ingénierie civile
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add your dashboard cards here */}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;