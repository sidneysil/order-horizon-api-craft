
import React from 'react';
import ProjectOverview from '../components/ProjectOverview';
import CodeExamples from '../components/CodeExamples';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Tabs defaultValue="overview" className="w-full">
        <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-slate-800/50 my-4">
              <TabsTrigger value="overview" className="text-sm">Visão Geral</TabsTrigger>
              <TabsTrigger value="code" className="text-sm">Código</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" className="mt-0">
          <ProjectOverview />
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
            <div className="container mx-auto px-4 py-8">
              <CodeExamples />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
